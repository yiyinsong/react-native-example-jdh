/**
 * component list
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import OrderItem from '../../components/order/item';

const styles = StyleSheet.create({
  tabTitleText: {
    fontSize: 12
  },
  tabTitleUnderLine: {
    height: 1,
    backgroundColor: '#388bff'
  },
  loadingTips: {
    color: '#999',
    fontSize: 12,
    padding: 5,
    textAlign: 'center'
  }
});


export default class OrderListScreen extends Component {
    static navigationOptions = {
        title: ({ state }) => state.params.title,
    }
    constructor(props){
    	super(props);
    	this.state = {
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
      let _state = this.props.navigation.state;
      if(_state.params.login == 0) {
        this.props.navigation.navigate('Login');
      }
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
            <ScrollableTabView
            renderTabBar={() => <ScrollableTabBar/>}
            tabBarBackgroundColor='#fff'
            tabBarTextStyle={styles.tabTitleText}
            tabBarUnderlineStyle={styles.tabTitleUnderLine}
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
        );
    }
}
