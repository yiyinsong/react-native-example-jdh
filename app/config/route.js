import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image
} from 'react-native';

import HomeScreen from '../screens/index';
import EntranceScreen from '../screens/entrance';
import LoginScreen from '../screens/login';
import FindPasswordScreen from '../screens/findPassword';

import SellerScreen from '../screens/containers/seller/index';
import SellerStoreInfoScreen from '../screens/containers/seller/tab-home-store-info';
import SellerUserInfoScreen from '../screens/containers/seller/tab-home-user-info';
import SellerAddrListScreen from '../screens/containers/seller/tab-home-address-list';
import SellerAddrAddScreen from '../screens/containers/seller/tab-home-address-add';

import SellerOrderDetailScreen from '../screens/containers/seller/tab-order-detail';

import styles from '../css/styles';

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
          headerLeft: <TouchableOpacity style={styles.common.headerLeftNone}></TouchableOpacity>,
        }
      },
      //登录页
      Login: {
        screen: LoginScreen,
        navigationOptions: {
          title: '登录',
          headerLeft: <TouchableOpacity style={styles.common.headerLeftNone}></TouchableOpacity>,
        }
      },
      //找回密码
      findPassword: {
        screen: FindPasswordScreen,
        navigationOptions: {
          title: '找回密码',
        }
      },
      Seller: {
        screen: SellerScreen,
        navigationOptions: ({navigation}) => ({
          headerStyle: {
            backgroundColor: '#0eaaff',
            color: '#fff',
            height: 65,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomColor: '#0eaaff',
            borderBottomWidth: 1,
            paddingTop: 20,
          },
          headerTitleStyle : {
              color: '#fff',
              fontSize: 16,
              alignSelf: 'center',
              fontWeight: '100'
          },
          headerLeft: null,
          headerRight: (navigation.state.index == 2 ? <TouchableOpacity activeOpacity={.8} onPress={() => {navigation.navigate('Login')}}>
                <Image source={require('../images/icon-search-w.png')} style={styles.common.headerBtnRight}/>
            </TouchableOpacity> : null)
        })
      },
      SellerStoreInfo: {
        screen: SellerStoreInfoScreen,
        navigationOptions: {
          title: '店铺数据'
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
      },
      SellerAddrAdd: {
        screen: SellerAddrAddScreen,
        navigationOptions: {
          title: '添加新地址'
        }
      },
      SellerOrderDetail: {
        screen: SellerOrderDetailScreen,
        navigationOptions: {
          title: '订单详情',
          headerStyle: styles.common.headerGray
        }
      }
}
