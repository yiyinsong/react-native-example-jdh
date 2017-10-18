import React from 'react';
import {
  Image,
  Text
  } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import StoreScreen from './store';
import ShoppingScreen from './shopping';
import CategoryScreen from './category';
import CartScreen from './cart';

import styles from '../../../css/styles';


export default TabNavigator({
    'Store': {
      screen: StoreScreen,
      navigationOptions: {
        header: null,
        tabBarLabel: '小店',
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
        header: null,
        tabBarLabel: '采购中心',
        tabBarIcon: ({ focused }) => (
          <Image source={ focused ? require('../../../images/icon-shopping-active.png') : require('../../../images/icon-shopping.png')}
            style={styles.common.tabIcon}
          />
        ),
      }
    },
    'Category': {
      screen: CategoryScreen,
      navigationOptions: {
        header: null,
        tabBarLabel: '分类',
        tabBarIcon: ({ focused }) => (
          <Image source={ focused ? require('../../../images/icon-cate-active.png') : require('../../../images/icon-cate.png')}
            style={styles.common.tabIcon}
          />
        ),
      }
    },
    'Cart': {
      screen: CartScreen,
      navigationOptions: {
        headerTitle: '购物车',
        tabBarLabel: '购物车',
        tabBarIcon: ({ focused }) => (
          <Image source={ focused ? require('../../../images/icon-cart-active.png') : require('../../../images/icon-cart.png')}
            style={styles.common.tabIcon}
          />
        ),
      }
    },
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
      borderTopWidth: 1,
      padding: 0
    },
    labelStyle: {
      fontSize: 12,
      marginTop: 0
    },
    indicatorStyle: {
      height: 0
    },
    iconStyle: {
      width: 20,
      height: 20,
      margin: 0
    },
    tabStyle: {
      margin: 0,
      padding: 0
    }
  }
});
