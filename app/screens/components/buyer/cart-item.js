import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  DeviceEventEmitter,
  TextInput
} from 'react-native';

import styles from '../../../css/styles';

export default class BuyerCartItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      pindex: this.props.pindex,
      checked: false,
      num: this.props.data.qty
    }
  }
  componentWillMount() {
    this.listener_check = DeviceEventEmitter.addListener('buyerCartCheck', (r) => {
      if(!r.all && this.state.pindex !== r.index) return;
      this.setState({checked: r.checked});
    });
  }
  componentWillUnmount() {
    this.listener_check && this.listener_check.remove();
  }
  render() {
    let _data = this.props.data;
    return (
      <View style={styles.cart.item}>
        <TouchableOpacity activeOpacity={.8} onPress={this._checkedItem}>
        {this.state.checked ?
          <Image source={require('../../../images/icon-checked.png')} style={styles.control.checked}/>
          : <View style={[styles.control.checkbox]}></View>
        }
        </TouchableOpacity>
        <View style={[styles.common.flex]}>
          <Image source={{uri: _data.sku.small_img}} style={styles.cart.img}/>
          <View style={styles.common.flexv}>
            <Text numberOfLines={2} style={styles.cart.goodsName}>{_data.sku.goods_name}</Text>
            <Text style={styles.cart.attr} numberOfLines={1}>{_data.sku.attr_name}</Text>
            <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv]}>
              <Text style={[styles.common.flex, styles.cart.price]}>￥{_data.price}</Text>
              <View style={[styles.common.flexDirectionRow, styles.cart.num]}>
                <TouchableHighlight underlayColor='#f5f5f5' onPress={this._sub}>
                  <Text style={styles.cart.calSub}>-</Text>
                </TouchableHighlight>
                <TextInput onChangeText={(text) => {_data.qty=text;this.setState({num: text})}} underlineColorAndroid="transparent" value={_data.qty.toString()} style={styles.cart.numInput} keyboardType='numeric' onBlur={this._blur}/>
                <TouchableHighlight underlayColor='#f5f5f5' onPress={this._add}>
                  <Text style={styles.cart.calAdd}>+</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
  _checkedItem = () => {
    let _ori = !this.state.checked;
    this.setState({
      checked: _ori
    });
    this.props.checkFunc && this.props.checkFunc(_ori, this.state.index, this.state.pindex);
  }
  _sub = () => {
    if(this.props.data.qty < 2) return;
    this.props.sub && this.props.sub();
  }
  _add = () => {
    this.props.add && this.props.add();
  }
  _blur = () => {
    if(!/^\d+$/.test(this.props.data.qty)) {
      this.props.data.qty = 1;
      this.setState({num: 1});
    }
    this.props.blur && this.props.blur();
  }
}
