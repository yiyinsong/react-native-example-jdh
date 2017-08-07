import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Image,
  FlatList,
} from 'react-native';

import Utils from '../../../js/utils';
import styles from '../../../css/styles';

export default class SellerGoodsScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        type: 0,
        searchVal: '',
        switchIndex: 0
      };
    }

    render() {
        let state = this.state;
        return (
          <View style={styles.common.flexv}>
            <View style={styles.sgoods.tab}>
              <View style={[styles.sgoods.tabContainer, styles.common.flexDirectionRow]}>
                <TouchableHighlight underlayColor="#f5f5f5" onPress={() => this._tab(0)} style={styles.sgoods.tabItem}>
                  <Text style={[styles.sgoods.tabText, styles.sgoods.tabFirst, state.type == 0 ? styles.sgoods.tabActive : '']}>自建商品</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#f5f5f5" onPress={() => this._tab(1)} style={styles.sgoods.tabItem}>
                  <Text style={[styles.sgoods.tabText, state.type == 1 ? styles.sgoods.tabActive : '']}>即采商品</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#f5f5f5" onPress={() => this._tab(2)} style={styles.sgoods.tabItem}>
                  <Text style={[styles.sgoods.tabText, styles.sgoods.tabLast, state.type == 2 ? styles.sgoods.tabActive : '']}>商品库</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={[styles.common.flexDirectionRow, styles.sgoods.search]}>
              <View style={[styles.common.flex, styles.sgoods.searchForm, styles.common.flexCenterv]}>
                <TextInput onChangeText={(text) => this.setState({searchVal: text})} value={this.state.searchVal} style={[styles.sgoods.searchInput, styles.common.flex]} underlineColorAndroid="transparent"/>
                <Image source={require('../../../images/icon-search@30x30.png')} style={styles.sgoods.searchIcon}/>
              </View>
              <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv]}>
                <Image source={require('../../../images/icon-filter.png')} style={styles.sgoods.filter}/>
                <Text style={styles.sgoods.filterText}>筛选</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.common.flexDirectionRow, styles.sgoods.switchTitle]}>
              <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.sgoods.switchItem]} onPress={() => this._switch(0)}>
                <Text style={[styles.sgoods.switchText, state.switchIndex == 0 ? styles.sgoods.switchActive : '']}>在售商品</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.sgoods.switchItem]} onPress={() => this._switch(1)}>
                <Text style={[styles.sgoods.switchText, state.switchIndex == 1 ? styles.sgoods.switchActive : '']}>下架商品</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.sgoods.switchItem]} onPress={() => this._switch(2)}>
                <Text style={[styles.sgoods.switchText, state.switchIndex == 2 ? styles.sgoods.switchActive : '']}>回收站</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.common.initWhite} horizontal={true} pagingEnabled={true} onMomentumScrollEnd={(it) => this._onScrollOver(it)}>
              <ScrollView style={[{width: Utils.width}]}>
                <Text>11</Text>
              </ScrollView>
              <ScrollView style={[{width: Utils.width}]}>
                <Text>22</Text>
              </ScrollView>
              <ScrollView style={[{width: Utils.width}]}>
                <Text>33</Text>
              </ScrollView>
            </ScrollView>
          </View>
        );
    }
    _tab = (type) => {
      this.setState({type});
    }
    _switch = (i) => {
      this.setState({switchIndex: i});
    }
    _onScrollOver = (it) => {
      alert(it);
    }
}
// <FlatList
// data={state.listOnline}
// renderItem={({item}) => {}}
// />
