import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  InteractionManager,
  DeviceEventEmitter,
  Modal
} from 'react-native';

import styles from '../../../css/styles';
import OrderItem from '../../components/seller/tab-order-item';
import Loading from '../../common/ui-loading';
import UIToast from '../../common/ui-toast';
import ModalConfirm from '../../common/modal-confirm';
import ModalPrompt from '../../common/modal-prompt';
import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';
import Utils from '../../../js/utils';

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
      type: _query.type,
      posCodeVisible: false,
      posCodeSrc: ''
    };
  }
  componentWillMount() {
    this.setState({loadingVisible: true});
    InteractionManager.runAfterInteractions(() => {
      ScreenInit.checkLogin(this);
      this._init();
    });
    //添加发货成功侦听事件
    this.listener_deliver_success = DeviceEventEmitter.addListener('sellerOrderUpdate', (result) => {
      this._init();
    });
  }
  componentWillUnmount() {
    this.listener_deliver_success && this.listener_deliver_success.remove();
  }
  render() {
    let _data = this.state.data;
    return (
      <View style={[styles.common.flexv, styles.common.init]}>
        {this.state.bodyShow ?
        <ScrollView>
          <OrderItem
          data={_data}
          type={this.state.type}
          props={this.props}
          navgoods={true}
          refuseDeliver={(id) => this._openRefuseDeliverModal(id)}
          posPay={(sn) => this._posPay(sn)}
          confirmReceipt={(id) => DeviceEventEmitter.emit('confirmShow', {keys: 3, data: {
            text: '是否确认已收到货款？',
            confirm: (arg) => {
              this._confirmReceipt(arg);
            }
          },params: id})}
          ></OrderItem>
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
              <Text style={[styles.common.flex, styles.sorderDetail.userText]}>{_data.receiver}</Text>
            </View>
            <View style={[styles.common.flexDirectionRow, styles.sorderDetail.userItem]}>
              <Text style={styles.sorderDetail.userText}>收货地址：</Text>
              {_data.provinceName ? <Text style={[styles.common.flex, styles.sorderDetail.userText]}>{(_data.provinceName || '') + (_data.cityName || '') + (_data.districtName || '') + (_data.townName || '') + (_data.villageName || '') + _data.address}</Text> : null }
            </View>
            <View style={[styles.common.flexDirectionRow, styles.sorderDetail.userItem]}>
              <Text style={styles.sorderDetail.userText}>收货人手机号：</Text>
              <Text style={[styles.common.flex, styles.sorderDetail.userText]}>{_data.mobile}</Text>
            </View>
            { _data.logisticsCompany ?
            <View style={[styles.common.flexDirectionRow, styles.sorderDetail.userItem]}>
              <Text style={styles.sorderDetail.userText}>物流公司：</Text>
              <Text style={[styles.common.flex, styles.sorderDetail.userText]}>{_data.logisticsCompany}</Text>
            </View>
            : null }
            { _data.logisticsSn ?
            <View style={[styles.common.flexDirectionRow, styles.sorderDetail.userItem]}>
              <Text style={styles.sorderDetail.userText}>物流单号：</Text>
              <Text style={[styles.common.flex, styles.sorderDetail.userText]}>{_data.logisticsSn}</Text>
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
        <ModalConfirm keys={3}></ModalConfirm>
        <Modal
          visible={this.state.posCodeVisible}
          animationType={'fade'}
          transparent = {true}
          onRequestClose={()=> this.setState({posCodeVisible: false})}
      >
      <TouchableOpacity activeOpacity={1} style={[styles.common.flex, styles.common.flexCenterv, styles.common.flexCenterh, styles.ewm.container]} onPress={()=>this.setState({posCodeVisible: false})}>
        <Image source={{uri: this.state.posCodeSrc}} style={{width: Utils.width * .4, height: Utils.width * .4}} resizeMode ={'contain'}/>
      </TouchableOpacity>
      </Modal>
      <ModalPrompt data={{
        text: '请输入新的价格',
        confirm: (r, p) => {
          this._modifyPrice(r, p);
        }
      }} keys={0} notClose={true}/>
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
  /**不发货**/
  _openRefuseDeliverModal = (id) => {
    DeviceEventEmitter.emit('confirmShow', {
      keys: 3,
      data: {
        text: '是否不发货？',
        confirm: (arg) => {
          this._refuseDeliver(arg);
        }
      },
      params: {
        id
      }
    });
  }
  _refuseDeliver = (arg) => {
    fetch(Config.JAVAAPI+`shop/wap/client/order/noDeliver?id=${arg.id}&token=${token}`,{
      method: 'POST'
    })
    .then(response => response.json())
    .then((_res)=>{
          if (_res.code==1) {
              UIToast( '操作成功');
              DeviceEventEmitter.emit('sellerOrderUpdate');
          }else{
              UIToast(_res.message || '操作失败');
          }
      })
  }
  _posPay = (sn) => {
    this.setState({
      posCodeVisible: true,
      posCodeSrc: `${Config.JAVAAPI}qrcode?text=${sn}&w=150`
    });
  }
  _modifyPrice = (newPrice, params) => {
    if(newPrice == '') {
      DeviceEventEmitter.emit('promptTips', {keys: 0, error: '请输入新价格'});
    } else if (!/(^[1-9]\d*(\.\d{1,2})?$)|(^0\.\d{1,2}$)/.test(newPrice)) {
      DeviceEventEmitter.emit('promptTips', {keys: 0, error: '格式错误或最多只能小数点后两位'});
    } else if(newPrice > 1000000000) {
      DeviceEventEmitter.emit('promptTips', {keys: 0, error: '最多不能大于1000000000'});
    } else {
      DeviceEventEmitter.emit('promptTips', {keys: 0, error: ''});
      DeviceEventEmitter.emit('promptHide',{keys: 0});
      fetch(Config.JAVAAPI+`shop/wap/client/order/adjustPrice?orderSn=${params.sn}&adjustmentAmount=${newPrice}&token=${token}`, {
          method: 'POST'
        })
        .then(response => response.json())
        .then((result) => {
            if(result.code == 1) {
                this._init();
            } else {
                UIToast(result.message || '修改失败');
            }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  _confirmReceipt = (id) => {
    fetch(Config.JAVAAPI+`shop/wap/client/order/audit?id=${id}&token=${token}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then((_res)=>{
        if (_res.code==1) {
          DeviceEventEmitter.emit('sellerOrderUpdate');
        } else {
          UIToast('确认收款失败');
        }
    })
  }
}
