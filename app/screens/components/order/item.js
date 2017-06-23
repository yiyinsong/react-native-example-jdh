import React,{ Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import commonStyles from '../../css/style'

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10
  },
  itemTitle: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5
  },
  orderSn: {
    flex: 2,
    fontSize: 12,
    color: '#999'
  },
  orderStatus: {
    flex: 1,
    fontSize: 12,
    textAlign: 'right',
    color: '#eb0000'
  },
  itemBody: {
    padding: 10,
    flexDirection: 'row'
  },
  imgWrapper: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  img: {
    width: 80,
    height: 80
  },
  info: {
    flex: 1
  },
  infoName: {
    fontSize: 14,
    marginBottom: 5
  },
  infoAttr: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5
  },
  infoData: {
    flexDirection: 'row'
  },
  infoPrice: {
    color: '#eb0000',
    flex: 1
  },
  infoNum: {
    flex: 1,
    textAlign: 'right'
  },
  itemFooter: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

export default class OrderItem extends Component {
    constructor(props){
    	super(props);
    }
    render() {
        return (
           <View style={styles.item}>
              <View style={styles.itemTitle}>
                <View style={styles.row}>
                  <Text style={styles.orderSn}>订单号：{this.props.data.orderSn}</Text>
                  <Text style={styles.orderStatus}>{this.props.data.status}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.orderSn}>订单时间：{this.props.data.orderTime}</Text>
                </View>
              </View>
              <TouchableHighlight>
                <View style={styles.itemBody}>
                  <View style={styles.imgWrapper}>
                    <Image style={styles.img} source={{uri: this.props.data.img}} />
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.infoName} numberOfLines={2}>{this.props.data.name}</Text>
                    <Text style={styles.infoAttr}>{this.props.data.attr}</Text>
                    <View style={styles.infoData}>
                      <Text style={styles.infoPrice}>￥{this.props.data.price}</Text>
                      <Text style={styles.infoNum}>数量：{this.props.data.num}</Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
              <View style={styles.itemFooter}>
                <TouchableHighlight>
                  <Text style={commonStyles.btn}>查看详情</Text>
                </TouchableHighlight>
                <TouchableHighlight>
                  <Text style={[commonStyles.btn, commonStyles.btnPrimary]}>付款</Text>
                </TouchableHighlight>
                <TouchableHighlight>
                  <Text style={[commonStyles.btn, commonStyles.btnDanger]}>确认收货</Text>
                </TouchableHighlight>
              </View>
           </View>
        );
    }
}
