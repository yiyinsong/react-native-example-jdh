import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  InteractionManager,
  DeviceEventEmitter,
  Modal,
  WebView
} from 'react-native';

import Swiper from 'react-native-swiper';

import Utils from '../../../js/utils';
import Config from '../../../config/config';
import styles from '../../../css/styles';

import ScreenInit from '../../../config/screenInit';
import Loading from '../../common/ui-loading';
import UIToast from '../../common/ui-toast';

export default class SellerGoodsDetailScreen extends Component {
    constructor(props) {
      super(props);
      let _query = this.props.navigation.state.params;
      this.state = {
        tab: 0,
        loadingVisible: false,
        bodyShow: false,
        goodsid: _query.id,
        goodstype: _query.type,
        data: {
          img: []
        },
        screen2: '',
        screen3: [],
        indicatorIndex: 0
      };
    }
    componentDidMount() {
      this.setState({loadingVisible: true});
      InteractionManager.runAfterInteractions(() => {
        ScreenInit.checkLogin(this);
        this._init();
      });
      this.listener_update = DeviceEventEmitter.addListener('sellerGoodsUpdate', () => {
        this._init();
      });
    }
    componentWillUnmount() {
      this.listener_update && this.listener_update.remove();
    }

    render() {
        let state = this.state;
        return (
          <View style={[styles.common.flexv, styles.common.initWhite]}>
            <View style={[styles.sgoodsDetail.header, styles.common.flexDirectionRow, styles.common.flexCenterv]}>
              <TouchableOpacity onPress={ () => {this.props.navigation.goBack()} }>
                  <Image style={styles.common.iconBackArrow} source={require('../../../images/icon-back.png')} />
              </TouchableOpacity>
              <View style={[styles.common.flexDirectionRow ,styles.sgoodsDetail.tab]}>
                <View style={[styles.common.flex, styles.common.flexCenterh]}>
                  <TouchableOpacity activeOpacity={.8} onPress={() => this._tab(0)}>
                    <Text style={[styles.sgoodsDetail.tabText, state.tab == 0 ? styles.sgoodsDetail.tabActive : '']}>商品</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.common.flex, styles.common.flexCenterh]}>
                  <TouchableOpacity activeOpacity={.8} onPress={() => this._tab(1)}>
                    <Text style={[styles.sgoodsDetail.tabText, state.tab == 1 ? styles.sgoodsDetail.tabActive : '']}>详情</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.common.flex, styles.common.flexCenterh]}>
                  <TouchableOpacity activeOpacity={.8} onPress={() => this._tab(2)}>
                    <Text style={[styles.sgoodsDetail.tabText, state.tab == 2 ? styles.sgoodsDetail.tabActive : '']}>参数</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {
              this.state.bodyShow ?
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} scrollEnabled={false} ref="scrollViewContainer">
              <ScrollView style={{width: Utils.width}}>
                <View style={styles.sgoodsDetail.banner}>
                  <Swiper style={{flex: 1}} loop={false} activeDotColor='#0386fc'>
                    {this.state.data.img.map( (v, k) => {
                      return (
                        <Image
                          source={{uri: v}}
                          style={{flex: 1, height: 200, resizeMode: 'contain'}} />
                      );
                    })}
                   </Swiper>
                </View>
                 <View style={styles.sgoodsDetail.block}>
                  <Text style={styles.sgoodsDetail.title}>{this.state.data.goods_name}</Text>
                  <View style={styles.common.flexDirectionRow}>
                    <Text style={styles.sgoodsDetail.label}>{this.state.data.sale_point}</Text>
                  </View>
                  <Text style={styles.sgoodsDetail.price}>
                    <Text style={styles.sgoodsDetail.priceBig}>价格：</Text>
                    <Text>￥</Text>
                    <Text style={styles.sgoodsDetail.priceBig}>{this.state.data.mmeber_min_price}</Text>
                    <Text>起</Text>
                  </Text>
                 </View>
                 <View style={styles.sgoodsDetail.block}>
                  {this.state.data.goods_attr.map((v, k) => {
                    return (
                      <View style={[styles.common.flexDirectionRow, styles.common.flexCenterh, k > 0 ? styles.sgoodsDetail.attrDl : '']}>
                        <Text style={styles.sgoodsDetail.attrDt} numberOfLines={1}>{v.attr_name}</Text>
                        <View style={styles.common.flex}>
                          {v.attributevalue.map((v1, k1) => {
                            return (
                              <Text style={styles.sgoodsDetail.attrDd}>{v1.attr_value}</Text>
                            );
                          })}
                        </View>
                      </View>
                    );
                  })}
                 </View>
              </ScrollView>
              <ScrollView style={[{width: Utils.width}]}>
                <WebView
                ref='WEBVIEW_REF'
                automaticallyAdjustContentInsets={true}
                source={{html: this.state.screen2}}
                style={{width: Utils.width, height: Utils.height - 105}}
                contentInset={{top:0,left:0}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
                />
              </ScrollView>
              <ScrollView style={[{width: Utils.width}]}>
                <View style={styles.sgoodsDetail.table}>
                  {this.state.screen3.map((v, k) => {
                    return (
                      <View>
                        <Text style={styles.sgoodsDetail.tableHead}>{v.param_name}</Text>
                        {
                          v.secParam.map((v1, k1) => {
                            return (
                              <View style={styles.common.flexDirectionRow}>
                                <Text style={styles.sgoodsDetail.tdl}>{v1.param_name}</Text>
                                <Text style={styles.sgoodsDetail.tdr}>{v1.paramValue}</Text>
                              </View>
                            )
                          })
                        }
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </ScrollView>
            : null
          }
          {this.state.bodyShow ?
            <TouchableOpacity activeOpacity={.8} style={styles.btn2.primary} onPress={this._edit}>
              <Text style={styles.btn2.primaryText}>编辑商品</Text>
            </TouchableOpacity>
          : null}
            <Loading visible={this.state.loadingVisible}></Loading>
          </View>
        );
    }
    _init = () => {
      fetch(Config.PHPAPI + 'api/mapp/goodsinfo/goodsinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${this.state.goodsid}&type=${this.state.goodstype}&token=${token}`
      })
      .then(response => response.json())
      .then((r) => {
        this.setState({loadingVisible: false});
        if(r.error_code == 0) {
          this.setState({data: r.data.baseData, bodyShow: true});
        }
      });
    }
    _tab = (i) => {
      this.refs.scrollViewContainer.scrollTo({x: Utils.width * i, y: 0});
      requestAnimationFrame(() => {
        if(i == 1) {
          if(this.state.screen2 === '') {
            let _desc = this.state.data.descript.replace(/(<img|<iframe|<video)/ig, '$1 style="width: '+Utils.width+'px"');
            let _html = '<html style="width: '+Utils.width+'px;overflow: hidden;margin: 0;padding: 0;"><head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></head><body style="width: '+Utils.width+'px;overflow: hidden;margin: 0;padding: 0;">'+_desc+'</body></html>';
            this.setState({tab: i, screen2: _html});
          } else {
            this.setState({tab: i});
          }
        } else if(i == 2) {
          if(this.state.screen3.length == 0) {
            this.setState({tab: i, screen3: this.state.data.params});
          } else {
            this.setState({tab: i});
          }
        } else {
          this.setState({tab: i});
        }
      });
    }
    _edit = () => {
      this.props.navigation.navigate('SellerGoodsEdit', {
        id: this.state.goodsid,
        type: this.state.goodstype === 2 ? 1 : 2
      });
    }
}
