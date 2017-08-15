import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  DeviceEventEmitter
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

import SellerOrderSearchScreen from '../screens/containers/seller/tab-order-search';
import SellerOrderDetailScreen from '../screens/containers/seller/tab-order-detail';
import SellerOrderDeliverScreen from '../screens/containers/seller/tab-order-deliver';
import SellerRefundDetailScreen from '../screens/containers/seller/tab-order-refund-detail';
import SellerRefundExamineScreen from '../screens/containers/seller/tab-order-refund-examine';
import SellerRefundRefuseScreen from '../screens/containers/seller/tab-order-refund-refuse';

import SellerGoodsDetailScreen from '../screens/containers/seller/tab-goods-detail';
import SellerGoodsEditScreen from '../screens/containers/seller/tab-goods-edit';

import BuyerScreen from '../screens/containers/buyer/index';

import styles from '../css/styles';

const renderBuyerHeaderRight = (navigation) => {
  if(navigation.state.index == 4) {
    return (
      <TouchableOpacity activeOpacity={.8} onPress={() => { navigation.navigate('SellerOrderSearch', {type: navigation.state.routes[2].params.type}) }} style={styles.common.headerBtnRight}>
            <Image source={require('../images/icon-search-w.png')} style={styles.common.headerBtnRight}/>
        </TouchableOpacity>
    );
  } else if (navigation.state.index == 3) {
    let _params = navigation.state.routes[navigation.state.index].params;
    return (
      <TouchableOpacity activeOpacity={.8} onPress={() => {DeviceEventEmitter.emit('cartEdit')}} style={styles.cart.headerRight}>
        <Text style={styles.cart.headerRightText}>{_params && _params.headerRight}</Text>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
}

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
        backgroundColor: '#0386fc',
        color: '#fff',
        height: 65,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomColor: '#0386fc',
        borderBottomWidth: 1,
        paddingTop: 20,
      },
      headerTitleStyle : {
          color: '#fff',
          fontSize: 16,
          alignSelf: 'center',
          fontWeight: '100'
      },
      headerLeft: (navigation.state.index == 2 ? <TouchableOpacity style={styles.common.iconBackArrow}></TouchableOpacity> : null),
      headerRight: (navigation.state.index == 2 ? <TouchableOpacity activeOpacity={.8} onPress={() => { navigation.navigate('SellerOrderSearch', {type: navigation.state.routes[2].params.type}) }} style={styles.common.headerBtnRight}>
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
  //搜索订单
  SellerOrderSearch: {
    screen: SellerOrderSearchScreen,
    navigationOptions: {
      title: '订单搜索',
      headerStyle: styles.common.headerGray
    }
  },
  SellerOrderDetail: {
    screen: SellerOrderDetailScreen,
    navigationOptions: {
      title: '订单详情',
      headerStyle: styles.common.headerGray
    }
  },
  //发货
  SellerOrderDeliver: {
    screen: SellerOrderDeliverScreen,
    navigationOptions: {
      title: '发货',
      headerStyle: styles.common.headerGray
    }
  },
  //退款详情
  SellerRefundDetail: {
    screen: SellerRefundDetailScreen,
    navigationOptions: {
      headerStyle: styles.common.headerGray
    }
  },
  //退款审核
  SellerRefundExamine: {
    screen: SellerRefundExamineScreen,
    navigationOptions: {
      title: '待审核',
      headerStyle: styles.common.headerGray
    }
  },
  //退款拒绝
  SellerRefundRefuse: {
    screen: SellerRefundRefuseScreen,
    navigationOptions: {
      headerStyle: styles.common.headerGray
    }
  },
  //卖家商品管理详情
  SellerGoodsDetail: {
    screen: SellerGoodsDetailScreen,
    navigationOptions: {
      header: null
    }
  },
  //卖家商品编辑
  SellerGoodsEdit: {
    screen: SellerGoodsEditScreen,
    navigationOptions: {
      title: '编辑商品'
    }
  },
  //买家
  Buyer: {
    screen: BuyerScreen,
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: '#fff',
        color: '#333',
        height: 65,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        paddingTop: 20,
      },
      headerTitleStyle : {
          color: '#333',
          fontSize: 16,
          alignSelf: 'center',
          fontWeight: '100'
      },
      headerLeft: (navigation.state.index == 3 || navigation.state.index == 4 ? <TouchableOpacity style={styles.common.iconBackArrow}></TouchableOpacity> : null),
      headerRight: renderBuyerHeaderRight(navigation)
    })
  },
}
