/**
 * Component: Home
 * author: yiyinSong
 * date: 2017-10-16
 */
import React, { Component } from 'react';
import {
  Text,
  Image,
  ImageBackground,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
  } from 'react-native';

  import Config from '../../../config/config';
  import Utils from '../../../js/utils';
  import Loading from '../../common/ui-loading';
  import styles from '../../../css/styles';

  export default class StoreScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {};
    }
    render() {
      return(
        <ScrollView style={styles.common.init}>
            <ImageBackground style={{width: Utils.width, height: Utils.width / 1.74}} source={require('../../../images/store-bg.png')} resizeMode='cover'>
                <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.store.top]}>
                    <TouchableOpacity activeOpacity={.8} style={styles.common.flexDirectionRow}>
                        <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv]}>
                            <Image source={require('../../../images/store-icon-store.png')} style={styles.store.iconStore}/>
                            <Text style={styles.store.storeText}>店铺</Text>
                        </View>
                    </TouchableOpacity> 
                    <View style={styles.common.flex}>
                        <Text numberOfLines={1} style={[styles.common.flex, styles.store.storeName]}>杨健康开杨健康开杨健康开杨健康开杨健康开杨健康开</Text>
                    </View>
                    <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv]}>
                        <TouchableOpacity activeOpacity={.8}>
                            <Image source={require('../../../images/store-icon-share.png')} style={styles.store.iconShare}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.8}>
                            <ImageBackground source={require('../../../images/store-icon-message.png')} style={styles.store.iconMessage}></ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.store.today}>
                    <Text style={styles.store.todayNum}>0</Text>
                    <Text style={styles.store.todayText}>今日销售总额(元)</Text>
                </View>
                <ImageBackground source={require('../../../images/store-bg-small.png')} style={[{width: Utils.width, height: Utils.width/6.67}, styles.common.flexDirectionRow]} resizeMode="contain">
                    <View style={[styles.common.flexv, styles.common.flexCenterh]}>
                        <Text style={styles.store.dataNum}>0</Text>
                        <Text style={styles.store.dataText}>今日销量</Text>
                    </View>
                    <View style={[styles.common.flexv, styles.common.flexCenterh]}>
                        <Text style={styles.store.dataNum}>0</Text>
                        <Text style={styles.store.dataText}>今日注册会员</Text>
                    </View>
                    <View style={[styles.common.flexv, styles.common.flexCenterh]}>
                        <Text style={styles.store.dataNum}>0</Text>
                        <Text style={styles.store.dataText}>新增会员</Text>
                    </View>
                </ImageBackground>
            </ImageBackground>
            <View style={[styles.common.flexDirectionRow, styles.store.grid]}>
                <TouchableHighlight underlayColor="#f5f5f5" style={[styles.store.gridItem, {width: Utils.width * .33, borderRightWidth: 1, borderRightColor: '#f1f1f1'}]}>
                    <View style={[styles.common.flexv, styles.common.flexCenterh, styles.common.flexCenterv]}>
                        <Image source={require('../../../images/store-icon1.png')} style={styles.store.icon}/>
                        <Text style={styles.store.iconText}>店铺管理</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#f5f5f5" style={[styles.store.gridItem, {width: Utils.width * .33, borderRightWidth: 1, borderRightColor: '#f1f1f1'}]}>
                    <View style={[styles.common.flexv, styles.common.flexCenterh, styles.common.flexCenterv]}>
                        <Image source={require('../../../images/store-icon2.png')} style={styles.store.icon}/>
                        <Text style={styles.store.iconText}>商品管理</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#f5f5f5" style={[styles.store.gridItem, {width: Utils.width * .34}]}>
                    <View style={[styles.common.flexv, styles.common.flexCenterh, styles.common.flexCenterv]}>
                        <Image source={require('../../../images/store-icon3.png')} style={styles.store.icon}/>
                        <Text style={styles.store.iconText}>店铺推广</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#f5f5f5" style={[styles.store.gridItem, {width: Utils.width * .33, borderRightWidth: 1, borderRightColor: '#f1f1f1'}]}>
                    <View style={[styles.common.flexv, styles.common.flexCenterh, styles.common.flexCenterv]}>
                        <Image source={require('../../../images/store-icon4.png')} style={styles.store.icon}/>
                        <Text style={styles.store.iconText}>采购订单</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#f5f5f5" style={[styles.store.gridItem, {width: Utils.width * .33, borderRightWidth: 1, borderRightColor: '#f1f1f1'}]}>
                    <View style={[styles.common.flexv, styles.common.flexCenterh, styles.common.flexCenterv]}>
                        <Image source={require('../../../images/store-icon5.png')} style={styles.store.icon}/>
                        <Text style={styles.store.iconText}>销售订单</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#f5f5f5" style={[styles.store.gridItem, {width: Utils.width * .34}]}>
                    <View style={[styles.common.flexv, styles.common.flexCenterh, styles.common.flexCenterv]}>
                    </View>
                </TouchableHighlight>
            </View>
            <TouchableHighlight underlayColor="#f1f1f1" style={styles.store.add}>
                <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.common.flexCenterh]}>
                    <Image source={require('../../../images/store-icon-add.png')} style={styles.store.addIcon}/>
                    <Text style={styles.store.addText}>快速添加商品</Text>
                </View>
            </TouchableHighlight>
        </ScrollView>
      );
    }
  }
