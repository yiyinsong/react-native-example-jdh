/**
 * author: yiyin song
 * compoent: 买家退款申请
 * date: 2017/10110
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Picker,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  InteractionManager,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import styles from '../../../css/styles';
import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';
import Utils from '../../../js/utils';

let imagePickerOptions = {
  title: '请选择商品图片',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '相册',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class RefundApplyScreen extends Component {
  constructor(props) {
    super(props);
    let _query = this.props.navigation.state.params;
    this.state = {
      checkedType: (_query.status == 30 || _query.status == 31) ? 1 : 0,
      checkedGoods: (_query.status == 30 || _query.status == 31) ? -1 : 0,
      checkedReceipt: -1,
      reason: {
        id: '',
        name: '请选择售后原因'
      },
      reasonList: [
        {id: 1, name: '退运费'},
        {id: 2, name: '商品瑕疵'},
        {id: 3, name: '质量问题'},
        {id: 4, name: '颜色/尺寸/参数不符'},
        {id: 5, name: '少件/漏发'},
        {id: 6, name: '收到商品时候有划痕/破损'},
        {id: 7, name: '假冒品牌'},
        {id: 8, name: '发票问题'},
        {id: 99, name: '其他'}
      ],
      modelMoney: 0,
      modelDesc: '',
      bodyShow: false,
      status: (_query.status == 30 || _query.status == 31) ? 1 : 0,
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
        <View style={styles.common.flexv}>
        {
          this.state.bodyShow ?
            <ScrollView showsVerticalScrollIndicator={false} style={styles.common.init}>
              <View style={styles.refundApply.block}>
                <Text style={styles.refundApply.title}>售后类型</Text>
                <View>
                {this.state.status === 1 ?
                  <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.refundApply.item]} onPress={() => this._checkType(1)}>
                    {this.state.checkedType === 1 ?
                      <Image source={require('../../../images/icon-checked.png')} style={styles.control.checkedSmall}/>
                      : <View style={[styles.control.checkboxSmall]}></View>
                    }
                    <Text style={[styles.refundApply.typeText, this.state.checkedType === 1 ? styles.refundApply.typeTextActive : null]}>我要退货</Text>
                  </TouchableOpacity>
                  : null}
                  <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.refundApply.item]} onPress={() => this._checkType(0)}>
                    {this.state.checkedType === 0 ?
                      <Image source={require('../../../images/icon-checked.png')} style={styles.control.checkedSmall}/>
                      : <View style={[styles.control.checkboxSmall]}></View>
                    }
                    <Text style={[styles.refundApply.typeText, this.state.checkedType === 0 ? styles.refundApply.typeTextActive : null]}>我要退款<Text style={styles.refundApply.typeGrayText}>（无需退货）</Text></Text>
                  </TouchableOpacity>
                </View>
              </View>
              {this.state.checkedType === 0 ?
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
              {this.state.status === 1 ?
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
              : null}
              <View style={styles.refundApply.block}>
                <Text style={styles.refundApply.title}>售后原因</Text>
                <View>
                  <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.refundApply.select]}>
                    <Text style={[styles.common.flex, styles.refundApply.selectText, this.state.reason.id === '' ? styles.refundApply.placeholder : '']} numberOfLines={1}>{this.state.reason.name}</Text>
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
              {(this.state.checkedType === 0 && this.state.checkedGoods === 0) ?
              <View style={styles.refundApply.block}>
                <Text style={styles.refundApply.title}>退款金额</Text>
                <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.refundApply.selectGoods]}>
                  <TextInput onChangeText={(text) => this.setState({modelMoney: text})} value={this.state.modelMoney} underlineColorAndroid="transparent" placeholder="请输入金额" style={styles.refundApply.moneyInput}/>
                  <Text style={styles.refundApply.moneyText}>订单总额：￥1500</Text>
                </View>
              </View>
              : null}
              {(this.state.checkedType ===1 || this.state.checkedGoods === 1) ? <View style={styles.refundApply.block}>
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
              : null}
              <View style={styles.refundApply.block}>
                <Text style={styles.refundApply.title}>退款说明</Text>
                <View style={styles.refundApply.desc}>
                  <TextInput onChangeText={(text) => this.setState({modelDesc: text})} value={this.state.modelDesc} underlineColorAndroid="transparent" placeholder="请说明原因" style={styles.refundApply.descTextarea} multiline={true} blurOnSubmit={false}/>
                </View>
              </View>
              <View style={styles.refundApply.block}>
                <Text style={styles.refundApply.title}>上传照片</Text>
                <View style={[styles.common.flexDirectionRow, styles.refundApply.img]}>
                  <TouchableHighlight underlayColor="#ccc" style={[styles.common.flexCenterh, styles.common.flexCenterv, styles.refundApply.addBtn]} onPress={this._selectImage}>
                    <Text style={styles.refundApply.addText}>+</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </ScrollView>
          : null
        }
        {
          this.state.bodyShow ?
          <View style={styles.refundApply.btn}>
            <TouchableHighlight underlayColor="#d6231a" style={styles.refundApply.submit}>
              <Text style={styles.refundApply.submitText}>提交申请</Text>
            </TouchableHighlight>
          </View>
          : null
        }
      </View>
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
  _selectImage() {
    ImagePicker.showImagePicker(imagePickerOptions, (response) => { 
      if (response.didCancel) {
        alert('User cancelled image picker');
      }
      else if (response.error) {
        alert('ImagePicker Error: ', response.error);
      }
      else {
        let source = { uri: response.uri };

        alert(JSON.stringify(source));
      }
    });
  }
}
