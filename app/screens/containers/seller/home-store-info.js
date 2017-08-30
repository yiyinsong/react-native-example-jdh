import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  InteractionManager
} from 'react-native';

import styles from '../../../css/styles';

import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';

import Loading from '../../common/ui-loading';

export default class SellerHomeScreen extends Component {
    constructor(props){
      super(props);
      this.state = {
        storeData: {
          todayRegCount: 0,
          userCount: 0,
          yesterdayRegCount: 0,
          monthRegCount: 0,
          todayCount: 0,
          yesterdayCount: 0
        },
        storeDataJava: {
          todayOrderCount: 0,
          todayTotalAmount: 0,
          yesterdayOrderCount: 0
        },
        loadingVisible: false
      };
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        this.setState({loadingVisible: true});
        let Nav = this.props.navigation;
        ScreenInit.checkLogin(this);
        this._init();
      });
    }
    _init = () => {
        //获取店铺数据
        fetch(Config.PHPAPI + 'api/mapp/member/member-count', {
          method: 'POST',
          body: JSON.stringify({
            token
          })
        })
        .then((response) => response.json())
        .then((data) => {
          this.setState({loadingVisible: false});
          if(data.flag == 0) {
            let _r = data.data;
            this.setState({storeData: {
                todayRegCount: _r.TodayRegCount,
                userCount: _r.UserCount,
                yesterdayRegCount: _r.YesterdayRegCount,
                monthRegCount: _r.MonthRegCount,
                todayCount: _r.TodayCount,
                yesterdayCount: _r.YesterdayCount
              }
            })
          }
        })
        .catch((error) => {
          this.setState({loadingVisible: false});
        });
        //获取店铺数据（By Java）
        fetch(Config.JAVAAPI + 'shop/wap/client/order/shopDaysData', {
          method: 'POST',
          body: JSON.stringify({
            token
          })
        })
        .then((response) => response.json())
        .then((data) => {
          let _r = data.obj;
          if(data.code == 1) {
            this.setState({
              storeDataJava: {
                todayOrderCount: _r.todayOrderCount[0] ? _r.todayOrderCount[0].amount : 0,
                todayTotalAmount: _r.todayTotalAmount[0] ? _r.todayTotalAmount[0].cou : 0,
                yesterdayOrderCount: _r.yesterdayOrderCount[0] ? _r.yesterdayOrderCount[0].cou : 0
              }
            });
          }
        })
        .catch((error) => {
        });
    }
    render() {
        return (
          <View style={ styles.shome.container }>
            <ScrollView style={styles.common.init}>
              <View style={ [styles.shome.dl, styles.storeInfo.block] }>
                <View style={ [styles.common.flex, styles.shome.dt] }>
                  <View style={ [styles.common.flex, styles.common.flexCenterv] }>
                    <Text style={ styles.shome.dtName }>首页统计</Text>
                  </View>
                </View>
                <View style={ styles.shome.dd }>
                  <View style={ [styles.common.flex, styles.shome.storeDataList] }>
                    <View style={ styles.shome.storeDataItem }>
                      <Text style={ styles.shome.storeDataIs }>￥{ this.state.storeDataJava.todayTotalAmount }</Text>
                      <Text style={ styles.shome.storeDataIe }>今日销售总额</Text>
                    </View>
                    <View style={ styles.shome.storeDataItem }>
                      <Text style={ styles.shome.storeDataIs }>{ this.state.storeData.todayRegCount }</Text>
                      <Text style={ styles.shome.storeDataIe }>今日注册会员</Text>
                    </View>
                    <View style={ styles.shome.storeDataItem }>
                      <Text style={ styles.shome.storeDataIs }>{ this.state.storeDataJava.todayOrderCount }</Text>
                      <Text style={ styles.shome.storeDataIe }>今日订单量</Text>
                    </View>
                    <View style={ [styles.shome.storeDataItem, styles.shome.borderNone] }>
                      <Text style={ styles.shome.storeDataIs }>{ this.state.storeDataJava.yesterdayOrderCount }</Text>
                      <Text style={ styles.shome.storeDataIe }>昨日订单量</Text>
                    </View>
                  </View>
                  <View style={ [styles.common.flex, styles.shome.storeDataList, styles.shome.borderNone] }>
                    <View style={ styles.shome.storeDataItem }>
                      <Text style={ styles.shome.storeDataIs }>{ this.state.storeData.userCount }</Text>
                      <Text style={ styles.shome.storeDataIe }>会员总数</Text>
                    </View>
                    <View style={ styles.shome.storeDataItem }>
                      <Text style={ styles.shome.storeDataIs }>{ this.state.storeData.todayCount }</Text>
                      <Text style={ styles.shome.storeDataIe }>今日被浏览商品数</Text>
                    </View>
                    <View style={ styles.shome.storeDataItem }>
                      <Text style={ styles.shome.storeDataIs }>{ this.state.storeData.yesterdayRegCount }</Text>
                      <Text style={ styles.shome.storeDataIe }>昨日新增会员</Text>
                    </View>
                    <View style={ [styles.shome.storeDataItem, styles.shome.borderNone] }>
                      <Text style={ styles.shome.storeDataIs }>{ this.state.storeData.monthRegCount }</Text>
                      <Text style={ styles.shome.storeDataIe }>本月新增会员</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={ styles.shome.dl }>
                <View style={ [styles.common.flex, styles.shome.dt] }>
                  <View style={ [styles.common.flex, styles.common.flexCenterv] }>
                    <Text style={ styles.shome.dtName}>更多统计</Text>
                  </View>
                </View>
                <View style={ styles.shome.dd }>
                  <View style={[styles.common.flexDirectionRow, styles.storeInfo.more, styles.common.flexCenterv, styles.shome.borderNone]}>
                    <Text style={[styles.common.flex, styles.storeInfo.moreName]}>昨日被浏览商品数</Text>
                    <Text style={styles.storeInfo.moreNum}>{this.state.storeData.yesterdayCount}</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <Loading visible={this.state.loadingVisible}></Loading>
          </View>
        );
    }
}
