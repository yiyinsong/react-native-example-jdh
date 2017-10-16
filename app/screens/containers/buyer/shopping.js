import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
  InteractionManager,
  Modal,
  } from 'react-native';
import Swiper from 'react-native-swiper';

import ScreenInit from '../../../config/screenInit'
import Config from '../../../config/config';
import styles from '../../../css/styles';
import Utils from '../../../js/utils';

import Loading from '../../common/ui-loading';

export default class ShoppingScreen extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      loadingVisible: false,
      headerBgOpacity: 0,
      searchOpacity: 0.8,
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
      glist: [
        [[], [], []],
        [[], [], []],
        [[], [], []],
        [[], [], []],
        [[], [], []],
        [[], [], []],
        [[], [], []],
        [[], [], []],
      ],
      glistLoadAll: [
        [false ,false ,false],
        [false ,false ,false],
        [false ,false ,false],
        [false ,false ,false],
        [false ,false ,false],
        [false ,false ,false],
        [false ,false ,false],
        [false ,false ,false]
      ],
      hotList: [[], []],
      hotPage: [0, 0],
      hotTab: 0,
      hotLoading: false,
      newsModalVisible: false,
      newsMoreImg: ''
    };
  }
  componentDidMount() {
    this.setState({loadingVisible: true});
    ScreenInit.checkLogin(this);
    this._init();
  }
  componentWillUnmount() {
    this.newsTimer && clearTimeout(this.newsTimer);
  }
  render() {
    return(
      <View style={[styles.common.flexv, styles.common.initWhite]}>
        <ScrollView onScroll={this._bodyScroll} scrollEventThrottle={1} onMomentumScrollEnd={this._headerUpdate} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0, 13]}>
          <View style={[styles.home.header, {backgroundColor: 'rgba(249, 59, 49, ' + this.state.headerBgOpacity + ')'}]}>
            <View style={[styles.home.search, {opacity: this.state.searchOpacity}]}>
              <TouchableWithoutFeedback onPress={this._toSearch}>
                <View style={[styles.common.flex, styles.common.flexCenterv, ]}>
                  <Image source={require('../../../images/icon-search@30x30.png')} style={styles.home.searchIcon} />
                  <Text style={styles.home.searchText}>搜索商品名称</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <Swiper
          style={{height:Utils.width*.4, overflow: 'hidden'}}
          loop={true}
          activeDotStyle={styles.home.swiperDotActive} dotStyle={styles.home.swiperDot}
          paginationStyle={{bottom: 5}}
          autoplay={true}
          autoplayTimeout={4}>
              {this.state.banner.map( (v, k) => {
                return (
                  <TouchableOpacity activeOpacity={1} key={v.id}>
                    <Image
                      source={{uri: v.img}}
                      style={{width: Utils.width, height: Utils.width*.4}} />
                  </TouchableOpacity>
                );
              })}
           </Swiper>
           <View style={styles.home.cateContainer}>
             <View style={[styles.common.flexDirectionRow, styles.home.cate]}>
               {this._renderCate(this.state.cate[0])}
               {this._renderCate(this.state.cate[1])}
               {this._renderCate(this.state.cate[2])}
               {this._renderCate(this.state.cate[3])}
               <TouchableOpacity activeOpacity={.8} style={[styles.common.flexv, styles.common.flexCenterv]} onPress={() => this._toCateHandle(4)}>
                 <Image source={require('../../../images/icon-home-cate5.png')} style={styles.home.cateIcon} />
                 <Text style={styles.home.cateText}>众采</Text>
               </TouchableOpacity>
             </View>
             <View style={[styles.common.flexDirectionRow, styles.home.cate]}>
               {this._renderCate(this.state.cate[4])}
               {this._renderCate(this.state.cate[5])}
               {this._renderCate(this.state.cate[6])}
               {this._renderCate(this.state.cate[7])}
               <TouchableOpacity activeOpacity={.8} style={[styles.common.flexv, styles.common.flexCenterv]} onPress={this._toSign}>
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
                      <View style={styles.common.flexDirectionRow}>
                        <Text numberOfLines={1} style={[styles.home.newsText, styles.common.flex]} key={v.id}>{v.content}</Text>
                        <TouchableOpacity activeOpacity={1} onPress={() => this._showNewsMore(Config.IMGURL + v.img)}>
                          <Text style={styles.home.newsMore}>更多</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  })}
                  {
                    this.state.newsList[0] ?
                    <Text numberOfLines={1} style={styles.home.newsText}>{this.state.newsList[0].content}</Text>
                    : null
                  }
                </Animated.View>
              </View>
             </View>
           </View>
           <View style={[styles.common.flexDirectionRow, styles.home.ad]}>
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
                 <Image source={{uri: this.state.ad[3].img}}  style={{width: Utils.width/2, height: Utils.width/4}}/>
               </TouchableOpacity>
              : null}
              {this.state.ad[4] ?
               <TouchableOpacity activeOpacity={.8} style={styles.home.ad4}>
                 <Image source={{uri: this.state.ad[4].img}}  style={{width: Utils.width/2, height: Utils.width/4}}/>
               </TouchableOpacity>
              : null}
           </View>
           {this._renderFloor({
             icon: require('../../../images/home-f1.png'),
             title: '空调',
             index: 0,
             ids: [1,2,3],
           })}
           {this._renderFloor({
             icon: require('../../../images/home-f3.png'),
             title: '冰箱洗衣机',
             index: 1,
             ids: [4,5,6],
           })}
           {this._renderFloor({
             icon: require('../../../images/home-f5.png'),
             title: '电视影音',
             index: 2,
             ids: [7,8,9],
           })}
           {this._renderFloor({
             icon: require('../../../images/home-f4.png'),
             title: '厨卫电器',
             index: 3,
             ids: [10,11,12],
           })}
           {this._renderFloor({
             icon: require('../../../images/home-f2.png'),
             title: '两季电器',
             index: 4,
             ids: [13,14,15],
           })}
           {this._renderFloor({
             icon: require('../../../images/home-f6.png'),
             title: '厨房小电',
             index: 5,
             ids: [16,17,18],
           })}
           {this._renderFloor({
             icon: require('../../../images/home-f7.png'),
             title: '生活电器',
             index: 6,
             ids: [19,20,21],
           })}
           {this._renderFloor({
             icon: require('../../../images/home-f8.png'),
             title: '个护健康',
             index: 7,
             ids: [22,23,24],
           })}
           <View style={styles.home.floor}>
            <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.common.flexCenterh, styles.home.floorHeader, styles.home.hotHeader]}>
              <View style={styles.home.floorLine}></View>
              <Image source={require('../../../images/home-hot.png')} style={styles.home.floorIcon}/>
              <Text style={styles.home.floorText}>热销推荐</Text>
              <View style={styles.home.floorLine}></View>
            </View>
            <View style={[styles.common.flexDirectionRow, styles.home.hotTabContainer]}>
              <TouchableHighlight underlayColor='#fafafa' onPress={() => this._tabHotFunc(0)} style={styles.common.flex}>
                <View style={[styles.common.flexv, styles.common.flexCenterv, styles.home.hot1]}>
                  <Text style={[styles.home.hotText, this.state.hotTab === 0 ? styles.home.hotTextActive : '']}>爆款</Text>
                  {this.state.hotTab === 0 ? <View style={styles.home.triangle}></View> : null}
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='#fafafa' onPress={() => this._tabHotFunc(1)} style={styles.common.flex}>
                <View style={[styles.common.flexv, styles.common.flexCenterv, styles.home.hot1]}>
                  <Text style={[styles.home.hotText, this.state.hotTab === 1 ? styles.home.hotTextActive : '']}>毛利王</Text>
                  {this.state.hotTab === 1 ? <View style={styles.home.triangle}></View> : null}
                </View>
              </TouchableHighlight>
            </View>
          </View>
          {this._renderHotList(this.state.hotTab)}
          <Text style={[styles.common.loadingTips, styles.home.hotLoadTips]}>{this.state.hotPage[this.state.hotTab] > 7 ? '没有更多商品' : '加载商品中...'}</Text>
        </ScrollView>
        <Modal
            animationType='fade'
            onRequestClose={() => this._closeNewsModal()}
            visible={this.state.newsModalVisible}
            transparent={true}
             >
            <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={() => this._closeNewsModal()}>
            <View style={styles.modal.container}>
                <View style={styles.home.newsImgContainer}>
                  <Image source={{uri: this.state.newsMoreImg}} style={{width: Utils.width * .7,height: Utils.width * .7, resizeMode: 'contain'}} />
                </View>
            </View>
            </TouchableOpacity>
        </Modal>
        <Loading visible={this.state.loadingVisible}></Loading>
      </View>
    );
  }
  _renderFloor = (o) => {
    return (
      <View style={styles.home.floor}>
       <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.common.flexCenterh, styles.home.floorHeader]}>
         <View style={styles.home.floorLine}></View>
         <Image source={o.icon} style={styles.home.floorIcon}/>
         <Text style={styles.home.floorText}>{o.title}</Text>
         <View style={styles.home.floorLine}></View>
       </View>
       {this.state.floorBanner[o.index] && this.state.floorBanner[o.index][0]?
       <TouchableOpacity activeOpacity={.8}>
         <Image source={{uri: this.state.floorBanner[o.index][0].img}} style={{width: Utils.width, height: Utils.width/3}}/>
       </TouchableOpacity>
       : null}
       <View style={[styles.common.flexDirectionRow, styles.home.floorTab]}>
         <TouchableHighlight underlayColor='#fafafa' onPress={() => this._floorTabFunc(o.index, 0, o.ids[0])} style={[styles.common.flex, styles.common.flexCenterh]}>
           <Text style={[styles.home.floorTabText, this.state.floorTab[o.index] === 0 ? styles.home.floorTabTextActive : '']}>全网热销</Text>
         </TouchableHighlight>
         <TouchableHighlight underlayColor='#fafafa' onPress={() => this._floorTabFunc(o.index, 1, o.ids[1])} style={[styles.common.flex, styles.common.flexCenterh]}>
           <Text style={[styles.home.floorTabText, this.state.floorTab[o.index] === 1 ? styles.home.floorTabTextActive : '']}>即采即销</Text>
         </TouchableHighlight>
         <TouchableHighlight underlayColor='#fafafa' onPress={() => this._floorTabFunc(o.index, 2, o.ids[2])} style={[styles.common.flex, styles.common.flexCenterh]}>
           <Text style={[styles.home.floorTabText, this.state.floorTab[o.index] === 2 ? styles.home.floorTabTextActive : '']}>精选优品</Text>
         </TouchableHighlight>
       </View>
       <ScrollView horizontal={true} style={styles.home.floorTabContainer} showsHorizontalScrollIndicator={false} onScrollBeginDrag={() => this._loadFloorGoods(o.index, this.state.floorTab[o.index])}>
         <View style={[styles.common.flexDirectionRow, styles.home.floorSv]}>
         {this.state.glist[o.index][this.state.floorTab[o.index]].map((v, k) => {
           return(
             <TouchableOpacity activeOpacity={.8} style={[styles.home.goods, {width: Utils.width/3.5}]} key={v.id}>
               <Image source={{uri: k < 4 || this.state.glistLoadAll[o.index][this.state.floorTab[o.index]] ? Config.IMGURL + (v.goods_img || v.product.goods_img1) : Config.IMGURL}} style={{width: Utils.width/3.5, height: Utils.width/3.5}} />
               <Text numberOfLines={2} style={styles.home.goodsName}>{v.goods_name || v.product.goods_name}</Text>
               <Text style={styles.home.goodsPrice}>￥{v.showprice}</Text>
             </TouchableOpacity>
           );
         })}
         </View>
       </ScrollView>
      </View>
    );
  }
  _init = () => {
    fetch(Config.PHPAPI + 'api/mapp/ad/ad-imagelist?id=587,588,589,590,591,592,593,594,595,596,597,598',{
      method: 'GET'
    })
    .then(response => response.json())
    .then((r) => {
      if(r.error_code === 0) {
        this.setState({
          banner: r.data['587'],
          ad: r.data['589'],
          cate: r.data['598'],
          floorBanner: [
            r.data['590'],
            r.data['591'],
            r.data['592'],
            r.data['593'],
            r.data['594'],
            r.data['595'],
            r.data['596'],
            r.data['597']
          ],
          loadingVisible: false
        });
      }
    });
    fetch(Config.PHPAPI + `api/mapp/dynamics/dylist?token=${token}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then( r => {
      if(r.error_code === 0) {
        this.setState({newsList: r.data});
        if(r.data.length > 1) {
          this.newsTimer = setTimeout(() => {
            this._newsScroll();
          }, 3000);
        }
      }
    });
    fetch(Config.PHPAPI + 'api/mapp/ad/ad-goodslist?id=1,4,7,10,13,16,19,22&limit=8', {
      method: 'GET'
    })
    .then(response => response.json())
    .then((r) => {
       if(r.error_code === 0) {
          this.setState({
            glist: [
              [r.data['1'], [], []],
              [r.data['4'], [], []],
              [r.data['7'], [], []],
              [r.data['10'], [], []],
              [r.data['13'], [], []],
              [r.data['16'], [], []],
              [r.data['19'], [], []],
              [r.data['22'], [], []]
            ]
          });
       }
   });
  }
  _newsScroll = (i) => {
    Animated.timing(
      this.state.newsAniVal,
      {
        toValue: - 24 * this.state.newsIndex,
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
  _showNewsMore = (src) => {
    this.props.navigation.navigate('NewsMore', {src});
    // this.setState({
    //   newsModalVisible: true,
    //   newsMoreImg: src
    // });
  }
  _closeNewsModal = () => {
    this.setState({
      newsModalVisible: false,
      newsMoreImg: ''
    });
  }
  _floorTabFunc = (k, i, id) => {
      let _temp = this.state.floorTab;
      _temp[k] = i;
      //切换加载完毕当前楼层商品
      let _gla = this.state.glistLoadAll;
      _gla[k][i] = true;
      this.setState({floorTab: _temp, glistLoadAll: _gla});
      if(this.state.glist[k][i].length === 0) {
        fetch(Config.PHPAPI + `api/mapp/ad/ad-goodslist?id=${id}&limit=8`, {
          method: 'GET'
        })
        .then(response => response.json())
        .then((r) => {
           if(r.error_code === 0) {
             let _temp = this.state.glist;
             _temp[k][i] = r.data[id];
              this.setState({
                glist: _temp
              });
           }
       });
      }
  }
  _bodyScroll = (e) => {
    let _bodyHeight = e.nativeEvent.contentSize.height;
    let _windowHeight = e.nativeEvent.layoutMeasurement.height;
    let _y = e.nativeEvent.contentOffset.y;

    if(_y + _windowHeight >= _bodyHeight - 20){
      if(!this.state.hotLoading) {
        this._getHotFunc(this.state.hotTab);
      }
    }

    this.bodyScrollTimer && clearTimeout(this.bodyScrollTimer);
    this.bodyScrollTimer = setTimeout(() => {
      this.setState({
        headerBgOpacity: _y/100 < .1 ? 0 : _y/100,
        searchOpacity: _y/500 + .8
      });
    }, 100);
  }
  _tabHotFunc = (t) => {
    if(this.state.hotTab === t) return;
    this.setState({hotTab: t});
    if(t === 0 && this.state.hotList[0].length === 0) {
      this._getHotFunc(0);
    } else if(t === 1 && this.state.hotList[1].length === 0) {
      this._getHotFunc(1);
    }
  }
  _getHotFunc = (t) => {
    let ids = '';
    if(t === 0) {
        if(this.state.hotPage[0] > 7) return;
        ids = 25 + this.state.hotPage[0] * 2;
    } else {
        if(this.state.hotPage[1] > 7) return;
        ids = 26 + this.state.hotPage[1] * 2;
    }
    this.state.hotLoading = true;
    fetch(Config.PHPAPI + `api/mapp/ad/ad-goodslist?id=${ids}&limit=6`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then((r) => {
       if(r.error_code === 0) {
         this.state.hotLoading = false;
         let _page = this.state.hotPage;
         _page[t]++;
         this.setState({hotPage: _page});
         //如果当前楼层没有数据，继续读取下一层
         if(r.data[ids].length === 0) {
           this._getHotFunc(t);
           return;
         }
         let _temp = this.state.hotList;
         _temp[t] = [..._temp[t], ...r.data[ids]];
         this.setState({hotList: _temp});
       }
   });
  }
  _renderCate = (v) => {
    if(v) {
      return (<TouchableOpacity activeOpacity={.8} style={[styles.common.flexv, styles.common.flexCenterv]}>
        <Image source={{uri: v.img}} style={styles.home.cateIcon} />
        <Text style={styles.home.cateText}>{v.name}</Text>
      </TouchableOpacity>);
    } else {
      return null;
    }
  }
  _renderHotList = (t) => {
    return (
      <View style={[styles.common.flexDirectionRow, styles.home.hotList]}>
      {this.state.hotList[t].map((v, k) => {
        return(
          <View style={[styles.home.hotItem, {width: (Utils.width - 5)/2,marginRight: (k%2 == 0 ? 5 : 0)}]} key={v.id}>
            <Image source={{uri: Config.IMGURL + (v.goods_img || v.product.goods_img1)}} style={{width: (Utils.width - 5)/2, height: (Utils.width - 5)/2}} />
            <Text numberOfLines={2} style={styles.home.hotGoodsName}>{v.goods_name || v.product.goods_name}</Text>
            <Text style={styles.home.hotGoodsPrice}>￥{v.showprice}</Text>
          </View>
        )
      })}
      </View>
    )
  }
  _loadFloorGoods = (i, k) => {
    if(this.state.glistLoadAll[i][k]) return;
    let _temp = this.state.glistLoadAll;
    _temp[i][k] = true;
    this.setState({
      glistLoadAll: _temp
    });
  }
  _toSearch = () => {
    this.props.navigation.navigate('BuyerSearch');
  }
  _toSign = () => {
    this.props.navigation.navigate('BuyerSign');
  }
  _toCateHandle = (k) => {
    if(k === 4) {
    }
  }
}
