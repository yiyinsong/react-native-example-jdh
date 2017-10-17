import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  DeviceEventEmitter,
  InteractionManager
} from 'react-native';

import styles from '../../../css/styles';

import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';

import ModalAddress from '../../common/modal-address';
import UIToast from '../../common/ui-toast';
import Loading from '../../common/ui-loading';

export default class SellerAddrAdd extends Component {
    constructor(props) {
      super(props);
      let _params = this.props.navigation.state.params;
      this.state = {
        id: (_params && _params.id) || '',
        username: '',
        tel: '',
        addr: '',
        addrObj: '',
        detail: ''
      };
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        ScreenInit.checkLogin(this);
        this.listener_select = DeviceEventEmitter.addListener('addressSelect', (result) => {
          this.setState({
            addr: result.province + result.city + result.county + result.town + result.village,
            addrObj: result
          });
        });
        if(this.state.id !== '') {
          this.setState({loadingVisible: true});
          fetch(Config.PHPAPI + `api/mapp/shop/addr-edit?id=${this.state.id}&token=${token}`, {
            method: 'GET'
          })
          .then(response => response.json())
          .then(data => {
            this.setState({loadingVisible: false});
            if(data.error_code == 0) {
              let _data = data.data;
              this.setState({
                username: _data.recevier,
                tel: _data.mobile,
                addr: _data.province_name + _data.city_name + _data.district_name + _data.town_name + _data.village_name,
                detail: _data.addr,
                addrObj: {
                  key: 0,
                  province: _data.province_name,
                  province_id: _data.province,
                  city: _data.city_name,
                  city_id: _data.city,
                  county: _data.district_name,
                  county_id: _data.district,
                  town: _data.town_name,
                  town_id: _data.town,
                  village: _data.village_name,
                  village_id: _data.village
                }
              });
            }
          })
          .catch((error) => {
            this.setState({loadingVisible: false});
          });
        }
      });
    }
    componentWillUnmount() {
      this.backTimer && clearTimeout(this.backTimer);
      this.listener_select && this.listener_select.remove();
    }
    render() {
        return (
          <View style={styles.common.flexv}>
            <ScrollView style={styles.saddr.add}>
              <View style={[styles.common.flex, styles.saddr.group, styles.common.flexCenterv]}>
                <Text style={styles.saddr.addLabel}>收货人姓名：</Text>
                <View style={styles.saddr.addAbsolute}>
                  <TextInput underlineColorAndroid='transparent'  onChangeText={(text) => this.setState({username: text})} value={this.state.username} style={[styles.common.flex, styles.saddr.input]}/>
                </View>
              </View>
              <View style={[styles.common.flex, styles.saddr.group, styles.common.flexCenterv]}>
                <Text style={styles.saddr.addLabel}>收货人手机号：</Text>
                <View style={styles.saddr.addAbsolute}>
                  <TextInput underlineColorAndroid='transparent'  onChangeText={(text) => this.setState({tel: text})} value={this.state.tel} style={[styles.common.flex, styles.saddr.input]}/>
                </View>
              </View>
              <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.saddr.group, styles.common.flexCenterv]} onPress={this._openAddressPanel}>
                <Text style={styles.saddr.addLabel}>所在地区：</Text>
                <View style={[styles.saddr.addAbsolute, styles.common.flexCenterv]}>
                  <Text style={[styles.common.flex, styles.saddr.input]} numberOfLines={1}>{this.state.addr}</Text>
                  <Image source={require('../../../images/icon-arb.png')} style={styles.shome.arrowRight}/>
                </View>
              </TouchableOpacity>
              <View style={[styles.common.flex, styles.saddr.group, styles.common.flexCenterv]}>
                <Text style={styles.saddr.addLabel}>详细地址：</Text>
                <View style={styles.saddr.addAbsolute}>
                  <TextInput underlineColorAndroid='transparent'  onChangeText={(text) => this.setState({detail: text})} value={this.state.detail} style={[styles.common.flex, styles.saddr.input]}/>
                </View>
              </View>
            </ScrollView>
            <View style={[styles.saddr.footer, styles.saddr.addFooter]}>
              <TouchableOpacity activeOpacity={.8} onPress={this._addNewOne}>
                <Text style={styles.saddr.footerBtn}>保存</Text>
              </TouchableOpacity>
            </View>
            <ModalAddress keys={0}></ModalAddress>
            <Loading visible={this.state.loadingVisible}></Loading>
          </View>
        );
    }
    _openAddressPanel = () => {
      if(this.state.id != '') {
        let _addr = this.state.addrObj;
        DeviceEventEmitter.emit('addressShow', {keys: 0, init: {
          province_id: _addr.province_id,
          city_id: _addr.city_id,
          county_id: _addr.county_id,
          town_id: _addr.town_id,
          village_id: _addr.village_id
        }});
      } else {
        DeviceEventEmitter.emit('addressShow', {keys: 0});
      }

    }
    _addNewOne = () => {
      if(this.state.username == '') {
        UIToast('请填写收货人姓名');
      } else if(this.state.tel == '') {
        UIToast('请填写收货人手机号');
      } else if(!this.state.addrObj.province_id) {
        UIToast('请填写所在地区');
      } else if(this.state.detail == '') {
        UIToast('请填写详细地址');
      } else {
        let _addr = this.state.addrObj;
        let _url = this.state.id !== '' ? 'api/mapp/shop/addr-update' : 'api/mapp/shop/addr-add';
        fetch(Config.PHPAPI + _url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `${this.state.id !== '' ? 'addr_id' : 'id'}=${this.state.id}&region=${_addr.province_id},${_addr.city_id},${_addr.county_id},${_addr.town_id},${_addr.village_id}&recevier=${this.state.username}&addr=${this.state.detail}&mobile=${this.state.tel}&token=${token}`
        })
        .then((response) => response.json())
        .then((data) => {
          if(data.error_code == 0) {
            UIToast('操作成功');
            DeviceEventEmitter.emit('addressListAddOne');
            this.backTimer = setTimeout(() => {
              this.props.navigation.goBack();
            }, 2000);

          } else {
            UIToast(data.msg);
          }
        })
        .catch((error) => {
          UIToast('操作失败，请检查网络');
        });
      }
    }
}
