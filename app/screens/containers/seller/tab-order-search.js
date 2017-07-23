import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  InteractionManager,
  DeviceEventEmitter
} from 'react-native';

import styles from '../../../css/styles';
import OrderItem from '../../components/seller/tab-order-item';
import Loading from '../../common/ui-loading';
import UIToast from '../../common/ui-toast';
import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';

export default class OrderSearchScreen extends Component {
  constructor(props) {
    super(props);
    let _query = this.props.navigation.state.params;
    this.state = {
      keyword: '',
      tips: '',
      type: _query.type,
      list: [],
      page: 0,
      loadingVisible: false,
      canload: false
    };
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      ScreenInit.checkLogin(this);
      this.listener_deliver_success = DeviceEventEmitter.addListener('deliverSuccess', (result) => {
        if(this.state.type == 0) {
          //如果是全部订单，则更改订单状态
          this._search(this.state.keyword);
        }
      });
    });
  }
  componentWillUnmount() {
    this.listener_deliver_success && this.listener_deliver_success.remove();
  }
  render() {
    let _type = this.state.type;
    return (
      <View style={[styles.common.flexv, styles.common.initWhite]}>
        <View style={styles.sorderSearch.inputContainer}>
          <TextInput onChangeText={ text => this._search(text)} value={this.state.keyword} underlineColorAndroid="transparent" style={styles.sorderSearch.input} autoFocus={true} placeholder="请输入订单号/商品名称"/>
        </View>
        <FlatList
        data={this.state.list}
        renderItem={({item}) => <OrderItem data={item} type={_type} props={this.props}></OrderItem>}
        onRefresh={false}
        refreshing={false}
        onEndReachedThreshold={2}
        onEndReached={() => this._loadingMore()}
        ListFooterComponent={() => this._flatListFooter()}
        style={styles.common.init}/>
        <Loading visible={this.state.loadingVisible}></Loading>
      </View>
    );
  }
  _getData = () => {
    let _type = this.state.type;
    let _page = this.state.page;
    let _kw = this.state.keyword;
    if(_page == 0) {
      this.setState({loadingVisible: true});
    }
    this.setState({page: ++_page});
    fetch(Config.JAVAAPI + `shop/wap/client/order/list?orderType=${_type == 1 ? 31 : 40}&keyword=${_kw}&pageIndex=${_page}&pageSize=10&token=${token}`, {
       method: 'POST'
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({loadingVisible: false});
      if(data.code == 1) {
        let _data = data.obj;
        let _temp = this.state.list;
        _temp = _temp.concat(_data.results);
        this.setState({
          list: _temp
        });
        let _tips = '';
        let _canload = false;
        if(_data.pageIndex < _data.totalPage) {
          _tips = '数据加载中...';
          _canload = true;
        } else {
          _tips = '没有更多数据！';
        }
        this.setState({tips: _tips, canload: _canload});
      }
    });
  }
  _search = (text) => {
    this.setState({
      keyword: text,
      list: [],
      page: 0,
      tips: '',
      _canload: false
    });
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this._getData();
    }, 800);
  }
  _loadingMore = () => {
      if(!this.state.canload) return;
        this._getData();
  }
  _flatListFooter = () => {
      return (
        <Text style={styles.common.loadingTips}>{this.state.tips != '' ? this.state.tips : null}</Text>
      )
    }
}
