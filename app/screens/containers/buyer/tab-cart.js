import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  DeviceEventEmitter,
  TouchableOpacity,
  InteractionManager
  } from 'react-native';

import ScreenInit from '../../../config/screenInit';
import Config from '../../../config/config';
import styles from '../../../css/styles';

import UIToast from '../../common/ui-toast';
import Loading from '../../common/ui-loading';

import CartItem from '../../components/buyer/tab-cart-item';

  export default class CartScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        storeChecked: [],
        list: [],
        loadingVisible: false
      };
    }
    componentWillMount() {
      this.props.navigation.setParams({headerRight: '编辑'});
    }
    componentDidMount() {
      this.setState({loadingVisible: true});
      InteractionManager.runAfterInteractions(() => {
        ScreenInit.checkLogin(this);
        this._init();
      })
      this.listener_edit = DeviceEventEmitter.addListener('cartEdit', () => {
        if(this.props.navigation.state.params.headerRight == '编辑') {
          this.props.navigation.setParams({headerRight: '完成'});
        } else {
          this.props.navigation.setParams({headerRight: '编辑'});
        }
      });
    }
    componentWillUnmount() {
      this.listener_edit && this.listener_edit.remove();
    }
    render() {
      return(
        <KeyboardAvoidingView behavior="position" contentContainerStyle={[styles.common.flexv, styles.common.initWhite]} style={[styles.common.flexv, styles.common.initWhite]}>
          <ScrollView>
            {this.state.list.map((v, k) => {
              return (
                <View style={[styles.cart.store, k == 0 ? styles.cart.storeBorderNone : '']}>
                  <View style={[styles.cart.storeHeader, styles.common.flexDirectionRow, styles.common.flexCenterv]}>
                    <TouchableOpacity activeOpacity={.8}>
                      <View style={[styles.control.checkbox]}></View>
                    </TouchableOpacity>
                    <Text style={[styles.common.flex, styles.cart.storeHeaderText]} numberOfLines={1}>{v.shop.shopName}</Text>
                  </View>
                  <View>
                    {v.carts.map((v1, k1) => {
                        return (
                          <CartItem index={k1} data={v1}></CartItem>
                        );
                    })}
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={[styles.common.flexDirectionRow, styles.cart.footer]}>
            <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.common.flex]}>
              <View style={[styles.control.checkbox]}></View>
              <Text style={styles.cart.all}>全选</Text>
            </TouchableOpacity>
            <View style={styles.common.flexDirectionRow}>
              <View style={[styles.common.flexCenterh]}>
                <Text style={styles.cart.count}>小计：￥124545.00</Text>
                <Text style={styles.cart.seletNum}>已选择<Text style={styles.cart.selectCurrentNum}>92</Text>件商品</Text>
              </View>
              <TouchableOpacity activeOpacity={.8} style={styles.cart.settle}>
                <Text style={styles.cart.settleText}>去结算</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Loading visible={this.state.loadingVisible}></Loading>
        </KeyboardAvoidingView>
      );
    }
    _init = () => {
      fetch(Config.JAVAAPI + `cart/wap/list?token=${token}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then((r) => {
        this.setState({loadingVisible: false});
        if(r.code == 1) {
          this.setState({list: r.obj});
        } else if(r.code == -100) {
          UIToast(r.message || '获取数据失败');
        } else {

        }
      });
    }
  }
