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
        itemChecked: [],
        storeChecked: [],
        allChecked: false,
        list: [],
        loadingVisible: false,
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
                    <TouchableOpacity activeOpacity={.8} onPress={() => this._storeCheckFunc(k)}>
                      {
                        this.state.storeChecked[k] ?
                        <Image source={require('../../../images/icon-checked.png')} style={styles.control.checked}/>
                        : <View style={[styles.control.checkbox]}></View>
                      }
                    </TouchableOpacity>
                    <Text style={[styles.common.flex, styles.cart.storeHeaderText]} numberOfLines={1}>{v.shop.shopName}</Text>
                  </View>
                  <View>
                    {v.carts.map((v1, k1) => {
                        return (
                          <CartItem pindex={k} index={k1} data={v1} checkFunc={(cartItemCheckResult, itemIndex, storeIndex) => this._cartItemCheckFunc(cartItemCheckResult, itemIndex, storeIndex)}></CartItem>
                        );
                    })}
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={[styles.common.flexDirectionRow, styles.cart.footer]}>
            <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.common.flex]} onPress={this._allCheckFunc}>
              {this.state.allChecked ?
                <Image source={require('../../../images/icon-checked.png')} style={styles.control.checked}/>
                :<View style={[styles.control.checkbox]}></View>
              }
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
          let _ic = [];
          let _sc = [];
          r.obj.forEach((v, k) => {
            _ic[k] = [];
            _sc[k] = false;
            v.carts.forEach((v1, k1) => {
              _ic[k][k1] = false;
            });
          });
          this.setState({list: r.obj, itemChecked: _ic, storeChecked: _sc});
        } else if(r.code == -100) {
          UIToast(r.message || '获取数据失败');
        } else {

        }
      });
    }
    _storeCheckFunc = (k) => {
      let _storeChecked = this.state.storeChecked;
      _storeChecked[k] = !_storeChecked[k];
      DeviceEventEmitter.emit('buyerCartCheck', {
        index: k,
        checked: _storeChecked[k]
      });
      let _itemChecked = this.state.itemChecked;
        _itemChecked[k].forEach((v1, k1) => {
        _itemChecked[k][k1] = _storeChecked[k];
      });
      if(_storeChecked[k]) {
        let _allChecked = true;
        _storeChecked.forEach((v, k) => {
          if(!v) {
            _allChecked = false;
          }
        });
        this.setState({storeChecked: _storeChecked, allChecked: _allChecked, itemChecked: _itemChecked});
      } else {
        this.setState({storeChecked: _storeChecked, allChecked: false, itemChecked: _itemChecked});
      }

     }
     _cartItemCheckFunc = (r, k, pk) => {
       let _itemChecked = this.state.itemChecked;
       _itemChecked[pk][k] = r;

       let _storeChecked = this.state.storeChecked;
       let _allChecked = true;

       if(r) {
         let _allItemChecked = true;
          _itemChecked[pk].forEach((v, k) => {
            if(!v) {
              _allItemChecked = false;
            }
          });
          _storeChecked[pk] = _allItemChecked;
          _storeChecked.forEach((v, k) => {
            if(!v) {
              _allChecked = false;
            }
          });
       } else {
         _storeChecked[pk] = false;
         _allChecked = false;
       }
       this.setState({itemChecked: _itemChecked, storeChecked: _storeChecked, allChecked: _allChecked});
     }
     _allCheckFunc = () => {
       let _allChecked = this.state.allChecked;
       _allChecked = !_allChecked;
       DeviceEventEmitter.emit('buyerCartCheck', {
         all: true,
         checked: _allChecked
       });
       let _storeChecked = this.state.storeChecked;
       _storeChecked.forEach((v, k) => {
         _storeChecked[k] = _allChecked;
       });
       let _itemChecked = this.state.itemChecked;
       _itemChecked.forEach((v, k) => {
         v.forEach((v1, k1) => {
           _itemChecked[k][k1] = _allChecked;
         });
       });
       this.setState({itemChecked: _itemChecked, storeChecked: _storeChecked, allChecked: _allChecked});
     }
  }
