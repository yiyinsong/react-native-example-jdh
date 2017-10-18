/**
 * Component: 小店首页
 * author: yiyinSong
 * date: 2017-10-16
 */
import React, { Component } from 'react';
import {
  Text,
  Image,
  ImageBackground,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
  } from 'react-native';

  import Config from '../../../config/config';
  import Utils from '../../../js/utils';
  import Loading from '../../common/ui-loading';
  import styles from '../../../css/styles';

  export default class StoreScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {
            messageNum: 0,
            storeInfo: {},
            totalInfo: 0,
            itemInfo: {
                waitingPay : 0,
                waitingPurchase : 0,
                waitingDeliver : 0
            }
        };
    }
    render() {
      return(
        <ScrollView showsVerticalScrollIndicator={false} style={styles.common.init}>
            <ImageBackground style={{width: Utils.width, height: Utils.width / 1.74}} source={require('../../../images/store-bg.png')} resizeMode='cover'>
                <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.store.top]}>
                    <TouchableOpacity activeOpacity={.8} style={styles.common.flexDirectionRow} onPress={this._toStorePreview}>
                        <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv]}>
                            <Image source={require('../../../images/store-icon-store.png')} style={styles.store.iconStore}/>
                            <Text style={styles.store.storeText}>店铺</Text>
                        </View>
                    </TouchableOpacity> 
                    <View style={styles.common.flex}>
                        <Text numberOfLines={1} style={[styles.common.flex, styles.store.storeName]}>{this.state.storeInfo.shop_name}</Text>
                    </View>
                    <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv]}>
                        <TouchableOpacity activeOpacity={.8}>
                            <Image source={require('../../../images/store-icon-share.png')} style={styles.store.iconShare}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.8} style={styles.store.messageWrapper}>
                            <Image source={require('../../../images/store-icon-message.png')} style={styles.store.iconMessage}></Image>
                            <Text style={styles.store.message}>{this.state.messageNum > 9 ? '9+' : this.state.messageNum}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.store.today}>
                    <Text style={styles.store.todayNum}>{this.state.totalInfo}</Text>
                    <Text style={styles.store.todayText}>今日销售总额(元)</Text>
                </View>
                <View style={[{width: Utils.width, height: Utils.width/6.67}, styles.common.flexDirectionRow, styles.store.dataWrapper]} resizeMode="contain">
                    <TouchableOpacity activeOpacity={.8} style={[styles.common.flexv, styles.common.flexCenterh]} onPress={() => this._toSellerOrder(1, 2)}>
                        <Text style={styles.store.dataNum}>{this.state.itemInfo.waitingPurchase}</Text>
                        <Text style={styles.store.dataText}>待采购订单</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8} style={[styles.common.flexv, styles.common.flexCenterh]} onPress={() => this._toSellerOrder(0, 3)}>
                        <Text style={styles.store.dataNum}>{this.state.itemInfo.waitingDeliver}</Text>
                        <Text style={styles.store.dataText}>待发货订单</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8} style={[styles.common.flexv, styles.common.flexCenterh]} onPress={() => this._toSellerOrder(0, 1)}>
                        <Text style={styles.store.dataNum}>{this.state.itemInfo.waitingPay}</Text>
                        <Text style={styles.store.dataText}>待付款订单</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={[styles.common.flexDirectionRow, styles.store.grid]}>
                <TouchableHighlight underlayColor="#f5f5f5" style={[styles.store.gridItem, {width: Utils.width * .33, borderRightWidth: 1, borderRightColor: '#f1f1f1'}]} onPress={this._toStoreInfo}>
                    <View style={[styles.common.flexv, styles.common.flexCenterh, styles.common.flexCenterv]}>
                        <Image source={require('../../../images/store-icon1.png')} style={styles.store.icon}/>
                        <Text style={styles.store.iconText}>店铺管理</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#f5f5f5" style={[styles.store.gridItem, {width: Utils.width * .33, borderRightWidth: 1, borderRightColor: '#f1f1f1'}]} onPress={this._toSellerGoods}>
                    <View style={[styles.common.flexv, styles.common.flexCenterh, styles.common.flexCenterv]}>
                        <Image source={require('../../../images/store-icon2.png')} style={styles.store.icon}/>
                        <Text style={styles.store.iconText}>商品管理</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#f5f5f5" style={[styles.store.gridItem, {width: Utils.width * .34}]} onPress={this._toBuyerOrder}>
                    <View style={[styles.common.flexv, styles.common.flexCenterh, styles.common.flexCenterv]}>
                        <Image source={require('../../../images/store-icon4.png')} style={styles.store.icon}/>
                        <Text style={styles.store.iconText}>采购订单</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#f5f5f5" style={[styles.store.gridItem, {width: Utils.width * .33, borderRightWidth: 1, borderRightColor: '#f1f1f1'}]} onPress={() => this._toSellerOrder(0, 0)}>
                    <View style={[styles.common.flexv, styles.common.flexCenterh, styles.common.flexCenterv]}>
                        <Image source={require('../../../images/store-icon5.png')} style={styles.store.icon}/>
                        <Text style={styles.store.iconText}>销售订单</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#f5f5f5" style={[styles.store.gridItem, {width: Utils.width * .33, borderRightWidth: 1, borderRightColor: '#f1f1f1'}]}>
                    <View style={[styles.common.flexv, styles.common.flexCenterh, styles.common.flexCenterv]}>
                        <Image source={require('../../../images/store-icon3.png')} style={styles.store.icon}/>
                        <Text style={styles.store.iconText}>店铺推广</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#f5f5f5" style={[styles.store.gridItem, {width: Utils.width * .34}]} onPress={this._toStoreData}>
                    <View style={[styles.common.flexv, styles.common.flexCenterh, styles.common.flexCenterv]}>
                        <Image source={require('../../../images/store-icon6.png')} style={styles.store.icon}/>
                        <Text style={styles.store.iconText}>数据统计</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <TouchableHighlight underlayColor="#f1f1f1" style={styles.store.add}>
                <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.common.flexCenterh]}>
                    <Image source={require('../../../images/store-icon-add.png')} style={styles.store.addIcon}/>
                    <Text style={styles.store.addText}>快速添加商品</Text>
                </View>
            </TouchableHighlight>
            <Loading visible={this.state.loadingVisible}></Loading>
        </ScrollView>
      );
    }
    componentDidMount() {
        this.setState({loadingVisible: true});
        this._init();
    }
    _init = () => {
        fetch(Config.PHPAPI + 'api/mapp/shop/shop?type=seller&token=' + token, {
             method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.error_code == 0) {
                this.setState({loadingVisible: false, storeInfo: data.data});
            }
        });
        //获取未读消息
        fetch(Config.PHPAPI + 'api/mapp/letter/unread-num?token=' + token, {
             method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.error_code == 0) {
                if(typeof data.data == 'string') {
                this.setState({messageNum: data.data});
                }
            }
        })
        .catch((error) => {
        });
        //总数据
        fetch(Config.JAVAAPI + `shop/wap/client/order/daysData?token=${token}`, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((r) => {
            if(r.code === 1) {
                this.setState({totalInfo: r.obj.todayTotalAmount});
            }
        });
        //3个统计数据
        fetch(Config.JAVAAPI + `shop/wap/client/order/shopOrderStatusSummary?token=${token}&all=1`, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((r) => {
            if(r.code === 1) {
                this.setState({itemInfo: r.obj});
            }
        });

    }
    _toStorePreview = () => {
        this.props.navigation.navigate('StorePreview', {shopid: this.state.storeInfo.shop_id});
    }
    _toStoreInfo = () => {
        this.props.navigation.navigate('SellerUserInfo');
    }
    _toSellerGoods = () => {
        this.props.navigation.navigate('SellerGoods', {type: 0});
    }
    _toBuyerOrder = () => {
        this.props.navigation.navigate('BuyerOrder', {index: 0});
    }
    _toSellerOrder = (t, i) => {
        this.props.navigation.navigate('SellerOrder', {type: t, index: i});
    }
    _toStoreData = () => {
        this.props.navigation.navigate('SellerStoreInfo');
    }
  }
