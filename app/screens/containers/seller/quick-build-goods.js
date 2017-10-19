/**
 * Component: 添加商品
 * author: yiyinSong
 * date: 2017-10-18
 */
import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TextInput
  } from 'react-native';

import Config from '../../../config/config';
import Utils from '../../../js/utils';
import Loading from '../../common/ui-loading';
import styles from '../../../css/styles';
import UIToast from '../../common/ui-toast';

  export default class QuickBuildGoodsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
      headerLeft: <TouchableOpacity activeOpacity={.8} style={styles.addGoods.back} onPress={() => navigation.goBack()}><Text style={styles.addGoods.backText}>取消</Text></TouchableOpacity>
    });
    constructor(props){
    	super(props);
    	this.state = {
        visibleTips: true,
        loadingVisible: false,
      };
    }
    render() {
      return(
        <View style={[styles.common.flexv, styles.common.init]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.visibleTips ?
            <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.addGoods.tips]}>
              <Text style={[styles.common.flex, styles.addGoods.tipsText]}>因编辑商品信息会同时更新手机端与电脑端，为方便您修改及预览商品详情，建议在PC端进行商品新建与编辑</Text>
              <TouchableOpacity activeOpacity={.8} onPress={this._closeTips}>
                <View style={styles.addGoods.close}>
                  <View style={styles.addGoods.closeLine1}></View>
                  <View style={styles.addGoods.closeLine2}></View>
                </View>
              </TouchableOpacity>
            </View>
            : null}
          </ScrollView>
          <Loading visible={this.state.loadingVisible}></Loading>           
        </View>
      );
    }
    componentDidMount() {
      this.setState({loadingVisible: true});
      this._init();
    }
    _init = () => {
      // fetch(`${Config.PHPAPI}api/mapp/shop/cate?token=${token}`, {
      //   method: 'post'
      // })
      // .then(response => response.json())
      // .then(r => {
      //   this.setState({loadingVisible: false});
      //   if(r.error_code == 0) {
      //     this.setState({data: r.data});
      //   } else {
      //     UIToast('获取分类失败');
      //   }
      // });
    }
    _closeTips = () => {
      this.setState({
        visibleTips: false
      });
    }
  }
