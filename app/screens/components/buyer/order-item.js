import React,{ Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableHighlight,
    DeviceEventEmitter
} from 'react-native';

import styles from '../../../css/styles';

export default class OrderItem extends Component {
    constructor(props){
    	super(props);
      this.attr = this.props.props;
      this.navgoods = this.props.navgoods || false;
      this.refundExamine = this.props.refundExamine || false;
    }
    render() {
        let _data = this.props.data;
        return (
           <View style={styles.sorderItem.item}>
              <View style={styles.sorderItem.itemTitle}>
                <View style={styles.sorderItem.row}>
                  <View style={[styles.common.flexDirectionRow, styles.sorderItem.orderSn]}>
                    <View style={_data.orderType == 10 ? styles.orderItem.type : styles.orderItem.type2}>
                      <Text style={styles.orderItem.typeText}>{_data.orderType == 10 ? '自营' : '入驻商'}</Text>
                    </View>
                    <Text style={[styles.common.flex, styles.orderItem.shopName]} numberOfLines={1}>{_data.shopName}</Text>
                  </View>
                  <Text style={styles.sorderItem.orderStatus}>{_data.statusName}</Text>
                </View>
                <View style={styles.sorderItem.row}>
                  <Text style={[styles.sorderItem.orderInfo, styles.common.flex]}>订单编号：{_data.orderSn}</Text>
                  <Text style={styles.sorderItem.orderInfo}>{_data.ctime}</Text>
                </View>
              </View>
              {
                  _data.goods.map((v, k) => {
                  return (<TouchableHighlight underlayColor='#eee' style={styles.sorderItem.goods} onPress={() => {this._toDetail(_data.status == 10 ? (_data.mainOrderSn || _data.orderSn) : _data.orderSn, v)}}>
                    <View style={styles.sorderItem.itemBody}>
                      <View style={styles.sorderItem.imgWrapper}>
                        <Image style={styles.sorderItem.img} source={{uri: v.imgUrlSmall}} />
                      </View>
                      <View style={styles.sorderItem.info}>
                        <Text style={styles.sorderItem.infoName} numberOfLines={2}>{v.goodsName}</Text>
                        <Text style={styles.sorderItem.infoAttr}>{v.skuAttr}</Text>
                        <View style={[styles.common.flexEndv, styles.sorderItem.infoData]}>
                          <Text style={styles.orderItem.infoPrice}>￥{v.price}</Text>
                          <Text style={styles.orderItem.infoNum}>x{v.qty}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableHighlight>)
                })
              }
              <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.orderItem.footer]}>
                <Text style={styles.orderItem.account}>
                  共{_data.totalQty}件 合计:￥{_data.totalAmount}
                </Text>
                {this._renderBtn(_data)}
              </View>
           </View>
        );
    }
    _renderBtn = (_data) => {
      if(_data.status === 10) {
        return (
          <View style={[styles.common.flex, styles.common.flexEndh]}>
            <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container}>
              <Text style={styles.btn3.defaults}>取消订单</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='#fafafa'>
              <Text style={[styles.btn3.defaults, styles.btn3.danger]}>立即支付</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='#fafafa'>
              <Text style={[styles.btn3.defaults, styles.btn3.danger]}>POS支付</Text>
            </TouchableHighlight>
            {_data.supportWxPay ?
              <TouchableHighlight underlayColor='#fafafa'>
                <Text style={[styles.btn3.defaults, styles.btn3.green]}>微信支付</Text>
              </TouchableHighlight>
            : null}
          </View>
        );
      } else if(_data.isRefund === -1) {
        if(_data.status === 30) {
          return (
            <View style={[styles.common.flex, styles.common.flexEndh]}>
              <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container} onPress={() => this._toRefundDetail}>
                <Text style={[styles.btn3.defaults, styles.btn3.danger]}>确认收货</Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container} onPress={() => this._toRefundDetail}>
                <Text style={styles.btn3.defaults}>退货退款</Text>
              </TouchableHighlight>
            </View>
          );
        } else if(_data.status === 20 || _data.status === 31) {
          return (
            <View style={[styles.common.flex, styles.common.flexEndh]}>
              <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container} onPress={() => this._toRefundDetail}>
                <Text style={styles.btn3.defaults}>退货退款</Text>
              </TouchableHighlight>
            </View>
          );
        } else {
          return null;
        }
      } else if(_data.isRefund === 1) {
        if(_data.status === 20 || _data.status === 30 || _data.status === 31) {
          return (
            <View style={[styles.common.flex, styles.common.flexEndh]}>
              <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container}>
                <Text style={styles.btn3.defaults}>{_data.refundStatusName}</Text>
              </TouchableHighlight>
            </View>
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
    _toDetail = (sn, goodsInfo) => {
      if(this.navgoods) {

      } else {
        this.attr.navigation.navigate('SellerOrderDetail', {
          ordersn: sn,
          type: this.props.type
        });
      }
    }
    _posPay = (sn) => {
      this.props.posPay && this.props.posPay.call(null, sn);
    }
    _toRefundDetail = () => {

    }
}
