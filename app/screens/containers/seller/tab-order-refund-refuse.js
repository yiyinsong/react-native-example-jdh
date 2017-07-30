import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Picker,
  TouchableHighlight,
  InteractionManager,
} from 'react-native';

import styles from '../../../css/styles';
import UIToast from '../../common/ui-toast';
import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';

export default class OrderDetailScreen extends Component{
  constructor(props){
  	super(props);
    let _query = this.props.navigation.state.params;
  	this.state = {
      ordersn: _query.ordersn,
      type: _query.type,
      selectReason: {
        id: '',
        name: '请选择'
      },
      reason: [
        {id: 1, name: '退款金额不对，买家要求过高'},
        {id: 2, name: '商品没问题，买家举证无效'},
        {id: 3, name: '商品没问题，买家未举证'},
        {id: 4, name: '申请时间已超过售后服务时限'},
        {id: 5, name: '商品退回后才能退款'},
        {id: 6, name: '买家已签收'},
        {id: 7, name: '货物已在物流中'},
        {id: 8, name: '商品已备好货'},
        {id: 99, name: '其他'}
      ]
    };
  }
  componentWillMount() {
    this.setState({loadingVisible: true});
    InteractionManager.runAfterInteractions(() => {
      ScreenInit.checkLogin(this);
    })
  }
  render() {
    let state = this.state;
    return (
      <View style={[styles.common.flexv, styles.common.initWhite]}>
        <ScrollView style={styles.deliver.container}>
          <View style={styles.refuse.container}>
            <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.deliver.item]}>
              <Text style={styles.deliver.label}><Text style={styles.refuse.redText}>* </Text>拒绝原因</Text>
              <View style={[styles.common.flex, styles.common.flexCenterv,  styles.deliver.itemBlock]}>
                <Text style={[styles.common.flex, styles.deliver.selectText,
                state.selectReason.name != '请选择' ? styles.deliver.activeText : '']} numberOfLines={1}>{state.selectReason.name}</Text>
                <Image source={require('../../../images/icon-select.png')} style={[styles.deliver.selectIcon]}/>
                <Picker
                selectedValue={state.selectReason}
                onValueChange={(item) => this._picker(item)}
                style={[styles.common.flex, styles.deliver.input, styles.deliver.select]}>
                  <Picker.Item label="请选择" value="" />
                  {state.reason.map((v, k) => {
                    return(
                        <Picker.Item label={v.name} value={v}/>
                    )
                  })}
                </Picker>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.common.flexDirectionRow}>
          <TouchableHighlight underlayColor="#e15e5e" style={[styles.common.flex, styles.footerBtn.b1]} onPress={() => {this._confirm()}}><Text style={styles.footerBtn.text}>确认退款</Text></TouchableHighlight>
          <TouchableHighlight underlayColor="#f5f5f5" style={[styles.common.flex, styles.footerBtn.b2]} onPress={() => {this._cancel()}}><Text style={styles.footerBtn.text2}>取消</Text></TouchableHighlight>
        </View>
      </View>
    );
  }
  _picker = (item) => {
    if(item == '') {
      this.setState({
        selectReason: {
          id: '',
          name: '请选择'
        }
      });
    } else {
      this.setState({
        selectReason: item
      });
    }
  }
  _confirm = () => {
    this.props.navigation.dispatch({
      key: 'SellerOrderDetail',
      type: 'ReplaceMultiRoute',
      replaceNumber: 2,
      routeName: 'SellerOrderDetail',
      params: {
        ordersn: this.state.ordersn,
        type: this.state.type
      },
    });
  }
  _cancel = () => {
    this.props.navigation.goBack();
  }
}
