import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  DeviceEventEmitter,
  TouchableOpacity,
  TouchableHighlight,
  } from 'react-native';

import ScreenInit from '../../../config/screenInit';
import Config from '../../../config/config';
import styles from '../../../css/styles';
import Utils from '../../../js/utils';

import UIToast from '../../common/ui-toast';
import Loading from '../../common/ui-loading';

import CartItem from '../../components/buyer/cart-item';
import ModalConfirm from '../../common/modal-confirm';

  export default class CartScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        itemChecked: [],
        storeChecked: [],
        allChecked: false,
        list: [],
        loadingVisible: false,
        totalNum: 0,
        totalPrice: 0,
        isEdit: false
      };
    }
    componentWillMount() {
      this.props.navigation.setParams({headerRight: '编辑'});
    }
    componentDidMount() {
      this.setState({loadingVisible: true});
      ScreenInit.checkLogin(this);
      this._init(true);

      this.listener_edit = DeviceEventEmitter.addListener('cartEdit', () => {
        if(this.props.navigation.state.params.headerRight == '编辑') {
          this.props.navigation.setParams({headerRight: '完成'});
          this.setState({isEdit: true});
        } else {
          this.props.navigation.setParams({headerRight: '编辑'});
          this.setState({isEdit: false});
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
                          <CartItem pindex={k} index={k1} data={v1} checkFunc={(cartItemCheckResult, itemIndex, storeIndex) => this._cartItemCheckFunc(cartItemCheckResult, itemIndex, storeIndex)}
                          sub={() => this._sub(v1, k, k1)}
                          add={() => this._add(v1, k, k1)}
                          blur={() => this._blur(v1, k, k1)}></CartItem>
                        );
                    })}
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={[styles.common.flexDirectionRow, styles.cart.footer,  styles.common.flexCenterv]}>
            <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.common.flex]} onPress={this._allCheckFunc}>
              {this.state.allChecked ?
                <Image source={require('../../../images/icon-checked.png')} style={styles.control.checked}/>
                :<View style={[styles.control.checkbox]}></View>
              }
              <Text style={styles.cart.all}>全选</Text>
            </TouchableOpacity>
            {this.state.isEdit ?
            <TouchableHighlight underlayColor="#fafafa" onPress={this._delete} style={styles.cart.delete}>
              <Text style={styles.btn.danger}>删除</Text>
            </TouchableHighlight>
            :
            <View style={styles.common.flexDirectionRow}>
              <View style={[styles.common.flexCenterh]}>
                <Text style={styles.cart.count}>小计：￥{this.state.totalPrice}</Text>
                <Text style={styles.cart.seletNum}>已选择<Text style={styles.cart.selectCurrentNum}>{this.state.totalNum}</Text>件商品</Text>
              </View>
              <TouchableOpacity activeOpacity={.8} style={styles.cart.settle} onPress={this._settlement}>
                <Text style={styles.cart.settleText}>去结算</Text>
              </TouchableOpacity>
            </View>
            }
          </View>
          <Loading visible={this.state.loadingVisible}></Loading>
          <ModalConfirm keys={6}></ModalConfirm>
        </KeyboardAvoidingView>
      );
    }
    _reset = () => {
      this.state.itemChecked = [];
      this.state.storeChecked = [];
      this.state.allChecked = false;
      this.state.totalNum = 0;
      this.state.totalPrice = 0;
    }
    _init = (selectAll) => {
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
          selectAll && this._allCheckFunc();
        } else if(r.code == -100) {
          UIToast(r.message || '获取数据失败');
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
      this.calculation();
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
       this.calculation();
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
       this.calculation();
     }
     _sub = (item, k, k1) => {
       this._modifyQty(0, item, k, k1);
     }
     _add = (item, k, k1) => {
       this._modifyQty(1, item, k, k1);
     }
     _blur = (item, k, k1) => {
       this._modifyQty(2, item, k, k1);
     }
     _modifyQty = (type, item, k, k1) => {
       let _data = `id=${item.id}&goodsId=${item.goodsId}&qty=${type == 1 ? item.qty+1 : (type == 0 ? item.qty - 1 : item.qty)}&shopId=${item.shopId}&addType=1&token=${token}`;
       fetch(Config.JAVAAPI+`cart/wap/modify?${_data}`,{
         method: 'POST'
       })
       .then(response => response.json())
       .then((r)=>{
         if (r.code==1 && r.obj.length>0) {
           let _list = this.state.list;
           if(type == 0) {
             _list[k]['carts'][k1].qty--
           } else if(type == 1){
             _list[k]['carts'][k1].qty++
           }
           r.obj.forEach((v, i) => {
             if(item.id == v.id) {
               _list[k]['carts'][k1].price = v.price;
             }
           });
           this.state.list = _list;
           this.calculation();
         }
      })
     }
     calculation = () => {
       requestAnimationFrame(() => {
         let _tnum = 0,
             _tprice = 0;
         let _list = this.state.list;
         this.state.itemChecked.forEach((v, k) => {
           v.forEach((v1, k1) => {
             let _t = _list[k]['carts'][k1];
             if(v1) {
               let _n = parseInt(_t.qty);
               _tnum += _n;
               _tprice = Utils.calc.add(_tprice, Utils.calc.mul(parseFloat(_t.price), _n));
             }
           });
         });
        this.setState({totalNum: _tnum, totalPrice: _tprice.toFixed(2)});
       });
     }
     _delete = () => {
       let _ids = [];
       this.state.itemChecked.forEach((v, k) => {
         v.forEach((v1, k1) => {
           if(v1) {
             _ids.push(this.state.list[k]['carts'][k1].id);
           }
          })
        });
        if(_ids.length === 0) {
          UIToast('请选择要删除的商品');
          return;
        };
        DeviceEventEmitter.emit('confirmShow', {
          keys: 6,
          data: {
            text: '是否删除所选商品？',
            confirm: (arg) => {
              fetch(Config.JAVAAPI + `cart/wap/del?id=${_ids.join(',')}&token=${token}`,{
                method: 'POST'
              })
              .then(response => response.json())
              .then((r) => {
                if(r.code === 1) {
                  DeviceEventEmitter.emit('buyerCartCheck', {
                    all: true,
                    checked: false
                  });
                  this._reset();
                  this._init();
                }
              });
            }
          },
        });
     }
     _settlement = () => {
       let _ids = [];
       this.state.itemChecked.forEach((v, k) => {
         v.forEach((v1, k1) => {
           if(v1) {
             _ids.push(this.state.list[k]['carts'][k1].id);
           }
          })
        });
        if(_ids.length === 0) {
          UIToast('请选择要结算的商品');
          return;
        };
        fetch(Config.JAVAAPI + `shop/wap/order/settle?cartIds=${_ids.join(',')}&token=${token}`,{
          method: 'POST'
        })
        .then(response => response.json())
        .then((r) => {
          if(r.code === 1) {
            alert(JSON.stringify(r));
          } else {
            UIToast(r.message || '提交失败');
          }
        });
     }
  }
