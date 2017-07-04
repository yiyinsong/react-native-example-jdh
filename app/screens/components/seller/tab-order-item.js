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
    }
    render() {
        let _data = this.props.data;
        // {_data.operationAllowed && _data.status == 20 && }
        return (
           <View style={styles.sorderItem.item}>
              <View style={styles.sorderItem.itemTitle}>
                <View style={styles.sorderItem.row}>
                  <Text style={styles.sorderItem.orderSn}>订单号：{_data.orderSn}</Text>
                  <Text style={styles.sorderItem.orderStatus}>{_data.statusName}</Text>
                </View>
                <View style={styles.sorderItem.row}>
                  <Text style={[styles.sorderItem.orderInfo, styles.common.flex]}>订单时间：{_data.ctime}</Text>
                  <Text style={styles.sorderItem.orderInfo}>采购会员：{_data.receiver}</Text>
                </View>
              </View>
              {
                  _data.goods.map((v, k) => {
                  return (<TouchableHighlight style={styles.sorderItem.goods}>
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
                <Text>共计{_data.totalQty}件商品 合计：￥</Text><Text style={styles.sorderItem.totalBig}>{_data.totalAmount}</Text>
              </Text>
              <View style={styles.sorderItem.itemFooter}>

                <TouchableHighlight>
                  <Text style={styles.btn.primary}>发货</Text>
                </TouchableHighlight>
                <TouchableHighlight>
                  <Text style={styles.btn.danger}>立即采购</Text>
                </TouchableHighlight>
              </View>
           </View>
        );
    }
}
