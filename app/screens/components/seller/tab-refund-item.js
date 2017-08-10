import React,{ Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import styles from '../../../css/styles';

export default class OrderItem extends Component {
    constructor(props){
    	super(props);
      this.attr = this.props.props;
    }
    render() {
        let _data = this.props.data;
        let _type = this.props.type;
        return (
           <View style={styles.sorderItem.item}>
              <View style={styles.sorderItem.itemTitle}>
                <View style={styles.sorderItem.row}>
                  <Text style={styles.sorderItem.orderSn}>退款单号：{_data.orderRefundSn}</Text>
                  <Text style={styles.sorderItem.orderStatus}>{_data.statusName}</Text>
                </View>
                <View style={styles.sorderItem.row}>
                  <Text style={[styles.sorderItem.orderInfo, styles.common.flex]}>订单号：{_type == 1 ? (_data.order &&  (_data.order.relationOrderSn || _data.order.orderSn)) : (_data.order && _data.order.orderSn)}</Text>
                  <Text style={styles.sorderItem.orderInfo}>收货人：{_data.order && _data.order.receiver}</Text>
                </View>
                <View style={styles.sorderItem.row}>
                  <Text style={[styles.sorderItem.orderInfo, styles.common.flex]}>申请时间：{_data.ctime}</Text>
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
              <View>
                <Text style={styles.sorderItem.refundCountText}>
                  <Text>订单金额：</Text>
                  <Text style={styles.sorderItem.refundCountSmall}>￥</Text>
                  <Text style={styles.sorderItem.refundCountBig}>{_data.order && _data.order.totalAmount}</Text>
                </Text>
              </View>
              <View style={styles.sorderItem.refundCount}>
                <Text style={styles.sorderItem.refundCountText}>
                  <Text>申请退款：</Text>
                  <Text style={styles.sorderItem.refundCountSmall}>￥</Text>
                  <Text style={styles.sorderItem.refundCountBig}>{_data.refundAmount}</Text>
                </Text>
              </View>
              {this._renderFooter(_data, _type)}
           </View>
        );
    }
    _renderFooter = (_data, _type) => {
      if(_data.isNow == 1) {
        if(_data.status == 10) {
          return (<View style={styles.sorderItem.itemFooter}>
            <TouchableHighlight underlayColor="#f5f5f5" onPress={() => this._toExamine(_data)} style={styles.btn.container}>
            <Text style={styles.btn.primary}>审核</Text>
            </TouchableHighlight>
            </View>)
        } else if(_data.status == 30) {
            return(<View style={styles.sorderItem.itemFooter}>
                <TouchableHighlight underlayColor="#f5f5f5" style={styles.btn.container} onPress={() => this._toRefundDetail(_data)}>
                  <Text style={styles.btn.danger}>处理退款</Text>
                </TouchableHighlight>
              </View>)
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
    _toRefundDetail = (item) => {
      this.attr.navigation.navigate('SellerRefundDetail', {
        id: item.id,
        shopid: item.shopId,
        ordersn: this.props.type == 1 ? (item.order.relationOrderSn || item.order.orderSn) : (item.order.mainOrderSn || item.order.orderSn),
        orderid: item.orderId
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
        orderid: item.orderId
      });
    }
}
