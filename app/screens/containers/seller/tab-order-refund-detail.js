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

export default class OrderDetailScreen extends Component{
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: navigation.state.params.title,
  });

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
      id: _query.id,
      shopid: _query.shopid,
      ordersn: _query.ordersn,
      order: {}
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
            <Text style={styles.srefundDetail.title}>最新进度</Text>
            <View style={styles.sorderDetail.log}>
            {_data.trace.map((v, k) => {
              return (
                <View style={styles.sorderDetail.logItem}>
                  <View style={styles.sorderDetail.logLeft}>
                    <View style={[styles.common.flex, styles.sorderDetail.logLine, k == 0  ? styles.sorderDetail.logLineActive : '']}></View>
                    <View style={[styles.sorderDetail.logCircle, k == 0 ? styles.sorderDetail.logCircleActive : '']}></View>
                  </View>
                  <View style={[styles.sorderDetail.logRight, k == 0 ? styles.sorderDetail.logRightActive : '']}>
                    <Text style={[styles.sorderDetail.logText, k == 0 ? styles.sorderDetail.logTextActive : '']}>{v.content}</Text>
                    <Text style={[styles.sorderDetail.logText, k == 0 ? styles.sorderDetail.logTextActive : '']}>{v.ctime}</Text>
                  </View>
                </View>
              )
            })}
            </View>
            <View style={styles.srefundDetail.info}>
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
                <Text style={[styles.common.flex, styles.srefundDetail.ddr]}>订单总额：￥{this.state.data.refund.type !== 40  && this.state.order.status == 0 ? this.state.order.jxOrder.totalAmount : this.state.order.totalAmount}</Text>
              </View>
              <View style={[styles.common.flexDirectionRow, styles.srefundDetail.dl]}>
                <Text style={styles.srefundDetail.dt}>退款说明</Text>
                <Text style={styles.srefundDetail.dd}>{_data.refund.refundNote}</Text>
              </View>
            </View>
            <View style={[styles.common.flexDirectionRow, styles.srefundDetail.order]}>
              <View style={styles.common.flexv}>
                <Text style={styles.srefundDetail.orderSn}>订单号：{this.state.order.orderSn}</Text>
                <Text style={styles.srefundDetail.orderTime}>订单时间：{this.state.order.ctime}</Text>
              </View>
              <TouchableHighlight underlayColor='#f5f5f5' style={styles.srefundDetail.or} onPress={() => {this._toOrderDetail()}}><Text style={styles.srefundDetail.ortxt}>查看详情</Text></TouchableHighlight>
            </View>
          </ScrollView>
          <View style={styles.common.flexDirectionRow}>
          { _data.refund.isNow == 1 && _data.refund.status == 10 ?
            <TouchableHighlight underlayColor="#e15e5e" style={[styles.common.flex, styles.footerBtn.b1]} onPress={() => {this._examine()}}><Text style={styles.footerBtn.text}>审核</Text></TouchableHighlight>
            : null }
            { _data.refund.isNow == 1 && _data.refund.status == 40 && _data.refund.payStatus == 5 ?
            <TouchableHighlight underlayColor="#e15e5e" style={[styles.common.flex, styles.footerBtn.b1]} onPress={() => {this._pay(0)}}><Text style={styles.footerBtn.text}>打款</Text></TouchableHighlight>
            : null }
            { _data.refund.isNow == 1 && _data.refund.type == 2 && _data.refund.status == 30 ?
            <TouchableHighlight underlayColor="#e15e5e" style={[styles.common.flex, styles.footerBtn.b1]} onPress={() => {this._pay(1)}}><Text style={styles.footerBtn.text}>确认收货并打款</Text></TouchableHighlight>
            : null }
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
      switch(data.refund.status) {
        case -10:
            data.refund.statusName = '退款失败';
        break;
        case 0:
            data.refund.statusName = '退款关闭';
        break;
        case 10:
            data.refund.statusName = '待审核';
        break;
        case 20:
            data.refund.statusName = '待买家退货';
        break;
        case 30:
            data.refund.statusName = '退货待退款';
        break;
        case 40:
            if(data.refund.payStatus == 1) {
                data.refund.statusName = '退款中';
            } else if(data.refund.payStatus == 2) {
                data.refund.statusName = '退款失败';
            } else if(data.refund.payStatus == 3) {
                data.refund.statusName = '退款成功';
            } else if(data.refund.payStatus == 4) {
                data.refund.statusName = '退款成功';
            } else if(data.refund.payStatus == 5) {
                data.refund.statusName = '待退款';
            } else {
                data.refund.statusName = '同意退货退款';
            }
        break;
        case 50:
            data.refund.statusName = '卖家拒绝退款';
        break;
        case 60:
            data.refund.statusName = '待平台介入';
        break;
        default:
            data.refund.statusName = '';
        break;
      }
      this.setState({loadingVisible: false, data: data, bodyShow: true});
      this.props.navigation.setParams({title: data.refund.statusName});
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
  _examine = () => {
    this.props.navigation.navigate('SellerRefundExamine', {
      id: this.state.id,
      shopid: this.state.shopid,
      ordersn: this.state.ordersn,
      type: this.state.data.refund.orderType == 40 ? 0 : 1,
      fromdetail: true
    });
  }
  _pay = (t) => {

  }
}
