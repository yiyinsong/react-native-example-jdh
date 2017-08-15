import React from 'react';
import {
  Image,
  Text
  } from 'react-native';
import { TabNavigator } from 'react-navigation';

import BHomeScreen from './tab-home';
import ShoppingScreen from './tab-shopping';
import MultiScreen from './tab-multi';
import CartScreen from './tab-cart';
import BOrderScreen from './tab-order';

import styles from '../../../css/styles';


export default TabNavigator({
    'BuyerHome': {
      screen: BHomeScreen,
      navigationOptions: {
        header: null,
        tabBarLabel: '个人中心',
        tabBarIcon: ({ focused }) => (
          <Image source={ focused ? require('../../../images/icon-home-active.png') : require('../../../images/icon-home.png')}
            style={styles.common.tabIcon}
          />
        ),
      }
    },
    'Shopping': {
      screen: ShoppingScreen,
      navigationOptions: {
        headerTitle: '采购中心',
        tabBarLabel: '采购中心',
        tabBarIcon: ({ focused }) => (
          <Image source={ focused ? require('../../../images/icon-shopping-active.png') : require('../../../images/icon-shopping.png')}
            style={styles.common.tabIcon}
          />
        ),
      }
    },
    'Multi': {
      screen: MultiScreen,
      navigationOptions: {
        headerTitle: '众采',
        tabBarLabel: '众采',
        tabBarIcon: ({ focused }) => (
          <Image source={ focused ? require('../../../images/icon-multi-active.png') : require('../../../images/icon-multi.png')}
            style={styles.common.tabIcon}
          />
        ),
      }
    },
    'Cart': {
      screen: CartScreen,
      navigationOptions: {
        headerTitle: '购物车',
        headerRight: <Text>yaya</Text>,
        tabBarLabel: '购物车',
        tabBarIcon: ({ focused }) => (
          <Image source={ focused ? require('../../../images/icon-cart-active.png') : require('../../../images/icon-cart.png')}
            style={styles.common.tabIcon}
          />
        ),
      }
    },
    'BuyerOrder': {
      screen: BOrderScreen,
      navigationOptions: {
        headerTitle: '采购订单',
        tabBarLabel: '采购订单',
        tabBarIcon: ({ focused }) => (
          <Image source={ focused ? require('../../../images/icon-order-active.png') : require('../../../images/icon-order.png')}
            style={styles.common.tabIcon}
          />
        ),
      }
    }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  lazy: true,
  scrollEnabled: false,
  backBehavior: 'none',
  tabBarOptions: {
    activeTintColor: '#f93b31',
    inactiveTintColor: '#666666',
    pressColor: '#eeeeee',
    showIcon: true,
    style: {
      backgroundColor: '#ffffff',
      borderTopColor: '#eee',
      borderTopWidth: 1
    },
    labelStyle: {
      fontSize: 12,
      marginTop: 3
    },
    indicatorStyle: {
      height: 0
    },
    iconStyle: {
      width: 20,
      height: 20
    },
    tabStyle: {
      margin: 0,
      padding: 0
    }
  }
});
