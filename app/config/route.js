import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import HomeScreen from '../screens/index';
import EntranceScreen from '../screens/entrance';
import LoginScreen from '../screens/login';

import SellerScreen from '../screens/containers/seller/index';
import SellerUserInfoScreen from '../screens/containers/seller/tab-home-user-info';
import SellerAddrListScreen from '../screens/containers/seller/tab-home-address-list';

const styles = StyleSheet.create({
  headerLeftNone: {
    width: 20,
    height: 20
  }
});

export default {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          header: null
        }
      },
      Entrance: {
        screen: EntranceScreen,
        navigationOptions: {
          title: '选择身份',
          headerLeft: <TouchableOpacity style={styles.headerLeftNone}></TouchableOpacity>,
        }
      },
      //登录页
      Login: {
        screen: LoginScreen,
        navigationOptions: {
          header: null
        }
      },
      Seller: {
        screen: SellerScreen,
        navigationOptions: {
          header: null
        }
      },
      SellerUserInfo: {
        screen: SellerUserInfoScreen,
        navigationOptions: {
          title: '店铺信息'
        }
      },
      SellerAddrList: {
        screen: SellerAddrListScreen,
        navigationOptions: {
          title: '地址管理'
        }
      }
}
