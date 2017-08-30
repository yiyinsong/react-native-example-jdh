import React from 'react';
import {
  Image,
  Text
  } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import BHomeScreen from './home';
import CategoryScreen from './category';
import CartScreen from './cart';
import UserBuyerScreen from './buyer';
import UserSellerScreen from '../seller/seller';

import styles from '../../../css/styles';


export default TabNavigator({
    'BuyerHome': {
      screen: BHomeScreen,
      navigationOptions: {
        header: null,
        tabBarLabel: '首页',
        tabBarIcon: ({ focused }) => (
          <Image source={ focused ? require('../../../images/icon-home-active.png') : require('../../../images/icon-home.png')}
            style={styles.common.tabIcon}
          />
        ),
      }
    },
    'Category': {
      screen: CategoryScreen,
      navigationOptions: {
        headerTitle: '分类',
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
    'User': {
      screen: StackNavigator({
          UserBuyer: { screen: UserBuyerScreen },
          UserSeller: { screen: UserSellerScreen },
      }, {
        navigationOptions: ({navigation}) => ({
          header: null
        }),
        transitionConfig: () => ({
          transitionSpec: {
            duration: 300
          },
       }),
      }),
      navigationOptions: {
        header: null,
        tabBarLabel: '我的',
        tabBarIcon: ({ focused }) => (
          <Image source={ focused ? require('../../../images/icon-user-active.png') : require('../../../images/icon-user.png')}
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
