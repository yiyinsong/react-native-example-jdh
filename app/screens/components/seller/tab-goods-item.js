import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  DeviceEventEmitter
} from 'react-native';

import styles from '../../../css/styles';

export default class SellerGoodsItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      checked: false
    }
  }
  componentWillMount() {
    this.listener_check = DeviceEventEmitter.addListener('sellerGoodsCheck', (r) => {
      this.setState({checked: r.checked});
    });
  }
  componentWillUnmount() {
    this.listener_check && this.listener_check.remove();
  }
  render() {
    let _data = this.props.data;
    return (
      <View style={[styles.sgoods.item, styles.common.flexDirectionRow, styles.common.flexCenterv]}>
          <TouchableOpacity style={styles.sgoods.iteml} onPress={this._checkedItem}>
            {this.state.checked ?
              <Image source={require('../../../images/icon-checked-blue.png')} style={styles.control.checked} />
              : <View style={styles.control.checkbox}></View>}
          </TouchableOpacity>
          <TouchableHighlight style={styles.common.flex} underlayColor='#fafafa' onPress={() => this._toDetail()}>
            <View style={styles.common.flexDirectionRow}>
              <Image source={{uri: _data.goods_img1}} style={styles.sgoods.img}/>
              <View style={styles.common.flexv}>
                <Text style={styles.sgoods.text} numberOfLines={2}>{_data.goods_name}</Text>
                <Text style={styles.sgoods.textGray}>价格：<Text style={styles.sgoods.price}>{this.state.index==2 ? _data.price : _data.min_price}</Text></Text>
                <Text style={styles.sgoods.textGray}>库存：<Text style={styles.sgoods.stock}>{_data.inventory_num}</Text></Text>
              </View>
            </View>
          </TouchableHighlight>
      </View>
    )
  }
  _checkedItem = () => {
    let _ori = !this.state.checked;
    this.setState({
      checked: _ori
    });
    DeviceEventEmitter.emit('sellerGoodsItemCheck', {checked: _ori});
  }
  _toDetail = () => {

  }
}
