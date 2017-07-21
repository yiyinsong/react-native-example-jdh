import React, { Component } from 'react';
import {
  View,
  Text,
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
        bodyShow: false,
        goods: [],
        actions: []
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
    let _data = this.state.data;
    return (
      <View style={[styles.common.flexv, styles.common.init]}>
        {this.state.bodyShow ?
        <ScrollView>
          <OrderItem data={_data} type={this.state.type} props={this.props} navgoods={true}></OrderItem>
          <View style={styles.sorderDetail.log}>
          {_data.actions.map((v, k) => {
            return (
              <View style={styles.sorderDetail.logItem}>
                <View style={styles.sorderDetail.logLeft}>
                  <View style={[styles.common.flex, styles.sorderDetail.logLine, k == 0  ? styles.sorderDetail.logLineActive : '']}></View>
                  <View style={[styles.sorderDetail.logCircle, k == 0 ? styles.sorderDetail.logCircleActive : '']}></View>
                </View>
                <View style={[styles.sorderDetail.logRight, k == 0 ? styles.sorderDetail.logRightActive : '']}>
                  <Text style={[styles.sorderDetail.logText, k == 0 ? styles.sorderDetail.logTextActive : '']}>{v.actionNote}</Text>
                  <Text style={[styles.sorderDetail.logText, k == 0 ? styles.sorderDetail.logTextActive : '']}>{v.ctime}</Text>
                </View>
              </View>
            )
          })}
          </View>
          <View style={styles.sorderDetail.block}>
            <View style={[styles.common.flexDirectionRow, styles.sorderDetail.userItem]}>
              <Text style={styles.sorderDetail.userText}>收货人：</Text>
              <Text style={styles.sorderDetail.userText}>{_data.receiver}</Text>
            </View>
            <View style={[styles.common.flexDirectionRow, styles.sorderDetail.userItem]}>
              <Text style={styles.sorderDetail.userText}>收货地址：</Text>
              {_data.provinceName ? <Text style={styles.sorderDetail.userText}>{(_data.provinceName || '') + (_data.cityName || '') + (_data.districtName || '') + (_data.townName || '') + (_data.villageName || '') + _data.address}</Text> : null }
            </View>
            <View style={[styles.common.flexDirectionRow, styles.sorderDetail.userItem]}>
              <Text style={styles.sorderDetail.userText}>收货人手机号：</Text>
              <Text style={styles.sorderDetail.userText}>{_data.mobile}</Text>
            </View>
            { _data.logisticsCompany ?
            <View style={[styles.common.flexDirectionRow, styles.sorderDetail.userItem]}>
              <Text style={styles.sorderDetail.userText}>物流公司：</Text>
              <Text style={styles.sorderDetail.userText}>{_data.logisticsCompany}</Text>
            </View>
            : null }
            { _data.logisticsSn ?
            <View style={[styles.common.flexDirectionRow, styles.sorderDetail.userItem]}>
              <Text style={styles.sorderDetail.userText}>物流单号：</Text>
              <Text style={styles.sorderDetail.userText}>{_data.logisticsSn}</Text>
            </View>
            : null }
          </View>
          <View style={styles.sorderDetail.block}>
            {this.state.type == 1 && _data.relationOrderSn ? <View><Text style={styles.sorderDetail.orderInfoText}>销售订单编号：{_data.relationOrderSn}</Text></View> : null }
            <View><Text style={styles.sorderDetail.orderInfoText}>订单编号：{_data.orderSn}</Text></View>
            {_data.paymentLogs && _data.paymentLogs[0] && _data.paymentLogs[0].payCode ? <View><Text style={styles.sorderDetail.orderInfoText}>交易流水：{_data.paymentLogs && _data.paymentLogs[0] && _data.paymentLogs[0].payCode}</Text></View> : null }
            <View><Text style={styles.sorderDetail.orderInfoText}>创建时间：{_data.ctime}</Text></View>
            {_data.payTime ? <View><Text style={styles.sorderDetail.orderInfoText}>付款时间：{_data.payTime}</Text></View> : null }
            {_data.deliverTime ? <View><Text style={styles.sorderDetail.orderInfoText}>发货时间：{_data.deliverTime}</Text></View> : null }
            {_data.rec_time ? <View><Text style={styles.sorderDetail.orderInfoText}>收货时间：{_data.rec_time}</Text></View> : null }
          </View>
        </ScrollView>
        : null}
        <Loading visible={this.state.loadingVisible}></Loading>
      </View>
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
            this.setState({data: data.obj, bodyShow: true});
        } else {
          UIToast(data.message || '加载数据失败');
        }
    });
  }
}
