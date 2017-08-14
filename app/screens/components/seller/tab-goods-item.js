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
      sub: this.props.sub,
      checked: false
    }
  }
  componentWillMount() {
    this.listener_check = DeviceEventEmitter.addListener('sellerGoodsCheck', (r) => {
      if(this.state.index !== r.index) return;
      this.setState({checked: r.checked});
    });
  }
  componentWillUnmount() {
    this.listener_check && this.listener_check.remove();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.checked !== nextState.checked;
  }
  render() {
    let _data = this.props.data;
    return (
      <View style={[styles.sgoods.item, styles.common.flexDirectionRow, styles.common.flexCenterv]}>
          {this.state.index !== 2 ?
            <TouchableOpacity style={styles.sgoods.iteml} onPress={this._checkedItem}>
              {this.state.checked ?
                <Image source={require('../../../images/icon-checked-blue.png')} style={styles.control.checked} />
                : <View style={styles.control.checkbox}></View>}
            </TouchableOpacity>
            : null
          }
          <TouchableHighlight style={styles.common.flex} underlayColor='#fafafa' onPress={() => this._toDetail(_data.goods_id)}>
            <View style={styles.common.flexDirectionRow}>
              <Image source={{uri: _data.goods_img1}} style={styles.sgoods.img}/>
              <View style={styles.common.flexv}>
                  <Text style={styles.sgoods.text} numberOfLines={2}>{_data.goods_name}</Text>
                  {
                    this.state.index != 2 ? <Text style={styles.sgoods.textGray}>价格：<Text style={styles.sgoods.price}>{this.state.index==1 ? _data.price : _data.min_price}</Text></Text> : <Text style={styles.sgoods.textGray}></Text>
                  }
                  <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv]}>
                  {
                    this.state.index != 2 ? <Text style={[styles.common.flex, styles.sgoods.textGray]}>库存：<Text style={styles.sgoods.stock}>{_data.inventory_num}</Text></Text> : <Text style={[styles.common.flex, styles.sgoods.textGray]}></Text>
                  }
                  {
                    this.state.index == 1 && _data.is_freeze == 1 ? <Text style={styles.sgoods.itemTips}>商品已冻结</Text> : null
                  }
                  {
                    (this.state.index === 0 && this.state.sub !== 2 && _data.is_freeze != 1) || (this.state.index === 1 && this.state.sub === 0 && _data.is_freeze != 1) ?
                      <TouchableOpacity activeOpacity={.8} onPress={() => this._toEdit(_data.goods_id)} style={[styles.common.flexDirectionRow, styles.common.flexCenterv]}>
                        <Image source={require('../../../images/icon-edit.png')} style={styles.sgoods.itemEdit} />
                        <Text style={styles.sgoods.itemEditText}>编辑</Text>
                      </TouchableOpacity>
                    : null
                  }
                  {
                    this.state.index == 2 ?
                      <TouchableHighlight underlayColor='#fafafa' onPress={() => this._copy(_data.goods_id)}>
                      <Text style={[styles.btn.primary, styles.sgoods.copyBtn]}>复制商品</Text>
                      </TouchableHighlight>
                    : null
                  }
                </View>
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
    this.props.checkFunc && this.props.checkFunc(_ori);
  }
  _toDetail = (id) => {
    if(this.state.index === 2 || this.state.sub == 2) return;
    if(this.state.index == 1) {

    } else {
      this.props.props.navigation.navigate('SellerGoodsDetail', {
        id,
        type: this.state.index == 0 ? 2 : 1
      });
    }
  }
  _toEdit = (id) => {
    this.props.props.navigation.navigate('SellerGoodsEdit', {
      id,
      type: this.state.index + 1
    });
  }
  _copy = (id) => {
    this.props.copyGoods && this.props.copyGoods(id);
  }
}
