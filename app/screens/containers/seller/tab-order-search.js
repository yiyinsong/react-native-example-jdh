import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  InteractionManager,
  DeviceEventEmitter,
  Modal
} from 'react-native';

import styles from '../../../css/styles';
import OrderItem from '../../components/seller/tab-order-item';
import Loading from '../../common/ui-loading';
import UIToast from '../../common/ui-toast';
import ModalConfirm from '../../common/modal-confirm';
import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';
import Utils from '../../../js/utils';

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
      canload: false,
      posCodeVisible: false,
      posCodeSrc: '',
    };
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      ScreenInit.checkLogin(this);
      this.refs.searchInput.focus();
      this.listener_deliver_success = DeviceEventEmitter.addListener('sellerOrderUpdate', (result) => {
          //如果是全部订单，则更改订单状态
          DeviceEventEmitter.emit('SellerHomeUpdate');
          this._search(this.state.keyword);
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
          <TextInput onChangeText={ text => this.setState({keyword: text})}
          value={this.state.keyword}
          underlineColorAndroid="transparent"
          style={styles.sorderSearch.input}
          placeholder="请输入订单号/商品名称"
          ref="searchInput"
          onSubmitEditing={this._submit}/>
        </View>
        <FlatList
        data={this.state.list}
        renderItem={({item}) => <OrderItem data={item} type={_type} props={this.props} refuseDeliver={(id) => this._openRefuseDeliverModal(id)} posPay={(sn) => this._posPay(sn)} confirmReceipt={(id) => DeviceEventEmitter.emit('confirmShow', {keys: 1, data: {
            text: '是否确认已收到货款？',
            confirm: (arg) => {
              this._confirmReceipt(arg);
            }
        }, params: id})}></OrderItem>}
        onRefresh={false}
        refreshing={false}
        onEndReachedThreshold={2}
        onEndReached={() => this._loadingMore()}
        ListFooterComponent={() => this._flatListFooter()}
        style={styles.common.init}/>
        <Loading visible={this.state.loadingVisible}></Loading>
        <ModalConfirm keys={2}></ModalConfirm>
        <Modal
          visible={this.state.posCodeVisible}
          animationType={'fade'}
          transparent = {true}
          onRequestClose={()=> this.setState({posCodeVisible: false})}
      >
      <TouchableOpacity activeOpacity={1} style={[styles.common.flex, styles.common.flexCenterv, styles.common.flexCenterh, styles.ewm.container]} onPress={()=>this.setState({posCodeVisible: false})}>
        <Image source={{uri: this.state.posCodeSrc}} style={{width: Utils.width * .4, height: Utils.width * .4}} resizeMode ={'contain'}/>
      </TouchableOpacity>
      </Modal>
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
    this.state.page = ++_page;
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
        let _tips = '';
        let _canload = false;
        if(_data.pageIndex < _data.totalPage) {
          _tips = '数据加载中...';
          _canload = true;
        } else {
          _tips = '没有更多数据！';
        }
        this.setState({list: _temp, tips: _tips, canload: _canload});
      }
    }).catch((error) => {
      console.log(error);
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
    requestAnimationFrame(() => {
      this._getData();
    });
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
    /**不发货**/
    _openRefuseDeliverModal = (id) => {
      DeviceEventEmitter.emit('confirmShow', {
        keys: 2,
        data: {
          text: '是否不发货？',
          confirm: (arg) => {
            this._refuseDeliver(arg);
          }
        },
        params: {
          id
        }
      });
    }
    _refuseDeliver = (arg) => {
      fetch(Config.JAVAAPI+`shop/wap/client/order/noDeliver?id=${arg.id}&token=${token}`,{
        method: 'POST'
      })
      .then(response => response.json())
      .then((_res)=>{
            if (_res.code==1) {
                UIToast('操作成功');
                DeviceEventEmitter.emit('sellerOrderUpdate');
            }else{
                UIToast(_res.message || '操作失败');
            }
        })
    }
    _submit = () => {
      this.refs.searchInput.blur();
      this._search(this.state.keyword);
    }
    _posPay = (sn) => {
      this.setState({
        posCodeVisible: true,
        posCodeSrc: `${Config.JAVAAPI}qrcode?text=${sn}&w=150`
      });
    }
    _confirmReceipt = (id) => {
      fetch(Config.JAVAAPI+`shop/wap/client/order/audit?id=${id}&token=${token}`, {
        method: 'POST'
      })
      .then(response => response.json())
      .then((_res)=>{
          if (_res.code==1) {
            DeviceEventEmitter.emit('sellerOrderUpdate');
          } else {
            UIToast('确认收款失败');
          }
      })
    }
}
