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
    Image,
    InteractionManager,
    DeviceEventEmitter,
    Modal
} from 'react-native';

import styles from '../../../css/styles';

import OrderItem from '../../components/seller/order-item';
import RefundItem from '../../components/seller/refund-item';
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
        type: 0,
        shopId: '',
        orderNumZj: {
          '-10': 0,
          '-1': 0,
          '10': 0,
          '20': 0,
          '30': 0,
          '31': 0,
          '40': 0,
          '1010': 0
        },
        orderNumJc: {
          '-10': 0,
          '-1': 0,
          '0': 0,
          '10': 0,
          '20': 0,
          '30': 0,
          '31': 0,
          '40': 0
        },
        pageZj: 0,
        pageJc: 0,
        listZj: [],
        listJc: [],
        canloadZj: false,
        canloadJc: false,
        tipsZj: '',
        tipsJc: '',

        loadingVisible: true,
        activeIndex: 0,

        posCodeVisible: false,
        posCodeSrc: '',
        bodyShow: false
      };
    }
    componentWillMount() {
      InteractionManager.runAfterInteractions(() => {
        ScreenInit.checkLogin(this);
        this._init();
        let _state = this.props.navigation.state;
        let _initType = _state.params && _state.params.type || 0;
        let _initIndex = _state.params && _state.params.index || 0;
        if(_state.params) {
          this._tabUpdate(_initType, _initIndex);
        } else {
          this._getData(_initIndex);
        }
        this.props.navigation.setParams({type: _initType});
        this.setState({ bodyShow: true });

      })
      this.listener_deliver_success = DeviceEventEmitter.addListener('sellerOrderUpdate', (result) => {
        if(this.state.type == 0) {
          //如果是全部订单，则更改订单状态
          this._reset();
          this._init();
          DeviceEventEmitter.emit('SellerHomeUpdate');
          requestAnimationFrame(()=>{
            this._getData(this.state.activeIndex);
          });
        }
      });
    }
    componentWillUnmount() {
      this.listener_deliver_success && this.listener_deliver_success.remove();
    }
    _init = () => {
        //获取店铺信息
        fetch(Config.PHPAPI + 'api/mapp/shop/shop?type=seller&token=' + token, {
          method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
          if(data.error_code == 0) {
            this.state.shopId = data.data.shop_id;
            //获取订单条数
            fetch(Config.JAVAAPI + '/shop/wap/client/order/shopOrderStatusSummary',{
                method: 'POST',
                body: JSON.stringify({
                  shopId: data.data.shop_id,
                  token
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.code == 1) {
                    this.setState({
                      orderNumZj: Object.assign(this.state.orderNumZj, data.obj['40']),
                      orderDataJc: Object.assign(this.state.orderNumJc, data.obj['31'])
                    });
                }
            });
            //获取退款订单数目
            fetch(Config.JAVAAPI + `/shop/mobile/refund/blist?orderType=40&shopId=${data.data.shop_id}&page=1&size=0&token=${token}`, {
                method: 'POST',
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.page) {
                  this.setState({
                  orderNumZj: Object.assign(this.state.orderNumZj,{
                    '-1': data.page.total
                  })
                });
              }
            });
            fetch(Config.JAVAAPI + `/shop/mobile/refund/blist?orderType=30&shopId=${data.data.shop_id}&page=1&size=0&token=${token}`, {
                method: 'POST'
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.page) {
                  this.setState({
                    orderNumJc: Object.assign(this.state.orderNumJc,{
                      '-1': data.page.total
                    })
                  });
                }
            });
          }
        })
        .catch((error) => {
        });
    }
    _reset = () => {
      this.setState({
        pageZj: 0,
        pageJc: 0,
        listZj: [],
        listJc: [],
        canloadZj: false,
        canloadJc: false,
        tipsZj: '',
        tipsJc: '',

        loadingVisible: true,
      });
    }
    _getData = (i) => {
      let _status = '';
      let _type = this.state.type;
      let payOfflineStatus = '';
      if(_type == 0) {
        let _tp = this.state.pageZj;
        _tp = ++_tp;
        this.state.pageZj = _tp;
      } else {
        let _tp = this.state.pageJc;
        _tp = ++_tp;
        this.state.pageJc = _tp;
      }
      switch(i) {
        case 0:
          _status = '';
        break;
        case 1:
          _status =  (_type == 0 ? 10 : 0);
        break;
        case 2:
          _status = 10;
          payOfflineStatus = (_type == 0 ? 10 : 0);
        break;
        case 3:
          _status = 20;
        break;
        case 4:
          _status = 30;
        break;
        case 5:
          _status = 31;
        break;
        case 6:
          _status = 40;
        break;
        case 7:
          _status = -10;
        break;
        case 8:
          _status = "";
        break;
        default:
        break;
      }
      /**如果是自建商品的退货退款**/
      if(_type == 0 && i == 8) {
        this._getRefundData(0, 8);
      }
      /**如果是分销商品的退货退款**/
      else if(_type == 1 && i == 8) {
        this._getRefundData(1, 8);
      }
      /**普通订单**/
      else {
        let _tempIndex = i;
        fetch(Config.JAVAAPI + `shop/wap/client/order/list?orderType=${_type == 1 ? 31 : 40}&status=${_status}&pageIndex=${_type == 1 ? this.state.pageJc : this.state.pageZj}&pageSize=10&token=${token}&payOfflineStatus=${payOfflineStatus}`, {
           method: 'POST'
        })
        .then((response) => response.json())
        .then((data) => {
          if(_tempIndex != this.state.activeIndex || _type != this.state.type) return;
          this.setState({loadingVisible: false});
          if(data.code == 1) {
            let _data = data.obj;
            if(_type == 0) {
              let _temp;
              if(this.state.pageZj == 1) {
                _temp = [];
              } else {
                _temp = this.state.listZj;
              }
              _temp = _temp.concat(_data.results);
              let _canload = '';
              let _tips = '';
              if(_data.pageIndex < _data.totalPage) {
                _canload = true;
                _tips = '数据加载中...';
              } else {
                _canload = false;
                _tips = '没有更多数据！';
              }
              this.setState({listZj: _temp, canloadZj: _canload, tipsZj: _tips});
            } else {
              let _temp = this.state.listJc;
              _temp = _temp.concat(_data.results);
              let _canload = '';
              let _tips = '';
              if(_data.pageIndex < _data.totalPage) {
                _canload = true;
                _tips = '数据加载中...';
              } else {
                _canload = false;
                _tips = '没有更多数据！';
              }
              this.setState({listJc: _temp, canloadJc: _canload, tipsJc: _tips});
            }
          }
        });
      }
    }
    _getRefundData = (_type, i) => {
      let _tempIndex = i;
      fetch(Config.JAVAAPI + `shop/mobile/refund/blist?orderType[0]=${_type == 1 ? 30 : 40}&status=&page=${_type == 1 ? this.state.pageJc : this.state.pageZj}&token=${token}`, {
         method: 'POST'
      })
      .then((response) => response.json())
      .then((data) => {
        if(_tempIndex != this.state.activeIndex || _type != this.state.type) return;

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
        if(_type == 0) {
          if(this.state.pageZj != 1) {
            _temp = this.state.listZj;
          }
          _temp = _temp.concat(_list);
          let _canload = this.state.canloadZj;
          let _tips = this.state.tipsZj;
          if(data.page.pageNum < data.page.pages) {
            _canload = true;
            _tips = '数据加载中...';
          } else {
            _canload = false;
            _tips = '没有更多数据！';
          }
          this.setState({listZj: _temp, canloadZj: _canload, tipsZj: _tips});
        } else {
          if(this.state.pageJc != 1) {
            _temp = this.state.listJc;
          }
          _temp = _temp.concat(_list);
          let _canload = this.state.canloadJc;
          let _tips = this.state.tipsJc;
          if(data.page.pageNum < data.page.pages) {
            _canload = true;
            _tips = '数据加载中...';
          } else {
            _canload = false;
            _tips = '没有更多数据！';
          }
          this.setState({listJc: _temp, canloadJc: _canload, tipsJc: _tips});
        }
    });
    }

    _loadingMore = (p) => {
      if(this.state.type == 0) {
        if(this.state.canloadZj) {
          this._getData(p);
        }
      } else {
        if(this.state.canloadJc) {
          this._getData(p);
        }
      }
    }
    render() {
        let _type = this.state.type;
        let _orderNumZj = this.state.orderNumZj;
        let _orderNumJc = this.state.orderNumJc;
        return (
            <View style={[styles.common.flexv, styles.common.init]}>
              {this.state.bodyShow ?
              <View style={styles.common.flexv}>
                <View style={styles.sorder.type}>
                  <View style={[styles.sorder.typeWrapper, styles.common.flexDirectionRow]}>
                    <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.sorder.typeItem, _type == 0 ? styles.sorder.typeItemActive : null]} onPress={() => {this._selectType(0, 0)}}><Text style={[styles.sorder.typeText, _type == 0 ? styles.sorder.typeTextActive : null]}>自建商品</Text></TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.sorder.typeItem, _type == 1 ? styles.sorder.typeItemActive : null]} onPress={() => {this._selectType(1, 0)}}><Text style={[styles.sorder.typeText, _type == 1 ? styles.sorder.typeTextActive : null]}>分销商品</Text></TouchableOpacity>
                  </View>
                </View>
                {this.state.type == 0 ?
                <View style={styles.common.flexv}>
                  <View style={styles.sorder.tab}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref="scrollViewZj">
                      { this._renderTab(0, '全部订单', false, 0)}
                      { this._renderTab(1, '待买家付款', _orderNumZj['10'], Utils.width/4 * .5 + 28)}
                      { this._renderTab(2, '待确认收款', _orderNumZj['1010'], Utils.width/4 * .5 + 28)}
                      { this._renderTab(3, '待发货', _orderNumZj['20'], Utils.width/4 * .5 + 15)}
                      { this._renderTab(4, '已发货', _orderNumZj['30'], Utils.width/4 * .5 + 15)}
                      { this._renderTab(5, '已收货', _orderNumZj['31'], Utils.width/4 * .5 + 15)}
                      { this._renderTab(6, '已完成', _orderNumZj['40'], Utils.width/4 * .5 + 15)}
                      { this._renderTab(7, '已取消', _orderNumZj['-10'], Utils.width/4 * .5 + 15)}
                      { this._renderTab(8, '退货退款', _orderNumZj['-1'], Utils.width/4 * .5 + 20)}
                    </ScrollView>
                  </View>
                  <FlatList
                    data={this.state.listZj}
                    renderItem={({item}) => this.state.activeIndex == 8 ? <RefundItem data={item} type={_type} props={this.props}></RefundItem> : <OrderItem
                    data={item}
                    type={_type}
                    props={this.props}
                    index={3}
                    refuseDeliver={(id) => this._openRefuseDeliverModal(id)}
                    confirmReceipt={(sn) => DeviceEventEmitter.emit('confirmShow', {keys: 1, data: {
                        text: '是否确认已收到货款？',
                        confirm: (arg) => {
                          this._confirmReceipt(arg);
                        }
                    }, params: sn})}
                    ></OrderItem>
                  }
                    onRefresh={false}
                    refreshing={false}
                    onEndReachedThreshold={.1}
                    onEndReached={() => this._loadingMore(this.state.activeIndex)}
                    ListFooterComponent={this._flatListFooter}
                    style={styles.common.init}/>
                </View>
                :
                <View style={styles.common.flexv}>
                  <View style={styles.sorder.tab}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref="scrollViewJc">
                      { this._renderTab(0, '全部订单', false, 0)}
                      { this._renderTab(1, '待买家付款', _orderNumJc['0'], Utils.width/4 * .5 + 28)}
                      { this._renderTab(2, '待采购', _orderNumJc['10'], Utils.width/4 * .5 + 15)}
                      { this._renderTab(3, '待发货', _orderNumJc['20'], Utils.width/4 * .5 + 15)}
                      { this._renderTab(4, '已发货', _orderNumJc['30'], Utils.width/4 * .5 + 15)}
                      { this._renderTab(5, '已收货', _orderNumJc['31'], Utils.width/4 * .5 + 15)}
                      { this._renderTab(6, '已完成', _orderNumJc['40'], Utils.width/4 * .5 + 15)}
                      { this._renderTab(7, '已取消', _orderNumJc['-10'], Utils.width/4 * .5 + 15)}
                      { this._renderTab(8, '退货退款', _orderNumJc['-1'], Utils.width/4 * .5 + 20)}
                    </ScrollView>
                  </View>
                  <FlatList
                    data={this.state.listJc}
                    renderItem={({item}) => this.state.activeIndex == 8 ? <RefundItem data={item} type={_type} props={this.props}></RefundItem> : <OrderItem data={item} type={_type} props={this.props} index={3} posPay={(sn) => this._posPay(sn)}></OrderItem>}
                    onRefresh={false}
                    refreshing={false}
                    onEndReachedThreshold={2}
                    onEndReached={() => this._loadingMore(this.state.activeIndex)}
                    ListFooterComponent={this._flatListFooter}
                    style={styles.common.init}/>
                </View>}
                <Loading visible={this.state.loadingVisible}></Loading>
                <ModalConfirm keys={1}></ModalConfirm>
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
            : null}
            <RefundStatusList index={3} props={this.props} type={1}/>
            <RefundOnlyStatusList index={3} props={this.props} type={1}/>
          </View>
        );
    }
    _selectType = (t, index) => {
      if(this.state.type == t) return;
      this._reset();
      this.setState({activeIndex: index, type: t});
      this.props.navigation.setParams({type: t});
      requestAnimationFrame(()=>{
        if(t == 0) {
          this.refs.scrollViewZj.scrollTo(0, 0);
        } else {
          this.refs.scrollViewJc.scrollTo(0, 0);
        }
        this._getData(0);
      });
    }
    _tabUpdate = (t, index) => {
      this._reset();
      this.setState({activeIndex: index, type: t});
      this.props.navigation.setParams({type: t});
      requestAnimationFrame(()=>{
        if(t == 0) {
          this.refs.scrollViewZj.scrollTo({x: Utils.width / 4 * (index-1), y: 0, animated: false});
        } else {
          this.refs.scrollViewJc.scrollTo({x: Utils.width / 4 * (index-1), y: 0, animated: false});
        }
        this._getData(index);
      });
    }
    _flatListFooter = () => {
      if(this.state.type == 0) {
        return (
          <Text style={styles.common.loadingTips}>{this.state.tipsZj != '' ? this.state.tipsZj : null}</Text>
        )
      } else {
        return (
          <Text style={styles.common.loadingTips}>{this.state.tipsJc != '' ? this.state.tipsJc : null}</Text>
        )
      }
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
        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(i)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == i ? styles.sorder.tabActive : '']}>
          <View>
            <Text style={[styles.sorder.tabText, this.state.activeIndex == i ? styles.sorder.tabActiveText : '']}>{txt}</Text>
            {badge && badge > 0 ?
              <View style={[styles.sorder.tabBadge, {left: bageLeft}]}>
                <Text style={styles.sorder.tabBadgeText}>{badge}</Text>
              </View>
            : null}
          </View>
        </TouchableOpacity>
      )
    }
    /**不发货**/
    _openRefuseDeliverModal = (id) => {
      DeviceEventEmitter.emit('confirmShow', {
        keys: 1,
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
                this._reset();
                this._init();
                requestAnimationFrame(()=>{
                  this._getData(this.state.activeIndex);
                });
            }else{
                UIToast(_res.message || '操作失败');
            }
        })
    }
    _posPay = (sn) => {
      this.setState({
        posCodeVisible: true,
        posCodeSrc: `${Config.JAVAAPI}qrcode?text=${sn}&w=150`
      });
    }
    _confirmReceipt = (sn) => {
      fetch(Config.JAVAAPI+`shop/wap/client/order/audit?orderSn=${sn}&token=${token}`, {
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
