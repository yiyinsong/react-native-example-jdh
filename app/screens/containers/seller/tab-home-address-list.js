import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-root-toast';

import styles from '../../../css/styles';

import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';

import AddressItemComponent from '../../components/seller/tab-home-address-item';

export default class SellerAddrList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        list: []
      };
    }
    componentDidMount() {
      ScreenInit.checkLogin();
      fetch(Config.PHPAPI + 'api/mapp/shop/addr-list?type=seller&token=' + token, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((data) => {
        // if(data.error_code == 0) {
        //   this.setState({
        //
        //   });
        // }
      })
      .catch((error) => {
        console.error(error);
      });
    }
    render() {
        return (
          <View style={styles.common.flexv}>
            <ScrollView style={styles.saddr.listDl}>
              <View style={[styles.common.flex, styles.saddr.listDt]}>
                <Text style={styles.saddr.listDtText}>共建</Text>
                <Text style={styles.saddr.listDtTextActive}>8</Text>
                <Text style={styles.saddr.listDtText}>个地址，还可以创建</Text>
                <Text style={styles.saddr.listDtTextActive}>12</Text>
                <Text style={styles.saddr.listDtText}>个</Text>
              </View>
              <View style={styles.saddr.listDd}>
                <AddressItemComponent></AddressItemComponent>
              </View>
            </ScrollView>
            <View style={styles.saddr.footer}>
              <TouchableOpacity activeOpacity={.8} onPress={this._addNewOne}>
                <Text style={styles.saddr.footerBtn}>+新增地址</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
}
