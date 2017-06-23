import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import styles from '../../../css/styles';

export default class SellerAddrItemComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.saddr.item}>
        <Text style={styles.saddr.itemTop}>
          <Text style={styles.saddr.itemUser}>canon</Text>
          <Text style={styles.saddr.itemUser}>13414545745</Text>
        </Text>
        <Text style={styles.saddr.itemAddr}>打开的房间开始放假看电视剧付款</Text>
        <View style={[styles.saddr.itemBottom, styles.common.flex]}>
          <View>
            <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.common.flexCenterv]}>
              <Image source={require('../../../images/icon-uncheck.png')} style={styles.saddr.itemIcon}/>
              <Text style={styles.saddr.itemBtnText}>设为默认</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.common.flex, styles.common.flexEndh]}>
            <TouchableOpacity activeOpacity={.8}  style={[styles.common.flexDirectionRow, styles.common.flexCenterv]}>
              <Image source={require('../../../images/icon-addr-edit.png')} style={styles.saddr.itemIcon}/>
              <Text style={styles.saddr.itemBtnText}>编辑</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.8}  style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.saddr.itemBtn]}>
              <Image source={require('../../../images/icon-addr-delete.png')} style={styles.saddr.itemIcon}/>
              <Text style={styles.saddr.itemBtnText}>删除</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
