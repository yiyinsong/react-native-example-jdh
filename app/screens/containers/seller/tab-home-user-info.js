import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  DeviceEventEmitter,
  InteractionManager
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import styles from '../../../css/styles';

import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';

import UIToast from '../../common/ui-toast';

export default class SellerUserInfoScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
      headerRight: (
        <TouchableOpacity style={styles.sinfo.headerRight} activeOpacity={.8}>
          {navigation.state.params && navigation.state.params.messNum > 0 ?
          <View style={styles.sinfo.mess}>
            <View style={styles.sinfo.messBadge}>
              <Text style={styles.sinfo.messBadgeText}>{(navigation.state.params && navigation.state.params.messNum) || 0}</Text>
            </View>
          </View>
          : null
          }
          <Image style={styles.sinfo.messIcon} source={require('../../../images/icon-mess-black.png')}/>
        </TouchableOpacity>
      )
    });
    constructor(props) {
      super(props);
      this.state = {
        storeInfo: {}
      };
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        ScreenInit.checkLogin();

        //添加地址事件侦听
        this.eventEmitter_addr = DeviceEventEmitter.addListener('event_address_num_change', (arg) => {
          if(arg) {
            this.setState({
              storeInfo: {
                ...this.state.storeInfo,
                addr_count: arg.addr_count,
                addr_remain: arg.addr_remain
              }
            });
          }
        });

        //获取未读消息
        fetch(Config.PHPAPI + 'api/mapp/letter/unread-num?token=' + token, {
          method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
          if(data.error_code == 0) {
            if(typeof data.data == 'string') {
              this.props.navigation.setParams({messNum: data.data});
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
        //获取用户信息
        fetch(Config.PHPAPI + 'api/mapp/shop/shop?type=seller&token=' + token, {
          method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
          if(data.error_code == 0) {
            this.setState({
              storeInfo: data.data
            });
          } else {
            UIToast(data.msg);
          }
        })
        .catch((error) => {
          UIToast('获取用户信息失败');
        });
      });
    }
    render() {
        return (
          <ScrollView>
            <View style={styles.sinfo.storeInfoWrapper}>
              <View style={[styles.common.flex, styles.sinfo.storeInfoItem]}>
                <Text style={styles.sinfo.storeInfoItemLeft}>联系人</Text>
                <Text style={[styles.common.flex, styles.common.flexEndh, styles.sinfo.storeInfoItemRight]}>{this.state.storeInfo.contactor}</Text>
              </View>
              <View style={[styles.common.flex, styles.sinfo.storeInfoItem]}>
                <Text style={styles.sinfo.storeInfoItemLeft}>手机号码</Text>
                <Text style={[styles.common.flex, styles.common.flexEndh, styles.sinfo.storeInfoItemRight]}>{this.state.storeInfo.tel}</Text>
              </View>
              <View style={[styles.common.flex, styles.sinfo.storeInfoItem]}>
                <Text style={styles.sinfo.storeInfoItemLeft}>邮箱</Text>
                <Text style={[styles.common.flex, styles.common.flexEndh, styles.sinfo.storeInfoItemRight]}>{this.state.storeInfo.email}</Text>
              </View>
              <View style={[styles.common.flex, styles.sinfo.storeInfoItem]}>
                <Text style={styles.sinfo.storeInfoItemLeft}>地址</Text>
                <Text style={[styles.common.flex, styles.common.flexEndh, styles.sinfo.storeInfoItemRight]}>{this.state.storeInfo.address}</Text>
              </View>
            </View>
            <TouchableOpacity style={[styles.common.flex, styles.sinfo.address]} activeOpacity={.8} onPress={this._toAddrList}>
              <View style={[styles.common.flex, styles.common.flexCenterv]}>
                <Image style={styles.sinfo.addrIcon} source={require('../../../images/icon-position.png')}/>
                <Text style={styles.sinfo.addrTitle}>地址管理</Text>
              </View>
              <View>
                <View style={[styles.common.flex, styles.common.flexCenterv]}>
                  <Text style={styles.sinfo.addrText}>创建</Text>
                  <Text style={styles.sinfo.colorOrg}>{this.state.storeInfo.addr_count}</Text>
                  <Text style={styles.sinfo.addrText}>个地址，还可以创建</Text>
                  <Text style={styles.sinfo.colorOrg}>{this.state.storeInfo.addr_remain}</Text>
                  <Text style={styles.sinfo.addrText}>个</Text>
                  <Image style={styles.sinfo.addrArrow} source={require('../../../images/icon-arb.png')}/>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.sinfo.logout}>
              <TouchableOpacity style={styles.sinfo.logoutBtn} activeOpacity={.8} onPress={this._logout}>
                <Text style={styles.sinfo.logoutText}>退出登录</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        );
    }
    _toAddrList = () => {
      this.props.navigation.navigate('SellerAddrList');
    }
    _logout = () => {
      fetch(Config.PHPAPI + 'api/mapp/member/logout', {
        method: 'POST',
        body: JSON.stringify({
          token
        })
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.error_code == 0) {
          storage.remove({
            key: 'user'
          });
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Login', params: {
                routeName: 'Entrance',
                params: {}
              }})
            ]
          })
          this.props.navigation.dispatch(resetAction);
        } else {
          UIToast(data.msg || '退出失败');
        }
      }).catch((err) => {
        UIToast('退出失败');
      });
    }
    componentWillUnmount(){
      //移除事件侦听
      this.eventEmitter_addr && this.eventEmitter_addr.remove();
    }
}
