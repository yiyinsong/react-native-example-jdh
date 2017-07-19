/**
 * component list
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    InteractionManager,
    ScrollView
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

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
          '-1': 0,
          '10': 0,
          '20': 0,
          '30': 0,
          '31': 0,
          '40': 0
        },
        orderNumJc: {
          '-1': 0,
          '0': 0,
          '10': 0,
          '20': 0,
          '30': 0,
          '31': 0,
          '40': 0
        },
        pageZj: [0, 0, 0, 0, 0, 0, 0, 0],
        pageJc: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        listZj: [[], [], [], [], [], [], [], []],
        listJc: [[], [], [], [], [], [], [], [], []],
        tabTitleZj: ['全部订单', '待买家付款', '待发货', '已发货', '已收货', '已完成', '已取消', '退货退款'],
        tabTitleJc: ['全部订单', '待买家付款', '待采购', '待发货', '已发货', '已收货', '已完成', '已取消', '退货退款'],
        canloadZj: [false, false, false, false, false, false, false, false],
        canloadJc: [false, false, false, false, false, false, false, false, false],
        tipsZj: ['', '', '', '', '', '', '', ''],
        tipsJc: ['', '', '', '', '', '', '', '', ''],

        loadingVisible: true,
        activeIndex: 0
      };
      this.sliderTimer = null;
    }
    componentWillMount() {
      InteractionManager.runAfterInteractions(() => {
        ScreenInit.checkLogin(this);
        this._init();
        let _state = this.props.navigation.state;
        let _initType = _state.params && _state.params.type || 0;
        let _initIndex = _state.params && _state.params.index || 0;

        if(_initType == 0) {
          this._getData(_initIndex);
          this._getData(0, 1);
        } else {
          this._getData(_initIndex);
          this._getData(0, 0);
        }
      })
    }
    componentWillUnmount() {
      this.sliderTimer && clearTimeout(this.sliderTimer);
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
    _getData = (i, itype) => {
      let _status = '';
      let _type = itype || this.state.type;
      if(_type == 0) {
        let _tp = this.state.pageZj;
        _tp[i] = ++_tp[i];
        this.setState({pageZj: _tp});
      } else {
        let _tp = this.state.pageJc;
        _tp[i] = ++_tp[i];
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
        fetch(Config.JAVAAPI + `shop/wap/client/order/list?orderType=${_type == 1 ? 31 : 40}&status=${_status}&pageIndex=${_type == 1 ? this.state.pageJc[i] : this.state.pageZj[i]}&pageSize=10&token=${token}`, {
           method: 'POST'
        })
        .then((response) => response.json())
        .then((data) => {
          this.setState({loadingVisible: false});
          if(data.code == 1) {
            let _data = data.obj;
            if(_type == 0) {
              let _temp = this.state.listZj;
              _temp[i] = _temp[i].concat(_data.results);
              this.setState({
                listZj: _temp
              });
              let _canload = this.state.canloadZj;
              let _tips = this.state.tipsZj;
              if(_data.pageIndex < _data.totalPage) {
                _canload[i] = true;
                _tips[i] = '数据加载中...';
              } else {
                _canload[i] = false;
                _tips[i] = '没有更多数据！';
              }
              this.setState({canloadZj: _canload});
              this.setState({tipsZj: _tips});
            } else {
              let _temp = this.state.listJc;
              _temp[i] = _temp[i].concat(_data.results);
              this.setState({
                listJc: _temp
              });
              let _canload = this.state.canloadJc;
              let _tips = this.state.tipsJc;
              if(_data.pageIndex < _data.totalPage) {
                _canload[i] = true;
                _tips[i] = '数据加载中...'; 
              } else {
                _canload[i] = false;
                _tips[i] = '没有更多数据！';
              }
              this.setState({canloadJc: _canload});
              this.setState({tipsJc: _tips});
            }
          }
        });
      }
    }
    _getRefundData = (_type, i) => {
      fetch(Config.JAVAAPI + `shop/mobile/refund/blist?orderType[0]=${_type == 1 ? 30 : 40}&status=&page=${_type == 1 ? this.state.pageJc[i] : this.state.pageZj[i]}&token=${token}`, {
         method: 'POST'
      })
      .then((response) => response.json())
      .then((data) => {
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

        if(_type == 0) {
          let _temp = this.state.listZj;
          _temp[i] = _temp[i].concat(_list);
          this.setState({
            listZj: _temp
          });
          let _canload = this.state.canloadZj;
          let _tips = this.state.tipsZj;
          if(data.page.pageNum < data.page.pages) {
            _canload[i] = true;
            _tips[i] = '数据加载中...';
          } else {
            _canload[i] = false;
            _tips[i] = '没有更多数据！';
          }
          this.setState({canloadZj: _canload});
          this.setState({tipsZj: _tips});
        } else {
          let _temp = this.state.listJc;
          _temp[i] = _temp[i].concat(_list);
          this.setState({
            listJc: _temp
          });
          let _canload = this.state.canloadJc;
          let _tips = this.state.tipsJc;
          if(data.page.pageNum < data.page.pages) {
            _canload[i] = true;
            _tips[i] = '数据加载中...';
          } else {
            _canload[i] = false;
            _tips[i] = '没有更多数据！';
          }
          this.setState({canloadJc: _canload});
          this.setState({tipsJc: _tips});
        }
    });
    }

    _loadingMore = (p) => {
      if(this.state.type == 0) {
        if(this.state.canloadZj[p]) {
          this._getData(p);
        }
      } else {
        if(this.state.canloadJc[p]) {
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
                  <ScrollableTabView
                  renderTabBar={() => <ScrollableTabBar renderTab={this._renderTab_zj}/>}
                  tabBarBackgroundColor='#fff'
                  tabBarTextStyle={styles.sorder.tabTitleText}
                  tabBarUnderlineStyle={styles.sorder.tabTitleUnderLine}
                  tabBarActiveTextColor='#388bff'
                  tabBarInactiveTextColor="#333"
                  onChangeTab={(a)=>{this._tabHandle(a)}}
                  initialPage={0}
                  >
                    {this.state.tabTitleZj.map((v, k) => {
                      return (
                        <View tabLabel={v}>
                          <FlatList
                          data={this.state.listZj[k]}
                          renderItem={({item}) => this.state.activeIndex == 7 ? <RefundItem data={item} type={_type} props={this.props}></RefundItem> : <OrderItem data={item} type={_type} props={this.props}></OrderItem>}
                          onRefresh={false}
                          refreshing={false}
                          onEndReachedThreshold={2}
                          onEndReached={() => this._loadingMore(k)}
                          ListFooterComponent={() => this._flatListFooter(k)}
                          style={styles.common.init}/>
                        </View>
                      )
                    })}
                  </ScrollableTabView>
                :
                <ScrollableTabView
                renderTabBar={() => <ScrollableTabBar renderTab={this._renderTab_jc}/>}
                tabBarBackgroundColor='#fff'
                tabBarTextStyle={styles.sorder.tabTitleText}
                tabBarUnderlineStyle={styles.sorder.tabTitleUnderLine}
                tabBarActiveTextColor='#388bff'
                tabBarInactiveTextColor="#333"
                onChangeTab={(a)=>{this._tabHandle(a)}}
                initialPage={0}
                >
                  {this.state.tabTitleJc.map((v, k) => {
                    return (
                      <View tabLabel={v}>
                        <FlatList
                        data={this.state.listJc[k]}
                        renderItem={({item}) => this.state.activeIndex == 8 ? <RefundItem data={item} type={_type} props={this.props}></RefundItem> : <OrderItem data={item} type={_type} props={this.props}></OrderItem>}
                        onRefresh={false}
                        refreshing={false}
                        onEndReachedThreshold={2}
                        onEndReached={() => this._loadingMore(k)}
                        ListFooterComponent={() => this._flatListFooter(k)}
                        style={styles.common.init}/>
                      </View>
                    )
                  })}
                </ScrollableTabView>
              }
              <Loading visible={this.state.loadingVisible}></Loading>
            </View>
        );
    }
    _selectType = (t) => {
      this.setState({activeIndex: 0});
      this.setState({type: t});
    }
    _renderTab_zj = (name, page, isTabActive, onPressHandler, onLayoutHandler) => {
    return <TouchableOpacity activeOpacity={.8}
      key={`${name}_${page}`}
      onPress={() => onPressHandler(page)}
      style={{
        flexDirection: 'row',
        width: Utils.width/4,
        justifyContent: 'center',
        alignItems: 'center'}}
      onLayout={onLayoutHandler}
    >
      <Text style={{fontSize: 12, color: page == this.state.activeIndex ? '#388bff' : '#333'}}>{name}</Text>
      {this._renderBadge_zj(page) > 0 ?
      <View style={{position: 'relative'}}>
        <View style={{position: 'absolute',backgroundColor: '#eb0000',borderRadius: 5, top: -10,paddingLeft: 4,paddingRight: 4,height: 10}}>
          <Text style={{fontSize: 9, color: '#fff',lineHeight: 10}}>
          {this._renderBadge_zj(page)}
          </Text>
        </View>
      </View> : null
       }
    </TouchableOpacity>;
  }
  _renderTab_jc = (name, page, isTabActive, onPressHandler, onLayoutHandler) => {
  return <TouchableOpacity activeOpacity={.8}
    key={`${name}_${page}`}
    onPress={() => onPressHandler(page)}
    style={{
      flexDirection: 'row',
      width: Utils.width/4,
      justifyContent: 'center',
      alignItems: 'center'}}
    onLayout={onLayoutHandler}
  >
    <Text style={{fontSize: 12, color: page == this.state.activeIndex ? '#388bff' : '#333'}}>{name}</Text>
    {this._renderBadge_jc(page) > 0 ?
    <View style={{position: 'relative'}}>
      <View style={{position: 'absolute',backgroundColor: '#eb0000',borderRadius: 5, top: -10,paddingLeft: 4,paddingRight: 4,height: 10}}>
        <Text style={{fontSize: 9, color: '#fff',lineHeight: 10}}>
        {this._renderBadge_jc(page)}
        </Text>
      </View>
    </View> : null
     }
  </TouchableOpacity>;
}
  _renderBadge_zj = (p) => {
    let _state = this.state;
    switch (p) {
      case 0:
        return 0;
        break;
      case 1:
        return _state.orderNumZj['10'];
        break;
      case 2:
        return _state.orderNumZj['20'];
        break;
      case 3:
        return _state.orderNumZj['30'];
        break;
      case 4:
        return _state.orderNumZj['31'];
        break;
      case 5:
        return _state.orderNumZj['40'];
        break;
      case 6:
        return _state.orderNumZj['-10'];
        break;
      case 7:
        return _state.orderNumZj['-1'];
        break;
      default:
        return 0;
        break;
    }
  }
  _renderBadge_jc = (p) => {
    let _state = this.state;
    switch (p) {
      case 0:
        return 0;
        break;
      case 1:
        return _state.orderNumJc['0'];
        break;
      case 2:
        return _state.orderNumJc['10'];
        break;
      case 3:
        return _state.orderNumJc['20'];
        break;
      case 4:
        return _state.orderNumJc['30'];
        break;
      case 5:
        return _state.orderNumJc['31'];
        break;
      case 6:
        return _state.orderNumJc['40'];
        break;
      case 7:
        return _state.orderNumJc['-10'];
        break;
      case 8:
        return _state.orderNumJc['-1'];
        break;
      default:
        return 0;
        break;
    }
  }
  _flatListFooter = (p) => {
    if(this.state.type == 0) {
      return (
        <Text style={styles.common.loadingTips}>{this.state.tipsZj[p] != '' ? this.state.tipsZj[p] : null}</Text>
      )
    } else {
      return (
        <Text style={styles.common.loadingTips}>{this.state.tipsJc[p] != '' ? this.state.tipsJc[p] : null}</Text>
      )
    }
  }
  _tabHandle = (obj) => {
      let _page = obj.i;
      this.setState({activeIndex: obj.i});
      if(this.state.type == 0) {
        if(this.state.listZj[_page].length == 0 && this.state.tipsZj[_page] != '没有更多数据！') {
          this.sliderTimer = setTimeout(() => {
            this.setState({loadingVisible: true});
            this._getData(_page);
          }, 250);
        }
      } else {
        if(this.state.listJc[_page].length == 0 && this.state.tipsJc[_page] != '没有更多数据！') {
          this.sliderTimer = setTimeout(() => {
            this.setState({loadingVisible: true});
            this._getData(_page);
          }, 250);
        }
      }
  }
}
