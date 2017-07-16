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
      this.navgoods = this.props.navgoods || false;
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
                  return (<TouchableHighlight underlayColor='#eee' style={styles.sorderItem.goods} onPress={() => {this._toDetail(_data.orderSn, v)}}>
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
              <Text style={styles.sorderItem.totalText}>
                <Text>共计{_type == 1 && _data.status == 0 ? _data.jxOrder.totalQty : _data.totalQty}件商品 合计：￥</Text><Text style={styles.sorderItem.totalBig}>{_type == 1 && _data.status == 0 ? _data.jxOrder.totalQty : _data.totalGoodsAmount}</Text>
              </Text>
              {this.navgoods ? <View><Text style={styles.sorderItem.totalCount}>总计：￥<Text style={styles.sorderItem.totalBig}>{_type == 1 && _data.status == 0 ? _data.jxOrder.totalAmount : _data.totalAmount}</Text></Text></View> : null}
              {this._renderFooter(_data, _type)}
           </View>
        );
    }
    _renderFooter = (_data, _type) => {
      if(_data.operationAllowed && _type == 0 && _data.status == 20) {
        return (<View style={styles.sorderItem.itemFooter}>
            <TouchableHighlight>
              <Text style={styles.btn.primary}>发货</Text>
            </TouchableHighlight>
            <TouchableHighlight>
              <Text style={styles.btn.primary}>不发货</Text>
            </TouchableHighlight>
          </View>)
        } else if(_data.operationAllowed && _type == 1 && _data.status == 10) {
            return(<View style={styles.sorderItem.itemFooter}>
                <TouchableHighlight>
                  <Text style={styles.btn.danger}>立即采购</Text>
                </TouchableHighlight>
                <TouchableHighlight>
                  <Text style={styles.btn.danger}>POS支付</Text>
                </TouchableHighlight>
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
}
