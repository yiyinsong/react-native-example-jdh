import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  InteractionManager
  } from 'react-native';
import Swiper from 'react-native-swiper';

import Config from '../../../config/config';
import styles from '../../../css/styles';
import Utils from '../../../js/utils';

import Loading from '../../common/ui-loading';

export default class BuyerHomeScreen extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      loadingVisible: false,
      headerBgOpacity: new Animated.Value(0),
      searchOpacity: new Animated.Value(0.8),
      banner: [],
      cate: [
        {link: '',name: '',img: ''},
        {link: '',name: '',img: ''},
        {link: '',name: '',img: ''},
        {link: '',name: '',img: ''},
        {link: '',name: '',img: ''},
        {link: '',name: '',img: ''},
        {link: '',name: '',img: ''},
        {link: '',name: '',img: ''},
      ],
      newsList: [],
      newsAniVal: new Animated.Value(0),
      newsIndex: 1,
      ad: [],
      floorBanner: [],
      floorTab: [0, 0, 0, 0, 0, 0, 0, 0],
      glist1: [[], [], []],
      glist2: [[], [], []],
      glist3: [[], [], []],
      glist4: [[], [], []],
      glist5: [[], [], []],
      glist6: [[], [], []],
      glist7: [[], [], []],
      glist8: [[], [], []],
    };
  }
  componentDidMount() {
    this.setState({loadingVisible: true});
    this._init();
  }
  componentWillUnmount() {
    this.newsTimer && clearTimeout(this.newsTimer);
  }
  render() {
    return(
      <View style={[styles.common.flexv, styles.common.initWhite]}>
        <Animated.View style={[styles.home.header, {opacity: this.state.headerBgOpacity}]}></Animated.View>
        <Animated.View style={[styles.common.flex, styles.common.flexCenterv, styles.home.search, {opacity: this.state.searchOpacity}]}>
          <Image source={require('../../../images/icon-search@30x30.png')} style={styles.home.searchIcon} />
          <Text style={styles.home.searchText}>请输入商品名称</Text>
        </Animated.View>
        <ScrollView onScroll={this._bodyScroll} ref="bodyScrollView">
          <Swiper
          style={{height:Utils.width*.4}}
          loop={true}
          activeDotStyle={styles.home.swiperDotActive} dotStyle={styles.home.swiperDot}
          paginationStyle={{bottom: 10}}
          autoplay={true}
          autoplayTimeout={4}>
            {this.state.banner.map( (v, k) => {
              return (
                <TouchableOpacity activeOpacity={1}>
                  <Image
                    source={{uri: v.img}}
                    style={{width: Utils.width, height: Utils.width*.4}} />
                </TouchableOpacity>
              );
            })}
           </Swiper>
           <View style={styles.home.cateContainer}>
           <View style={[styles.common.flexDirectionRow, styles.home.cate]}>
           {
             this.state.cate.slice(0, 4).map((v, k) => {
               return (
                 <TouchableOpacity activeOpacity={.8} style={[styles.common.flexv, styles.common.flexCenterv]}>
                   <Image source={{uri: v.img}} style={styles.home.cateIcon} />
                   <Text style={styles.home.cateText}>{v.name}</Text>
                 </TouchableOpacity>
               );
             })
           }
           <TouchableOpacity activeOpacity={.8} style={[styles.common.flexv, styles.common.flexCenterv]}>
             <Image source={require('../../../images/icon-home-cate5.png')} style={styles.home.cateIcon} />
             <Text style={styles.home.cateText}>众采</Text>
           </TouchableOpacity>
           </View>
           <View style={[styles.common.flexDirectionRow, styles.home.cate]}>
           {
             this.state.cate.slice(4, 8).map((v, k) => {
               return (
                 <TouchableOpacity activeOpacity={.8} style={[styles.common.flexv, styles.common.flexCenterv]}>
                   <Image source={{uri: v.img}} style={styles.home.cateIcon} />
                   <Text style={styles.home.cateText}>{v.name}</Text>
                 </TouchableOpacity>
               );
             })
           }
           <TouchableOpacity activeOpacity={.8} style={[styles.common.flexv, styles.common.flexCenterv]}>
             <Image source={require('../../../images/icon-home-cate10.png')} style={styles.home.cateIcon} />
             <Text style={styles.home.cateText}>签到</Text>
           </TouchableOpacity>
           </View>
           <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.home.news]}>
            <Image source={require('../../../images/home-news.png')} style={styles.home.newsIcon} />
            <View style={[styles.common.flexv, styles.home.newsAni]}>
              <Animated.View style={{transform: [{translateY: this.state.newsAniVal }]}}>
                {this.state.newsList.map((v, k) => {
                  return (
                    <Text numberOfLines={1} style={styles.home.newsText}>{v.name}</Text>
                  )
                })}
                {
                  this.state.newsList[0] ?
                  <Text numberOfLines={1} style={styles.home.newsText}>{this.state.newsList[0].name}</Text>
                  : null
                }
              </Animated.View>
            </View>
            <TouchableOpacity activeOpacity={1}>
              <Text style={styles.home.newsMore}>更多</Text>
            </TouchableOpacity>
           </View>
           </View>
           <View style={styles.common.flexDirectionRow}>
           {this.state.ad[0] ?
            <TouchableOpacity activeOpacity={.8} style={styles.home.ad1}>
              <Image source={{uri: this.state.ad[0].img}}  style={{width: Utils.width/2, height: Utils.width/2}}/>
            </TouchableOpacity>
           : null}
            <View>
            {this.state.ad[1] ?
              <TouchableOpacity activeOpacity={.8} style={styles.home.ad2}>
                <Image source={{uri: this.state.ad[1].img}}  style={{width: Utils.width/2, height: Utils.width/4}}/>
              </TouchableOpacity>
            : null}
            {this.state.ad[2] ?
              <TouchableOpacity activeOpacity={.8} style={styles.home.ad2}>
                <Image source={{uri: this.state.ad[2].img}}  style={{width: Utils.width/2, height: Utils.width/4-1}}/>
              </TouchableOpacity>
            : null}
            </View>
           </View>
           <View style={styles.common.flexDirectionRow}>
           {this.state.ad[3] ?
             <TouchableOpacity activeOpacity={.8} style={[styles.home.ad1, styles.home.ad3]}>
               <Image source={{uri: ad[3].img}}  style={{width: Utils.width/2, height: Utils.width/4}}/>
             </TouchableOpacity>
            : null}
            {this.state.ad[4] ?
             <TouchableOpacity activeOpacity={.8} style={styles.home.ad4}>
               <Image source={{uri: ad[4].img}}  style={{width: Utils.width/2, height: Utils.width/4}}/>
             </TouchableOpacity>
            : null}
           </View>
           <View style={styles.home.floor}>
            <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.common.flexCenterh, styles.home.floorHeader]}>
              <View style={styles.home.floorLine}></View>
              <Image source={require('../../../images/home-f1.png')} style={styles.home.floorIcon}/>
              <Text style={styles.home.floorText}>空调</Text>
              <View style={styles.home.floorLine}></View>
            </View>
            {this.state.floorBanner[0] && this.state.floorBanner[0][0]?
            <TouchableOpacity activeOpacity={.8}>
              <Image source={{uri: this.state.floorBanner[0][0].img}} style={{width: Utils.width, height: Utils.width/3}}/>
            </TouchableOpacity>
            : null}
            <View style={[styles.common.flexDirectionRow, styles.home.floorTab]}>
              <TouchableHighlight underlayColor='#fafafa' onPress={() => this._floorTabFunc(0, 0, 51)} style={[styles.common.flex, styles.common.flexCenterh]}>
                <Text style={[styles.home.floorTabText, this.state.floorTab[0] === 0 ? styles.home.floorTabTextActive : '']}>全网热销</Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='#fafafa' onPress={() => this._floorTabFunc(0, 1, 52)} style={[styles.common.flex, styles.common.flexCenterh]}>
                <Text style={[styles.home.floorTabText, this.state.floorTab[0] === 1 ? styles.home.floorTabTextActive : '']}>即采即销</Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='#fafafa' onPress={() => this._floorTabFunc(0, 2, 53)} style={[styles.common.flex, styles.common.flexCenterh]}>
                <Text style={[styles.home.floorTabText, this.state.floorTab[0] === 2 ? styles.home.floorTabTextActive : '']}>精选优品</Text>
              </TouchableHighlight>
            </View>
            {this.state.floorTab[0] === 0 ?
            <ScrollView horizontal={true} style={styles.home.floorTabContainer} showsHorizontalScrollIndicator={false}>
              <View style={[styles.common.flexDirectionRow, styles.home.floorSv]}>
              {this.state.glist1[0].map((v, k) => {
                return(
                  <TouchableOpacity activeOpacity={.8} style={[styles.home.goods, {width: Utils.width/3.5}]}>
                    <Image source={{uri: Config.IMGURL + (v.goods_img || v.product.goods_img1)}} style={{width: Utils.width/3.5, height: Utils.width/3.5}} />
                    <Text numberOfLines={2} style={styles.home.goodsName}>{v.goods_name || v.product.goods_name}</Text>
                    <Text style={styles.home.goodsPrice}>￥{v.showprice}</Text>
                  </TouchableOpacity>
                );
              })}
              </View>
            </ScrollView>
            : null}
            {this.state.floorTab[0] === 1 ?
            <ScrollView horizontal={true} style={styles.home.floorTabContainer} showsHorizontalScrollIndicator={false}>
            <View style={[styles.common.flexDirectionRow, styles.home.floorSv]}>
            {this.state.glist1[1].map((v, k) => {
              return(
                <TouchableOpacity activeOpacity={.8} style={[styles.home.goods, {width: Utils.width/3.5}]}>
                  <Image source={{uri: Config.IMGURL + (v.goods_img || v.product.goods_img1)}} style={{width: Utils.width/3.5, height: Utils.width/3.5}} />
                  <Text numberOfLines={2} style={styles.home.goodsName}>{v.goods_name || v.product.goods_name}</Text>
                  <Text style={styles.home.goodsPrice}>￥{v.showprice}</Text>
                </TouchableOpacity>
              );
            })}
            </View>
            </ScrollView>
            : null}
            {this.state.floorTab[0] === 2 ?
            <ScrollView horizontal={true} style={styles.home.floorTabContainer} showsHorizontalScrollIndicator={false}>
            <View style={[styles.common.flexDirectionRow, styles.home.floorSv]}>
            {this.state.glist1[2].map((v, k) => {
              return(
                <TouchableOpacity activeOpacity={.8} style={[styles.home.goods, {width: Utils.width/3.5}]}>
                  <Image source={{uri: Config.IMGURL + (v.goods_img || v.product.goods_img1)}} style={{width: Utils.width/3.5, height: Utils.width/3.5}} />
                  <Text numberOfLines={2} style={styles.home.goodsName}>{v.goods_name || v.product.goods_name}</Text>
                  <Text style={styles.home.goodsPrice}>￥{v.showprice}</Text>
                </TouchableOpacity>
              );
            })}
            </View>
            </ScrollView>
            : null}
           </View>
           <View style={styles.home.floor}>
            <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.common.flexCenterh, styles.home.floorHeader]}>
              <View style={styles.home.floorLine}></View>
              <Image source={require('../../../images/home-f2.png')} style={styles.home.floorIcon}/>
              <Text style={styles.home.floorText}>两季电器</Text>
              <View style={styles.home.floorLine}></View>
            </View>
            {this.state.floorBanner[1] && this.state.floorBanner[1][0]?
            <TouchableOpacity activeOpacity={.8}>
              <Image source={{uri: this.state.floorBanner[1][0].img}} style={{width: Utils.width, height: Utils.width/3}}/>
            </TouchableOpacity>
            : null}
            <View style={[styles.common.flexDirectionRow, styles.home.floorTab]}>
              <TouchableHighlight underlayColor='#fafafa' onPress={() => this._floorTabFunc(1, 0, 54)} style={[styles.common.flex, styles.common.flexCenterh]}>
                <Text style={[styles.home.floorTabText, this.state.floorTab[1] === 0 ? styles.home.floorTabTextActive : '']}>全网热销</Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='#fafafa' onPress={() => this._floorTabFunc(1, 1, 55)} style={[styles.common.flex, styles.common.flexCenterh]}>
                <Text style={[styles.home.floorTabText, this.state.floorTab[1] === 1 ? styles.home.floorTabTextActive : '']}>即采即销</Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='#fafafa' onPress={() => this._floorTabFunc(1, 2, 56)} style={[styles.common.flex, styles.common.flexCenterh]}>
                <Text style={[styles.home.floorTabText, this.state.floorTab[1] === 2 ? styles.home.floorTabTextActive : '']}>精选优品</Text>
              </TouchableHighlight>
            </View>
            {this.state.floorTab[0] === 0 ?
            <ScrollView horizontal={true} style={styles.home.floorTabContainer} showsHorizontalScrollIndicator={false}>
              <View style={[styles.common.flexDirectionRow, styles.home.floorSv]}>
              {this.state.glist2[0].map((v, k) => {
                return(
                  <TouchableOpacity activeOpacity={.8} style={[styles.home.goods, {width: Utils.width/3.5}]}>
                    <Image source={{uri: Config.IMGURL + (v.goods_img || v.product.goods_img1)}} style={{width: Utils.width/3.5, height: Utils.width/3.5}} />
                    <Text numberOfLines={2} style={styles.home.goodsName}>{v.goods_name || v.product.goods_name}</Text>
                    <Text style={styles.home.goodsPrice}>￥{v.showprice}</Text>
                  </TouchableOpacity>
                );
              })}
              </View>
            </ScrollView>
            : null}
            {this.state.floorTab[0] === 1 ?
            <ScrollView horizontal={true} style={styles.home.floorTabContainer} showsHorizontalScrollIndicator={false}>
            <View style={[styles.common.flexDirectionRow, styles.home.floorSv]}>
            {this.state.glist2[1].map((v, k) => {
              return(
                <TouchableOpacity activeOpacity={.8} style={[styles.home.goods, {width: Utils.width/3.5}]}>
                  <Image source={{uri: Config.IMGURL + (v.goods_img || v.product.goods_img1)}} style={{width: Utils.width/3.5, height: Utils.width/3.5}} />
                  <Text numberOfLines={2} style={styles.home.goodsName}>{v.goods_name || v.product.goods_name}</Text>
                  <Text style={styles.home.goodsPrice}>￥{v.showprice}</Text>
                </TouchableOpacity>
              );
            })}
            </View>
            </ScrollView>
            : null}
            {this.state.floorTab[0] === 2 ?
            <ScrollView horizontal={true} style={styles.home.floorTabContainer} showsHorizontalScrollIndicator={false}>
            <View style={[styles.common.flexDirectionRow, styles.home.floorSv]}>
            {this.state.glist2[2].map((v, k) => {
              return(
                <TouchableOpacity activeOpacity={.8} style={[styles.home.goods, {width: Utils.width/3.5}]}>
                  <Image source={{uri: Config.IMGURL + (v.goods_img || v.product.goods_img1)}} style={{width: Utils.width/3.5, height: Utils.width/3.5}} />
                  <Text numberOfLines={2} style={styles.home.goodsName}>{v.goods_name || v.product.goods_name}</Text>
                  <Text style={styles.home.goodsPrice}>￥{v.showprice}</Text>
                </TouchableOpacity>
              );
            })}
            </View>
            </ScrollView>
            : null}
           </View>
           <View style={styles.home.floor}>
            <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.common.flexCenterh, styles.home.floorHeader]}>
              <View style={styles.home.floorLine}></View>
              <Image source={require('../../../images/home-f3.png')} style={styles.home.floorIcon}/>
              <Text style={styles.home.floorText}>冰箱洗衣机</Text>
              <View style={styles.home.floorLine}></View>
            </View>
            {this.state.floorBanner[2] && this.state.floorBanner[2][0]?
            <TouchableOpacity activeOpacity={.8}>
              <Image source={{uri: this.state.floorBanner[2][0].img}} style={{width: Utils.width, height: Utils.width/3}}/>
            </TouchableOpacity>
            : null}
            <View style={[styles.common.flexDirectionRow, styles.home.floorTab]}>
              <TouchableHighlight underlayColor='#fafafa' onPress={() => this._floorTabFunc(2, 0, 58)} style={[styles.common.flex, styles.common.flexCenterh]}>
                <Text style={[styles.home.floorTabText, this.state.floorTab[2] === 0 ? styles.home.floorTabTextActive : '']}>全网热销</Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='#fafafa' onPress={() => this._floorTabFunc(2, 1, 59)} style={[styles.common.flex, styles.common.flexCenterh]}>
                <Text style={[styles.home.floorTabText, this.state.floorTab[2] === 1 ? styles.home.floorTabTextActive : '']}>即采即销</Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='#fafafa' onPress={() => this._floorTabFunc(2, 2, 60)} style={[styles.common.flex, styles.common.flexCenterh]}>
                <Text style={[styles.home.floorTabText, this.state.floorTab[2] === 2 ? styles.home.floorTabTextActive : '']}>精选优品</Text>
              </TouchableHighlight>
            </View>
            {this.state.floorTab[0] === 0 ?
            <ScrollView horizontal={true} style={styles.home.floorTabContainer} showsHorizontalScrollIndicator={false}>
              <View style={[styles.common.flexDirectionRow, styles.home.floorSv]}>
              {this.state.glist3[0].map((v, k) => {
                return(
                  <TouchableOpacity activeOpacity={.8} style={[styles.home.goods, {width: Utils.width/3.5}]}>
                    <Image source={{uri: Config.IMGURL + (v.goods_img || v.product.goods_img1)}} style={{width: Utils.width/3.5, height: Utils.width/3.5}} />
                    <Text numberOfLines={2} style={styles.home.goodsName}>{v.goods_name || v.product.goods_name}</Text>
                    <Text style={styles.home.goodsPrice}>￥{v.showprice}</Text>
                  </TouchableOpacity>
                );
              })}
              </View>
            </ScrollView>
            : null}
            {this.state.floorTab[0] === 1 ?
            <ScrollView horizontal={true} style={styles.home.floorTabContainer} showsHorizontalScrollIndicator={false}>
            <View style={[styles.common.flexDirectionRow, styles.home.floorSv]}>
            {this.state.glist3[1].map((v, k) => {
              return(
                <TouchableOpacity activeOpacity={.8} style={[styles.home.goods, {width: Utils.width/3.5}]}>
                  <Image source={{uri: Config.IMGURL + (v.goods_img || v.product.goods_img1)}} style={{width: Utils.width/3.5, height: Utils.width/3.5}} />
                  <Text numberOfLines={2} style={styles.home.goodsName}>{v.goods_name || v.product.goods_name}</Text>
                  <Text style={styles.home.goodsPrice}>￥{v.showprice}</Text>
                </TouchableOpacity>
              );
            })}
            </View>
            </ScrollView>
            : null}
            {this.state.floorTab[0] === 2 ?
            <ScrollView horizontal={true} style={styles.home.floorTabContainer} showsHorizontalScrollIndicator={false}>
            <View style={[styles.common.flexDirectionRow, styles.home.floorSv]}>
            {this.state.glist3[2].map((v, k) => {
              return(
                <TouchableOpacity activeOpacity={.8} style={[styles.home.goods, {width: Utils.width/3.5}]}>
                  <Image source={{uri: Config.IMGURL + (v.goods_img || v.product.goods_img1)}} style={{width: Utils.width/3.5, height: Utils.width/3.5}} />
                  <Text numberOfLines={2} style={styles.home.goodsName}>{v.goods_name || v.product.goods_name}</Text>
                  <Text style={styles.home.goodsPrice}>￥{v.showprice}</Text>
                </TouchableOpacity>
              );
            })}
            </View>
            </ScrollView>
            : null}
           </View>
        </ScrollView>
        <Loading visible={this.state.loadingVisible}></Loading>
      </View>
    );
  }
  _init = () => {
    fetch(Config.PHPAPI + 'api/mapp/ad/ad-imagelist?id=582,583,584,585,586,587,588,589,590,591,592,593',{
      method: 'GET'
    })
    .then(response => response.json())
    .then((r) => {
      if(r.error_code === 0) {
        this.setState({
          banner: r.data['582'],
          newsList: r.data['583'],
          ad: r.data['584'],
          cate: r.data['593'],
          floorBanner: [
            r.data['585'],
            r.data['586'],
            r.data['587'],
            r.data['588'],
            r.data['589'],
            r.data['590'],
            r.data['591'],
            r.data['592']
          ],
          loadingVisible: false
        });
        if(r.data['583'].length > 1) {
          this.newsTimer = setTimeout(() => {
            this._newsScroll();
          }, 3000);
        }
      }
    });
    fetch(Config.PHPAPI + 'api/mapp/ad/ad-goodslist?id=51,54,57,60,63,66,69,72,75', {
      method: 'GET'
    })
    .then(response => response.json())
    .then((r) => {
       if(r.error_code === 0) {
          this.setState({
            glist1: [r.data['51'], [], []],
            glist2: [r.data['54'], [], []],
            glist3: [r.data['57'], [], []],
            glist4: [r.data['60'], [], []],
            glist5: [r.data['63'], [], []],
            glist6: [r.data['66'], [], []],
            glist7: [r.data['69'], [], []],
            glist8: [r.data['72'], [], []],
          });
       }
   });
  }
  _newsScroll = (i) => {
    Animated.timing(
      this.state.newsAniVal,
      {
        toValue: - 16 * this.state.newsIndex,
        useNativeDriver: true,
      }
    ).start(() => {
      if(this.state.newsIndex === this.state.newsList.length) {
        Animated.timing(
          this.state.newsAniVal,
          {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }
        ).start()
        this.state.newsIndex = 1;
      } else {
        this.state.newsIndex++;
      }
      this.newsTimer && clearTimeout(this.newsTimer);
      this.newsTimer = setTimeout(() => {
        this._newsScroll();
      }, 3000);
    });
  }
  _floorTabFunc = (k, i, id) => {
    let _temp = this.state.floorTab;
    _temp[k] = i;
    this.setState({floorTab: _temp});
  }
  _bodyScroll = (e) => {
    let _y = e.nativeEvent.contentOffset.y;
    InteractionManager.runAfterInteractions(() => {
      Animated.timing(
        this.state.headerBgOpacity,
        {
          toValue: _y/100 < .1 ? 0 : _y/100,
          useNativeDriver: true
        }
      ).start();
      Animated.timing(
        this.state.searchOpacity,
        {
          toValue: _y/500 + .8,
          useNativeDriver: true
        }
      ).start();
    });
  }
}
