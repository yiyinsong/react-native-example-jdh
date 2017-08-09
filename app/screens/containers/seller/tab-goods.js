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
        switchIndex: 0,
        switchIndex2: 0,
        list1: [],
        list2: [],
        list3: [],
        keyword: '',
        page: [0, 0, 0],
        cateId: '',
        brandId: '',
        loadingVisible: false,
        checkAll: [false, false, false],
        havenCheck: [[], [], []],
        checkTotal: [0, 0, 0],
        over: [false, false, false],
        tips: ['', '', '']
      };
    }
    componentDidMount() {
      this.setState({loadingVisible: true});
      InteractionManager.runAfterInteractions(() => {
        ScreenInit.checkLogin(this);
        this._getData();
      });
      // this.listener_item_check = DeviceEventEmitter.addListener('sellerGoodsItemCheck', (r) => {
      //   if(!r.checked) {
      //     this.setState({checkAll: r.checked});
      //   } else {
      //
      //   }
      // });
    }
    componentWillUnmount() {
      // this.listener_item_check && this.listener_item_check.remove();
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
                <TextInput onChangeText={(text) => this.setState({keyword: text})} value={this.state.keyword} style={[styles.sgoods.searchInput, styles.common.flex]} underlineColorAndroid="transparent" onSubmitEditing={this._search}/>
                <Image source={require('../../../images/icon-search@30x30.png')} style={styles.sgoods.searchIcon}/>
              </View>
              <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv]}>
                <Image source={require('../../../images/icon-filter.png')} style={styles.sgoods.filter}/>
                <Text style={styles.sgoods.filterText}>筛选</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.common.initWhite} horizontal={true} pagingEnabled={true} onMomentumScrollEnd={(e) => this._onScrollOver(e)} ref="containerScrollView" showsHorizontalScrollIndicator={false}>
              <View style={{width: Utils.width}}>
                <View style={[styles.common.flexDirectionRow, styles.sgoods.switchTitle]}>
                  <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.sgoods.switchItem]} onPress={() => this._switch(0, 0)}>
                    <Text style={[styles.sgoods.switchText, state.switchIndex == 0 ? styles.sgoods.switchActive : '']}>在售商品</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.sgoods.switchItem]} onPress={() => this._switch(1, 0)}>
                    <Text style={[styles.sgoods.switchText, state.switchIndex == 1 ? styles.sgoods.switchActive : '']}>下架商品</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.sgoods.switchItem]} onPress={() => this._switch(2, 0)}>
                    <Text style={[styles.sgoods.switchText, state.switchIndex == 2 ? styles.sgoods.switchActive : '']}>回收站</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                data={this.state.list1}
                renderItem={({item, index}) => <GoodsItem data={item} index={0} sub={this.state.switchIndex} checkFunc={(ischeck) => {this._itemCheck(ischeck, index)}}></GoodsItem>}
                getItemLayout={(data, index) => (
                  {length: 91, offset: 91 * index, index}
                )}
                ListFooterComponent={this._renderFlatListFooter1()}
                onEndReached={this._getData}
                onEndReachedThreshold={.1}
                />
                <View style={[styles.sgoods.footer, styles.common.flexDirectionRow]}>
                  <TouchableOpacity onPress={this._checkedItem} onPress={this._checkAllFunc}>
                    <View style={styles.sgoods.all}>
                    {this.state.checkAll[0] ?
                      <Image source={require('../../../images/icon-checked-blue.png')} style={styles.control.checked} />
                      : <View style={styles.control.checkbox}></View>}
                      <Text style={styles.sgoods.allText}>全选</Text>
                    </View>
                  </TouchableOpacity>
                  {this._renderList1Btn()}
                </View>
              </View>
              <View style={{width: Utils.width}}>
                <View style={[styles.common.flexDirectionRow, styles.sgoods.switchTitle]}>
                  <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.sgoods.switchItem]} onPress={() => this._switch(0, 1)}>
                    <Text style={[styles.sgoods.switchText, state.switchIndex2 == 0 ? styles.sgoods.switchActive : '']}>已即采商品</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.sgoods.switchItem]} onPress={() => this._switch(1, 1)}>
                    <Text style={[styles.sgoods.switchText, state.switchIndex2 == 1 ? styles.sgoods.switchActive : '']}>未即采商品</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                data={this.state.list2}
                renderItem={({item, index}) => <GoodsItem data={item} index={1} sub={this.state.switchIndex2} checkFunc={(ischeck) => {this._itemCheck(ischeck, index)}}></GoodsItem>}
                getItemLayout={(data, index) => (
                  {length: 91, offset: 91 * index, index}
                )}
                ListFooterComponent={this._renderFlatListFooter1()}
                onEndReached={this._getData}
                onEndReachedThreshold={.1}
                />
                <View style={[styles.sgoods.footer, styles.common.flexDirectionRow]}>
                  <TouchableOpacity onPress={this._checkedItem} onPress={this._checkAllFunc}>
                    <View style={styles.sgoods.all}>
                    {this.state.checkAll[1] ?
                      <Image source={require('../../../images/icon-checked-blue.png')} style={styles.control.checked} />
                      : <View style={styles.control.checkbox}></View>}
                      <Text style={styles.sgoods.allText}>全选</Text>
                    </View>
                  </TouchableOpacity>
                  {this._renderList2Btn()}
                </View>
              </View>
              <View style={{width: Utils.width}}>
                <View style={[styles.common.flexDirectionRow, styles.sgoods.switchTitle]}></View>
                <FlatList
                data={this.state.list3}
                renderItem={({item, index}) => <GoodsItem data={item} index={2} checkFunc={(ischeck) => {this._itemCheck(ischeck, index)}}></GoodsItem>}
                getItemLayout={(data, index) => (
                  {length: 91, offset: 91 * index, index}
                )}
                ListFooterComponent={this._renderFlatListFooter1()}
                onEndReached={this._getData}
                onEndReachedThreshold={.1}
                />
              </View>
            </ScrollView>
            <Loading visible={this.state.loadingVisible}></Loading>
          </View>
        );
    }
    _tab = (type) => {
      let state = this.state;
      if(state.type === type) return;
      this.refs.containerScrollView.scrollTo({x: type * Utils.width, y: 0});
      requestAnimationFrame(() => {
        this.setState({type});
        if(type == 0) {
          if(state.list1.length === 0 && !state.over[type]) {
            this._reset(0);
            this._delayLoading();
          }
        } else if(type == 1) {
          if(state.list2.length === 0 && !state.over[type]) {
            this._reset(1);
            this._delayLoading();
          }
        } else {
          if(state.list3.length === 0 && !state.over[type]) {
            this._reset(2);
            this._delayLoading();
          }
        }
      });
    }
    _switch = (i, t) => {
      requestAnimationFrame(() => {
        if(t == 0 && this.state.switchIndex == i) return;
        if(t == 1 && this.state.switchIndex2 == i) return;
        this._reset(t);
        if(t == 0) {
          this.setState({switchIndex: i});
        } else {
          this.setState({switchIndex2: i});
        }
        this._delayLoading();
      });
    }
    _delayLoading = () => {
      this.setState({loadingVisible: true});
      InteractionManager.runAfterInteractions(() => {
        this._getData();
      });
    }
    _onScrollOver = (e) => {
      var page = Math.floor(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
      if(page == this.state.type) return;
      this.setState({type: page});
    }
    _getData = () => {
      let state = this.state;
      if(state.over[state.type]) return;
      this.state.page[state.type]++;

      let _url = '';
      if(state.type == 0) {
        _url = Config.PHPAPI + `api/mapp/goods-seller/list?keyword=${state.keyword}&page=${state.page[state.type]}&pageSize=10&cateId=${state.cateId}&brandId=${state.brandId}&show=${state.switchIndex}&token=${token}`
      } else if (state.type == 1) {
        _url = Config.PHPAPI + `api/mapp/goods-seller/jicai?keyword=${state.keyword}&page=${state.page[state.type]}&pageSize=10&cateId=${state.cateId}&brandId=${state.brandId}&token=${token}&dType=${state.switchIndex2}`
      } else {
        _url = Config.PHPAPI + `api/mapp/goods-seller/library?keyword=${state.keyword}&page=${state.page[state.type]}&pageSize=10&cateId=${state.cateId}&brandId=${state.brandId}&token=${token}`
      }

      fetch(_url, {
        method: 'GET'
      })
      .then(response => response.json())
      .then((data) => {
        if(data.error_code == 0) {
          let _over = state.over;
          let _tips = state.tips;
          if(state.type == 0) {
            //防止快速切换导致数据错误
            if(state.switchIndex !== this.state.switchIndex) return;
            this.setState({loadingVisible: false});
            if(data.data.currentPage >= data.data.pageCount) {
              _over[state.type] = true;
              _tips[state.type] = '没有更多数据';
            } else {
              _tips[state.type] = '加载数据中...';
            }
            let _tempCheckAll = this.state.checkAll;
            _tempCheckAll[state.type] = false;

            let _temp = [...state.list1, ...data.data.list];
            this.setState({list1: _temp, over: _over, tips: _tips, checkAll: _tempCheckAll});
          } else if(state.type == 1) {
            if(state.switchIndex2 !== this.state.switchIndex2) return;
            this.setState({loadingVisible: false});
            if(data.data.currentPage >= data.data.pageCount) {
              _over[state.type] = true;
              _tips[state.type] = '没有更多数据';
            } else {
              _tips[state.type] = '加载数据中...';
            }
            let _tempCheckAll = this.state.checkAll;
            _tempCheckAll[state.type] = false;

            let _temp = [...state.list2, ...data.data.list];
            this.setState({list2: _temp, over: _over, tips: _tips, checkAll: _tempCheckAll});
          } else {
            this.setState({loadingVisible: false});
            if(data.data.currentPage >= data.data.pageCount) {
              _over[state.type] = true;
              _tips[state.type] = '没有更多数据';
            } else {
              _tips[state.type] = '加载数据中...';
            }
            let _tempCheckAll = this.state.checkAll;
            _tempCheckAll[state.type] = false;

            let _temp = [...state.list3, ...data.data.list];
            this.setState({list3: _temp, over: _over, tips: _tips, checkAll: _tempCheckAll});
          }
        }
      });
    }
    _checkAllFunc = () => {
      let _type = this.state.type;
      let _ori = !this.state.checkAll[_type];
      let _temp = this.state.checkAll;
      _temp[_type] = _ori;
      this.setState({
        checkAll: _temp
      });
      if (_type == 0) {
        _ori ? (this.state.checkTotal[0] = this.state.list1.length) : (this.state.checkTotal[0] = 0);
      } else if (_type == 1) {
        _ori ? (this.state.checkTotal[1] = this.state.list1.length) : (this.state.checkTotal[1] = 0);
      } else {
        _ori ? (this.state.checkTotal[2] = this.state.list1.length) : (this.state.checkTotal[2] = 0);
      }

      DeviceEventEmitter.emit('sellerGoodsCheck', {checked: _ori, index: _type});
    }
    _itemCheck = (ischeck, index) => {
      let _type = this.state.type;
      this.state.havenCheck[_type][index] = ischeck;
      ischeck ? this.state.checkTotal[_type]++ : this.state.checkTotal[_type]--;
      let _temp = this.state.checkAll;
      if (_type == 0) {
        if(this.state.checkTotal[0] == this.state.list1.length) {
          _temp[0] = true;
        } else {
          _temp[0] = false;
        }
      } else if (_type == 1) {
        if(this.state.checkTotal[1] == this.state.list2.length) {
          _temp[1] = true;
        } else {
          _temp[1] = false;
        }
      } else {
        if(this.state.checkTotal[2] == this.state.list3.length) {
          _temp[2] = true;
        } else {
          _temp[2] = false;
        }
      }
      this.setState({checkAll: _temp});
    }
    _renderFlatListFooter1 = () => {
      return (
        <Text style={styles.common.loadingTips}>{this.state.tips[this.state.type]}</Text>
      );
    }
    _renderList1Btn = () => {
      if(this.state.switchIndex === 0) {
        return (
          <View style={[styles.common.flex, styles.common.flexEndh]}>
            <TouchableHighlight underlayColor='#fafafa'>
              <Text style={styles.btn.defaults}>下架</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container}>
              <Text style={styles.btn.danger}>删除</Text>
            </TouchableHighlight>
          </View>
        );
      } else if(this.state.switchIndex === 1) {
        return (
          <View style={[styles.common.flex, styles.common.flexEndh]}>
            <TouchableHighlight underlayColor='#fafafa'>
              <Text style={styles.btn.defaults}>上架</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container}>
              <Text style={styles.btn.danger}>删除</Text>
            </TouchableHighlight>
          </View>
        );
      } else {
        return (
          <View style={[styles.common.flex, styles.common.flexEndh]}>
            <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container}>
              <Text style={styles.btn.danger}>彻底删除</Text>
            </TouchableHighlight>
          </View>
        );
      }
    }
    _renderList2Btn = () => {
      if(this.state.switchIndex2 === 0) {
        return (
          <View style={[styles.common.flex, styles.common.flexEndh]}>
            <TouchableHighlight underlayColor='#fafafa'>
              <Text style={styles.btn.defaults}>解除绑定</Text>
            </TouchableHighlight>
          </View>
        );
      } else if(this.state.switchIndex2 === 1) {
        return (
          <View style={[styles.common.flex, styles.common.flexEndh]}>
            <TouchableHighlight underlayColor='#fafafa'>
              <Text style={styles.btn.defaults}>一键即采</Text>
            </TouchableHighlight>
          </View>
        );
      }
    }
    _reset = (t) => {
      let state = this.state;
      let _page = state.page;
      _page[t] = 0;
      let _checkAll = state.checkAll;
      _checkAll[t] = false;
      let _havenCheck = state.havenCheck;
      _havenCheck[t] = [];
      let _checkTotal = state.checkTotal;
      _checkTotal[t] = 0;
      let _over = state.over;
      _over[t] = false;
      let _tips = state.tips;
      _tips[t] = '';
      let _obj = {
        page: _page,
        checkAll: _checkAll,
        havenCheck: _havenCheck,
        checkAll: _checkAll,
        over: _over,
        tips: _tips
      }
      if(t == 0) {
        _obj.list1 = [];
      } else if(t == 1) {
        _obj.list2 = [];
      } else {
        _obj.list3 = [];
      }
      this.setState(_obj);
    }
    _search = () => {
      this._reset(this.state.type);
      this._delayLoading();
    }
}
