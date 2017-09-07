import React,{ Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
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
      this.index = this.props.index || 0;
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
                  {!this.navgoods ? <Text style={styles.sorderItem.orderStatus}>{_data.statusName}</Text> : null}
                </View>
                {!this.navgoods ?
                <View style={styles.sorderItem.row}>
                  <Text style={[styles.sorderItem.orderInfo, styles.common.flex]}>订单编号：{_data.orderSn}</Text>
                  <Text style={styles.sorderItem.orderInfo}>{_data.ctime}</Text>
                </View>
                : null}
              </View>
              {
                  _data.goods.map((v, k) => {
                  return (<TouchableHighlight underlayColor='#eee' style={styles.sorderItem.goods} onPress={() => {this._toDetail(_data.orderSn, v)}}>
                    <View style={styles.sorderItem.itemBody}>
                      <View style={styles.sorderItem.imgWrapper}>
                        <Image style={styles.sorderItem.img} source={{uri: v.imgUrlSmall}} />
                      </View>
                      <View style={styles.sorderItem.info}>
                        <View style={styles.common.flexDirectionRow}>
                          <View style={styles.common.flexv}>
                            <Text style={styles.sorderItem.infoName} numberOfLines={2}>{v.goodsName}</Text>
                            <Text style={styles.sorderItem.infoAttr}>{v.skuAttr}</Text>
                          </View>
                          <View style={styles.common.flexEndv}>
                            <Text style={styles.orderItem.infoPrice}>￥{v.price}</Text>
                            <Text style={styles.orderItem.infoNum}>x{v.qty}</Text>
                          </View>
                        </View>
                        {v.refundGoods ?
                        <View style={styles.common.flexDirectionRow}>
                          {
                            v.refundGoods.ingCount > 0 ?
                            <TouchableOpacity activeOpacity={.8} onPress={() => this._openRefundStatusList('退款中', v.refundGoods.ingRefunds)}>
                              <Text style={styles.orderItem.refundStatus}>退款中 x{v.refundGoods.ingCount}</Text>
                            </TouchableOpacity>
                            : null
                          }
                          {
                            v.refundGoods.successCount > 0 ?
                            <TouchableOpacity activeOpacity={.8} onPress={() => this._openRefundStatusList('退款成功', v.refundGoods.successRefunds)}>
                              <Text style={styles.orderItem.refundStatus}>退款成功 x{v.refundGoods.successCount}</Text>
                            </TouchableOpacity>
                            : null
                          }
                        </View>
                        : null}
                      </View>
                    </View>
                  </TouchableHighlight>)
                })
              }
              {!this.navgoods ?
              <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.orderItem.footer]}>
                <Text style={styles.orderItem.account}>
                  共{_data.totalQty}件 合计:￥{_data.totalAmount}
                </Text>
                {this._renderBtn(_data)}
              </View>
              : null}
           </View>
        );
    }
    _renderBtn = (_data) => {
      if(_data.status === 10) {
        return (
          <View style={[styles.common.flex, styles.common.flexEndh]}>
            <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container} onPress={this._cancel}>
              <Text style={styles.btn3.defaults}>取消订单</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container} onPress={ () => this._toPayPage(_data.orderSn) }>
              <Text style={[styles.btn3.defaults, styles.btn3.danger]}>去支付</Text>
            </TouchableHighlight>
          </View>
        );
      } else if(_data.isRefund === -1) {
        if(_data.status === 30) {
          return (
            <View style={[styles.common.flex, styles.common.flexEndh]}>
              <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container} onPress={() => this._confirmReceiptGoods}>
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
      } else {
        return null;
      }
    }
    _toDetail = (sn, goodsInfo) => {
      if(this.navgoods) {

      } else {
        this.attr.navigation.navigate('BuyerOrderDetail', {
          ordersn: sn
        });
      }
    }
    _toPayPage = (sn) => {
      this.attr.navigation.navigate('Pay', {
        ordersn: sn
      });
    }
    _cancel = () => {
      this.props.cancel && this.props.cancel();
    }
    _confirmReceiptGoods = () => {
      this.props.confirmReceiptGoods && this.props.confirmReceiptGoods();
    }
    _toRefundDetail = () => {

    }
    _openRefundStatusList = (title, list) => {
      DeviceEventEmitter.emit('orderRefundStatusShow', {title, list, index: this.index});
    }
}
