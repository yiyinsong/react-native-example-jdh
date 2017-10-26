/**
 * Component: 添加商品选择品牌
 * author: yiyinSong
 * date: 2017-10-25
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  InteractionManager,
  DeviceEventEmitter,
  Modal
  } from 'react-native';

import Config from '../../../config/config';
import Loading from '../../common/ui-loading';
import UIToast from '../../common/ui-toast';
import styles from '../../../css/styles';
import ScreenInit from '../../../config/screenInit';


  export default class QuickBuildGoodsBrandScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        loadingVisible: false,
        list: [],
        index: -1,
        bid: this.props.navigation.state.params.bid,
        modalVisible: true
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
        <View style={[styles.common.flexv, styles.common.initWhite]}>
          <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.list.map((v, k) => {
            return (
              <TouchableHighlight underlayColor="#f5f5f5" onPress={() => {this._select(v, k)}}>
                <Text style={[styles.addGoodsBrand.item, this.state.index === k ? styles.addGoodsBrand.itemActive : null]} numberOfLines={1}>{v.brand_name}</Text>
              </TouchableHighlight>
            )
          })}
          </ScrollView>
          <TouchableOpacity activeOpacity={.8}>
            <Text style={styles.addGoodsBrand.btn}>新建品牌</Text>
          </TouchableOpacity>
          <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this._closeModal}
          >
            <View style={styles.addGoodsBrand.modal}>
              <View style={styles.addGoodsBrand.modalContainer}>
                <Text>111</Text>
              </View>
            </View>
          </Modal>
          <Loading visible={this.state.loadingVisible}></Loading>           
        </View>
      );
    }
    _init = () => {
      fetch(`${Config.PHPAPI}api/mapp/easy-shelf/brand?token=${token}`, {
        method: 'post'
      })
      .then(response => response.json())
      .then(r => {
        this.setState({loadingVisible: false});
        if(r.error_code == 0) {
          r.data.forEach((v, k) => {
            if(v.brand_id === this.state.bid) {
              this.state.index = k;
            }
          });
          this.setState({list: r.data});
        } else {
          UIToast('获取分类失败');
        }
      });
    }
    _select = (v, k) => {
      this.setState({index: k});
      DeviceEventEmitter.emit('addGoodsSelectBrand', {
        bid: v.brand_id,
        brandname: v.brand_name
      });
      requestAnimationFrame(() => {
        this.props.navigation.goBack();
      });
    }
    _closeModal = () => {
      this.setState({modalVisible: false});
    }
  }
