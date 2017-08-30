import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableHighlight,
  TextInput,
  InteractionManager,
  Picker,
  ScrollView,
  DeviceEventEmitter
} from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

import styles from '../../../css/styles';
import UIToast from '../../common/ui-toast';
import ModalAddress from '../../common/modal-address'
import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';


export default class OrderSearchScreen extends Component {
  constructor(props) {
    super(props);
    let _query = this.props.navigation.state.params;
    this.state = {
      ordersn: _query.ordersn,
      orderid: _query.orderid,
      type: _query.type,
      fromdetail: _query.fromdetail,
      deliverType: 0,
      company: {
        id: '',
        logisticsCompanyName: '请选择物流公司'
      },
      companyList: [],
      logSn: '',
      logTel: '',
      deliver: '',
      tel: '',
      addr: '请选择发货地区',
      addrObj: {},
      detailAddr: ''
    };
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      ScreenInit.checkLogin(this);
      this.listener_select = DeviceEventEmitter.addListener('addressSelect', (result) => {
        this.setState({
          addr: result.province + result.city + result.county + result.town + result.village,
          addrObj: result
        });
      });
      fetch(Config.JAVAAPI + `shop/wap/client/order/logisticsCompany?token=${token}`)
      .then(response => response.json())
      .then((data) => {
          if(data.code == 1) {
              this.setState({companyList: data.obj});
          } else {
              UIToast('获取物流公司失败！');
          }
      })
      .catch((error) => {
      });
    });
  }
  componentWillUnmount() {
    this.listener_select && this.listener_select.remove();
  }
  render() {
    let state = this.state;
    return (
      <View style={[styles.common.flexv, styles.common.initWhite]}>
        <ScrollView style={styles.deliver.container}>
          <Text style={styles.deliver.title}>填写物流信息</Text>
          <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.deliver.item]}>
            <Text style={styles.deliver.label}>发货方式</Text>
            <RadioGroup
              onSelect = {(index, value) => this.setState({deliverType: value})}
              selectedIndex={0}
              size={16}
              style={[styles.common.flexDirectionRow, styles.deliver.radioGroup]}
            >
              <RadioButton value={0} style={[styles.common.flexCenterv, styles.deliver.radio]}>
                <Text style={styles.deliver.typeText}>物流快递</Text>
              </RadioButton>
              <RadioButton value={1} style={styles.common.flexCenterv}>
                <Text style={styles.deliver.typeText}>自提</Text>
              </RadioButton>
            </RadioGroup>
          </View>
          {state.deliverType == 0 ?
            <View>
              <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.deliver.item]}>
                <Text style={styles.deliver.label}>物流公司</Text>
                <View style={[styles.common.flex, styles.common.flexCenterv,  styles.deliver.itemBlock]}>
                  <Text style={[styles.common.flex, styles.deliver.selectText,
                  state.company.logisticsCompanyName != '请选择物流公司' ? styles.deliver.activeText : '']} numberOfLines={1}>{state.company.logisticsCompanyName}</Text>
                  <Image source={require('../../../images/icon-select.png')} style={[styles.deliver.selectIcon]}/>
                  <Picker
                  selectedValue={state.company}
                  onValueChange={(item) => this._picker(item)}
                  style={[styles.common.flex, styles.deliver.input, styles.deliver.select]}>
                    <Picker.Item label="请选择" value="" />
                    {this.state.companyList.map((v, k) => {
                      return(
                          <Picker.Item label={v.logisticsCompanyName} value={v}/>
                      )
                    })}
                  </Picker>
                </View>
              </View>
              <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.deliver.item]}>
                <Text style={styles.deliver.label}>物流单号</Text>
                <View style={[styles.common.flex, styles.deliver.itemBlock]}>
                  <TextInput onChangeText={text=>{this.setState({logSn: text})}}
                  placeholder="请填写物流单号" style={[styles.common.flex, styles.deliver.input]}
                  value={this.state.logSn}
                  underlineColorAndroid="transparent"/>
                </View>
              </View>
              <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.deliver.item]}>
                <Text style={styles.deliver.label}>联系电话</Text>
                <View style={[styles.common.flex, styles.deliver.itemBlock]}>
                  <TextInput onChangeText={text=>{this.setState({logTel: text})}}
                  placeholder="请填写联系电话" style={[styles.common.flex, styles.deliver.input]}
                  value={this.state.logTel}
                  underlineColorAndroid="transparent"/>
                </View>
              </View>
              <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.deliver.item]}>
                <Text style={styles.deliver.label}>发货人</Text>
                <View style={[styles.common.flex, styles.deliver.itemBlock]}>
                  <TextInput onChangeText={text=>{this.setState({deliver: text})}}
                  placeholder="请填写发货人" style={[styles.common.flex, styles.deliver.input]}
                  value={this.state.deliver}
                  underlineColorAndroid="transparent"/>
                </View>
              </View>
              <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.deliver.item]}>
                <Text style={styles.deliver.label}>发货电话</Text>
                <View style={[styles.common.flex, styles.deliver.itemBlock]}>
                  <TextInput onChangeText={text=>{this.setState({tel: text})}}
                  placeholder="请填写发货电话" style={[styles.common.flex, styles.deliver.input]}
                  value={this.state.tel}
                  underlineColorAndroid="transparent"/>
                </View>
              </View>
              <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.deliver.item]}>
                <Text style={styles.deliver.label}>发货地区</Text>
                <TouchableHighlight
                underlayColor={'#fff'}
                style={styles.common.flex}
                onPress={this._openAddrPanel}>
                  <View style={[styles.common.flex, styles.common.flexCenterv,  styles.deliver.itemBlock]}>
                    <Text style={[styles.common.flex, styles.deliver.selectText,
                    state.addr != '请选择发货地区' ? styles.deliver.activeText : '']} numberOfLines={1}>{state.addr}</Text>
                    <Image source={require('../../../images/icon-select.png')} style={[styles.deliver.selectIcon]}/>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={[styles.common.flexDirectionRow, styles.deliver.item]}>
                <Text style={styles.deliver.label}>详细地址</Text>
                <View style={[styles.common.flex, styles.deliver.itemBlock, styles.deliver.multi]}>
                  <TextInput onChangeText={text=>{this.setState({detailAddr: text})}}
                  placeholder="请填写详细地址" style={[styles.common.flex, styles.deliver.textarea]}
                  value={this.state.detailAddr}
                  underlineColorAndroid="transparent"
                  multiline={true}
                  numberOfLines={4}/>
                </View>
              </View>
              <Text style={styles.deliver.tips}>为确保您的货物顺利送达，物流信息真实有效，请保持您的联系电话畅通</Text>
            </View>
          : null}
        </ScrollView>
        <TouchableHighlight underlayColor={'#0e99ff'} style={styles.btn.primarySolid} onPress={this._deliver}>
          <Text style={styles.btn.text}>确认发货</Text>
        </TouchableHighlight>
        <ModalAddress level={3} keys={1}></ModalAddress>
      </View>
    );
  }
  _picker = (item) => {
    if(item == '') {
      this.setState({
        company: {
          id: '',
          logisticsCompanyName: '请选择物流公司'
        }
      });
    } else {
      this.setState({
        company: item
      });
    }
  }
  _openAddrPanel = () => {
    DeviceEventEmitter.emit('addressShow', {keys: 1});
  }
  _deliver = () => {
    let _state = this.state;
    let _reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.]/g;
    if(_state.deliverType == 0) {
        if(_state.company == '请选择物流公司') {
          UIToast('请选择物流公司');
          return;
        }
        if(_state.logSn == '') {
          UIToast('请填写物流单号');
          return;
        } else if(!/\w/g.test(_state.logSn)) {
          UIToast('物流单号只能由数字跟英文组成');
          return;
        }
        if(_state.logTel == '') {
          UIToast('请填写联系电话');
          return;
        }else if(isNaN(_state.logTel)) {
          UIToast('联系电话格式错误');
          return;
        }
        if(_state.deliver == '') {
          UIToast('请填写发货人');
          return;
        } else if(_reg.test(_state.deliver)) {
          UIToast('发货人只能由英文数字中文组成');
          return;
        }
        if(_state.tel == '') {
          UIToast('请填写发货电话');
          return;
        } else if(isNaN(_state.tel)) {
          UIToast('发货电话格式错误');
          return;
        }
        if(_state.addr == '请选择发货地区') {
          UIToast('请选择发货地区');
          return;
        }
        if(_state.detailAddr == '') {
          UIToast('请填写详细地址');
          return;
        } else if(_reg.test(_state.detailAddr)) {
          UIToast('详细地址只能由英文数字中文组成');
          return;
        }
        fetch(Config.JAVAAPI + `shop/wap/client/order/doDeliver?id=${this.state.orderid}&logisticsCompany=${this.state.company.logisticsCompanyName}&logisticsId=${this.state.company.id}&logisticsPhone=${this.state.logTel}&logisticsSn=${this.state.logSn}&seller=${this.state.deliver}&sellerMobile=${this.state.tel}&sellerProvince=${this.state.addrObj.province_id}&sellerCity=${this.state.addrObj.city_id}&sellerDistrict=${this.state.addrObj.county_id}&sellerAddress=${this.state.detailAddr}&token=${token}&deliveryType=0`, {
          method: 'POST'
        })
        .then(response => response.json())
        .then((data) => {
            if(data.code == 1) {
              //通知订单列表、详情、搜索等页面发货成功
              DeviceEventEmitter.emit('sellerOrderUpdate', {id: this.state.orderid});
              //如果是从订单详情进入，则返回，否则替换当前页面
              if(this.state.fromdetail == 1) {
                this.props.navigation.goBack();
              } else {
                this.props.navigation.dispatch({
                  key: 'SellerOrderDetail',
                  type: 'ReplaceRoute',
                  routeName: 'SellerOrderDetail',
                  params: {
                    ordersn: this.state.ordersn,
                    type: this.state.type
                  },
                });
              }
            } else {
                UIToast(_res.message || '发货失败');
            }
        })
        .catch((error) => {
        });
    } else {
      fetch(Config.JAVAAPI + `shop/wap/client/order/doDeliver?id=${this.state.orderid}&deliveryType=${this.state.deliverType}&token=${token}`,{
          method: 'POST'
      })
      .then(response => response.json())
      .then((_res)=>{
          if (_res.code==1) {
            //通知订单列表、详情、搜索等页面发货成功
            DeviceEventEmitter.emit('sellerOrderUpdate', {id: this.state.orderid});
            //如果是从订单详情进入，则返回，否则替换当前页面
            if(this.state.fromdetail == 1) {
              this.props.navigation.goBack();
            } else {
              this.props.navigation.dispatch({
                key: 'SellerOrderDetail',
                type: 'ReplaceRoute',
                routeName: 'SellerOrderDetail',
                params: {
                  ordersn: this.state.ordersn,
                  type: this.state.type
                },
              });
            }
          }else{
            UIToast(_res.message || '发货失败');
          }
      }).catch((error) => {
      });
    }
  }
}
