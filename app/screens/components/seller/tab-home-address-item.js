import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import Toast from 'react-native-root-toast';

import styles from '../../../css/styles';

export default class SellerAddrItemComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let _data = this.props.data;
    return (
      <View style={styles.saddr.item}>
        <Text style={styles.saddr.itemTop}>
          <Text style={styles.saddr.itemUser}>{_data.recevier}</Text>
          <Text style={styles.saddr.itemUser}>{_data.mobile}</Text>
        </Text>
        <Text style={styles.saddr.itemAddr}>{_data.addr_str}</Text>
        <View style={[styles.saddr.itemBottom, styles.common.flex]}>
          <View>
            <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.common.flexCenterv]} onPress={() => {this._setDefault()}}>
              <Image source={_data.def_addr == 1 ? require('../../../images/icon-checked.png') :require('../../../images/icon-uncheck.png')} style={styles.saddr.itemIcon}/>
              <Text style={styles.saddr.itemBtnText}>设为默认</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.common.flex, styles.common.flexEndh]}>
            <TouchableOpacity activeOpacity={.8}  style={[styles.common.flexDirectionRow, styles.common.flexCenterv]}>
              <Image source={require('../../../images/icon-addr-edit.png')} style={styles.saddr.itemIcon}/>
              <Text style={styles.saddr.itemBtnText}>编辑</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.8}  style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.saddr.itemBtn]} onPress={() => {this._delete()}}>
              <Image source={require('../../../images/icon-addr-delete.png')} style={styles.saddr.itemIcon}/>
              <Text style={styles.saddr.itemBtnText}>删除</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  _setDefault = () => {
    if(this.props.data.def_addr == 1) return;
    this.props.setDefault();
  }
  _delete = () => {
    this.props.deleteHandle();
  }
}
