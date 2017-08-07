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
  InteractionManager,
  DeviceEventEmitter
} from 'react-native';

import Utils from '../../../js/utils';
import Config from '../../../config/config';
import styles from '../../../css/styles';

import ScreenInit from '../../../config/screenInit';
import GoodsItem from '../../components/seller/tab-goods-item';
import Loading from '../../common/ui-loading';

export default class SellerGoodsScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        type: 0,
        searchVal: '',
        switchIndex: 0,
        listOnline: [],
        keyword: '',
        page: [0, 0, 0],
        cateId: '',
        brandId: '',
        loadingVisible: false,
        checkAll: false
      };
    }
    componentDidMount() {
      this.setState({loadingVisible: true});
      InteractionManager.runAfterInteractions(() => {
        ScreenInit.checkLogin(this);
        this._getData();
      });
      this.listener_item_check = DeviceEventEmitter.addListener('sellerGoodsItemCheck', (r) => {
        if(!r.checked) {
          this.setState({checkAll: r.checked});
        } else {

        }
      });
    }
    componentWillUnmount() {
      this.listener_item_check && this.listener_item_check.remove();
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
            <ScrollView style={styles.common.initWhite} horizontal={true} pagingEnabled={true} onMomentumScrollEnd={(e) => this._onScrollOver(e)} ref="containerScrollView" showsHorizontalScrollIndicator={false}>
              <FlatList
              data={this.state.listOnline}
              renderItem={({item}) => <GoodsItem data={item} index={state.switchIndex}></GoodsItem>}
              getItemLayout={(data, index) => (
                {length: 91, offset: 91 * index, index}
              )}
              style={[{width: Utils.width}]}
              />
              <ScrollView style={[{width: Utils.width}]}>
                <Text>22</Text>
              </ScrollView>
              <ScrollView style={[{width: Utils.width}]}>
                <Text>33</Text>
              </ScrollView>
            </ScrollView>
            <View style={[styles.sgoods.footer, styles.common.flexDirectionRow]}>
              <TouchableOpacity onPress={this._checkedItem} onPress={this._checkAllFunc}>
                <View style={styles.sgoods.all}>
                {this.state.checkAll ?
                  <Image source={require('../../../images/icon-checked-blue.png')} style={styles.control.checked} />
                  : <View style={styles.control.checkbox}></View>}
                  <Text style={styles.sgoods.allText}>全选</Text>
                </View>
              </TouchableOpacity>
              <View style={[styles.common.flex, styles.common.flexEndh]}>
                <TouchableHighlight underlayColor='#fafafa'>
                  <Text style={styles.btn.defaults}>下架</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container}>
                  <Text style={styles.btn.danger}>删除</Text>
                </TouchableHighlight>
              </View>
            </View>
            <Loading visible={this.state.loadingVisible}></Loading>
          </View>
        );
    }
    _tab = (type) => {
      this.setState({type});
    }
    _switch = (i) => {
      this.setState({switchIndex: i});
      this.refs.containerScrollView.scrollTo({x: i * Utils.width, y: 0});
    }
    _onScrollOver = (e) => {
      var page = Math.floor(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
      if(page == this.state.switchIndex) return;
      this.setState({switchIndex: page});
    }
    _getData = () => {
      let state = this.state;
      this.state.page[state.switchIndex]++;

      fetch(Config.PHPAPI + `api/mapp/goods-seller/list?keyword=${state.keyword}&page=${state.page[state.switchIndex]}&pageSize=10&cateId=${state.cateId}&brandId=${state.brandId}&show=${state.switchIndex}&token=${token}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then((data) => {
        this.setState({loadingVisible: false});
        if(data.error_code == 0) {
          let _temp = [...state.listOnline, ...data.data.list];
          this.setState({listOnline: _temp});
        }
      });
    }
    _checkAllFunc = () => {
      let _ori = !this.state.checkAll;
      this.setState({
        checkAll: _ori
      });
      DeviceEventEmitter.emit('sellerGoodsCheck', {checked: _ori});
    }
}
