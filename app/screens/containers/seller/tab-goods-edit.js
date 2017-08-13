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
  Modal,
  WebView
} from 'react-native';

import Utils from '../../../js/utils';
import Config from '../../../config/config';
import styles from '../../../css/styles';

import ScreenInit from '../../../config/screenInit';
import Loading from '../../common/ui-loading';
import UIToast from '../../common/ui-toast';

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
                { this.state.data.goods_sku.map((v, k) => {
                  return(
                    <View>
                      <View style={[styles.common.flexDirectionRow, styles.sgoodsEdit.combItem]}>
                        <Text style={[styles.sgoodsEdit.combTitle, styles.common.flex]}>{v.attr_str.replace('|', '，')}</Text>
                        <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv]}>
                          <Image source={require('../../../images/icon-delete-red.png')} style={styles.sgoodsEdit.delete} />
                          <Text style={styles.sgoodsEdit.combTitle}>删除</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.common.flexDirectionRow, styles.sgoodsEdit.form]}>
                        <View style={[styles.common.flex, styles.common.flexCenterv, styles.sgoodsEdit.group]}>
                          <Text style={styles.sgoodsEdit.label}>价格</Text>
                          <TextInput
                           style={styles.sgoodsEdit.input}
                           onChangeText={(text) => this.setState({text})}
                           value={this.state.text}
                           underlineColorAndroid="transparent"/>
                        </View>
                        <View style={[styles.common.flex, styles.common.flexCenterv]}>
                          <Text style={styles.sgoodsEdit.label}>库存</Text>
                          <TextInput
                           style={styles.sgoodsEdit.input}
                           onChangeText={(text) => this.setState({text})}
                           value={this.state.text}
                           underlineColorAndroid="transparent"/>
                        </View>
                      </View>
                    </View>
                  );
                }) }
              </View>
            </ScrollView>
            <Loading visible={this.state.loadingVisible}></Loading>
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
}
