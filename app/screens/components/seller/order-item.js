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
        let _type = this.props.type;
        return (
           <View style={styles.sorderItem.item}>
              <View style={styles.sorderItem.itemTitle}>
                <View style={styles.sorderItem.row}>
                  <Text style={styles.sorderItem.orderSn}>订单号：{_data.orderSn}</Text>
                  <Text style={styles.sorderItem.orderStatus}>{_data.statusName}</Text>
                </View>
                <View style={styles.sorderItem.row}>
                  <Text style={[styles.sorderItem.orderInfo, styles.common.flex]}>订单时间：{_data.ctime}</Text>
                  <Text style={styles.sorderItem.orderInfo}>收货人：{_data.receiver}</Text>
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
                        <View style={[styles.common.flex, styles.common.flexCenterh]}>
                          <Text style={styles.sorderItem.infoPrice}>￥{v.price}</Text>
                          <Text style={styles.sorderItem.infoNum}>数量：{v.qty}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableHighlight>)
                })
              }
              <Text style={styles.sorderItem.totalText}>
                <Text>共计{_type == 1 && _data.status == 0 ? _data.jxOrder.totalQty : _data.totalQty}件商品 合计：￥</Text><Text style={styles.sorderItem.totalBig}>{_type == 1 && _data.status == 0 ? _data.jxOrder.totalGoodsAmount : _data.totalGoodsAmount}</Text>
              </Text>
              {this.refundExamine ?
              <Text style={styles.sorderItem.totalText}>
                <Text>运费：￥</Text><Text style={styles.sorderItem.totalBig}>{_type == 1 && _data.status == 0 ? _data.jxOrder.predictFreight : _data.predictFreight}</Text>
              </Text>
              :null}
              {this._renderAdjustPrice(_type, _data)}
              {(this.navgoods || this.refundExamine) ? <View><Text style={styles.sorderItem.totalCount}>总计：￥<Text style={styles.sorderItem.totalBig}>{_type == 1 && _data.status == 0 ? _data.jxOrder.totalAmount : _data.totalAmount}</Text></Text></View> : null}
              {this._renderFooter(_data, _type)}
           </View>
        );
    }
    _renderFooter = (_data, _type) => {
      if(_data.operationAllowed && _type == 0 && _data.status == 20) {
        return (<View style={styles.sorderItem.itemFooter}>
            <TouchableHighlight underlayColor="#f5f5f5" onPress={() => this._deliver(_data.orderSn, _data.id)} style={styles.btn.container}>
              <Text style={styles.btn.primary}>发货</Text>
            </TouchableHighlight>
            {_data.isRefund == -1 ?
            <TouchableHighlight underlayColor="#f5f5f5" style={styles.btn.container} onPress={() => this._refuseDeliver(_data.id)}>
              <Text style={styles.btn.primary}>不发货</Text>
            </TouchableHighlight>
            : null}
          </View>)
        } else if(_data.operationAllowed && _type == 1 && _data.status == 10) {
            return(<View style={styles.sorderItem.itemFooter}>
                <TouchableHighlight underlayColor="#f5f5f5" style={styles.btn.container}>
                  <Text style={styles.btn.danger}>立即采购</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#f5f5f5" style={styles.btn.container} onPress={() => this._posPay(_data.orderSn)}>
                  <Text style={styles.btn.danger}>POS支付</Text>
                </TouchableHighlight>
              </View>)
        }
        else if(_data.operationAllowed && _type == 0 && _data.status == 10 &&  _data.payType == 1 && _data.offlinePayStatus == 10) {
          return (
            <View style={styles.sorderItem.itemFooter}>
              <TouchableHighlight underlayColor="#f5f5f5" style={styles.btn.container} onPress={() => {this._confirmReceipt(_data.id)}}>
                <Text style={styles.btn.danger}>确认收款</Text>
              </TouchableHighlight>
            </View>
          )
        } else if(this.navgoods && _data.operationAllowed && ( ( _type == 0 && _data.status == 10) || ( _type == 1 && _data.status == 0))) {
          return (
            <View style={styles.sorderItem.itemFooter}>
            {_data.payType == 0 ?
            <TouchableHighlight underlayColor="#f5f5f5" style={styles.btn.container} onPress={() => this._modifyPrice(_type == 0 ? _data.orderSn : _data.jxOrder.orderSn)}>
              <Text style={styles.btn.danger}>修改价格</Text>
            </TouchableHighlight>
            : null}
          </View>)
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
    _renderAdjustPrice = (_type, _data) => {
      if(this.navgoods && _type == 1 && _data.status == 0 && _data.jxOrder.adjustmentAmount) {
        return(
          <View>
            <Text style={styles.sorderItem.totalText}>
              <Text>调整金额：￥</Text>
              <Text style={styles.sorderItem.totalBig}>
                {_data.jxOrder.adjustmentAmount}
              </Text>
            </Text>
        </View>
        )
      } else if (this.navgoods && _data.adjustmentAmount) {
        return (
          <View>
              <Text style={styles.sorderItem.totalText}>
                <Text>调整金额：￥</Text>
                <Text style={styles.sorderItem.totalBig}>
                  {_data.adjustmentAmount}
                </Text>
              </Text>
          </View>
        )
      } else {
        return null;
      }
    }
    _deliver = (sn, id) => {
      this.attr.navigation.navigate('SellerOrderDeliver', {
        ordersn: sn,
        orderid: id,
        type: this.props.type,
        fromdetail: this.navgoods ? 1 : 0
      });
    }
    _refuseDeliver = (id) => {
      this.props.refuseDeliver && this.props.refuseDeliver.call(null, id);
    }
    _posPay = (sn) => {
      this.props.posPay && this.props.posPay.call(null, sn);
    }
    _modifyPrice = (sn) => {
      DeviceEventEmitter.emit('promptShow', {keys: 0, params: {sn}});
    }
    _confirmReceipt = (id) => {
      this.props.confirmReceipt && this.props.confirmReceipt.call(null, id);
    }
}
