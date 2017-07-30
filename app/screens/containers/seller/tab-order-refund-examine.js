import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  InteractionManager
} from 'react-native';

import styles from '../../../css/styles';
import Loading from '../../common/ui-loading';
import UIToast from '../../common/ui-toast';
import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';
import OrderItem from '../../components/seller/tab-order-item';

export default class OrderDetailScreen extends Component{
  constructor(props){
  	super(props);
    let _query = this.props.navigation.state.params;
  	this.state = {
      loadingVisible: false,
      bodyShow: false,
      data: {
        refund: {},
        trace: []
      },
      order: {
        goods: []
      },
      id: _query.id,
      shopid: _query.shopid,
      ordersn: _query.ordersn,
      type: _query.type,
      totalAmount: _query.totalAmount
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
        { this.state.bodyShow ?
        <View style={styles.common.flexv}>
          <ScrollView>
            <View style={[styles.srefundDetail.info, styles.sexamine.info]}>
              <Text style={styles.sexamine.time}>申请时间：{_data.refund.ctime}</Text>
              <View style={[styles.common.flexDirectionRow, styles.srefundDetail.dl]}>
                <Text style={styles.srefundDetail.dt}>售后类型</Text>
                <Text style={styles.srefundDetail.dd}>{_data.refund.type == 1 ? '退款' : '退货退款'}</Text>
              </View>
              <View style={[styles.common.flexDirectionRow, styles.srefundDetail.dl]}>
                <Text style={styles.srefundDetail.dt}>是否收到货</Text>
                <Text style={styles.srefundDetail.dd}>{_data.refund.isRecevied == 1 ? '已收货' : '未收货'}</Text>
              </View>
              <View style={[styles.common.flexDirectionRow, styles.srefundDetail.dl]}>
                <Text style={styles.srefundDetail.dt}>售后原因</Text>
                <Text style={styles.srefundDetail.dd}>{_data.refund.refundReasonName}</Text>
              </View>
              <View style={[styles.common.flexDirectionRow, styles.srefundDetail.dl]}>
                <Text style={styles.srefundDetail.dt}>退款金额</Text>
                <Text style={styles.srefundDetail.dd}>{_data.refund.refundAmount}</Text>
                <Text style={[styles.common.flex, styles.srefundDetail.ddr]}>订单总额：￥{this.state.totalAmount}</Text>
              </View>
              <View style={[styles.common.flexDirectionRow, styles.srefundDetail.dl, styles.sexamine.borderNone]}>
                <Text style={styles.srefundDetail.dt}>退款说明</Text>
                <Text style={styles.srefundDetail.dd}>{_data.refund.refundNote}</Text>
              </View>
            </View>
            <View style={styles.sexamine.order}>
              <OrderItem
              data={this.state.order}
              type={this.state.type}
              props={this.props}
              refundExamine={true}></OrderItem>
            </View>
            <View style={styles.sorderDetail.block}>
              <View style={[styles.common.flexDirectionRow, styles.sorderDetail.userItem]}>
                <Text style={styles.sorderDetail.userText}>收货人：</Text>
                <Text style={[styles.common.flex, styles.sorderDetail.userText]}>{this.state.order.receiver}</Text>
              </View>
              <View style={[styles.common.flexDirectionRow, styles.sorderDetail.userItem]}>
                <Text style={styles.sorderDetail.userText}>收货地址：</Text>
                {this.state.order.provinceName ? <Text style={[styles.common.flex, styles.sorderDetail.userText]}>{(this.state.order.provinceName || '') + (this.state.order.cityName || '') + (this.state.order.districtName || '') + (this.state.order.townName || '') + (this.state.order.villageName || '') + this.state.order.address}</Text> : null }
              </View>
              <View style={[styles.common.flexDirectionRow, styles.sorderDetail.userItem]}>
                <Text style={styles.sorderDetail.userText}>收货人手机号：</Text>
                <Text style={[styles.common.flex, styles.sorderDetail.userText]}>{this.state.order.mobile}</Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.common.flexDirectionRow}>
            <TouchableHighlight underlayColor="#e15e5e" style={[styles.common.flex, styles.footerBtn.b1]} onPress={() => {this._agreeRefund()}}><Text style={styles.footerBtn.text}>同意退款</Text></TouchableHighlight>
            <TouchableHighlight underlayColor="#f5f5f5" style={[styles.common.flex, styles.footerBtn.b2]} onPress={() => {this._refuseRefund()}}><Text style={styles.footerBtn.text2}>拒绝退款</Text></TouchableHighlight>
          </View>
        </View>
        : null }
        <Loading visible={this.state.loadingVisible}></Loading>
      </View>
    );
  }
  _init = () => {
    fetch(Config.JAVAAPI + `shop/mobile/refund/bgetInfo?id=${this.state.id}&shopId=${this.state.shopid}&token=${token}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then((data) => {
      if(data.refund) {
        switch(data.refund.refundReason) {
            case 1:
                data.refund.refundReasonName = '退运费';
            break;
            case 2:
                data.refund.refundReasonName = '商品瑕疵';
            break;
            case 3:
                data.refund.refundReasonName = '质量问题';
            break;
            case 4:
                data.refund.refundReasonName = '颜色/尺寸/参数不符';
            break;
            case 5:
                data.refund.refundReasonName = '少件/漏发';
            break;
            case 6:
                data.refund.refundReasonName = '收到商品时候有划痕/破损';
            break;
            case 7:
                data.refund.refundReasonName = '假冒品牌';
            break;
            case 8:
                data.refund.refundReasonName = '发票问题';
            break;
            case 99:
                data.refund.refundReasonName = '其他';
            break;
            default:
                data.refund.refundReasonName = '';
            break;
        }
      }
      this.setState({loadingVisible: false, data: data, bodyShow: true});
    });
    fetch(Config.JAVAAPI + `shop/wap/client/order/detail?orderSn=${this.state.ordersn}&token=${token}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then((data) => {
        if (data.code == 1) {
            this.setState({order: data.obj});
        } else {
          UIToast(data.message || '加载数据失败');
        }
    });
  }
  _toOrderDetail = () => {
    this.props.navigation.navigate('SellerOrderDetail', {
      ordersn: this.state.ordersn,
      type: this.state.data.refund.orderType == 40 ? 0 : 1
    });
  }
  _agreeRefund = () => {}
  _refuseRefund = () => {
    this.props.navigation.navigate('SellerRefundRefuse', {
      ordersn: this.state.ordersn,
      type: this.state.type
    });
  }
}
