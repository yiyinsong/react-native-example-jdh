/**
 * component list
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import styles from '../../../css/styles';

import OrderItem from '../../components/seller/tab-order-item';

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
          '40': 0
        },
        orderNumJc: {
          '-1': 0,
          '0': 0,
          '10': 0,
          '20': 0,
          '30': 0,
          '40': 0
        },

        isloading: [
          false,false,false,false,false
        ],
        list1: [{
          orderSn: '12346789585522',
          orderTime: '2017-03-14',
          price: '123.25',
          num: 502,
          name: '第一条数据',
          attr: '大号 优质 新鲜',
          img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1822330511,2221549046&fm=23&gp=0.jpg',
          status: '待付款'
        },{
          orderSn: '12346789585522',
          orderTime: '2017-03-14',
          price: '123.25',
          num: 502,
          name: '第一条数据',
          attr: '大号 优质 新鲜',
          img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1822330511,2221549046&fm=23&gp=0.jpg',
          status: '待付款'
        },{
          orderSn: '12346789585522',
          orderTime: '2017-03-14',
          price: '123.25',
          num: 502,
          name: '第一条数据',
          attr: '大号 优质 新鲜',
          img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1822330511,2221549046&fm=23&gp=0.jpg',
          status: '待付款'
        }],
        list2: [],
        list3: [],
        list4: [],
        list5: [],
        list6: []
      };
    }
    componentWillMount() {
      ScreenInit.checkLogin(this);
      this._init();
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

    _loadingMore = ({ distanceFromEnd }) => {
      console.log(distanceFromEnd);
      if (this.state.isloading[0]) return;
      this.state.isloading[0] = true;

      fetch('http://order.jdhdev.jdhui.com/shop/wap/client/order/list',{
          method: 'POST',
          headers: new Headers({
            'Accept': 'text/plain',
            'Content-Type': 'text/plain'
          })
      })
        .then((response) => response.json())
        .then((responseJson) => {

        })
        .catch((error) => {
          console.error(error);
        });
        return;
      let _result = [...this.state.list1,
        {
          orderSn: '12346789585522',
          orderTime: '2017-03-14',
          price: '123.25',
          num: 502,
          name: `第${Math.ceil(Math.random()*100)}条数据`,
          attr: '大号 优质 新鲜',
          img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1822330511,2221549046&fm=23&gp=0.jpg',
          status: '待付款'
        }
      ];
      this.setState({'list1': _result});
      // this.state.isloading[0] = false;
    }
    _refresh = () => {
      console.log('refresh');
    }
    _shouldItemUpdate(prev, next) {
      return prev.item !== next.item;
    }
    render() {
        return (
            <View style={styles.common.flexv}>
              <View style={styles.sorder.type}>
                <View style={[styles.sorder.typeWrapper, styles.common.flexDirectionRow]}>
                  <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.sorder.typeItem, this.state.type == 0 ? styles.sorder.typeItemActive : null]} onPress={() => {this._selectType(0)}}><Text style={[styles.sorder.typeText, this.state.type == 0 ? styles.sorder.typeTextActive : null]}>自建商品</Text></TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.sorder.typeItem, this.state.type == 1 ? styles.sorder.typeItemActive : null]} onPress={() => {this._selectType(1)}}><Text style={[styles.sorder.typeText, this.state.type == 1 ? styles.sorder.typeTextActive : null]}>即采商品</Text></TouchableOpacity>
                </View>
              </View>
              <ScrollableTabView
              renderTabBar={() => <ScrollableTabBar renderTab={this._renderTab}/>}
              tabBarBackgroundColor='#fff'
              tabBarTextStyle={styles.sorder.tabTitleText}
              tabBarUnderlineStyle={styles.sorder.tabTitleUnderLine}
              tabBarActiveTextColor='#388bff'
              tabBarInactiveTextColor="#333"
              onChangeTab={()=>{}}
              >
                <View tabLabel="全部订单">
                  <FlatList
                  data={this.state.list1}
                  renderItem={({item}) => <OrderItem data={item}></OrderItem>}
                  shouldItemUpdate={this._shouldItemUpdate}
                  onRefresh={this._refresh}
                  refreshing={false}
                  onEndReachedThreshold={2}
                  onEndReached={this._loadingMore}/>
                </View>
                <View tabLabel='待买家付款'></View>
                {this.state.type == 1 ? <View tabLabel='待采购'></View> : null}
                <View tabLabel='待发货'></View>
                <View tabLabel='待买家收货'></View>
                <View tabLabel='已完成'></View>
                <View tabLabel='退货退款'></View>
              </ScrollableTabView>
            </View>
        );
    }
    _selectType = (t) => {
      this.setState({type: t});
    }
    _renderTab = (name, page, isTabActive, onPressHandler, onLayoutHandler) => {
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
      <Text style={{fontSize: 12, color: isTabActive ? '#388bff' : ''}}>{name}</Text>
      {this._renderBadge(page) > 0 ?
      <View style={{position: 'relative'}}>
        <View style={{position: 'absolute',backgroundColor: '#eb0000',borderRadius: 5, top: -10,paddingLeft: 4,paddingRight: 4,height: 10}}>
          <Text style={{fontSize: 9, color: '#fff',lineHeight: 10}}>
          {this._renderBadge(page)}
          </Text>
        </View>
      </View> : null
       }
    </TouchableOpacity>;
  }
  _renderBadge = (p) => {
    let _state = this.state;
    if(this.state.type == 0) {
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
          return _state.orderNumZj['40'];
          break;
        case 5:
          return _state.orderNumZj['-1'];
          break;
        default:
          return 0;
          break;
      }
    } else {
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
          return _state.orderNumJc['40'];
          break;
        case 6:
          return _state.orderNumJc['-1'];
          break;
        default:
          return 0;
          break;
      }
    }
  }
}
