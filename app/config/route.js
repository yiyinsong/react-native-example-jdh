import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';

import HomeScreen from '../screens/index';
import LoginScreen from '../screens/login';
import FindPasswordScreen from '../screens/findPassword';

import SellerGoodsScreen from '../screens/containers/seller/goods';
import SellerOrderScreen from '../screens/containers/seller/order';
import SellerStoreInfoScreen from '../screens/containers/seller/home-store-info';
import SellerUserInfoScreen from '../screens/containers/seller/home-user-info';
import SellerAddrListScreen from '../screens/containers/seller/home-address-list';
import SellerAddrAddScreen from '../screens/containers/seller/home-address-add';

import SellerOrderSearchScreen from '../screens/containers/seller/order-search';
import SellerOrderDetailScreen from '../screens/containers/seller/order-detail';
import SellerOrderDeliverScreen from '../screens/containers/seller/order-deliver';
import SellerRefundDetailScreen from '../screens/containers/seller/order-refund-detail';
import SellerRefundExamineScreen from '../screens/containers/seller/order-refund-examine';
import SellerRefundRefuseScreen from '../screens/containers/seller/order-refund-refuse';

import SellerGoodsDetailScreen from '../screens/containers/seller/goods-detail';
import SellerGoodsEditScreen from '../screens/containers/seller/goods-edit';
import SellerQuickBuildGoodsScreen from '../screens/containers/seller/quick-build-goods';
import SellerQuickBuildGoodsCategoryScreen from '../screens/containers/seller/quick-build-goods-category';
import SellerQuickBuildGoodsBrandScreen from '../screens/containers/seller/quick-build-goods-brand';
import SellerStorePreviewScreen from '../screens/components/seller/store-preview';
import SellerStoreManaScreen from '../screens/containers/seller/store-mana';
import SellerCustomerScreen from '../screens/containers/seller/customer';

import BuyerScreen from '../screens/containers/buyer/index';
import BuyerSearchScreen from '../screens/containers/buyer/search';
import BuyerSignScreen from '../screens/containers/buyer/sign';
import BuyerCategoryScreen from '../screens/containers/buyer/category';
import BuyerOrderScreen from '../screens/containers/buyer/order';
import BuyerOrderDetailScreen from '../screens/containers/buyer/order-detail';
import BuyerRefundDetailScreen from '../screens/containers/buyer/order-refund-detail';
import BuyerPayScreen from '../screens/containers/buyer/pay';
import BuyerAttentionScreen from '../screens/containers/buyer/attention';
import BuyerNewsDetailScreen from '../screens/containers/buyer/news-detail';
import BuyerRefundApplyScreen from '../screens/containers/buyer/refund-apply';


import styles from '../css/styles';

const renderBuyerHeaderRight = (navigation) => {
  if (navigation.state.index == 2) {
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
  SellerGoods: {
    screen: SellerGoodsScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      title: '商品管理',
      headerStyle: styles.common.blueHeader,
      headerTitleStyle: styles.common.blueHeaderTitle,
      headerLeft: (<TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../images/icon-back-w.png')} style={styles.common.iconBackArrow} />
        </TouchableOpacity>),
    })
  },
  SellerOrder: {
    screen: SellerOrderScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      title: '订单管理',
      headerStyle: styles.common.blueHeader,
      headerTitleStyle: styles.common.blueHeaderTitle,
      headerLeft: (<TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../images/icon-back-w.png')} style={styles.common.iconBackArrow} />
        </TouchableOpacity>),
      headerRight: (<TouchableOpacity activeOpacity={.8} onPress={() => { navigation.navigate('SellerOrderSearch', {type: navigation.state.params.type}) }} style={styles.common.headerBtnRight}>
         <Image source={require('../images/icon-search-w.png')} style={styles.common.headerBtnRight}/>
     </TouchableOpacity>)
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
  //卖家添加商品
  SellerBuildGoods: {
    screen: SellerQuickBuildGoodsScreen,
    navigationOptions: {
      title: '新建商品'
    }
  },
  //卖家添加商品选择分类
  SellerBuildGoodsCategory: {
    screen: SellerQuickBuildGoodsCategoryScreen,
    navigationOptions: {
      title: '选择分类'
    }
  },
  //卖家添加商品选择品牌
  SellerBuildGoodsBrand: {
    screen: SellerQuickBuildGoodsBrandScreen,
    navigationOptions: {
      title: '选择品牌'
    }
  },
  //我的顾客
  SellerCustomer: {
    screen: SellerCustomerScreen,
    navigationOptions: {
      title: '我的顾客'
    }
  },
  //店铺
  StorePreview: {
    screen: SellerStorePreviewScreen,
    navigationOptions: {
      header: null
    }
  },
  //店铺管理
  StoreMana: {
    screen: SellerStoreManaScreen,
    navigationOptions: {
      title: '店铺管理'
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
      headerLeft: (navigation.state.index == 2 ? <TouchableOpacity style={styles.common.iconBackArrow}></TouchableOpacity> : null),
      headerRight: renderBuyerHeaderRight(navigation)
    })
  },
  //买家商品搜索
  BuyerSearch: {
    screen: BuyerSearchScreen,
    navigationOptions: {
      header: null
    }
  },
  //买家签到
  BuyerSign: {
    screen: BuyerSignScreen,
    navigationOptions: {
      header: null
    }
  },
  //买家分类
  BuyerCategory: {
    screen: BuyerCategoryScreen,
    navigationOptions: {
      header: null
    }
  },
  //买家订单
  BuyerOrder: {
    screen: BuyerOrderScreen,
    navigationOptions: {
      title: '采购订单'
    }
  },
  //买家订单详情
  BuyerOrderDetail: {
    screen: BuyerOrderDetailScreen,
    navigationOptions: {
      title: '订单详情'
    }
  },
  //买家申请退款
  BuyerRefundApply: {
    screen: BuyerRefundApplyScreen,
    navigationOptions: {
      title: '退货退款'
    }
  },
  //买家退款详情
  BuyerRefundDetail: {
    screen: BuyerRefundDetailScreen,
  },
  //支付选择界面
  Pay: {
    screen: BuyerPayScreen,
    navigationOptions: {
      title: '支付订单'
    }
  },
  //关注中心
  Attention: {
    screen: BuyerAttentionScreen,
    navigationOptions: {
      title: '关注中心'
    }
  },
  //查看更多动态
  NewsDetail: {
    screen: BuyerNewsDetailScreen,
    navigationOptions: {
      title: '动态详情'
    }
  },
}
