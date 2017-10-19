import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  InteractionManager
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import styles from '../../../css/styles';
import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';
import UIToast from '../../common/ui-toast';
import Loading from '../../common/ui-loading';

export default class SellerUserInfoScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        storeInfo: {},
        loadingVisible: false
      };
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        this.setState({loadingVisible: true});
        ScreenInit.checkLogin(this);

        //获取用户信息
        fetch(Config.PHPAPI + 'api/mapp/shop/shop?type=seller&token=' + token, {
          method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
          this.setState({loadingVisible: false});
          if(data.error_code == 0) {
            this.setState({
              storeInfo: data.data
            });
          } else {
            UIToast(data.msg);
          }
        })
        .catch((error) => {
          this.setState({loadingVisible: false});
          UIToast('获取用户信息失败');
        });
      });
    }
    render() {
        return (
          <View style={[styles.common.flexv, styles.common.init]}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
            </ScrollView>
            <Loading visible={this.state.loadingVisible}></Loading>
        </View>
        );
    }
}
