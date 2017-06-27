import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  DeviceEventEmitter
} from 'react-native';

import Toast from 'react-native-root-toast';

import styles from '../../../css/styles';

import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';

import AddressItemComponent from '../../components/seller/tab-home-address-item';
import ModalConfirm from '../../common/modal-confirm';

export default class SellerAddrList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        addr: {
          addr_count: 0,
          addr_remain: 0,
          list: []
        },
        modalShow: false,
        modalParams: {
          id: '',
          index: -1
        }
      };
    }
    componentDidMount() {
      ScreenInit.checkLogin();
      fetch(Config.PHPAPI + 'api/mapp/shop/addr-list?type=seller&token=' + token, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.error_code == 0) {
          this.setState({
            addr: {
              addr_count: data.data.addr_count,
              addr_remain: data.data.addr_remain,
              list: data.data.list
            }
          });
        } else {
          Toast.show(data.msg, {
              duration: Toast.durations.SHORT,
              backgroundColor: 'rgba(0,0,0,.8)'
          });
        }
      })
      .catch((error) => {
        Toast.show('获取列表失败', {
            duration: Toast.durations.SHORT,
            backgroundColor: 'rgba(0,0,0,.8)'
        });
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
            <ModalConfirm visible={this.state.modalShow}
            data={{
              text: '确认删除？',
              confirm: (arg) => {
                this._deleteConfirm(arg);
              }
            }} params={this.state.modalParams}></ModalConfirm>
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
            Toast.show(result.msg, {
                duration: Toast.durations.SHORT,
                backgroundColor: 'rgba(0,0,0,.8)'
            });
          }
      });
    }
    _deleteItem = (_id, index) => {
      this.setState({
        modalParams: {
          id: _id,
          index
        },
        modalShow: true
      });
    }
    _deleteConfirm = (arg) => {
      this.setState({
        modalShow: false
      });
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
          //发送事件侦听，告诉账户信息地址数量改变
          DeviceEventEmitter.emit('event_address_num_change',{
            addr_count: this.state.addr.addr_count,
            addr_remain: this.state.addr.addr_remain
          });
        } else {
          Toast.show(result.msg, {
              duration: Toast.durations.SHORT,
              backgroundColor: 'rgba(0,0,0,.8)'
          });
        }
      });
    }
    _addNewOne = () => {
      this.props.navigation.navigate('SellerAddrAdd');
    }
}
