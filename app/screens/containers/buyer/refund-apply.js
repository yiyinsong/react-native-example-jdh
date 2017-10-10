/**
 * author: yiyin song
 * compoent: 买家退款申请
 * date: 2017/10110
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  Picker,
  ScrollView,
  Image,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';

import styles from '../../../css/styles';
import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';
import Utils from '../../../js/utils';

export default class RefundApplyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedType: -1,
      checkedGoods: 0,
      checkedReceipt: -1,
      reason: {
        id: '',
        name: '请选择售后原因'
      },
      reasonList: [],
      money: 0,
      bodyShow: false
    };
  }
  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      ScreenInit.checkLogin(this);
      this.setState({ bodyShow: true });
    });
  }
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.common.init}>
        {
          this.state.bodyShow ?
            <View>
              <View style={styles.refundApply.block}>
                <Text style={styles.refundApply.title}>售后类型</Text>
                <View>
                  <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.refundApply.item]} onPress={() => this._checkType(0)}>
                    {this.state.checkedType === 0 ?
                      <Image source={require('../../../images/icon-checked.png')} style={styles.control.checkedSmall}/>
                      : <View style={[styles.control.checkboxSmall]}></View>
                    }
                    <Text style={[styles.refundApply.typeText, this.state.checkedType === 0 ? styles.refundApply.typeTextActive : null]}>我要退货</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.refundApply.item]} onPress={() => this._checkType(1)}>
                    {this.state.checkedType === 1 ?
                      <Image source={require('../../../images/icon-checked.png')} style={styles.control.checkedSmall}/>
                      : <View style={[styles.control.checkboxSmall]}></View>
                    }
                    <Text style={[styles.refundApply.typeText, this.state.checkedType === 1 ? styles.refundApply.typeTextActive : null]}>我要退款<Text style={styles.refundApply.typeGrayText}>（无需退货）</Text></Text>
                  </TouchableOpacity>
                </View>
              </View>
              {this.state.checkedType === 1 ?
              <View style={styles.refundApply.block}>
                <Text style={styles.refundApply.title}>是否包含商品</Text>
                <View>
                  <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.refundApply.item]} onPress={() => this._checkGoods(0)}>
                    {this.state.checkedGoods === 0 ?
                      <Image source={require('../../../images/icon-checked.png')} style={styles.control.checkedSmall}/>
                      : <View style={[styles.control.checkboxSmall]}></View>
                    }
                    <Text style={[styles.refundApply.typeText, this.state.checkedGoods === 0 ? styles.refundApply.typeTextActive : null]}>退款，不包含商品</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.refundApply.item]} onPress={() => this._checkGoods(1)}>
                    {this.state.checkedGoods === 1 ?
                      <Image source={require('../../../images/icon-checked.png')} style={styles.control.checkedSmall}/>
                      : <View style={[styles.control.checkboxSmall]}></View>
                    }
                    <Text style={[styles.refundApply.typeText, this.state.checkedGoods === 1 ? styles.refundApply.typeTextActive : null]}>退款，包含商品</Text>
                  </TouchableOpacity>
                </View>
              </View>
              : null}
              <View style={styles.refundApply.block}>
                <Text style={styles.refundApply.title}>是否收到货</Text>
                <View>
                  <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.refundApply.item]} onPress={() => this._checkReceipt(0)}>
                    {this.state.checkedReceipt === 0 ?
                      <Image source={require('../../../images/icon-checked.png')} style={styles.control.checkedSmall}/>
                      : <View style={[styles.control.checkboxSmall]}></View>
                    }
                    <Text style={[styles.refundApply.typeText, this.state.checkedReceipt === 0 ? styles.refundApply.typeTextActive : null]}>已收到货</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.refundApply.item]} onPress={() => this._checkReceipt(1)}>
                    {this.state.checkedReceipt === 1 ?
                      <Image source={require('../../../images/icon-checked.png')} style={styles.control.checkedSmall}/>
                      : <View style={[styles.control.checkboxSmall]}></View>
                    }
                    <Text style={[styles.refundApply.typeText, this.state.checkedReceipt === 1 ? styles.refundApply.typeTextActive : null]}>未收到货</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.refundApply.block}>
                <Text style={styles.refundApply.title}>售后原因</Text>
                <View>
                  <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.refundApply.select]}>
                    <Text style={[styles.common.flex, styles.refundApply.selectText]} numberOfLines={1}>{this.state.reason.name}</Text>
                    <Image source={require('../../../images/icon-select.png')} style={styles.refundApply.selectIcon}/>
                    <Picker
                    selectedValue={this.state.reason}
                    onValueChange={(item) => this._picker(item)}
                    style={[styles.common.flex, styles.deliver.input, styles.deliver.select]}>
                      <Picker.Item label="请选择售后原因" value="" />
                      {this.state.reasonList.map((v, k) => {
                        return(
                            <Picker.Item label={v.name} value={v}/>
                        )
                      })}
                    </Picker>
                  </View>
                </View>
              </View>
              <View style={styles.refundApply.block}>
                <Text style={styles.refundApply.title}>退款金额</Text>
                <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.refundApply.selectGoods]}>
                <TextInput onChangeText={(text) => this.setState({money: text})} value={this.state.text}/>
                </View>
              </View>
              <View style={styles.refundApply.block}>
                <Text style={styles.refundApply.title}>退款商品</Text>
                <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.refundApply.selectGoods]}>
                  <TouchableOpacity activeOpacity={.8}>
                    <Text style={styles.refundApply.selectGoodsBtn}>选择申请商品</Text>
                  </TouchableOpacity>
                  <Text style={[styles.common.flex, styles.refundApply.selectGoodsResult]}>
                    申请数：<Text style={styles.refundApply.selectGoodsResultActive}>1</Text>，申请总额：￥<Text style={styles.refundApply.selectGoodsResultActive}>10</Text>
                  </Text>
                </View>
              </View>
            </View>
          : null
        }
      </ScrollView>
    )
  }
  _checkType(i) {
    this.setState({checkedType: i});
  }
  _checkGoods(i) {
    this.setState({checkedGoods: i});
  }
  _checkReceipt(i) {
    this.setState({checkedReceipt: i});
  }
  _picker(item) {
    if(item == '') {
      this.setState({
        reason: {
          id: '',
          name: '请选择售后原因'
        }
      });
    } else {
      this.setState({
        reason: item
      });
    }
  }
}
