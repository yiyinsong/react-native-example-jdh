/**
 *  面板：首页
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Image,
    TouchableOpacity
} from 'react-native';

import ScreenInit from '../config/screenInit';
import Utils from '../js/utils';

import styles from '../css/styles';


export default class EntranceScreen extends Component {
    componentDidMount() {
        ScreenInit.checkLogin(this);
    }
    render() {
        return (
            <View style={[styles.common.flexv, styles.entrance.wrapper]}>
              <Text style={styles.entrance.h1}>请选择你要进入的个人中心</Text>
              <Text style={styles.entrance.h5}>卖家界面和买家界面可在个人中心进行切换</Text>
              <View style={[styles.common.flex, styles.common.flexCenterh, styles.entrance.entr]}>
                <View>
                  <TouchableOpacity onPress={ () => this._selectIdentity(0) } activeOpacity={.8} style={styles.entrance.touch1}>
                    <Image source={require('../images/id-seller.png')} style={[styles.entrance.icon, {width: Utils.width * .3, height: Utils.width * .3}]} />
                    <Text style={styles.entrance.iconText}>管理电子货架</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={ () => this._selectIdentity(1) } activeOpacity={.8} style={styles.entrance.touch2}>
                    <Image source={require('../images/id-buyer.png')} style={[styles.entrance.icon, {width: Utils.width * .3, height: Utils.width * .3}]} />
                    <Text style={styles.entrance.iconText}>我要采购</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        );
    }
    _selectIdentity = (t) => {
      if(t == 0) {
        this.props.navigation.navigate('Seller');
      } else {
      }
    }
}
