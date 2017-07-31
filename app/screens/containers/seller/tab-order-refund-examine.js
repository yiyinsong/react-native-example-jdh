import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  InteractionManager,
  Modal
} from 'react-native';

import styles from '../../../css/styles';
import Utils from '../../../js/utils';
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
        goods: [],
        jxOrder: {}
      },
      id: _query.id,
      shopid: _query.shopid,
      ordersn: _query.ordersn,
      type: _query.type,
      fromdetail: _query.fromdetail || false,
      modalVisible: true
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
                <Text style={[styles.common.flex, styles.srefundDetail.ddr]}>订单总额：￥{this.state.type == 1 && this.state.order.status == 0 ? this.state.order.jxOrder.totalAmount : this.state.order.totalAmount}</Text>
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
            <TouchableHighlight underlayColor="#e15e5e" style={[styles.common.flex, styles.footerBtn.b1]} onPress={() => {this._agreeRefund(_data)}}><Text style={styles.footerBtn.text}>同意退款</Text></TouchableHighlight>
            <TouchableHighlight underlayColor="#f5f5f5" style={[styles.common.flex, styles.footerBtn.b2]} onPress={() => {this._refuseRefund(_data)}}><Text style={styles.footerBtn.text2}>拒绝退款</Text></TouchableHighlight>
          </View>
        </View>
        : null }
        <Loading visible={this.state.loadingVisible}></Loading>
        <Modal animationType='fade' onRequestClose={() => this._modalClose()} visible={this.state.modalVisible} transparent={true}>
          <View style={{flex:1}}>
            <TouchableOpacity activeOpacity={1} style={styles.modal.container} onPress={this._modalClose}></TouchableOpacity>
            <View style={[styles.modal.container2, {left: Utils.width * .15, top: Utils.height * .3}]}>
                <View style={[styles.sexamine.modal, {width: Utils.width * .7}]}>
                  <View style={styles.sexamine.mtitle}>
                    <Text style={styles.sexamine.mtitleText}>退款提示</Text>
                  </View>
                  <View style={styles.sexamine.mcontent}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} scrollEnabled={false} ref="modalScrollView">
                      <View horizontal={true} style={{width: Utils.width * .7}}>
                        <View style={styles.sexamine.mbody}>
                          <Text style={styles.sexamine.tipsText}>同意退款后，交易取消，平台将为买家退款，退款状态变成退款成功。</Text>
                        </View>
                        <View style={[styles.modal.confirm.btn, styles.sexamine.mfooter]}>
                          <TouchableOpacity activeOpacity={.8} onPress={() => {this._agree()}} style={styles.modal.confirm.confirm}>
                              <Text style={styles.modal.confirm.confirmText}>同意退款</Text>
                          </TouchableOpacity>
                          <TouchableOpacity activeOpacity={.8} onPress={this._modalClose} style={styles.modal.confirm.cancel}>
                              <Text style={styles.modal.confirm.cancelText}>取消</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View horizontal={true} style={{width: Utils.width * .7}}>
                        <View style={styles.sexamine.mbody}>
                          <Text style={styles.sexamine.tipsText}>确认退款后，交易取消，须为用户退款，订单状态转变为已退款。</Text>
                        </View>
                        {this.state.order.payType == 0 ?
                        <View style={[styles.modal.confirm.btn, styles.sexamine.mfooter]}>
                          <TouchableOpacity activeOpacity={.8} onPress={() => {this._pay(1)}} style={styles.modal.confirm.confirm}>
                              <Text style={styles.modal.confirm.confirmText}>线上退款</Text>
                          </TouchableOpacity>
                          <TouchableOpacity activeOpacity={.8} onPress={() => {this._pay(0)}} style={[styles.modal.confirm.cancel, styles.sexamine.btn2]}>
                              <Text style={[styles.modal.confirm.cancelText, styles.sexamine.btn2Text]}>线下退款</Text>
                          </TouchableOpacity>
                        </View>
                        : <View style={[styles.modal.confirm.btn, styles.sexamine.mfooter]}>
                          <TouchableOpacity activeOpacity={.8} onPress={() => {this._pay(0)}} style={styles.modal.confirm.confirm}>
                              <Text style={styles.modal.confirm.confirmText}>线下退款</Text>
                          </TouchableOpacity>
                          <TouchableOpacity activeOpacity={.8} onPress={this._modalClose} style={styles.modal.confirm.cancel}>
                              <Text style={styles.modal.confirm.cancelText}>取消</Text>
                          </TouchableOpacity>
                        </View>}
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </View>
            </View>
        </Modal>
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
      this.setState({loadingVisible: false, data: data});
    });
    fetch(Config.JAVAAPI + `shop/wap/client/order/detail?orderSn=${this.state.ordersn}&token=${token}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then((data) => {
        if (data.code == 1) {
            this.setState({order: data.obj, bodyShow: true});
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
  _agreeRefund = (data) => {
    this.setState({modalVisible: true});
    let state = this.state;
    //如果是即采订单并且卖家已经采购
    if(state.type == 1 && data.refund.relationRefundId) {

    }
    //否则如果是自建订单或者即采订单并且卖家还没采购
    else {

    }
  }
  _refuseRefund = (data) => {
    this.props.navigation.navigate('SellerRefundRefuse', {
      ordersn: this.state.ordersn,
      type: this.state.type,
      id: this.state.id,
      shopid: this.state.shopid,
      refundtype: data.refund.type,
      fromdetail: this.state.fromdetail,
    });
  }
  _agree = () => {
    this.refs.modalScrollView.scrollTo({x: Utils.width * .7, y: 0, animated: true});
  }
  _modalClose = () => {
    this.setState({ modalVisible: false });
    this.refs.modalScrollView.scrollTo({x: 0, y: 0, animated: false});
  }
  _pay = (pt) => {
    //pt == 0 代表线下退款
    if(pt == 0) {

    } else {

    }
  }
}
