import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  InteractionManager
  } from 'react-native';

  import styles from '../../../css/styles';

  import Config from '../../../config/config';
  import ScreenInit from '../../../config/screenInit';
  import Utils from '../../../js/utils';

  import Loading from '../../common/ui-loading';

  export default class ShoppingScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        userInfo: {
          shop_name: '',
          shop_logo: '',
          shopId: ''
        },
        messageCount: 0,
        orderNum: [],
        refundNum: 0,
        orderNumZc: [],
        refundNumZc: 0,
        qrcodeVisible:  false,
        qrcodeSrc: Config.PHPAPI + `api/mapp/shop/qrcode?token=${token}`,
        attentionList: []
      };
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        this.setState({loadingVisible: true});
        ScreenInit.checkLogin(this);
        this._init();
      })
    }
    render() {
      return(
        <View style={ styles.shome.container }>
          <ScrollView style={styles.common.init} showsVerticalScrollIndicator={false}>
            <View style={ [styles.shome.head, {height:　Utils.width * .355}] }>
              <Image source={require('../../../images/buyer-home-bg.png')} style={ [{width: Utils.width, height: Utils.width * .355}] }>
              <View style={ styles.shome.headContent }>
                <View style={ [styles.shome.userBlock, styles.shome.ht ]}>
                  <TouchableOpacity onPress={this._toUserInfo} style={ styles.shome.userBlockLeft } activeOpacity={0.8}>
                    <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv] }>
                      <Text style={ styles.shome.userNavText }>账户信息</Text>
                      <Image source={require('../../../images/icon-ar.png')} style={ styles.shome.arrowRight }/>
                    </View>
                  </TouchableOpacity>
                  <View style={ styles.shome.userNavToMess }>
                    <Image source={require('../../../images/icon-message.png')} style={ styles.shome.userMessIcon }>
                      {this.state.messageCount>0 ? <View style={ styles.shome.badge }><Text style={ styles.shome.badgeText }>{this.state.messageCount}</Text></View> : null}
                    </Image>
                  </View>
                </View>
                <View style={ [styles.shome.userInfo, styles.shome.hb] }>
                  <View style={ [styles.shome.userBlockLeft, styles.shome.userInfo] }>
                    <View style={styles.shome.logoContainer}>
                      <Image source={{uri: this.state.userInfo.shop_logo}} style={ styles.shome.userHeadIcon } onError={this._logoError}/>
                      </View>
                      <View style={ styles.shome.userData }>
                        <Text style={ styles.shome.userName } numberOfLines={1}>{ this.state.userInfo.shop_name }</Text>
                        <TouchableOpacity activeOpacity={.8} style={ styles.shome.idTab } onPress={this._toSeller}>
                          <Text style={ [styles.shome.userName, styles.shome.idTabText] }>管理店铺</Text>
                          <Image source={require('../../../images/icon-buyer-tab.png')} style={ styles.shome.idTabImg } />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={ styles.shome.userToOther }>
                      <Image source={require('../../../images/icon-share.png')} style={ styles.shome.userShare } />
                      <TouchableOpacity activeOpacity={.8} onPress={() => {this.setState({qrcodeVisible: true})}}><Image source={require('../../../images/icon-qrcode.png')} style={ styles.shome.userQrcode }/></TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Image>
              </View>
              <View style={ styles.shome.dl }>
                <View style={ [styles.common.flex, styles.shome.dt] }>
                  <View style={ [styles.common.flex, styles.common.flexCenterv] }>
                    <Image source={require('../../../images/icon-buyer-f1.png')} style={ styles.shome.dtlIcon }/>
                    <Text style={ styles.shome.dtName }>采购订单</Text>
                  </View>
                  <View style={ [styles.common.flex, styles.common.flexEndh, styles.common.flexCenterv] }>
                    <TouchableOpacity activeOpacity={.8} onPress={() => {this._toOrder(0)}}>
                      <Text style={ styles.shome.dtMore }>查看更多</Text>
                    </TouchableOpacity>
                    <Image source={require('../../../images/icon-arb.png')} style={ styles.shome.arrowRightBlack }/>
                  </View>
                </View>
                <View style={ [styles.common.flex, styles.shome.dd] }>
                  <TouchableOpacity activeOpacity={.8} style={ styles.shome.order } onPress={() => this._toOrder(0, 1)}>
                     <View style={ styles.shome.orderContent }>
                      <Image source={require('../../../images/buyer-order-icon6.png')} style={ styles.shome.orderIcon } />
                      <Text style={ styles.shome.orderText }>待付款</Text>
                      { this.state.orderNum['10'] > 0
                        ? <View style={ styles.shome.orderBadge }>
                            <Text style={ styles.shome.orderBadgeText }>{ this.state.orderNum['10'] }</Text>
                          </View>
                        : null
                      }
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8} style={ styles.shome.order } onPress={() => this._toOrder(0, 3)}>
                    <View style={ styles.shome.orderContent }>
                      <Image source={require('../../../images/buyer-order-icon3.png')} style={ styles.shome.orderIcon } />
                      <Text style={ styles.shome.orderText }>待发货</Text>
                      { this.state.orderNum['20'] > 0
                        ? <View style={ styles.shome.orderBadge }>
                            <Text style={ styles.shome.orderBadgeText }>{ this.state.orderNum['20'] }</Text>
                          </View>
                        : null
                      }
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8} style={ styles.shome.order } onPress={() => this._toOrder(0, 4)}>
                    <View style={ styles.shome.orderContent }>
                      <Image source={require('../../../images/buyer-order-icon4.png')} style={ styles.shome.orderIcon } />
                      <Text style={ styles.shome.orderText }>待收货</Text>
                      { this.state.orderNum['30'] > 0
                        ? <View style={ styles.shome.orderBadge }>
                            <Text style={ styles.shome.orderBadgeText }>{ this.state.orderNum['30'] }</Text>
                          </View>
                        : null
                      }
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8} style={ styles.shome.order } onPress={() => this._toOrder(0, 8)}>
                    <View style={ styles.shome.orderContent }>
                      <Image source={require('../../../images/buyer-order-icon5.png')} style={ styles.shome.orderIcon } />
                      <Text style={ styles.shome.orderText }>退货退款</Text>
                      { this.state.refundNum > 0
                        ? <View style={ styles.shome.orderBadge }>
                            <Text style={ styles.shome.orderBadgeText }>{ this.state.refundNum }</Text>
                          </View>
                        : null
                      }
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={ styles.shome.dl }>
                <View style={ [styles.common.flex, styles.shome.dt] }>
                  <View style={ [styles.common.flex, styles.common.flexCenterv] }>
                    <Image source={require('../../../images/icon-buyer-f2.png')} style={ styles.shome.dtlIcon }/>
                    <Text style={ styles.shome.dtName }>众采订单</Text>
                  </View>
                  <View style={ [styles.common.flex, styles.common.flexEndh, styles.common.flexCenterv] }>
                    <TouchableOpacity activeOpacity={.8} onPress={() => {this._toOrder(0)}}>
                      <Text style={ styles.shome.dtMore }>查看更多</Text>
                    </TouchableOpacity>
                    <Image source={require('../../../images/icon-arb.png')} style={ styles.shome.arrowRightBlack }/>
                  </View>
                </View>
                <View style={ [styles.common.flex, styles.shome.dd] }>
                  <TouchableOpacity activeOpacity={.8} style={ styles.shome.order } onPress={() => this._toOrder(0, 1)}>
                     <View style={ styles.shome.orderContent }>
                      <Image source={require('../../../images/buyer-order-icon1.png')} style={ styles.shome.orderIcon } />
                      <Text style={ styles.shome.orderText }>待付定金</Text>
                      { this.state.orderNumZc['5'] > 0
                        ? <View style={ styles.shome.orderBadge }>
                            <Text style={ styles.shome.orderBadgeText }>{ this.state.orderNumZc['5'] }</Text>
                          </View>
                        : null
                      }
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8} style={ styles.shome.order } onPress={() => this._toOrder(0, 3)}>
                    <View style={ styles.shome.orderContent }>
                      <Image source={require('../../../images/buyer-order-icon2.png')} style={ styles.shome.orderIcon } />
                      <Text style={ styles.shome.orderText }>待付尾款</Text>
                      { this.state.orderNumZc['10'] > 0
                        ? <View style={ styles.shome.orderBadge }>
                            <Text style={ styles.shome.orderBadgeText }>{ this.state.orderNumZc['10'] }</Text>
                          </View>
                        : null
                      }
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8} style={ styles.shome.order } onPress={() => this._toOrder(0, 4)}>
                    <View style={ styles.shome.orderContent }>
                      <Image source={require('../../../images/buyer-order-icon3.png')} style={ styles.shome.orderIcon } />
                      <Text style={ styles.shome.orderText }>待发货</Text>
                      { this.state.orderNumZc['20'] > 0
                        ? <View style={ styles.shome.orderBadge }>
                            <Text style={ styles.shome.orderBadgeText }>{ this.state.orderNumZc['20'] }</Text>
                          </View>
                        : null
                      }
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8} style={ styles.shome.order } onPress={() => this._toOrder(0, 8)}>
                    <View style={ styles.shome.orderContent }>
                      <Image source={require('../../../images/buyer-order-icon4.png')} style={ styles.shome.orderIcon } />
                      <Text style={ styles.shome.orderText }>待收货</Text>
                      { this.state.orderNumZc['30'] > 0
                        ? <View style={ styles.shome.orderBadge }>
                            <Text style={ styles.shome.orderBadgeText }>{ this.state.orderNumZc['30'] }</Text>
                          </View>
                        : null
                      }
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8} style={ styles.shome.order } onPress={() => this._toOrder(0, 8)}>
                    <View style={ styles.shome.orderContent }>
                      <Image source={require('../../../images/buyer-order-icon5.png')} style={ styles.shome.orderIcon } />
                      <Text style={ styles.shome.orderText }>退货退款</Text>
                      { this.state.refundNumZc > 0
                        ? <View style={ styles.shome.orderBadge }>
                            <Text style={ styles.shome.orderBadgeText }>{ this.state.refundNumZc }</Text>
                          </View>
                        : null
                      }
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={ styles.shome.dl }>
                <View style={ [styles.common.flex, styles.shome.dt] }>
                  <View style={ [styles.common.flex, styles.common.flexCenterv] }>
                    <Image source={require('../../../images/icon-buyer-f4.png')} style={ styles.shome.dtlIcon }/>
                    <Text style={ styles.shome.dtName }>我的优惠券</Text>
                  </View>
                </View>
                <View style={ [styles.common.flex, styles.shome.dd] }>

                </View>
              </View>
              <View style={ styles.shome.dl }>
                <View style={ [styles.common.flex, styles.shome.dt] }>
                  <View style={ [styles.common.flex, styles.common.flexCenterv] }>
                    <Image source={require('../../../images/icon-buyer-f4.png')} style={ styles.shome.dtlIcon }/>
                    <Text style={ styles.shome.dtName }>商品关注</Text>
                  </View>
                  <View style={ [styles.common.flex, styles.common.flexEndh, styles.common.flexCenterv] }>
                    <TouchableOpacity activeOpacity={.8} onPress={() => {this._toOrder(0)}}>
                      <Text style={ styles.shome.dtMore }>查看更多</Text>
                    </TouchableOpacity>
                    <Image source={require('../../../images/icon-arb.png')} style={ styles.shome.arrowRightBlack }/>
                  </View>
                </View>
                <View style={ [styles.common.flex, styles.shome.dd] }>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.buyer.attention}>
                      {this.state.attentionList.map((v, k) => {
                        return (
                          <View style={styles.buyer.attentionItem}>
                            <TouchableOpacity activeOpacity={.8} style={{width: Utils.width/4}}>
                              <Image source={{uri: v.goods_img1}} style={[styles.buyer.attentionImg, {width: Utils.width/4,height: Utils.width/4}]}/>
                              <Text numberOfLines={2} style={styles.buyer.attentionText}>
                                {v.goods_name}
                              </Text>
                              <View style={styles.common.flexDirectionRow}>
                                <Text style={styles.buyer.attentionType}>{v.source == 1 ? '自营' : '入驻商'}</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                  </ScrollView>
                </View>
              </View>
            </ScrollView>
            <Loading visible={this.state.loadingVisible}></Loading>
            <Modal animationType={"fade"} visible={this.state.qrcodeVisible} transparent={true} onRequestClose={()=>this.setState({qrcodeVisible: false})}>
              <TouchableOpacity activeOpacity={1} style={[styles.common.flex, styles.common.flexCenterv, styles.common.flexCenterh, styles.ewm.container]} onPress={()=>this.setState({qrcodeVisible: false})}>
                <Image source={{uri: this.state.qrcodeSrc}} style={{width: Utils.width * .4, height: Utils.width * .4}} resizeMode ={'contain'}/>
              </TouchableOpacity>
            </Modal>
          </View>
      );
    }
    _init = () => {
      fetch(Config.PHPAPI + 'api/mapp/shop/shop?type=seller&token=' + token, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.error_code == 0) {
          this.setState({loadingVisible: false});
          this.setState({userInfo: data.data});
        }
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
      //采购订单
      fetch(Config.JAVAAPI + `shop/wap/order/shopOrderStatusSummary?token=${token}`, {
        method: 'POST'
      })
      .then(response => response.json())
      .then( r => {
        if(r.code === 1) {
          this.setState({orderNum: r.obj});
        }
      });
      //采购订单退款数量
      fetch(Config.JAVAAPI + `shop/mobile/refund/list`, {
        method: 'POST',
        body: JSON.stringify({
          page: 1,
          size: 0,
          orderType: [10, 20]
        })
      })
      .then(response => response.json())
      .then( r => {
        if(r.code === 1) {
          this.setState({refundNum: r.page.total});
        }
      });
      //众采订单
      fetch(Config.JAVAAPI + `shop/wap/grouporder/status_count?token=${token}`, {
        method: 'POST'
      })
      .then(response => response.json())
      .then( r => {
        if(r.code === 1) {
          this.setState({orderNumZc: r.obj});
        }
      });
      //众采退货退款
      fetch(Config.JAVAAPI + `shop/mobile/refund/list`, {
        method: 'POST',
        body: JSON.stringify({
          page: 1,
          size: 0,
          orderType: [12, 22]
        })
      })
      .then(response => response.json())
      .then( r => {
        if(r.code === 1) {
          this.setState({refundNumZc: r.page.total});
        }
      });
      //我的关注
      fetch(Config.PHPAPI + `api/mapp/member/follow?token=${token}`, {
        method: 'POST'
      })
      .then(response => response.json())
      .then( r => {
        if(r.error_code === 0) {
          this.setState({attentionList: r.data});
        }
      });
    }
    _toUserInfo = () => {
      this.props.navigation.navigate('SellerUserInfo');
    }
    _toSeller = () => {
      this.props.navigation.navigate('UserSeller');
    }
    _toOrder = (i) => {

    }
  }
