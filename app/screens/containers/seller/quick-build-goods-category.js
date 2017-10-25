/**
 * Component: 添加商品选择分类列表
 * author: yiyinSong
 * date: 2017-10-25
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  InteractionManager,
  DeviceEventEmitter
  } from 'react-native';

import Config from '../../../config/config';
import Loading from '../../common/ui-loading';
import UIToast from '../../common/ui-toast';
import styles from '../../../css/styles';
import ScreenInit from '../../../config/screenInit';


  export default class QuickBuildGoodsCategoryScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        loadingVisible: false,
        list: [],
        lv1: 0,
        lv2: 0,
        cid: this.props.navigation.state.params.cid
      };
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        ScreenInit.checkLogin(this);
        this.setState({loadingVisible: true});
        this._init();
      });
    }
    render() {
      return(
        <View style={[styles.common.flex, styles.common.init]}>
          <View style={styles.addGoodsCate.left}>
            <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.list.map((v, k) => {
              return (
                <TouchableHighlight underlayColor="#f5f5f5" onPress={() => this._select(1, v, k)}>
                  <Text style={[styles.addGoodsCate.leftItem, this.state.lv1 === k ? styles.addGoodsCate.leftItemActive : null]} numberOfLines={1}>{v.cat_name}</Text>
                </TouchableHighlight>
              )
            })}
            </ScrollView>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.list[this.state.lv1] && this.state.list[this.state.lv1].child.map((v, k) => {
              return (
                <TouchableHighlight underlayColor="#f5f5f5" onPress={() => this._select(2, v, k)}>
                  <Text style={[styles.addGoodsCate.leftItem, this.state.lv2 === k ? styles.addGoodsCate.rightItemActive : null]}>{v.cat_name}</Text>
                </TouchableHighlight>
              )
            })}
          </ScrollView>
          <Loading visible={this.state.loadingVisible}></Loading>           
        </View>
      );
    }
    _init = () => {
      fetch(`${Config.PHPAPI}api/mapp/easy-shelf/category?token=${token}`, {
        method: 'post'
      })
      .then(response => response.json())
      .then(r => {
        this.setState({loadingVisible: false});
        if(r.error_code == 0) {
          this.setState({list: r.data});
          r.data.forEach((v, k) => {
            let _inThisCate = false;
            v.child.forEach((v1, k1) => {
              if(v1.cat_id === this.state.cid) {
                this.setState({lv2: k1});
                _inThisCate = true;
              }
            });
            if(_inThisCate) {
              this.setState({lv1: k});              
            }
          });
        } else {
          UIToast('获取分类失败');
        }
      });
    }
    _select = (lv, v, k) => {
      if(lv === 1) {
        this.setState({lv1: k, lv2: -1});
      } else {
        this.setState({lv2: k});
        DeviceEventEmitter.emit('addGoodsSelectCategory', {
          cid: v.cat_id,
          lv1text: this.state.list[this.state.lv1].cat_name,
          lv2text: v.cat_name,
        });
        requestAnimationFrame(() => {
          this.props.navigation.goBack();
        });
      }
    }
  }
