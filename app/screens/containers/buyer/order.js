/**
 * component list
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    InteractionManager,
    DeviceEventEmitter,
    Modal
} from 'react-native';

import styles from '../../../css/styles';

import OrderItem from '../../components/buyer/order-item';
import RefundItem from '../../components/buyer/refund-item';
import Loading from '../../common/ui-loading';
import UIToast from '../../common/ui-toast';
import ModalConfirm from '../../common/modal-confirm';
import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';
import Utils from '../../../js/utils';

import RefundStatusList from '../../components/buyer/order-refund-status';
import RefundOnlyStatusList from '../../components/buyer/order-refund-only-status';

export default class OrderListScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        orderNum: {
          '10': 0,
          '20': 0,
          '30': 0,
          '31': 0,
          '40': 0,
          '-1': 0
        },
        page: 0,
        list: [],
        canload: false,
        tips: '',
        loadingVisible: false,
        activeIndex: 0,
        bodyShow: false,
        refundStatus: '',
        refundStatusList: [],
        refundOnlyStatusList: [],
      };
    }
    componentWillMount() {
      InteractionManager.runAfterInteractions(() => {
        ScreenInit.checkLogin(this);
        this._init();
        let _state = this.props.navigation.state;
        let _initIndex = _state.params && _state.params.index || 0;
        if(_state.params) {
          this._tabUpdate(_initIndex);
        } else {
          this._getData(_initIndex);
        }
        this.setState({ bodyShow: true });
      });
      this.listener_update = DeviceEventEmitter.addListener('BuyerOrderUpdate', result => {
        this._reset(true);
        this._init();
        DeviceEventEmitter.emit('BuyerHomeUpdate');
        requestAnimationFrame(()=>{
          this._getData(this.state.activeIndex, true);
        });
      });
    }
    componentWillUnmount() {
      this.listener_update && this.listener_update.remove();
    }
    _init = () => {
      //获取订单条数
      fetch(Config.JAVAAPI + 'shop/wap/order/shopOrderStatusSummary',{
          method: 'POST',
          body: JSON.stringify({
            token
          })
      })
      .then((response) => response.json())
      .then((data) => {
          if (data.code == 1) {
              this.setState({
                orderNum: Object.assign(this.state.orderNum, data.obj),
              });
          }
      });
      //获取退款订单数目
      fetch(Config.JAVAAPI + `/shop/mobile/refund/list?orderType[0]=10&orderType[1]=20&page=1&size=0&token=${token}`, {
          method: 'POST',
      })
      .then((response) => response.json())
      .then((data) => {
          if(data.page) {
            this.setState({
            orderNum: Object.assign(this.state.orderNum,{
              '-1': data.page.total
            })
          });
        }
      });
    }
    _reset = (notEmptyList) => {
      this.setState({
        page: 0,
        list: notEmptyList ? this.state.list :[],
        canload: false,
        tips: '',
        loadingVisible: true,
      });
    }
    _getData = (i, notEmptyList) => {
      let _status = '';
      let payOfflineStatus = '';
      let _tp = this.state.page;
      _tp = ++_tp;
      this.state.page = _tp;
      switch(i) {
        case 0:
          _status = '';
        break;
        case 1:
          _status =  10;
        break;
        case 2:
          _status = 20;
        break;
        case 3:
          _status = 30;
        break;
        case 4:
          _status = 31;
        break;
        case 5:
          _status = 40;
        break;
        case 6:
          _status = '';
        break;
        default:
        break;
      }
      /**如果是自建商品的退货退款**/
      if(i == 6) {
        this._getRefundData(0, 6);
      }
      /**普通订单**/
      else {
        let _tempIndex = i;
        fetch(Config.JAVAAPI + `shop/wap/order/list?status=${_status}&pageIndex=${this.state.page}&pageSize=10&token=${token}`, {
           method: 'POST'
        })
        .then((response) => response.json())
        .then((data) => {
          if(_tempIndex != this.state.activeIndex) return;
          this.setState({loadingVisible: false});
          if(data.code == 1) {
            let _data = data.obj;
            let _temp;
            if(this.state.page == 1) {
              _temp = [];
            } else {
              _temp = this.state.list;
            }
            if(notEmptyList) {
              _temp = _data.results;
            } else {
              _temp = _temp.concat(_data.results);
            }
            let _canload = '';
            let _tips = '';
            if(_data.pageIndex < _data.totalPage) {
              _canload = true;
              _tips = '数据加载中...';
            } else {
              _canload = false;
              _tips = '没有更多数据！';
            }
            this.setState({list: _temp, canload: _canload, tips: _tips});
          }
        });
      }
    }
    _getRefundData = (_type, i) => {
      let _tempIndex = i;
      fetch(Config.JAVAAPI + `shop/mobile/refund/list?orderType[0]=10&orderType[1]=20&page=${this.state.page}&token=${token}`, {
         method: 'POST'
      })
      .then((response) => response.json())
      .then((data) => {
        if(_tempIndex != this.state.activeIndex) return;

        this.setState({loadingVisible: false});
        let _list = data.page.list;

        _list.forEach((v, k) => {
            switch(v.status) {
                case -10:
                    v.statusName = '退款失败';
                break;
                case 0:
                    v.statusName = '退款关闭';
                break;
                case 10:
                    v.statusName = '待审核';
                break;
                case 20:
                    v.statusName = '待买家退货';
                break;
                case 30:
                    v.statusName = '退货待退款';
                break;
                case 40:
                    if(v.payStatus == 1) {
                        v.statusName = '退款中';
                    } else if(v.payStatus == 2) {
                        v.statusName = '退款失败';
                    } else if(v.payStatus == 3) {
                        v.statusName = '退款成功';
                    } else if(v.payStatus == 4) {
                        v.statusName = '线下退款';
                    } else if(v.payStatus == 5) {
                        v.statusName = '待退款';
                    } else {
                        v.statusName = '同意退货退款';
                    }
                break;
                case 50:
                    v.statusName = '卖家拒绝退款';
                break;
                case 60:
                    v.statusName = '待平台介入';
                break;
                default:
                    v.statusName = '';
                break;
            }
        });
        let _temp = [];
        if(this.state.page != 1) {
          _temp = this.state.list;
        }
        _temp = _temp.concat(_list);
        let _canload = this.state.canload;
        let _tips = this.state.tips;
        if(data.page.pageNum < data.page.pages) {
          _canload = true;
          _tips = '数据加载中...';
        } else {
          _canload = false;
          _tips = '没有更多数据！';
        }
        this.setState({list: _temp, canload: _canload, tips: _tips});
    })
    .catch( err => {
    });
    }

    _loadingMore = (p) => {
      if(this.state.canload) {
        this._getData(p);
      }
    }
    render() {
        let _orderNum = this.state.orderNum;
        return (
            <View style={[styles.common.flexv, styles.common.init]}>
              {this.state.bodyShow ?
              <View style={styles.common.flexv}>
                <View style={styles.common.flexv}>
                  <View style={styles.sorder.tab}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref="scrollView">
                      { this._renderTab(0, '全部订单', false, 0)}
                      { this._renderTab(1, '待付款', _orderNum['10'], Utils.width/4 * .5 + 15)}
                      { this._renderTab(2, '待发货', _orderNum['20'], Utils.width/4 * .5 + 15)}
                      { this._renderTab(3, '待收货', _orderNum['30'], Utils.width/4 * .5 + 15)}
                      { this._renderTab(4, '已收货', _orderNum['31'], Utils.width/4 * .5 + 15)}
                      { this._renderTab(5, '交易完成', _orderNum['40'], Utils.width/4 * .5 + 20)}
                      { this._renderTab(6, '退货退款', _orderNum['-1'], Utils.width/4 * .5 + 20)}
                    </ScrollView>
                  </View>
                  <FlatList
                    data={this.state.list}
                    renderItem={({item}) => this.state.activeIndex == 6 ? <RefundItem data={item} props={this.props}></RefundItem> : <OrderItem
                    index={0}
                    data={item}
                    props={this.props}
                    confirmReceiptGoods={() => {this._confirmReceiptGoods(item.id)}}
                    cancel={() => {this._cancel(item.mainOrderSn || item.orderSn)}}
                    getItemLayout={(data, index) => ( {length: 208, offset: 208 * index, index} )}
                    ></OrderItem>
                  }
                    onRefresh={false}
                    refreshing={false}
                    onEndReachedThreshold={2}
                    onEndReached={() => this._loadingMore(this.state.activeIndex)}
                    ListFooterComponent={this._flatListFooter}
                    style={styles.common.init}/>
                </View>
                <Loading visible={this.state.loadingVisible}></Loading>
                <ModalConfirm keys={8}></ModalConfirm>
                <RefundStatusList index={0} props={this.props} type={0}/>
                <RefundOnlyStatusList index={0} props={this.props} type={0}/>
              </View>
              : null}
          </View>
        );
    }
    _tabUpdate = (index) => {
      this._reset();
      this.setState({activeIndex: index});
      requestAnimationFrame(()=>{
        this.refs.scrollView.scrollTo({x: Utils.width / 4 * (index-1), y: 0, animated: false});
        this._getData(index);
      });
    }
    _flatListFooter = () => {
        return (
          <Text style={styles.common.loadingTips}>{this.state.tips != '' ? this.state.tips : null}</Text>
        )
    }
    _tabHandle = (k) => {
        this._reset();
        this.state.activeIndex = k;
        requestAnimationFrame(()=>{
          this._getData(k);
        });
    }
    /**渲染tab**/
    _renderTab = (i, txt, badge, bageLeft) => {
      return (
        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(i)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == i ? styles.order.tabActive : '']}>
          <View>
            <Text style={[styles.sorder.tabText, this.state.activeIndex == i ? styles.order.tabActiveText : '']}>{txt}</Text>
            {badge && badge > 0 ?
              <View style={[styles.sorder.tabBadge, {left: bageLeft}]}>
                <Text style={styles.sorder.tabBadgeText}>{badge}</Text>
              </View>
            : null}
          </View>
        </TouchableOpacity>
      )
    }
    _cancel = (sn) => {
      DeviceEventEmitter.emit('confirmShow', {
        keys: 8,
        data: {
          text: '是否确认取消订单？',
          confirm: (arg) => {
            this._deleteConfirm(arg);
          }
        },
        params: {
          sn,
        }
      });
    }
    _deleteConfirm = (arg) => {
      fetch(Config.JAVAAPI + `shop/wap/order/cancel?orderSn=${arg.sn}&token=${token}`, {
        method: 'POST'
      })
      .then(response => response.json())
      .then( r => {
        if(r.code == 1) {
          DeviceEventEmitter.emit('BuyerOrderUpdate');
        }
      });
    }
    _confirmReceiptGoods = (id) => {
      DeviceEventEmitter.emit('confirmShow', {
        keys: 8,
        data: {
          text: '确认收货？',
          confirm: (arg) => {
            fetch(Config.JAVAAPI + `shop/wap/order/receive?id=${arg.id}&token=${token}`, {
              method: 'POST'
            })
            .then(response => response.json())
            .then( r => {
              if(r.code == 1) {
                DeviceEventEmitter.emit('BuyerOrderUpdate');
              }
            });
          }
        },
        params: {
          id,
        }
      });
    }
}
