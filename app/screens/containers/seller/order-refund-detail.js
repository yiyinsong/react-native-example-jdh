import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  InteractionManager,
  DeviceEventEmitter,
  Modal
} from 'react-native';

import styles from '../../../css/styles';
import Utils from '../../../js/utils';
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
        order: {},
        refund: {},
        trace: []
      },
      id: _query.id,
      shopid: _query.shopid,
      ordersn: _query.ordersn,
      modalVisible: false,
      urlType: ''
    };
  }
  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({loadingVisible: true});
      ScreenInit.checkLogin(this);
      this._init();
    })
    this.listener_update = DeviceEventEmitter.addListener('sellerOrderUpdate', (result) => {
	  DeviceEventEmitter.emit('SellerHomeUpdate');
      this._init();
    });
  }
  componentWillUnmount() {
    this.listener_update && this.listener_update.remove();
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
                <Text style={[styles.common.flex, styles.srefundDetail.ddr]}>订单总额：￥{this.state.data.refund.type !== 40  && this.state.data.order.status == 0 ? this.state.data.order.jxOrder.totalAmount : this.state.data.order.totalAmount}</Text>
              </View>
              <View style={[styles.common.flexDirectionRow, styles.srefundDetail.dl]}>
                <Text style={styles.srefundDetail.dt}>退款说明</Text>
                <Text style={styles.srefundDetail.dd}>{_data.refund.refundNote}</Text>
              </View>
              {_data.uimg1 || _data.uimg2 || _data.uimg3 || _data.uimg4 || _data.uimg5 ?
              <View style={[styles.common.flexDirectionRow, styles.srefundDetail.dl]}>
                <Text style={styles.srefundDetail.dt}>用户上传图片</Text>
                <View style={[styles.common.flexDirectionRow, styles.srefundDetail.imgContent]}>
                  <TouchableOpacity activeOpacity={.8}>
                    <Image source={{uri: _data.uimg1}} style={styles.srefundDetail.img}/>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8}>
                    <Image source={{uri: _data.uimg2}} style={styles.srefundDetail.img}/>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8}>
                    <Image source={{uri: _data.uimg3}} style={styles.srefundDetail.img}/>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8}>
                    <Image source={{uri: _data.uimg4}} style={styles.srefundDetail.img}/>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8}>
                    <Image source={{uri: _data.uimg5}} style={styles.srefundDetail.img}/>
                  </TouchableOpacity>
                </View>
              </View>
              : null}
            </View>
            <View style={[styles.common.flexDirectionRow, styles.srefundDetail.order]}>
              <View style={styles.common.flexv}>
                <Text style={styles.srefundDetail.orderSn}>订单号：{this.state.data.refund.orderType != 40 ? this.state.data.order.relationOrderSn : this.state.data.order.orderSn}</Text>
                <Text style={styles.srefundDetail.orderTime}>订单时间：{this.state.data.order.ctime}</Text>
              </View>
              <TouchableHighlight underlayColor='#f5f5f5' style={styles.srefundDetail.or} onPress={() => {this._toOrderDetail()}}><Text style={styles.srefundDetail.ortxt}>查看详情</Text></TouchableHighlight>
            </View>
          </ScrollView>
          <View style={styles.common.flexDirectionRow}>
          { _data.refund.isNow == 1 && _data.refund.status == 10 ?
            <TouchableHighlight underlayColor="#e15e5e" style={[styles.common.flex, styles.footerBtn.b1]} onPress={() => {this._examine()}}><Text style={styles.footerBtn.text}>审核</Text></TouchableHighlight>
            : null }
            { _data.refund.status == 40 && _data.refund.payStatus == 5 ?
            <TouchableHighlight underlayColor="#e15e5e" style={[styles.common.flex, styles.footerBtn.b1]} onPress={() => {this._pay(1)}}><Text style={styles.footerBtn.text}>打款</Text></TouchableHighlight>
            : null }
            { _data.refund.isNow == 1 && _data.refund.type == 2 && _data.refund.status == 30 ?
            <TouchableHighlight underlayColor="#e15e5e" style={[styles.common.flex, styles.footerBtn.b1]} onPress={() => {this._pay(2)}}><Text style={styles.footerBtn.text}>确认收货并打款</Text></TouchableHighlight>
            : null }
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
                    <Text style={styles.sexamine.mtitleText}>提示</Text>
                  </View>
                  <View style={styles.sexamine.mcontent}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} scrollEnabled={false} ref="modalScrollView">
                      <View style={{width: Utils.width * .7}}>
                        <View style={styles.sexamine.mbody}>
                          <Text style={styles.sexamine.tipsText}>退款后，订单状态转变为已退款。</Text>
                        </View>
                        {this.state.data.order.payType == 0 ?
                        <View style={[styles.modal.confirm.btn, styles.sexamine.mfooter]}>
                          <TouchableOpacity activeOpacity={.8} onPress={() => {this._agreeHandle(1)}} style={styles.modal.confirm.confirm}>
                              <Text style={styles.modal.confirm.confirmText}>{
                                this.state.data.refund.orderType == 40 ? '马上支付' : '线上退款'
                              }</Text>
                          </TouchableOpacity>
                          {
                            this.state.data.refund.orderType == 40 ? <TouchableOpacity activeOpacity={.8} onPress={this._modalClose} style={[styles.modal.confirm.cancel, styles.sexamine.btn2]}>
                                <Text style={[styles.modal.confirm.cancelText, styles.sexamine.btn2Text]}>取消</Text>
                            </TouchableOpacity> : <TouchableOpacity activeOpacity={.8} onPress={() => {this._agreeHandle(2)}} style={[styles.modal.confirm.cancel, styles.sexamine.btn2]}>
                                <Text style={[styles.modal.confirm.cancelText, styles.sexamine.btn2Text]}>线下退款</Text>
                            </TouchableOpacity>
                          }
                        </View>
                        : <View style={[styles.modal.confirm.btn, styles.sexamine.mfooter]}>
                          <TouchableOpacity activeOpacity={.8} onPress={() => {this._agreeHandle(2)}} style={styles.modal.confirm.confirm}>
                              <Text style={styles.modal.confirm.confirmText}>{this.state.data.refund.orderType == 40 ? '马上支付' : '线下退款'}</Text>
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
  }
  _toOrderDetail = () => {
    this.props.navigation.navigate('SellerOrderDetail', {
      ordersn: this.state.data.refund.orderType != 40 ? this.state.data.order.relationOrderSn : this.state.data.order.orderSn,
      type: this.state.data.refund.orderType == 40 ? 0 : 1
    });
  }
  _examine = () => {
    this.props.navigation.navigate('SellerRefundExamine', {
      id: this.state.id,
      shopid: this.state.shopid,
      ordersn: this.state.ordersn,
      type: this.state.data.refund.orderType == 40 ? 0 : 1,
      fromdetail: true,
    });
  }
  _modalClose = () => {
    this.setState({ modalVisible: false });
  }
  _pay = (t) => {
    this.setState({ modalVisible: true, urlType: t});
  }
  _agreeHandle = (pt) => {
    this._modalClose();
    let _refundUrl = '';
    //如果是仅退款
    if(this.state.urlType == 1) {
        _refundUrl = Config.JAVAAPI + 'shop/mobile/refund/decideRefund';
    }
    //如果是退货退款
    else {
        _refundUrl = Config.JAVAAPI + 'shop/mobile/refund/decideReturnGoods';
    }
    fetch(_refundUrl + `?id=${this.state.id}&agree=1&payType=${pt || ''}&token=${token}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then((data) => {
      if(data.code == 1) {
        DeviceEventEmitter.emit('sellerOrderUpdate');
      } else {
        UIToast(data.message || '操作失败');
      }
    });
  }
}
