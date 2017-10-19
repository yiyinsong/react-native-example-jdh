
/**
 * Component: 店铺管理
 * author: yiyinSong
 * date: 2017-10-19
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ScrollView,
  InteractionManager
} from 'react-native';

import { NavigationActions } from 'react-navigation';

import styles from '../../../css/styles';
import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';
import UIToast from '../../common/ui-toast';

export default class StoreManaScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        
      };
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        ScreenInit.checkLogin(this);
      });
    }
    render() {
        return (
          <View style={[styles.common.flexv, styles.common.init]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.storeMana.container}>
              <TouchableHighlight underlayColor="#f5f5f5" onPress={this._toStoreRegisterInfo}>
                <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.storeMana.item]}>
                  <Image source={require('../../../images/store-man-icon1.png')} style={styles.storeMana.itemLeftIcon} resizeMode="contain" />
                  <Text style={[styles.common.flex, styles.storeMana.itemText]}>查看店铺注册信息</Text>
                  <Image source={require('../../../images/icon-arb.png')} style={styles.storeMana.itemRightIcon} resizeMode="contain" />                  
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="#f5f5f5">
                <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.storeMana.item]}>
                  <Image source={require('../../../images/store-man-icon2.png')} style={styles.storeMana.itemLeftIcon} resizeMode="contain" />
                  <Text style={[styles.common.flex, styles.storeMana.itemText]}>店铺展示信息</Text>
                  <Image source={require('../../../images/icon-arb.png')} style={styles.storeMana.itemRightIcon} resizeMode="contain" />                  
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="#f5f5f5" onPress={this._toAddressList}>
                <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.storeMana.item]}>
                  <Image source={require('../../../images/store-man-icon3.png')} style={styles.storeMana.itemLeftIcon} resizeMode="contain" />
                  <Text style={[styles.common.flex, styles.storeMana.itemText]}>我的地址</Text>
                  <Image source={require('../../../images/icon-arb.png')} style={styles.storeMana.itemRightIcon} resizeMode="contain" />                  
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="#f5f5f5">
                <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.storeMana.item]}>
                  <Image source={require('../../../images/store-man-icon4.png')} style={styles.storeMana.itemLeftIcon} resizeMode="contain" />
                  <Text style={[styles.common.flex, styles.storeMana.itemText]}>店铺装修</Text>
                  <Image source={require('../../../images/icon-arb.png')} style={styles.storeMana.itemRightIcon} resizeMode="contain" />                  
                </View>
              </TouchableHighlight>
              </View>
            </ScrollView>
            <View style={styles.sinfo.logout}>
              <TouchableOpacity style={styles.sinfo.logoutBtn} activeOpacity={.8} onPress={this._logout}>
                <Text style={styles.sinfo.logoutText}>退出登录</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
    _toStoreRegisterInfo = () => {
      this.props.navigation.navigate('SellerUserInfo');
    }
    _toAddressList = () => {
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
                routeName: 'Buyer',
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
}
