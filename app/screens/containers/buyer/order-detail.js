import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  InteractionManager,
  DeviceEventEmitter,
  Modal
} from 'react-native';

import styles from '../../../css/styles';
import OrderItem from '../../components/buyer/order-item';
import Loading from '../../common/ui-loading';
import UIToast from '../../common/ui-toast';
import ModalConfirm from '../../common/modal-confirm';
import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';
import Utils from '../../../js/utils';

import RefundStatusList from '../../components/buyer/order-refund-status';
import RefundOnlyStatusList from '../../components/buyer/order-refund-only-status';


export default class OrderDetailScreen extends Component{
  constructor(props){
  	super(props);
    let _query = this.props.navigation.state.params;
  	this.state = {
      loadingVisible: false,
      bodyShow: false,
      data: {
        goods: [],
        actions: []
      },
      ordersn: _query.ordersn,
    };
  }
  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({loadingVisible: true});
      ScreenInit.checkLogin(this);
      this._init();
    });
  }
  render() {
    let _data = this.state.data;
    return (
      <View style={[styles.common.flexv, styles.common.init]}>
        {this.state.bodyShow ?
        <ScrollView>
          <View style={styles.orderDetail.top}>
            <View style={styles.orderDetail.orderInfo}>
              <View style={styles.common.flexDirectionRow}>
                <Text style={[styles.common.flex, styles.orderDetail.oitl]} numberOfLines={1}>订单号：{_data.orderSn}</Text>
                <Text style={styles.orderDetail.oitr}>{_data.statusName}</Text>
              </View>
              <View style={styles.common.flexDirectionRow}>
                <Text style={[styles.common.flex, styles.orderDetail.oitl]} numberOfLines={1}>下单时间：{_data.ctime}</Text>
              </View>
            </View>
            {_data.routes ?
            <TouchableHighlight underlayColor='#fafafa' onPress={this._toLogi}>
              <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.orderDetail.log]}>
                <Image source={require('../../../images/icon-car.png')} style={styles.orderDetail.car}/>
                <View style={[styles.common.flexv, styles.orderDetail.logInfo]}>
                  <Text style={styles.orderDetail.logProgress} numberOfLines={1}>
                    {_data.routes && _data.routes.steps[_data.routes.steps.length -1] && _data.routes.steps[_data.routes.steps.length -1].acceptAddress}
                  </Text>
                  <Text style={styles.orderDetail.logTime}>
                    {_data.routes && _data.routes.steps[_data.routes.steps.length -1] && _data.routes.steps[_data.routes.steps.length -1].acceptTime}
                  </Text>
                </View>
                <Image source={require('../../../images/icon-arb.png')} style={styles.orderDetail.carArrow}/>
              </View>
            </TouchableHighlight>
            : null}
          </View>
          <View style={styles.orderDetail.top}>
            <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv]}>
              <Image source={require('../../../images/icon-addr.png')} style={styles.orderDetail.addrIcon} />
              <View style={[styles.common.flexv, styles.orderDetail.addrInfo]}>
                <Text style={styles.orderDetail.addrUser}>{_data.receiver + ' ' +_data.mobile}</Text>
                <Text style={styles.orderDetail.addrDetail}>{_data.provinceName ? _data.provinceName + (_data.cityName || '') + (_data.districtName || '') + (_data.townName || '') + (_data.villageName || '') + _data.address : '&nbsp;'}</Text>
              </View>
            </View>
          </View>
          <OrderItem
          index={1}
          data={_data}
          props={this.props}
          navgoods={true}
          ></OrderItem>
          <View style={styles.orderDetail.account}>
            <View style={[styles.common.flexDirectionRow, styles.orderDetail.accountItem]}>
              <Text style={[styles.common.flex, styles.orderDetail.ail]}>
                共{_data.totalQty}件商品 商品总额
              </Text>
              <Text style={styles.orderDetail.air}>
                ￥{_data.totalGoodsAmount}
              </Text>
            </View>
            <View style={[styles.common.flexDirectionRow, styles.orderDetail.accountItem]}>
              <Text style={[styles.common.flex, styles.orderDetail.ail]}>
                运费
              </Text>
              <Text style={styles.orderDetail.air}>
              {
                _data.predictFreight && _data.predictFreight > 0 ? _data.predictFreight : '请与卖家确认发货物流公司及费用信息'
              }
              </Text>
            </View>
            {
              _data.adjustmentAmount ?
              <View style={[styles.common.flexDirectionRow, styles.orderDetail.accountItem]}>
                <Text style={[styles.common.flex, styles.orderDetail.ail]}>
                  调整金额
                </Text>
                <Text style={styles.orderDetail.air}>
                  ￥{_data.adjustmentAmount}
                </Text>
              </View> : null
            }
            {
              _data.totalDiscount > 0 ?
              <View style={[styles.common.flexDirectionRow, styles.orderDetail.accountItem]}>
                <Text style={[styles.common.flex, styles.orderDetail.ail]}>
                  优惠金额
                </Text>
                <Text style={styles.orderDetail.air}>
                  ￥{_data.totalDiscount}
                </Text>
              </View> : null
            }
            <View style={[styles.common.flexDirectionRow, styles.orderDetail.accountItem, styles.orderDetail.accountFooter]}>
              <Text style={[styles.common.flex, styles.orderDetail.ail]}>
                实付金额
              </Text>
              {_data.refundMoneyOnly.onlyRefundAmount > 0 ?
              <TouchableOpacity activeOpacity={1} style={styles.orderDetail.onlyRefundLabel} onPress={() => this._openRefundOnlyStatusList(_data.refundMoneyOnly.onlyRefunds)}>
                <View style={styles.orderItem.onlyRefundLabelContainer}>
                  <Text style={styles.orderItem.onlyRefundLabelText}>有退款</Text>
                </View>
                <View style={styles.orderDetail.onlyRefundLabelArrow}></View>
                <View style={styles.orderDetail.onlyRefundLabelInset}></View>
              </TouchableOpacity>
              : null}
              <Text style={styles.orderDetail.air}>
                ￥{_data.totalAmount}
              </Text>
            </View>
          </View>
          <View style={[styles.sorderDetail.block, styles.orderDetail.bottom]}>
            <View><Text style={styles.sorderDetail.orderInfoText}>订单编号：{_data.orderSn}</Text></View>
            {_data.paymentLogs && _data.paymentLogs[0] && _data.paymentLogs[0].payCode ? <View><Text style={styles.sorderDetail.orderInfoText}>交易流水：{_data.paymentLogs && _data.paymentLogs[0] && _data.paymentLogs[0].payCode}</Text></View> : null }
            <View><Text style={styles.sorderDetail.orderInfoText}>创建时间：{_data.ctime}</Text></View>
            {_data.payTime ? <View><Text style={styles.sorderDetail.orderInfoText}>付款时间：{_data.payTime}</Text></View> : null }
            {_data.deliverTime ? <View><Text style={styles.sorderDetail.orderInfoText}>发货时间：{_data.deliverTime}</Text></View> : null }
            {_data.rec_time ? <View><Text style={styles.sorderDetail.orderInfoText}>收货时间：{_data.rec_time}</Text></View> : null }
          </View>
        </ScrollView>
        : null}
        {this._renderBtn(_data)}
        <Loading visible={this.state.loadingVisible}></Loading>
        <ModalConfirm keys={7}></ModalConfirm>
        <RefundStatusList index={1} props={this.props} type={0}/>
        <RefundOnlyStatusList index={1} props={this.props} type={0}/>        
      </View>
    );
  }
  _init = () => {
    fetch(Config.JAVAAPI + `shop/wap/order/detail?orderSn=${this.state.ordersn}&token=${token}`, {
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
  _toLogi = () => {

  }
  _renderBtn = (_data) => {
    if(_data.status === 10) {
      return (
        <View style={styles.orderDetail.btnArea}>
          <View style={[styles.common.flexDirectionRow, styles.common.flexEndh]}>
            <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container} onPress={() => this._cancel(_data.mainOrderSn || _data.orderSn)}>
              <Text style={styles.btn3.defaults}>取消订单</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container} onPress={ () => this._toPayPage(_data.orderSn) }>
              <Text style={[styles.btn3.defaults, styles.btn3.danger]}>去支付</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    } else if(_data.isRefund === -1) {
      if(_data.status === 20 || _data.status === 30 || _data.status === 31) {
        return (
          <View style={styles.orderDetail.btnArea}>
            <View style={[styles.common.flexDirectionRow, styles.common.flexEndh]}>
              {
                _data.status === 30 ?
                <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container} onPress={() => this._confirmReceiptGoods(_data.id)}>
                  <Text style={[styles.btn3.defaults, styles.btn3.danger]}>确认收货</Text>
                </TouchableHighlight>
                : null
              }
              <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container} onPress={() => this._toRefundDetail}>
                <Text style={styles.btn3.defaults}>退货退款</Text>
              </TouchableHighlight>
            </View>
          </View>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  _toPayPage = (sn) => {
    this.props.navigation.navigate('Pay', {
      ordersn: sn
    });
  }
  _cancel = (sn) => {
    DeviceEventEmitter.emit('confirmShow', {
      keys: 7,
      data: {
        text: '是否确认取消订单？',
        confirm: (arg) => {
          this._deleteConfirm(arg);
        }
      },
      params: {
        sn,
      }
    });
  }
  _deleteConfirm = (arg) => {
    fetch(Config.JAVAAPI + `shop/wap/order/cancel?orderSn=${arg.sn}&token=${token}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then( r => {
      if(r.code == 1) {
        DeviceEventEmitter.emit('BuyerOrderUpdate');
        this._init();
      }
    });
  }
  _confirmReceiptGoods = (id) => {
    DeviceEventEmitter.emit('confirmShow', {
      keys: 7,
      data: {
        text: '确认收货？',
        confirm: (arg) => {
          fetch(Config.JAVAAPI + `shop/wap/order/receive?id=${arg.id}&token=${token}`, {
            method: 'POST'
          })
          .then(response => response.json())
          .then( r => {
            if(r.code == 1) {
              DeviceEventEmitter.emit('BuyerOrderUpdate');
              this._init();
            }
          });
        }
      },
      params: {
        id,
      }
    });
  }
  _openRefundOnlyStatusList = (list) => {
    DeviceEventEmitter.emit('orderRefundOnlyStatusShow', {list, index: 1});
  }
}
