/**
 * Component: 分类
 * author: yiyinSong
 * date: 2017-10-18
 */
import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TextInput
  } from 'react-native';

import Config from '../../../config/config';
import Utils from '../../../js/utils';
import Loading from '../../common/ui-loading';
import styles from '../../../css/styles';
import UIToast from '../../common/ui-toast';

  export default class CategoryScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        modelSearch: '',
        data: [],
        lv1: 0,
        loadingVisible: false,
      };
    }
    render() {
      return(
        <View style={[styles.common.flexv, styles.common.init]}>
          <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.category.header]}>
            <Image source={require('../../../images/logo.png')} style={styles.category.logo} resizeMode="contain"/>
            <View style={[styles.common.flex, styles.common.flexCenterv, styles.category.searchWrapper]}>
              <TextInput
                style={[styles.common.flex, styles.category.search]}
                onChangeText={(text) => this.setState({modelSearch: text})}
                value={this.state.modelSearch}
                underlineColorAndroid="transparent"
                placeholder="请输入商品名称"
                onSubmitEditing={this._searchHandle}
              />
              <TouchableOpacity activeOpacity={.8} onPress={this._searchHandle}>
                <Image source={require('../../../images/icon-search@30x30.png')} style={styles.category.searchIcon} resizeMode="contain"/>
              </TouchableOpacity>
            </View>
           </View>
           <View style={styles.common.flex}>
            <View style={styles.category.left}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {this.state.data.map((v, k) => {
                  return (
                    <TouchableHighlight underlayColor="#f1f1f1" onPress={() => this._selectLv1(k)}>
                      <Text numberOfLines={1} style={[styles.category.leftItem, this.state.lv1 === k ? styles.category.leftItemActive : null]}>{v.name}</Text>
                    </TouchableHighlight>
                  )
                })}
              </ScrollView>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.category.right}>
              {this.state.data[this.state.lv1] && this.state.data[this.state.lv1].list.map((v, k) => {
                return(
                  <View style={styles.category.lv2}>
                    <Text style={styles.category.rightItemTitle}>{v.name}</Text>
                    <View style={[styles.common.flexDirectionRow, styles.common.flexWrap]}>
                      {v.list && v.list.map((v1, k1) => {
                        return (
                          <TouchableOpacity activeOpacity={.8} style={styles.category.rightItem}>
                            <Image source={{uri: Config.IMGURL + v1.cate_img}} resizeMode="cover" style={{width: (Utils.width - 130) / 3, height: (Utils.width - 130) / 3}} />
                            <Text style={styles.category.rightItemText}>{v.name}</Text>
                          </TouchableOpacity>
                        )
                      })}
                    </View>
                  </View>
                )
              })}
            </ScrollView>            
           </View>
           <Loading visible={this.state.loadingVisible}></Loading>           
        </View>
      );
    }
    componentDidMount() {
      this.setState({loadingVisible: true});
      this._init();
    }
    _init = () => {
      fetch(`${Config.PHPAPI}api/mapp/shop/cate?token=${token}`, {
        method: 'post'
      })
      .then(response => response.json())
      .then(r => {
        this.setState({loadingVisible: false});
        if(r.error_code == 0) {
          this.setState({data: r.data});
        } else {
          UIToast('获取分类失败');
        }
      });
    }
    _searchHandle = () => {
      
    }
    _selectLv1 = (k) => {
      this.setState({lv1: k});
    }
  }
