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

export default class OrderListScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        type: 0,
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
          alert(JSON.stringify(responseJson));
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
              renderTabBar={() => <ScrollableTabBar/>}
              tabBarBackgroundColor='#fff'
              tabBarTextStyle={styles.sorder.tabTitleText}
              tabBarUnderlineStyle={styles.sorder.tabTitleUnderLine}
              tabBarActiveTextColor='#388bff'
              tabBarInactiveTextColor="#333"
              >
                <View tabLabel="全部">
                  <FlatList
                  data={this.state.list1}
                  renderItem={({item}) => <OrderItem data={item}></OrderItem>}
                  shouldItemUpdate={this._shouldItemUpdate}
                  onRefresh={this._refresh}
                  refreshing={false}
                  onEndReachedThreshold={2}
                  onEndReached={this._loadingMore}/>
                </View>
                <View tabLabel='待付款'></View>
                <View tabLabel='待收货'></View>
                <View tabLabel='已取消'></View>
                <View tabLabel='已完成'></View>
                <View tabLabel='退货退款'></View>
              </ScrollableTabView>
            </View>
        );
    }
    _selectType = (t) => {
      this.setState({type: t});
    }
}
