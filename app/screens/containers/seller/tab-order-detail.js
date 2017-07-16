import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  InteractionManager
} from 'react-native';

import styles from '../../../css/styles';
import OrderItem from '../../components/seller/tab-order-item';
import Loading from '../../common/ui-loading';
import UIToast from '../../common/ui-toast';
import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';

export default class OrderDetailScreen extends Component{
  constructor(props){
  	super(props);
    let _query = this.props.navigation.state.params;
  	this.state = {
      loadingVisible: false,
      data: {
        goods: []
      },
      ordersn: _query.ordersn,
      type: _query.type
    };
  }
  componentWillMount() {
    this.setState({loadingVisible: true});
    InteractionManager.runAfterInteractions(() => {
      ScreenInit.checkLogin(this);
      this._init();
    })
  }
  render() {
    return (
      <ScrollView style={styles.sorderDetail.content}>
        <OrderItem data={this.state.data} type={this.state.type} props={this.props} navgoods={true}></OrderItem>
        <View style={styles.sorderDetail.log}>
          <View style={styles.common.flexDirectionRow}>
            <View style={styles.sorderDetail.logLeft}>
              <View style={styles.sorderDetail.logLine}></View>
              <View style={styles.sorderDetail.logCircle}></View>
              <View style={styles.sorderDetail.logLine}></View>
            </View>
            <View style={styles.common.flex}></View>
          </View>
        </View>
        <Loading visible={this.state.loadingVisible}></Loading>
      </ScrollView>
    );
  }
  _init = () => {
    fetch(Config.JAVAAPI + `shop/wap/client/order/detail?orderSn=${this.state.ordersn}&token=${token}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then((data) => {
        this.setState({loadingVisible: false});
        if (data.code == 1) {
            this.setState({data: data.obj});
        } else {
          UIToast(data.message || '加载数据失败');
        }
    });
  }
}
