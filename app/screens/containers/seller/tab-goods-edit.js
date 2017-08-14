import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  InteractionManager,
  DeviceEventEmitter,
  Modal,
  WebView
} from 'react-native';

import Utils from '../../../js/utils';
import Config from '../../../config/config';
import styles from '../../../css/styles';

import ScreenInit from '../../../config/screenInit';
import Loading from '../../common/ui-loading';
import UIToast from '../../common/ui-toast';
import ModalConfirm from '../../common/modal-confirm';

export default class SellerGoodsEditScreen extends Component {
    constructor(props) {
      super(props);
      let _query = this.props.navigation.state.params;
      this.state = {
        tab: 0,
        loadingVisible: false,
        goodsid: _query.id,
        goodstype: _query.type,
        data: {
          goods_sku: []
        },
      };
    }
    componentDidMount() {
      this.setState({loadingVisible: true});
      InteractionManager.runAfterInteractions(() => {
        ScreenInit.checkLogin(this);
        this._init();
      });
    }

    render() {
        let state = this.state;
        return (
          <View style={[styles.common.flexv, styles.common.initWhite]}>
            <ScrollView>
              <View style={[styles.sgoodsEdit.tips, styles.common.flexCenterv]}>
                <Image source={require('../../../images/icon-info.png')} style={styles.sgoodsEdit.tipsImg}/>
                <Text style={styles.sgoodsEdit.tipsText}>因编辑商品信息会同时更新手机端与电脑端，为方便您修改及预览商品详情，建议在PC端进行商品编辑。</Text>
              </View>
              <View style={styles.sgoodsEdit.info}>
                <View style={[styles.sgoodsEdit.infoItem, styles.common.flexDirectionRow]}>
                  <Text style={styles.sgoodsEdit.infoDt}>已选类目</Text>
                  <Text style={[styles.common.flex, styles.sgoodsEdit.infoDd]} numberOfLines={1}>{this.state.data.goods_cate}</Text>
                </View>
                <View style={[styles.sgoodsEdit.infoItem, styles.common.flexDirectionRow]}>
                  <Text style={styles.sgoodsEdit.infoDt}>商品名称</Text>
                  <Text style={[styles.common.flex, styles.sgoodsEdit.infoDd]} numberOfLines={1}>{this.state.data.goods_name}</Text>
                </View>
                <View style={[styles.sgoodsEdit.infoItem, styles.common.flexDirectionRow]}>
                  <Text style={styles.sgoodsEdit.infoDt}>商品卖点</Text>
                  <Text style={[styles.common.flex, styles.sgoodsEdit.infoDd]} numberOfLines={1}>{this.state.data.sale_point}</Text>
                </View>
                <View style={[styles.sgoodsEdit.infoItem, styles.common.flexDirectionRow]}>
                  <Text style={styles.sgoodsEdit.infoDt}>已选品牌</Text>
                  <Text style={[styles.common.flex, styles.sgoodsEdit.infoDd]} numberOfLines={1}>{this.state.data.goods_brand}</Text>
                </View>
              </View>
              <View style={styles.sgoodsEdit.comb}>
                <Text style={styles.sgoodsEdit.h5}>组合属性列表</Text>
                { this.state.goodstype !== 2 && this.state.data.goods_sku.map((v, k) => {
                  return(
                    <View>
                      <View style={[styles.common.flexDirectionRow, styles.sgoodsEdit.combItem]}>
                        <Text style={[styles.sgoodsEdit.combTitle, styles.common.flex]}>{v.attr_str.replace('|', '，')}</Text>
                        <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv]} onPress={() => this._delete(v, k)}>
                          <Image source={require('../../../images/icon-delete-red.png')} style={styles.sgoodsEdit.delete} />
                          <Text style={styles.sgoodsEdit.combTitle}>删除</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.common.flexDirectionRow, styles.sgoodsEdit.form]}>
                        <View style={[styles.common.flex, styles.common.flexCenterv, styles.sgoodsEdit.group]}>
                          <Text style={styles.sgoodsEdit.label}>价格</Text>
                          <TextInput
                           style={styles.sgoodsEdit.input}
                           onChangeText={(text) => this._setPrice(v, k, text)}
                           value={v.price.toString()}
                           keyboardType="numeric"
                           underlineColorAndroid="transparent"/>
                        </View>
                        <View style={[styles.common.flex, styles.common.flexCenterv]}>
                          <Text style={styles.sgoodsEdit.label}>库存</Text>
                          <TextInput
                           style={styles.sgoodsEdit.input}
                           onChangeText={(text) => this._setInventory(v, k, text)}
                           value={v.inventory.toString()}
                           keyboardType="numeric"
                           underlineColorAndroid="transparent"/>
                        </View>
                      </View>
                    </View>
                  );
                }) }
                { this.state.goodstype === 2 && this.state.data.goods_sku.map((v, k) => {
                  return(
                    <View>
                      <View style={[styles.common.flexDirectionRow, styles.sgoodsEdit.combItem]}>
                        <Text style={[styles.sgoodsEdit.combTitle, styles.common.flex]}>{v.attr_str.replace('|', '，')}</Text>
                      </View>
                      <View style={[styles.common.flexDirectionRow, styles.sgoodsEdit.form]}>
                        <View style={[styles.common.flex, styles.common.flexCenterv, styles.sgoodsEdit.group]}>
                          <View>
                            <Text style={styles.sgoodsEdit.label2} numberOfLines={1}>最低零售价：￥{v.distribute_price}</Text>
                            <Text style={styles.sgoodsEdit.label2} numberOfLines={1}>建议零售价：￥{v.distribute_retail_price}</Text>
                          </View>
                        </View>
                        <View style={[styles.common.flex, styles.common.flexCenterv]}>
                          <Text style={styles.sgoodsEdit.label}>价格</Text>
                          <TextInput
                           style={styles.sgoodsEdit.input2}
                           onChangeText={(text) => this._setPrice(v, k, text)}
                           value={v.price.toString()}
                           keyboardType="numeric"
                           underlineColorAndroid="transparent"/>
                        </View>
                      </View>
                    </View>
                  );
                }) }
              </View>
            </ScrollView>
            <View style={styles.common.flexDirectionRow}>
              <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.common.flexCenterh, styles.btn2.primary]} onPress={this._save}>
                <Text style={styles.btn2.primaryText}>保存</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.common.flexCenterh, styles.btn2.default]} onPress={this._cancel}>
                <Text style={styles.btn2.defaultText}>取消</Text>
              </TouchableOpacity>
            </View>
            <Loading visible={this.state.loadingVisible}></Loading>
            <ModalConfirm keys={5}></ModalConfirm>
          </View>
        );
    }
    _init = () => {
      fetch(Config.PHPAPI + 'api/mapp/goodsinfo/edit-goods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${this.state.goodsid}&type=${this.state.goodstype}&token=${token}`
      })
      .then(response => response.json())
      .then((r) => {
        this.setState({loadingVisible: false});
        if(r.error_code == 0) {
          this.setState({data: r.data});
        }
      });
    }
    _setPrice = (v, k, t) => {
      let d = this.state.data;
      v.price = t;
      d.goods_sku[k] = v;
      this.setState({data: d});
    }
    _setInventory = (v, k, t) => {
      let d = this.state.data;
      v.inventory = t;
      d.goods_sku[k] = v;
      this.setState({data: d});
    }
    _delete = (v, k) => {
      let d = this.state.data;
      if(d.goods_sku.length < 2) {
        UIToast('至少需要保留一个属性');
        return;
      }
      DeviceEventEmitter.emit('confirmShow', {keys: 5, data: {
          text: '确认删除该属性？',
          confirm: () => {
            d.goods_sku.splice(k, 1);
            this.setState({data: d});
          }
      }});
    }
    _save = () => {
      /****判断是否有价格或者库存格式错误****/
      let reg = /^\d+(\.\d{1,2})?$/;
      let reg2 = /^\d+$/;
      let state = this.state;
      let d = this.state.data;
      for(let i=0,l=d.goods_sku.length; i<l; i++) {
        let v = d.goods_sku[i];
        let name ='属性‘' + v.attr_str.replace('|', '，') + '’';
        if(!reg.test(v.price)) {
          UIToast(name + '价格格式错误，最多为小数点后两位数字');
          return;
        }
        if(v.price > 999999999.99) {
          UIToast(name + '价格错误，最多只能999999999.99');
          return;
        } else if(v.price <= 0) {
          UIToast(name + '价格错误，必须大于0');
          return;
        }
        if(state.goodstype !== 2 && !reg2.test(v.inventory)) {
          UIToast(name + '库存格式错误，必须为正整数');
          return;
        }
        if(state.goodstype !== 2 && v.inventory > 999999) {
          UIToast(name + '库存错误，最多只能999999');
          return;
        } else if(state.goodstype !== 2 && v.inventory <= 0) {
          UIToast(name + '库存错误，必须大于0');
          return;
        }
      }
      /****组合数据****/
      let params = '';
      if(this.state.goodstype !== 2) {
        d.goods_sku.map((v, k) => {
          params += `&sku_id[]=${v.sku_id}&price[]=${v.price}&inventory[]=${v.inventory}`;
        });
      } else {
        d.goods_sku.map((v, k) => {
          params += `&sku_id[]=${v.sku_id}&price[]=${v.price}`;
        });
      }
      fetch(Config.PHPAPI + `api/mapp/goodsinfo/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${this.state.goodsid}${params}&type=${this.state.goodstype}&token=${token}`
      })
      .then(response => response.json())
      .then((r) => {
        if(r.error_code == 0) {
          DeviceEventEmitter.emit('sellerGoodsUpdate');
          requestAnimationFrame(() => {
            this.props.navigation.goBack();
          })
        } else {
          UIToast(data.msg || '修改失败');
        }
      });
    }
    _cancel = () => {
      this.props.navigation.goBack();
    }
}
