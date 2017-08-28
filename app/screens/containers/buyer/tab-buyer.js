import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
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
        messageCount: 0
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
              </View>
            </ScrollView>
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
