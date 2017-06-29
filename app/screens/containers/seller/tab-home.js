import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import styles from '../../../css/styles';

import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';
import Utils from '../../../js/utils';

export default class SellerHomeScreen extends Component {
    constructor(props){
      super(props);
      this.state = {
        userInfo: {
          shop_name: '',
          shop_logo: '',
          shopId: ''
        },
        messageCount: 0,
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
        orderDataZJ: {},
        orderDataJC: {},
        refundNumZJ: 0,
        refundNumJC: 0
      };
    }
    componentDidMount() {
      let Nav = this.props.navigation;
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
            this.setState({userInfo: data.data});
            //获取订单条数
            fetch(Config.JAVAAPI + '/shop/wap/client/order/shopOrderStatusSummary',{
                method: 'POST',
                body: JSON.stringify({
                  shopId: data.data.shopId,
                  token
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.code == 1) {
                    this.setState({orderDataZJ: Object.assign({}, data.obj['40'])});
                    this.setState({orderDataJC: Object.assign({}, data.obj['31'])});
                }
            });
            //获取退款订单数目
            fetch(Config.JAVAAPI + '/shop/mobile/refund/blist', {
                method: 'POST',
                body: JSON.stringify({
                  orderType: 40,
                  shopId: data.data.shopId,
                  page: 1,
                  size: 0,
                  token
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.page) this.setState({refundNumZJ: data.page.total});
            });
            fetch(Config.JAVAAPI + '/shop/mobile/refund/blist', {
                method: 'POST',
                body: JSON.stringify({
                  orderType: 30,
                  shopId: data.data.shopId,
                  page: 1,
                  size: 0,
                  token
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.page) this.setState({refundNumJC: data.page.total});
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
        //获取未读消息
        fetch(Config.PHPAPI + 'api/mapp/letter/unread-num?token=' + token, {
          method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
          if(data.error_code == 0) {
            if(typeof data.data == 'string') {
              this.setState({messageCount: data.data});
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
        //获取店铺数据
        fetch(Config.PHPAPI + 'api/mapp/member/member-count', {
          method: 'POST',
          body: JSON.stringify({
            token
          })
        })
        .then((response) => response.json())
        .then((data) => {
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
          console.error(error);
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
          console.error(error);
        });
    }
    _logoError = () => {
      this.setState({userInfo: Object.assign(this.state.userInfo, {shop_logo: 'http://js.jdhui.com/asset/2.0/main/images/default-logo.png'})});
    }
    _toUserInfo = () => {
      this.props.navigation.navigate('SellerUserInfo');
    }
    _toStoreInfo = () => {
      this.props.navigation.navigate('SellerStoreInfo');
    }
    render() {
        return (
          <View style={ styles.shome.container }>
            <View style={ [styles.shome.head, {height:　Utils.width * .355 + 20}] }>
              <View style={ styles.shome.headContent }>
                <View style={ styles.shome.userBlock }>
                  <TouchableOpacity onPress={this._toUserInfo} style={ styles.shome.userBlockLeft } activeOpacity={0.8}>
                    <View style={ styles.shome.userBlockLeft }>
                      <Text style={ styles.shome.userNavText }>账户信息</Text>
                      <Image source={require('../../../images/icon-ar.png')} style={ styles.shome.arrowRight }/>
                    </View>
                  </TouchableOpacity>
                  <View style={ styles.shome.userNavToMess }>
                    {this.state.messageCount>0 ? <View style={ styles.shome.badge }><Text style={ styles.shome.badgeText }>{this.state.messageCount}</Text></View> : null}
                    <Image source={require('../../../images/icon-message.png')} style={ styles.shome.userMessIcon }/>
                  </View>
                </View>
                <View style={ [styles.shome.userBlock, styles.shome.userInfo] }>
                  <View style={ [styles.shome.userBlockLeft, styles.shome.userInfo] }>
                    <Image source={{uri: this.state.userInfo.shop_logo}} style={ styles.shome.userHeadIcon } onError={this._logoError}/>
                    <View style={ styles.shome.userData }>
                      <Text style={ styles.shome.userName } numberOfLines={1}>{ this.state.userInfo.shop_name }</Text>
                      <View style={ styles.shome.idTab }>
                        <Text style={ [styles.shome.userName, styles.shome.idTabText] }>切换至买家</Text>
                        <Image source={require('../../../images/icon-user-tab.png')} style={ styles.shome.idTabImg } />
                      </View>
                    </View>
                  </View>
                  <View style={ styles.shome.userToOther }>
                    <Image source={require('../../../images/icon-share.png')} style={ styles.shome.userShare } />
                    <Image source={require('../../../images/icon-qrcode.png')} style={ styles.shome.userQrcode } />
                  </View>
                </View>
              </View>
              <Image source={require('../../../images/seller-home-bg.png')} style={ [{width: Utils.width, height: Utils.width * .355}] }/>
            </View>
            <ScrollView>
              <View style={ styles.shome.dl }>
                <View style={ [styles.common.flex, styles.shome.dt] }>
                  <View style={ [styles.common.flex, styles.common.flexCenterv] }>
                    <Image source={require('../../../images/icon-overview-f1.png')} style={ styles.shome.dtlIcon }/>
                    <Text style={ styles.shome.dtName }>店铺数据</Text>
                  </View>
                  <TouchableOpacity activeOpacity={.8} style={ [styles.common.flex, styles.common.flexEndh, styles.common.flexCenterv] } onPress={this._toStoreInfo}>
                    <Text style={ styles.shome.dtMore }>查看更多</Text>
                    <Image source={require('../../../images/icon-arb.png')} style={ styles.shome.arrowRightBlack }/>
                  </TouchableOpacity>
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
                    <Image source={require('../../../images/icon-overview-f2.png')} style={ styles.shome.dtlIcon }/>
                    <Text style={ styles.shome.dtName }>自建商品订单</Text>
                  </View>
                  <View style={ [styles.common.flex, styles.common.flexEndh, styles.common.flexCenterv] }>
                    <Text style={ styles.shome.dtMore }>查看更多</Text>
                    <Image source={require('../../../images/icon-arb.png')} style={ styles.shome.arrowRightBlack }/>
                  </View>
                </View>
                <View style={ [styles.common.flex, styles.shome.dd] }>
                  <View style={ styles.shome.order }>
                    <View style={ styles.shome.orderContent }>
                      <Image source={require('../../../images/icon-overview-os1.png')} style={ styles.shome.orderIcon } />
                      <Text style={ styles.shome.orderText }>待付款</Text>
                      { this.state.orderDataZJ['10'] > 0
                        ? <View style={ styles.shome.orderBadge }>
                            <Text style={ styles.shome.orderBadgeText }>{ this.state.orderDataZJ['10'] }</Text>
                          </View>
                        : null
                      }
                    </View>
                  </View>
                  <View style={ styles.shome.order }>
                    <View style={ styles.shome.orderContent }>
                      <Image source={require('../../../images/icon-overview-os2.png')} style={ styles.shome.orderIcon } />
                      <Text style={ styles.shome.orderText }>待发货</Text>
                      { this.state.orderDataZJ['20'] > 0
                        ? <View style={ styles.shome.orderBadge }>
                            <Text style={ styles.shome.orderBadgeText }>{ this.state.orderDataZJ['20'] }</Text>
                          </View>
                        : null
                      }
                    </View>
                  </View>
                  <View style={ styles.shome.order }>
                    <View style={ styles.shome.orderContent }>
                      <Image source={require('../../../images/icon-overview-os3.png')} style={ styles.shome.orderIcon } />
                      <Text style={ styles.shome.orderText }>待收货</Text>
                      { this.state.orderDataZJ['30'] > 0
                        ? <View style={ styles.shome.orderBadge }>
                            <Text style={ styles.shome.orderBadgeText }>{ this.state.orderDataZJ['30'] }</Text>
                          </View>
                        : null
                      }
                    </View>
                  </View>
                  <View style={ styles.shome.order }>
                    <View style={ styles.shome.orderContent }>
                      <Image source={require('../../../images/icon-overview-os4.png')} style={ styles.shome.orderIcon } />
                      <Text style={ styles.shome.orderText }>退货退款</Text>
                      { this.state.refundNumZJ > 0
                        ? <View style={ styles.shome.orderBadge }>
                            <Text style={ styles.shome.orderBadgeText }>{ this.state.refundNumZJ }</Text>
                          </View>
                        : null
                      }
                    </View>
                  </View>
                </View>
              </View>
              <View style={ styles.shome.dl }>
                <View style={ [styles.common.flex, styles.shome.dt] }>
                  <View style={ [styles.common.flex, styles.common.flexCenterv] }>
                    <Image source={require('../../../images/icon-overview-f3.png')} style={ styles.shome.dtlIcon }/>
                    <Text style={ styles.shome.dtName }>即采商品订单</Text>
                  </View>
                  <View style={ [styles.common.flex, styles.common.flexEndh, styles.common.flexCenterv] }>
                    <Text style={ styles.shome.dtMore }>查看更多</Text>
                    <Image source={require('../../../images/icon-arb.png')} style={ styles.shome.arrowRightBlack }/>
                  </View>
                </View>
                <View style={ [styles.common.flex, styles.shome.dd] }>
                  <View style={ styles.shome.order }>
                    <View style={ styles.shome.orderContent }>
                      <Image source={require('../../../images/icon-overview-os1.png')} style={ styles.shome.orderIcon } />
                      <Text style={ styles.shome.orderText }>待付款</Text>
                      { this.state.orderDataJC['0'] > 0
                        ? <View style={ styles.shome.orderBadge }>
                            <Text style={ styles.shome.orderBadgeText }>{ this.state.orderDataJC['0'] }</Text>
                          </View>
                        : null
                      }
                    </View>
                  </View>
                  <View style={ styles.shome.order }>
                    <View style={ styles.shome.orderContent }>
                      <Image source={require('../../../images/icon-overview-os5.png')} style={ styles.shome.orderIcon } />
                      <Text style={ styles.shome.orderText }>待采购</Text>
                      { this.state.orderDataJC['10'] > 0
                        ? <View style={ styles.shome.orderBadge }>
                            <Text style={ styles.shome.orderBadgeText }>{ this.state.orderDataJC['10'] }</Text>
                          </View>
                        : null
                      }
                    </View>
                  </View>
                  <View style={ styles.shome.order }>
                    <View style={ styles.shome.orderContent }>
                      <Image source={require('../../../images/icon-overview-os2.png')} style={ styles.shome.orderIcon } />
                      <Text style={ styles.shome.orderText }>待发货</Text>
                      { this.state.orderDataJC['20'] > 0
                        ? <View style={ styles.shome.orderBadge }>
                            <Text style={ styles.shome.orderBadgeText }>{ this.state.orderDataJC['20'] }</Text>
                          </View>
                        : null
                      }
                    </View>
                  </View>
                  <View style={ styles.shome.order }>
                    <View style={ styles.shome.orderContent }>
                      <Image source={require('../../../images/icon-overview-os3.png')} style={ styles.shome.orderIcon } />
                      <Text style={ styles.shome.orderText }>待收货</Text>
                      { this.state.orderDataJC['30'] > 0
                        ? <View style={ styles.shome.orderBadge }>
                            <Text style={ styles.shome.orderBadgeText }>{ this.state.orderDataJC['30'] }</Text>
                          </View>
                        : null
                      }
                    </View>
                  </View>
                  <View style={ styles.shome.order }>
                    <View style={ styles.shome.orderContent }>
                      <Image source={require('../../../images/icon-overview-os4.png')} style={ styles.shome.orderIcon } />
                      <Text style={ styles.shome.orderText }>退货退款</Text>
                      { this.state.refundNumJC > 0
                        ? <View style={ styles.shome.orderBadge }>
                            <Text style={ styles.shome.orderBadgeText }>{ this.state.refundNumJC }</Text>
                          </View>
                        : null
                      }
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        );
    }
}
