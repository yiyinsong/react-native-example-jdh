import React from 'react';
import {
  StyleSheet,
  Image,
  Text
  } from 'react-native';
import { TabNavigator } from 'react-navigation';

import SHomeScreen from './tab-home';
import SGoodsScreen from './tab-goods';
import SOrderScreen from './tab-order';

import styles from '../../../css/styles';


export default TabNavigator({
    '概览': {
      screen: SHomeScreen,
      navigationOptions: {
        header: null,
        tabBarLabel: '概览',
        tabBarIcon: ({ focused }) => (
          <Image source={ focused ? require('../../../images/icon-shome-active.png') : require('../../../images/icon-shome.png')}
            style={styles.common.tabIcon}
          />
        ),
      }
    },
    '商品管理': {
      screen: SGoodsScreen,
      navigationOptions: {
        headerTitle: '商品管理',
        tabBarLabel: '商品管理',
        tabBarIcon: ({ focused }) => (
          <Image source={ focused ? require('../../../images/icon-sgoods-active.png') : require('../../../images/icon-sgoods.png')}
            style={styles.common.tabIcon}
          />
        ),
      }
    },
    '订单管理': {
      screen: SOrderScreen,
      navigationOptions: {
        headerTitle: '订单管理',
        tabBarLabel: '订单管理',
        tabBarIcon: ({ focused }) => (
          <Image source={ focused ? require('../../../images/icon-sorder-active.png') : require('../../../images/icon-sorder.png')}
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
  tabBarOptions: {
    activeTintColor: '#0589ce',
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
