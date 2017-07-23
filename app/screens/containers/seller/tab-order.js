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
    DeviceEventEmitter
} from 'react-native';

import styles from '../../../css/styles';

import OrderItem from '../../components/seller/tab-order-item';
import RefundItem from '../../components/seller/tab-refund-item';
import Loading from '../../common/ui-loading';

import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';
import Utils from '../../../js/utils';

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
          '40': 0
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
        activeIndex: 0
      };
    }
    componentWillMount() {
      InteractionManager.runAfterInteractions(() => {
        ScreenInit.checkLogin(this);
        this._init();
        let _state = this.props.navigation.state;
        let _initType = _state.params && _state.params.type || 0;
        let _initIndex = _state.params && _state.params.index || 0;

        this._getData(_initIndex);
        this.props.navigation.setParams({type: _initType});
      })
      this.listener_deliver_success = DeviceEventEmitter.addListener('deliverSuccess', (result) => {
        if(this.state.type == 0) {
          //如果是全部订单，则更改订单状态
          this._reset();
          this._init();
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
            this.setState({shopId: data.data.shop_id});
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
          console.error(error);
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
      if(_type == 0) {
        let _tp = this.state.pageZj;
        _tp = ++_tp;
        this.setState({pageZj: _tp});
      } else {
        let _tp = this.state.pageJc;
        _tp = ++_tp;
        this.setState({pageJc: _tp});
      }
      switch(i) {
        case 0:
          _status = '';
        break;
        case 1:
          _status =  (_type == 0 ? 10 : 0);
        break;
        case 2:
          _status = (_type == 0 ? 20 : 10);
        break;
        case 3:
          _status = (_type == 0 ? 30 : 20);
        break;
        case 4:
          _status = (_type == 0 ? 31 : 30);
        break;
        case 5:
          _status = (_type == 0 ? 40 : 31);
        break;
        case 6:
          _status = (_type == 0 ? -10 : 40);
        break;
        case 7:
          _status = (_type == 0 ? '' : -10);
        break;
        case 8:
          _status = (_type == 0 ? '' : '');
        break;
        default:
        break;
      }
      /**如果是自建商品的退货退款**/
      if(_type == 0 && i == 7) {
        this._getRefundData(0, 7);
      }
      /**如果是即采商品的退货退款**/
      else if(_type == 1 && i == 8) {
        this._getRefundData(1, 8);
      }
      /**普通订单**/
      else {
        let _tempIndex = i;
        fetch(Config.JAVAAPI + `shop/wap/client/order/list?orderType=${_type == 1 ? 31 : 40}&status=${_status}&pageIndex=${_type == 1 ? this.state.pageJc : this.state.pageZj}&pageSize=10&token=${token}`, {
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
              this.setState({
                listZj: _temp
              });
              let _canload = '';
              let _tips = '';
              if(_data.pageIndex < _data.totalPage) {
                _canload = true;
                _tips = '数据加载中...';
              } else {
                _canload = false;
                _tips = '没有更多数据！';
              }
              this.setState({canloadZj: _canload, tipsZj: _tips});
            } else {
              let _temp = this.state.listJc;
              _temp = _temp.concat(_data.results);
              this.setState({
                listJc: _temp
              });
              let _canload = '';
              let _tips = '';
              if(_data.pageIndex < _data.totalPage) {
                _canload = true;
                _tips = '数据加载中...';
              } else {
                _canload = false;
                _tips = '没有更多数据！';
              }
              this.setState({canloadJc: _canload, tipsJc: _tips});
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
        if(data.orders) {
            data.orders.forEach((v, k) =>{
                _list.forEach((v1, k1) => {
                    if(v1.orderId == v.id) {
                        _list[k1].goods = v.goods;
                    }
                });
            });
        }

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
          this.setState({
            listZj: _temp
          });
          let _canload = this.state.canloadZj;
          let _tips = this.state.tipsZj;
          if(data.page.pageNum < data.page.pages) {
            _canload = true;
            _tips = '数据加载中...';
          } else {
            _canload = false;
            _tips = '没有更多数据！';
          }
          this.setState({canloadZj: _canload, tipsZj: _tips});
        } else {
          if(this.state.pageJc != 1) {
            _temp = this.state.listZj;
          }
          _temp = _temp.concat(_list);
          this.setState({
            listJc: _temp
          });
          let _canload = this.state.canloadJc;
          let _tips = this.state.tipsJc;
          if(data.page.pageNum < data.page.pages) {
            _canload = true;
            _tips = '数据加载中...';
          } else {
            _canload = false;
            _tips = '没有更多数据！';
          }
          this.setState({canloadJc: _canload, tipsJc: _tips});
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
        return (
            <View style={[styles.common.flexv, styles.common.init]}>
              <View style={styles.sorder.type}>
                <View style={[styles.sorder.typeWrapper, styles.common.flexDirectionRow]}>
                  <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.sorder.typeItem, _type == 0 ? styles.sorder.typeItemActive : null]} onPress={() => {this._selectType(0)}}><Text style={[styles.sorder.typeText, _type == 0 ? styles.sorder.typeTextActive : null]}>自建商品</Text></TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.sorder.typeItem, _type == 1 ? styles.sorder.typeItemActive : null]} onPress={() => {this._selectType(1)}}><Text style={[styles.sorder.typeText, _type == 1 ? styles.sorder.typeTextActive : null]}>即采商品</Text></TouchableOpacity>
                </View>
              </View>
              {this.state.type == 0 ?
              <View style={styles.common.flexv}>
                <View style={styles.sorder.tab}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref="scrollViewZj">
                        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(0)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == 0 ? styles.sorder.tabActive : '']}>
                          <View>
                            <Text style={[styles.sorder.tabText, this.state.activeIndex == 0 ? styles.sorder.tabActiveText : '']}>全部订单</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(1)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == 1 ? styles.sorder.tabActive : '']}>
                          <View>
                            <Text style={[styles.sorder.tabText, this.state.activeIndex == 1 ? styles.sorder.tabActiveText : '']}>待买家付款</Text>
                            {this.state.orderNumZj['10'] > 0 ?
                              <View style={[styles.sorder.tabBadge, {left: Utils.width/4 * .5 + 28}]}>
                                <Text style={styles.sorder.tabBadgeText}>{this.state.orderNumZj['10']}</Text>
                              </View>
                            : null}
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(2)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == 2 ? styles.sorder.tabActive : '']}>
                          <View>
                            <Text style={[styles.sorder.tabText, this.state.activeIndex == 2 ? styles.sorder.tabActiveText : '']}>待发货</Text>
                            {this.state.orderNumZj['20'] > 0 ?
                              <View style={[styles.sorder.tabBadge, {left: Utils.width/4 * .5 + 15}]}>
                                <Text style={styles.sorder.tabBadgeText}>{this.state.orderNumZj['20']}</Text>
                              </View>
                            : null}
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(3)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == 3 ? styles.sorder.tabActive : '']}>
                          <View>
                            <Text style={[styles.sorder.tabText, this.state.activeIndex == 3 ? styles.sorder.tabActiveText : '']}>已发货</Text>
                            {this.state.orderNumZj['30'] > 0 ?
                              <View style={[styles.sorder.tabBadge, {left: Utils.width/4 * .5 + 15}]}>
                                <Text style={styles.sorder.tabBadgeText}>{this.state.orderNumZj['30']}</Text>
                              </View>
                            : null}
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(4)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == 4 ? styles.sorder.tabActive : '']}>
                          <View>
                            <Text style={[styles.sorder.tabText, this.state.activeIndex == 4 ? styles.sorder.tabActiveText : '']}>已收货</Text>
                            {this.state.orderNumZj['31'] > 0 ?
                            <View style={[styles.sorder.tabBadge, {left: Utils.width/4 * .5 + 15}]}>
                              <Text style={styles.sorder.tabBadgeText}>{this.state.orderNumZj['31']}</Text>
                            </View>
                            : null}
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(5)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == 5 ? styles.sorder.tabActive : '']}>
                          <View>
                            <Text style={[styles.sorder.tabText, this.state.activeIndex == 5 ? styles.sorder.tabActiveText : '']}>已完成</Text>
                            {this.state.orderNumZj['40']>0 ?
                            <View style={[styles.sorder.tabBadge, {left: Utils.width/4 * .5 + 15}]}>
                              <Text style={styles.sorder.tabBadgeText}>{this.state.orderNumZj['40']}</Text>
                            </View>
                            : null}
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(6)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == 6 ? styles.sorder.tabActive : '']}>
                          <View>
                            <Text style={[styles.sorder.tabText, this.state.activeIndex == 6 ? styles.sorder.tabActiveText : '']}>已取消</Text>
                            {this.state.orderNumZj['-10']>0 ?
                            <View style={[styles.sorder.tabBadge, {left: Utils.width/4 * .5 + 15}]}>
                              <Text style={styles.sorder.tabBadgeText}>{this.state.orderNumZj['-10']}</Text>
                            </View>
                            : null}
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(7)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == 7 ? styles.sorder.tabActive : '']}>
                          <View>
                            <Text style={[styles.sorder.tabText, this.state.activeIndex == 7 ? styles.sorder.tabActiveText : '']}>退货退款</Text>
                            {this.state.orderNumZj['-1'] > 0 ?
                            <View style={[styles.sorder.tabBadge, {left: Utils.width/4 * .5 + 20}]}>
                              <Text style={styles.sorder.tabBadgeText}>{this.state.orderNumZj['-1']}</Text>
                            </View>
                            : null}
                          </View>
                        </TouchableOpacity>
                  </ScrollView>
                </View>
                <FlatList
                  data={this.state.listZj}
                  renderItem={({item}) => this.state.activeIndex == 7 ? <RefundItem data={item} type={_type} props={this.props}></RefundItem> : <OrderItem data={item} type={_type} props={this.props}></OrderItem>}
                  onRefresh={false}
                  refreshing={false}
                  onEndReachedThreshold={2}
                  onEndReached={() => this._loadingMore(this.state.activeIndex)}
                  ListFooterComponent={this._flatListFooter}
                  style={styles.common.init}/>
              </View>
              :
              <View style={styles.common.flexv}>
                <View style={styles.sorder.tab}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref="scrollViewJc">
                        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(0)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == 0 ? styles.sorder.tabActive : '']}>
                          <View>
                            <Text style={[styles.sorder.tabText, this.state.activeIndex == 0 ? styles.sorder.tabActiveText : '']}>全部订单</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(1)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == 1 ? styles.sorder.tabActive : '']}>
                          <View>
                            <Text style={[styles.sorder.tabText, this.state.activeIndex == 1 ? styles.sorder.tabActiveText : '']}>待买家付款</Text>
                            {this.state.orderNumJc['0'] > 0 ?
                              <View style={[styles.sorder.tabBadge, {left: Utils.width/4 * .5 + 28}]}>
                                <Text style={styles.sorder.tabBadgeText}>{this.state.orderNumJc['0']}</Text>
                              </View>
                            : null}
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(2)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == 2 ? styles.sorder.tabActive : '']}>
                          <View>
                            <Text style={[styles.sorder.tabText, this.state.activeIndex == 2 ? styles.sorder.tabActiveText : '']}>待采购</Text>
                            {this.state.orderNumJc['10'] > 0 ?
                              <View style={[styles.sorder.tabBadge, {left: Utils.width/4 * .5 + 15}]}>
                                <Text style={styles.sorder.tabBadgeText}>{this.state.orderNumJc['10']}</Text>
                              </View>
                            : null}
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(3)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == 3 ? styles.sorder.tabActive : '']}>
                          <View>
                            <Text style={[styles.sorder.tabText, this.state.activeIndex == 3 ? styles.sorder.tabActiveText : '']}>待发货</Text>
                            {this.state.orderNumJc['20'] > 0 ?
                              <View style={[styles.sorder.tabBadge, {left: Utils.width/4 * .5 + 15}]}>
                                <Text style={styles.sorder.tabBadgeText}>{this.state.orderNumJc['20']}</Text>
                              </View>
                            : null}
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(4)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == 4 ? styles.sorder.tabActive : '']}>
                          <View>
                            <Text style={[styles.sorder.tabText, this.state.activeIndex == 4 ? styles.sorder.tabActiveText : '']}>已发货</Text>
                            {this.state.orderNumJc['30'] > 0 ?
                              <View style={[styles.sorder.tabBadge, {left: Utils.width/4 * .5 + 15}]}>
                                <Text style={styles.sorder.tabBadgeText}>{this.state.orderNumJc['30']}</Text>
                              </View>
                            : null}
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(5)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == 5 ? styles.sorder.tabActive : '']}>
                          <View>
                            <Text style={[styles.sorder.tabText, this.state.activeIndex == 5 ? styles.sorder.tabActiveText : '']}>已收货</Text>
                            {this.state.orderNumJc['31'] > 0 ?
                            <View style={[styles.sorder.tabBadge, {left: Utils.width/4 * .5 + 15}]}>
                              <Text style={styles.sorder.tabBadgeText}>{this.state.orderNumJc['31']}</Text>
                            </View>
                            : null}
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(6)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == 6 ? styles.sorder.tabActive : '']}>
                          <View>
                            <Text style={[styles.sorder.tabText, this.state.activeIndex == 6 ? styles.sorder.tabActiveText : '']}>已完成</Text>
                            {this.state.orderNumJc['40']>0 ?
                            <View style={[styles.sorder.tabBadge, {left: Utils.width/4 * .5 + 15}]}>
                              <Text style={styles.sorder.tabBadgeText}>{this.state.orderNumJc['40']}</Text>
                            </View>
                            : null}
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(7)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == 7 ? styles.sorder.tabActive : '']}>
                          <View>
                            <Text style={[styles.sorder.tabText, this.state.activeIndex == 7 ? styles.sorder.tabActiveText : '']}>已取消</Text>
                            {this.state.orderNumJc['-10']>0 ?
                            <View style={[styles.sorder.tabBadge, {left: Utils.width/4 * .5 + 15}]}>
                              <Text style={styles.sorder.tabBadgeText}>{this.state.orderNumJc['-10']}</Text>
                            </View>
                            : null}
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacite={.8} onPress={() => {this._tabHandle(8)}} style={[styles.sorder.tabItem, {width: Utils.width/4}, this.state.activeIndex == 8 ? styles.sorder.tabActive : '']}>
                          <View>
                            <Text style={[styles.sorder.tabText, this.state.activeIndex == 8 ? styles.sorder.tabActiveText : '']}>退货退款</Text>
                            {this.state.orderNumJc['-1'] > 0 ?
                            <View style={[styles.sorder.tabBadge, {left: Utils.width/4 * .5 + 20}]}>
                              <Text style={styles.sorder.tabBadgeText}>{this.state.orderNumJc['-1']}</Text>
                            </View>
                            : null}
                          </View>
                        </TouchableOpacity>
                  </ScrollView>
                </View>
                <FlatList
                  data={this.state.listJc}
                  renderItem={({item}) => this.state.activeIndex == 8 ? <RefundItem data={item} type={_type} props={this.props}></RefundItem> : <OrderItem data={item} type={_type} props={this.props}></OrderItem>}
                  onRefresh={false}
                  refreshing={false}
                  onEndReachedThreshold={2}
                  onEndReached={() => this._loadingMore(this.state.activeIndex)}
                  ListFooterComponent={this._flatListFooter}
                  style={styles.common.init}/>
              </View>}
              <Loading visible={this.state.loadingVisible}></Loading>
            </View>
        );
    }
    _selectType = (t) => {
      this._reset();
      this.setState({activeIndex: 0, type: t});
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
        this.setState({activeIndex: k});
        requestAnimationFrame(()=>{
          this._getData(k);
        });
    }
}
