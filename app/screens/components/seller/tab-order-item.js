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
        return (
           <View style={styles.sorderItem.item}>
              <View style={styles.sorderItem.itemTitle}>
                <View style={styles.sorderItem.row}>
                  <Text style={styles.sorderItem.orderSn}>订单号：{this.props.data.orderSn}</Text>
                  <Text style={styles.sorderItem.orderStatus}>{this.props.data.status}</Text>
                </View>
                <View style={styles.sorderItem.row}>
                  <Text style={styles.sorderItem.orderSn}>订单时间：{this.props.data.orderTime}</Text>
                </View>
              </View>
              <TouchableHighlight>
                <View style={styles.sorderItem.itemBody}>
                  <View style={styles.sorderItem.imgWrapper}>
                    <Image style={styles.sorderItem.img} source={{uri: this.props.data.img}} />
                  </View>
                  <View style={styles.sorderItem.info}>
                    <Text style={styles.sorderItem.infoName} numberOfLines={2}>{this.props.data.name}</Text>
                    <Text style={styles.sorderItem.infoAttr}>{this.props.data.attr}</Text>
                    <View style={styles.sorderItem.infoData}>
                      <Text style={styles.sorderItem.infoPrice}>￥{this.props.data.price}</Text>
                      <Text style={styles.sorderItem.infoNum}>数量：{this.props.data.num}</Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
              <View style={styles.sorderItem.itemFooter}>
                <TouchableHighlight>
                  <Text>查看详情</Text>
                </TouchableHighlight>
                <TouchableHighlight>
                  <Text>付款</Text>
                </TouchableHighlight>
                <TouchableHighlight>
                  <Text>确认收货</Text>
                </TouchableHighlight>
              </View>
           </View>
        );
    }
}
