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
  Modal
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import styles from '../../../css/styles';
import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';
import Utils from '../../../js/utils';

import Loading from '../../common/ui-loading';

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
      loadingVisible: false,      
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
      modalVisible: false,
      totalNum: 0,
      totalPrice: 0,
      goodsList: [],
      orderId: _query.orderid,
      refundId: _query.refundid || '',
      remainMoney: 0
    };
  }
  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      ScreenInit.checkLogin(this);
      this.setState({loadingVisible: true});
      
      this._init();
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
                  <TouchableOpacity activeOpacity={.8} onPress={() => this._setModalVisible(true)}>
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
        <Modal
        animationType={'none'}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {this._setModalVisible(false)}}>
            <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={() => {this._setModalVisible(false)}}>
                <View style={styles.modal.container}></View>
            </TouchableOpacity>
            <View style={styles.order.refundList}>
                <View style={[styles.common.flexDirectionRow, styles.order.refundHeader]}>
                    <Text style={[styles.common.flex, styles.order.refundTitle]}>申请商品</Text>
                    <TouchableOpacity activeOpacity={.8} onPress={() => {this._setModalVisible(false)}}>
                        <Image source={require('../../../images/icon-close.png')}style={styles.order.refundClose} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {this.state.goodsList.map((v, k) => {
                        return (
                            <View style={[styles.common.flexDirectionRow, styles.vrg.item]}>
                                <Image source={{uri: v.imgUrlSmall}} style={styles.vrg.itemImg} />
                                <View style={[styles.common.flexv, styles.vrg.info]}>
                                    <Text numberOfLines={2} style={styles.vrg.itemGoodsName}>{v.goodsName}</Text>
                                    <Text numberOfLines={1} style={styles.vrg.itemAttr}>{v.skuAttr}</Text>
                                    <View style={[styles.common.flexDirectionRow, styles.vrg.others]}>
                                        <Text style={styles.vrg.othersText}>
                                            申请数量：
                                            <Text style={styles.vrg.othersActive}>x {v.qty}</Text>
                                        </Text>
                                        <Text style={styles.vrg.othersText}>
                                            申请金额：
                                            <Text style={styles.vrg.othersActive}>￥ {v.refundAmount}</Text>
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
                <View style={[styles.common.flexDirectionRow, styles.vrg.footer]}>
                    <View style={[styles.common.flexv, styles.common.flexCenterh]}>
                        <Text style={styles.vrg.account}>
                            申请商品数：<Text style={styles.vrg.accountActive}>{this.state.totalNum}</Text>
                        </Text>
                        <Text style={styles.vrg.account}>
                            申请总金额：<Text style={styles.vrg.accountActive}>{this.state.totalPrice}</Text>
                        </Text>
                    </View>
                    <TouchableOpacity activeOpacity={.8} onPress={() => {this._setModalVisible(false)}}>
                        <Text style={styles.vrg.closeBtn}>关闭</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        <Loading visible={this.state.loadingVisible}></Loading>        
      </View>
    )
  }
  _init() {
    fetch(`${Config.JAVAAPI}shop/mobile/refund/orderRefundLimitInfo?orderId=${this.state.orderId}&refundId=${this.state.refundId}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(r => {
      if(r.code === 1) {
        this.state.remainMoney = parseFloat(r.obj.remainMoney);
        if(r.obj.canRefundGoods) {
            this.state.goodsList = r.obj.canRefundGoods;
            // if(!this.isedit) {
                // r.obj.canRefundGoods.forEach((v, k) => {
                //     this.goodsCheck.push(true);
                //     this.goodsQtyModel.push(v.qty);
                //     this.goodsPriceModel.push(v.actualPayAmount > this.state.remainMoney ? this.state.remainMoney : v.actualPayAmount);
                //     this.goodsRefundMore.push(v.actualPayAmount > this.state.remainMoney ? this.state.remainMoney : v.actualPayAmount);
                // });
                // this.calculation();
            // } else {
            //     ajax.get(JAVAAPI + '/shop/mobile/refund/getInfo', {
            //         id: this.refundId,
            //         token
            //     }, (data) => {
            //         this.refundRecieved = data.refund.isRecevied - 1;
            //         this.refundMoney = data.refund.refundAmount;
            //         this.refundDesc = data.refund.refundNote;
            //         if(data.uimg1 && data.uimg1 != '') {
            //             this.uploadImgs.push(data.uimg1);
            //         }
            //         if(data.uimg2 && data.uimg2 != '') {
            //             this.uploadImgs.push(data.uimg2);
            //         }
            //         if(data.uimg3 && data.uimg3 != '') {
            //             this.uploadImgs.push(data.uimg3);
            //         }
            //         if(data.uimg4 && data.uimg4 != '') {
            //             this.uploadImgs.push(data.uimg4);
            //         }
            //         if(data.uimg5 && data.uimg5 != '') {
            //             this.uploadImgs.push(data.uimg5);
            //         }
            //         this.refundType = data.refund.type - 1;
            //         this.modelReason = data.refund.refundReason;
            //         for(let item of this.reasonList) {
            //             if(item.id == data.refund.refundReason) {
            //                 this.modelReasonName = item.name;
            //             }
            //         }

            //         this.goodsAllCheck = false;
            //         r.obj.canRefundGoods.forEach((v, k) => {
            //             this.goodsCheck.push(false);
            //             this.goodsQtyModel.push(v.qty);
            //             this.goodsPriceModel.push(v.price);
            //             let _price = Utils.calc(v.qty, v.price, '*');
            //             this.goodsRefundMore.push(_price > this.remainMoney ? this.remainMoney : _price);
            //             if(data.refundGoods) {
            //                 data.refundGoods.forEach((v1, k1) => {
            //                     if(v.goodsId == v1.goodsId && v.skuId == v1.skuId) {
            //                         this.$set(this.goodsCheck, k, true);
            //                         this.$set(this.goodsQtyModel, k, v1.qty);
            //                         this.$set(this.goodsPriceModel, k, v1.refundAmount);
            //                         let _price2 = Utils.calc(v1.qty, v1.price, '*');
            //                         _price2 = _price2 > this.remainMoney ? this.remainMoney : _price2;
            //                         _price2 = _price2.toFixed(2);
            //                         this.$set(this.goodsRefundMore, k, _price2);
            //                     }
            //                 });
            //             }
            //         });
            //         let _ca = true;
            //         this.goodsCheck.forEach((v, k) => {
            //             if(!v) {
            //                 _ca = false;
            //             }
            //         });
            //         if(_ca) this.goodsAllCheck = _ca;
            //         this.calculation();
            //     });
            // }
        }
        this.setState({loadingVisible: false, bodyShow: true });
      }
    });
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
      }
      else if (response.error) {
      }
      else {
        let source = { uri: response.uri };

        alert(JSON.stringify(source));
      }
    });
  }
  _setModalVisible = (bool) => {
    this.setState({modalVisible: bool});
  }
}
