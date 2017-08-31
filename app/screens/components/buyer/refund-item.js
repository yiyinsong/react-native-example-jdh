import React,{ Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import styles from '../../../css/styles';

export default class RefundItem extends Component {
    constructor(props){
    	super(props);
      this.attr = this.props.props;
    }
    render() {
        let _data = this.props.data;
        return (
           <View style={styles.sorderItem.item}>
              <View style={styles.sorderItem.itemTitle}>
                <View style={styles.sorderItem.row}>
                  <View style={_data.orderType == 10 ? styles.orderItem.type : styles.orderItem.type2}>
                    <Text style={styles.orderItem.typeText}>{_data.orderType == 10 ? '自营' : '入驻商'}</Text>
                  </View>
                  <Text style={styles.sorderItem.orderSn} numberOfLines={1}>{_data.order && _data.order.shopName}</Text>
                  <Text style={styles.sorderItem.orderStatus}>{_data.statusName}</Text>
                </View>
                <View style={styles.sorderItem.row}>
                  <Text style={[styles.sorderItem.orderInfo, styles.common.flex]}>退款单号：{_data.orderRefundSn}</Text>
                  <Text style={styles.sorderItem.orderInfo}>{_data.ctime}</Text>
                </View>
                <View style={styles.sorderItem.row}>
                  <Text style={[styles.sorderItem.orderInfo, styles.common.flex]}>订单编号：{_data.order && _data.order.orderSn}</Text>
                </View>
              </View>
              {
                  _data.goods.map((v, k) => {
                  return (<TouchableHighlight underlayColor='#eee' style={styles.sorderItem.goods} onPress={() => this._toRefundDetail(_data)}>
                    <View style={styles.sorderItem.itemBody}>
                      <View style={styles.sorderItem.imgWrapper}>
                        <Image style={styles.sorderItem.img} source={{uri: v.imgUrlSmall}} />
                      </View>
                      <View style={styles.sorderItem.info}>
                        <Text style={styles.sorderItem.infoName} numberOfLines={2}>{v.goodsName}</Text>
                        <Text style={styles.sorderItem.infoAttr}>{v.skuAttr}</Text>
                        <View style={styles.sorderItem.infoData}>
                          <Text style={styles.sorderItem.infoPrice}>￥{v.price}</Text>
                          <Text style={styles.sorderItem.infoNum}>数量：{v.qty}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableHighlight>)
                })
              }
              <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.orderItem.footer]}>
                <View style={styles.common.flex}>
                  <Text style={styles.refundItem.totalText}>订单金额：<Text style={styles.refundItem.totalTextActive}>￥{_data.order && _data.order.totalAmount}</Text></Text>
                  <Text style={styles.refundItem.totalText}>退款金额：<Text style={styles.refundItem.totalTextActive}>￥{_data.refundAmount}</Text></Text>
                </View>
                <View>
                  {_data.status == 20 ?
                  <TouchableHighlight underlayColor="#fafafa" onPress={this._toFillLogi}>
                    <Text style={[styles.btn3.defaults, styles.btn3.danger]}>填写物流</Text>
                  </TouchableHighlight>
                  : null}
                </View>
              </View>
           </View>
        );
    }
    _toRefundDetail = (item) => {
      this.attr.navigation.navigate('SellerRefundDetail', {
        id: item.id,
        shopid: item.shopId,
        ordersn: this.props.type == 1 ? (item.order.relationOrderSn || item.order.orderSn) : (item.order.mainOrderSn || item.order.orderSn)
      });
    }
    _toExamine = (item) => {
      this.attr.navigation.navigate('SellerRefundExamine', {
        id: item.id,
        shopid: item.shopId,
        ordersn: this.props.type == 1 ? (item.order.relationOrderSn || item.order.orderSn) : (item.order.mainOrderSn || item.order.orderSn),
        type: this.props.type,
        refundtype: item.type,
        fromdetail: false,
      });
    }
    _toFillLogi = () => {

    }
}
