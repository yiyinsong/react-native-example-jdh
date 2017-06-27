import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  DeviceEventEmitter
} from 'react-native';

import Toast from 'react-native-root-toast';

import styles from '../../../css/styles';

import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';

import ModalAddress from '../../common/modal-address';

export default class SellerAddrAdd extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: ''
      };
    }
    componentDidMount() {
      ScreenInit.checkLogin();
      // fetch(Config.PHPAPI + 'api/mapp/shop/addr-list?type=seller&token=' + token, {
      //   method: 'GET'
      // })
      // .then((response) => response.json())
      // .then((data) => {
      //   if(data.error_code == 0) {
      //     this.setState({
      //       addr: {
      //         addr_count: data.data.addr_count,
      //         addr_remain: data.data.addr_remain,
      //         list: data.data.list
      //       }
      //     });
      //   } else {
      //     Toast.show(data.msg, {
      //         duration: Toast.durations.SHORT,
      //         backgroundColor: 'rgba(0,0,0,.8)'
      //     });
      //   }
      // })
      // .catch((error) => {
      //   Toast.show('获取列表失败', {
      //       duration: Toast.durations.SHORT,
      //       backgroundColor: 'rgba(0,0,0,.8)'
      //   });
      // });
    }
    render() {
        return (
          <View style={styles.common.flexv}>
            <ScrollView style={styles.saddr.add}>
              <View style={[styles.common.flex, styles.saddr.group, styles.common.flexCenterv]}>
                <Text style={styles.saddr.addLabel}>收货人姓名：</Text>
                <View style={styles.saddr.addAbsolute}>
                  <TextInput underlineColorAndroid='transparent'  onChangeText={(text) => this.setState({username: text})} value={this.state.username} style={styles.common.flex}/>
                </View>
              </View>
              <View style={[styles.common.flex, styles.saddr.group, styles.common.flexCenterv]}>
                <Text style={styles.saddr.addLabel}>收货人手机号：</Text>
                <View style={styles.saddr.addAbsolute}>
                  <TextInput underlineColorAndroid='transparent'  onChangeText={(text) => this.setState({tel: text})} value={this.state.tel} style={styles.common.flex}/>
                </View>
              </View>
              <View style={[styles.common.flex, styles.saddr.group, styles.common.flexCenterv]}>
                <Text style={styles.saddr.addLabel}>所在地区：</Text>
                <View style={[styles.saddr.addAbsolute, styles.common.flexCenterv]}>
                  <TextInput underlineColorAndroid='transparent'  editable={false} value={this.state.addr} style={styles.common.flex}/>
                  <Image source={require('../../../images/icon-arb.png')} style={styles.shome.arrowRight}/>
                </View>
              </View>
              <View style={[styles.common.flex, styles.saddr.group, styles.common.flexCenterv]}>
                <Text style={styles.saddr.addLabel}>详细地址：</Text>
                <View style={styles.saddr.addAbsolute}>
                  <TextInput underlineColorAndroid='transparent'  onChangeText={(text) => this.setState({detail: text})} value={this.state.detail} style={styles.common.flex}/>
                </View>
              </View>
            </ScrollView>
            <View style={[styles.saddr.footer, styles.saddr.addFooter]}>
              <TouchableOpacity activeOpacity={.8} onPress={this._addNewOne}>
                <Text style={styles.saddr.footerBtn}>保存</Text>
              </TouchableOpacity>
            </View>
            <ModalAddress level={3}></ModalAddress>
          </View>
        );
    }
}
