import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  DeviceEventEmitter,
  InteractionManager
} from 'react-native';

import styles from '../../../css/styles';

import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';

import AddressItemComponent from '../../components/seller/home-address-item';
import ModalConfirm from '../../common/modal-confirm';
import UIToast from '../../common/ui-toast';
import Loading from '../../common/ui-loading';

export default class SellerAddrList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        addr: {
          addr_count: 0,
          addr_remain: 0,
          list: []
        },
        loadingVisible: false
      };
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        this.setState({loadingVisible: true});
        ScreenInit.checkLogin(this);
        this._updateData();
        /**添加新增地址侦听**/
        this.listener_address_add = DeviceEventEmitter.addListener('addressListAddOne', () => {
          /**重新刷新页面更新数据**/
          this._updateData();
        });
      });
    }
    _updateData = () => {
      fetch(Config.PHPAPI + 'api/mapp/shop/addr-list?type=seller&token=' + token, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((data) => {
        this.setState({loadingVisible: false});
        if(data.error_code == 0) {
          this.setState({
            addr: {
              addr_count: data.data.addr_count,
              addr_remain: data.data.addr_remain,
              list: data.data.list
            }
          });
        } else {
          UIToast(data.msg);
        }
      })
      .catch((error) => {
        this.setState({loadingVisible: false});
        UIToast('获取列表失败');
      });
    }
    render() {
        return (
          <View style={styles.common.flexv}>
            <ScrollView style={styles.saddr.listDl}>
              <View style={[styles.common.flex, styles.saddr.listDt]}>
                <Text style={styles.saddr.listDtText}>共建</Text>
                <Text style={styles.saddr.listDtTextActive}>{this.state.addr.addr_count}</Text>
                <Text style={styles.saddr.listDtText}>个地址，还可以创建</Text>
                <Text style={styles.saddr.listDtTextActive}>{this.state.addr.addr_remain}</Text>
                <Text style={styles.saddr.listDtText}>个</Text>
              </View>
              <View style={styles.saddr.listDd}>
                {
                  this.state.addr.list.map(
                    (item, index) => {
                      return (
                        <AddressItemComponent
                        data={item}
                        setDefault={()=>{this._setDefaultItem(item.addr_id, index)}}
                        deleteHandle={()=>{this._deleteItem(item.addr_id, index)}}
                        editHandle={()=>{this.props.navigation.navigate('SellerAddrAdd', {id: item.addr_id})}}
                        ></AddressItemComponent>)
                    }
                  )
                }
              </View>
            </ScrollView>
            <View style={styles.saddr.footer}>
              <TouchableOpacity activeOpacity={.8} onPress={this._addNewOne}>
                <Text style={styles.saddr.footerBtn}>+新增地址</Text>
              </TouchableOpacity>
            </View>
            <ModalConfirm
            data={{
              text: '确认删除？',
              confirm: (arg) => {
                this._deleteConfirm(arg);
              }
            }}
            keys={0}></ModalConfirm>
            <Loading visible={this.state.loadingVisible}></Loading>
          </View>
        );
    }
    _setDefaultItem = (_id, index) => {
      fetch(Config.PHPAPI + 'api/mapp/shop/addr-def',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'id='+_id+'&token='+token
      })
      .then((response) => response.json())
      .then((result) => {
          if(result.error_code == 0) {
            let _temp = this.state.addr.list;
            let _result = [];
            let _def = {};
            _temp.forEach((v, k) => {
              if(k == index) {
                _temp[k].def_addr = 1;
                _def = v;
              } else {
                _temp[k].def_addr = 0;
                _result.push(_temp[k]);
              }
            });
            _result.unshift(_def);
            this.setState({
              addr: {
                ...this.state.addr,
                list: _result
              }
            });
          } else {
            UIToast(result.msg);
          }
      });
    }
    _deleteItem = (_id, index) => {
      DeviceEventEmitter.emit('confirmShow', {
        keys: 0,
        params: {
          id: _id,
          index
        }
      });
    }
    _deleteConfirm = (arg) => {
      fetch(Config.PHPAPI + 'api/mapp/shop/addr-del', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'id='+arg.id+'&token='+token
      })
      .then((response) => response.json())
      .then((result) => {
        if(result.error_code == 0) {
          this.state.addr.list.splice(arg.index, 1);
          this.setState({
            addr: {
              addr_count: this.state.addr.addr_count - 1,
              addr_remain: this.state.addr.addr_remain + 1,
              list: this.state.addr.list
            }
          });
        } else {
          UIToast(result.msg);
        }
      });
    }
    _addNewOne = () => {
      this.props.navigation.navigate('SellerAddrAdd');
    }
    componentWillUnmount(){
      //移除事件侦听
      this.listener_address_add && this.listener_address_add.remove();
    }
}
