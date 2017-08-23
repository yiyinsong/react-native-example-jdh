import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity ,
  Animated
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
      newsIndex: 1
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
        <View style={styles.home.header}>
          <View style={[styles.common.flex, styles.common.flexCenterv, styles.home.search,  {backgroundColor: 'rgba(255, 255, 255, .8)'}]}>
            <Image source={require('../../../images/icon-search@30x30.png')} style={styles.home.searchIcon} />
            <Text style={styles.home.searchText}>请输入商品名称</Text>
          </View>
        </View>
        <ScrollView>
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
          cate: r.data['593'],
          loadingVisible: false
        });
        if(r.data['583'].length > 1) {
          this.newsTimer = setTimeout(() => {
            this.newsScroll();
          }, 3000);
        }
      }
    });
  }
  newsScroll = (i) => {
    Animated.timing(
      this.state.newsAniVal,
      {
        toValue: - 16 * this.state.newsIndex,
      }
    ).start(() => {
      if(this.state.newsIndex === this.state.newsList.length) {
        Animated.timing(
          this.state.newsAniVal,
          {
            toValue: 0,
            duration: 0
          }
        ).start()
        this.state.newsIndex = 1;
      } else {
        this.state.newsIndex++;
      }
      this.newsTimer && clearTimeout(this.newsTimer);
      this.newsTimer = setTimeout(() => {
        this.newsScroll();
      }, 3000);
    });
  }
}
