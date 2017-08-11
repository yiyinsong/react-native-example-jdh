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
  DeviceEventEmitter,
  Modal
} from 'react-native';

import Utils from '../../../js/utils';
import Config from '../../../config/config';
import styles from '../../../css/styles';

import ScreenInit from '../../../config/screenInit';
import GoodsItem from '../../components/seller/tab-goods-item';
import Loading from '../../common/ui-loading';
import UIToast from '../../common/ui-toast';
import ModalConfirm from '../../common/modal-confirm';

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
        loadingVisible: false,
        checkAll: [false, false, false],
        havenCheck: [[], [], []],
        checkTotal: [0, 0, 0],
        over: [false, false, false],
        tips: ['', '', ''],
        visible: false,
        cateId: '',
        cateLv1: [],
        cateLv2: [],
        cateLv3: [],
        cateIndex: [-1, -1, -1],
        brandId: '',
        brand: [],
        brandIndex: [-1, -1],
        filterTabIndex: 0
      };
    }
    componentDidMount() {
      this.setState({loadingVisible: true});
      InteractionManager.runAfterInteractions(() => {
        ScreenInit.checkLogin(this);
        this._getData();
        this._getCate();
        this._getBrand();
      });
    }
    componentWillUnmount() {
      this.timer && clearTimeout(this.timer);
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
              <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv]} onPress={this._openFilter}>
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
                ListFooterComponent={this._renderFlatListFooter2()}
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
                ListFooterComponent={this._renderFlatListFooter3()}
                onEndReached={this._getData}
                onEndReachedThreshold={.1}
                />
              </View>
            </ScrollView>
            <Loading visible={this.state.loadingVisible}></Loading>
            <ModalConfirm keys={4}></ModalConfirm>
            <Modal
                animationType='slide'
                onRequestClose={() => this._close()}
                visible={this.state.visible}
                transparent={true}
                 >
                <TouchableOpacity style={styles.modal.container} activeOpacity={1} onPress={this._close}></TouchableOpacity>
                <View style={[styles.modal.container2, styles.sgoods.filterBox, {width: Utils.width, height: Utils.height * .8}]}>
                  <Text style={styles.sgoods.filterTitle}>请选择类目</Text>
                  <View style={[styles.common.flexDirectionRow, styles.sgoods.filterTab]}>
                    <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.common.flexCenterv, styles.common.flexCenterh, styles.sgoods.filterTabItem]} onPress={() => this._filterTabFunc(0)}>
                      <Text style={[styles.sgoods.filterTabText, this.state.filterTabIndex == 0 ? styles.sgoods.filterTabTextActive : '']} numberOfLines={1}>{state.cateLv1[state.cateIndex[0]] && state.cateLv1[state.cateIndex[0]].name || '一级分类'}</Text><View style={[styles.select.down, this.state.filterTabIndex == 0 ? styles.select.downActive : '']}></View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.common.flexCenterv, styles.common.flexCenterh, styles.sgoods.filterTabItem]} onPress={() => this._filterTabFunc(1)}>
                      <Text style={[styles.sgoods.filterTabText, this.state.filterTabIndex == 1 ? styles.sgoods.filterTabTextActive : '']} numberOfLines={1}>{state.cateLv2[state.cateIndex[1]] && state.cateLv2[state.cateIndex[1]].name || '二级分类'}</Text><View style={[styles.select.down, this.state.filterTabIndex == 1 ? styles.select.downActive : '']}></View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.common.flexCenterv, styles.common.flexCenterh, styles.sgoods.filterTabItem]} onPress={() => this._filterTabFunc(2)}>
                      <Text style={[styles.sgoods.filterTabText, this.state.filterTabIndex == 2 ? styles.sgoods.filterTabTextActive : '']} numberOfLines={1}>{state.cateLv3[state.cateIndex[2]] && state.cateLv3[state.cateIndex[2]].name || '三级分类'}</Text><View style={[styles.select.down, this.state.filterTabIndex == 2 ? styles.select.downActive : '']}></View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.common.flexCenterv, styles.common.flexCenterh, styles.sgoods.filterTabItem]} onPress={() => this._filterTabFunc(3)}>
                      <Text style={[styles.sgoods.filterTabText, this.state.filterTabIndex == 3 ? styles.sgoods.filterTabTextActive : '']} numberOfLines={1}>品牌</Text><View style={[styles.select.down, this.state.filterTabIndex == 3 ? styles.select.downActive : '']}></View>
                    </TouchableOpacity>
                  </View>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} scrollEnabled={false} ref="cateScrollView">
                    <ScrollView style={{width: Utils.width}}>
                      {this.state.cateLv1.map((v, k) => {
                        return (
                          <TouchableHighlight underlayColor='#fafafa' onPress={() => this._selectCate(0, k, v)}>
                            <Text style={[styles.sgoods.filterItem, this.state.cateIndex[0] == k? styles.sgoods.filterItemActive : '']}>{v.name}</Text>
                          </TouchableHighlight>
                        );
                      })}
                    </ScrollView>
                    <ScrollView style={{width: Utils.width}}>
                      {this.state.cateLv2.map((v, k) => {
                        return (
                          <TouchableHighlight underlayColor='#fafafa' onPress={() => this._selectCate(1, k, v)}>
                            <Text style={[styles.sgoods.filterItem, this.state.cateIndex[1] == k? styles.sgoods.filterItemActive : '']}>{v.name}</Text>
                          </TouchableHighlight>
                        );
                      })}
                    </ScrollView>
                    <ScrollView style={{width: Utils.width}}>
                      {this.state.cateLv3.map((v, k) => {
                        return (
                          <TouchableHighlight underlayColor='#fafafa' onPress={() => this._selectCate(2, k, v)}>
                            <Text style={[styles.sgoods.filterItem, this.state.cateIndex[2] == k? styles.sgoods.filterItemActive : '']}>{v.name}</Text>
                          </TouchableHighlight>
                        );
                      })}
                    </ScrollView>
                    <ScrollView style={{width: Utils.width}}>
                    {this.state.brand.map((v, k) => {
                      return (
                        <View>
                          <Text style={[styles.sgoods.filterItem, styles.sgoods.filterItemActive]}>{v.letter}</Text>
                          {v.list.map((v1, k1) => {
                            return (
                              <TouchableHighlight underlayColor='#fafafa' onPress={() => this._selectBrand(k, k1, v1.brand_id)}>
                                <Text style={[styles.sgoods.filterItem, (this.state.brandIndex[0] == k && this.state.brandIndex[1] == k1) ? styles.sgoods.filterBrandActive : '']}>{v1.brand_name}</Text>
                              </TouchableHighlight>
                            );
                          })}
                        </View>
                      );
                    })}
                    </ScrollView>
                  </ScrollView>
                  <View style={styles.common.flexDirectionRow}>
                    <TouchableOpacity activeOpacity={.8} style={styles.common.flex} onPress={this._filterReset}><Text style={styles.sgoods.filterBtnCancel}>重置</Text></TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8} style={styles.common.flex} onPress={this._filterConfirm}><Text style={styles.sgoods.filterBtnConfirm}>确定</Text></TouchableOpacity>
                  </View>
                </View>
            </Modal>
          </View>
        );
    }
    _tab = (type) => {
      let state = this.state;
      if(state.type === type) return;
      this._filterInit();
      this.setState({keyword: ''});
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
      let page = Math.floor(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
      let state = this.state;
      if(page == state.type) return;
      this._filterInit();
      this.setState({type: page, keyword: ''});
      if(page == 0) {
        if(state.list1.length === 0 && !state.over[page]) {
          this._reset(0);
          this._delayLoading();
        }
      } else if(page == 1) {
        if(state.list2.length === 0 && !state.over[page]) {
          this._reset(1);
          this._delayLoading();
        }
      } else {
        if(state.list3.length === 0 && !state.over[page]) {
          this._reset(2);
          this._delayLoading();
        }
      }
    }
    _getData = () => {
      let state = this.state;
      if(state.over[state.type]) return;
      this.state.page[state.type]++;
      let _url = '';
      if(state.type == 0) {
        _url = Config.PHPAPI + `api/mapp/goods-seller/list?keyword=${state.keyword}&page=${state.page[state.type]}&pageSize=10&cateId=${state.cateId}&brandId=${state.brandId}&show=${state.switchIndex}&token=${token}`
      } else if (state.type == 1) {
        _url = Config.PHPAPI + `api/mapp/goods-seller/jicai?keyword=${state.keyword}&page=${state.page[state.type]}&pageSize=10&cateId=${state.cateId}&brandId=${state.brandId}&token=${token}&dType=${state.switchIndex2 + 1}`
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
    _getCate = () => {
      fetch(Config.PHPAPI + 'api/mapp/shop/cate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `token=${token}`
      })
      .then(response => response.json())
      .then((r) => {
        if(r.error_code == 0) {
          this.state.cateLv1 = r.data;
        }
      });
    }
    _getBrand = (arr) => {
      let _cid = '';
      if(arr) {
          _cid = arr[0] > 0 ? this.state.cateLv1[arr[0]].id : '';
          _cid += (arr[1] > 0 ? (',' + this.state.cateLv2[arr[1]].id) : '');
          _cid += (arr[2] > 0 ? (',' + this.state.cateLv3[arr[2]].id) : '');
      }
      fetch(Config.PHPAPI + 'api/mapp/shop/brand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `cateId=${_cid}&token=${token}`
      })
      .then(response => response.json())
      .then((r) => {
        if(r.error_code == 0) {
          this.state.brand = r.data.length ? r.data : [];
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
      this.state.havenCheck[_type] = [];
      if (_type == 0) {
        if(_ori) {
          this.state.checkTotal[0] = this.state.list1.length;
          for(var i=0, l=this.state.list1.length; i<l; i++) {
            this.state.havenCheck[0].push(true);
          }
        } else {
          this.state.checkTotal[0] = 0;
        }
      } else if (_type == 1) {
        if(_ori) {
          this.state.checkTotal[1] = this.state.list2.length;
          for(var i=0, l=this.state.list2.length; i<l; i++) {
            this.state.havenCheck[1].push(true);
          }
        } else {
          this.state.checkTotal[1] = 0;
        }
      } else {
        if(_ori) {
          this.state.checkTotal[2] = this.state.list3.length;
          for(var i=0, l=this.state.list3.length; i<l; i++) {
            this.state.havenCheck[2].push(true);
          }
        } else {
          this.state.checkTotal[2] = 0;
        }
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
        <Text style={styles.common.loadingTips}>{this.state.tips[0]}</Text>
      );
    }
    _renderFlatListFooter2 = () => {
      return (
        <Text style={styles.common.loadingTips}>{this.state.tips[1]}</Text>
      );
    }
    _renderFlatListFooter3 = () => {
      return (
        <Text style={styles.common.loadingTips}>{this.state.tips[2]}</Text>
      );
    }
    _renderList1Btn = () => {
      if(this.state.switchIndex === 0) {
        return (
          <View style={[styles.common.flex, styles.common.flexEndh]}>
            <TouchableHighlight underlayColor='#fafafa' onPress={() => {this._saleFunc(0)}}>
              <Text style={styles.btn.defaults}>下架</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container} onPress={() => {this._delete(1)}}>
              <Text style={styles.btn.danger}>删除</Text>
            </TouchableHighlight>
          </View>
        );
      } else if(this.state.switchIndex === 1) {
        return (
          <View style={[styles.common.flex, styles.common.flexEndh]}>
            <TouchableHighlight underlayColor='#fafafa' onPress={() => {this._saleFunc(1)}}>
              <Text style={styles.btn.defaults}>上架</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container} onPress={() => {this._delete(1)}}>
              <Text style={styles.btn.danger}>删除</Text>
            </TouchableHighlight>
          </View>
        );
      } else {
        return (
          <View style={[styles.common.flex, styles.common.flexEndh]}>
            <TouchableHighlight underlayColor='#fafafa' onPress={() => {this._delete(0)}}>
              <Text style={styles.btn.defaults}>还原</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='#fafafa' style={styles.btn.container} onPress={() => {this._delete(2)}}>
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
            <TouchableHighlight underlayColor='#fafafa' onPress={() => {this._unBunging()}}>
              <Text style={styles.btn.defaults}>解除绑定</Text>
            </TouchableHighlight>
          </View>
        );
      } else if(this.state.switchIndex2 === 1) {
        return (
          <View style={[styles.common.flex, styles.common.flexEndh]}>
            <TouchableHighlight underlayColor='#fafafa' onPress={() => {this._binging()}}>
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
    _saleFunc = (t) => {
      let state = this.state;
      if(state.checkTotal[0] == 0) {
        UIToast(t == 0 ? '请选择需要下架的商品' : '请选择需要上架的商品');
        return;
      }
      DeviceEventEmitter.emit('confirmShow', {keys: 4, data: {
          text: t == 0 ? '是否确认下架？' : '是否确认上架？',
          confirm: () => {
            let ids = [];
            state.havenCheck[0].map((v, k) => {
              if(v) ids.push(state.list1[k].goods_id);
            })
            let idsString = ids.join(',');
            fetch(Config.PHPAPI + 'api/mapp/goods-seller/onsale', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body:`id=${idsString}&status=${t}&token=${token}`
            })
            .then(response => response.json())
            .then((data) => {
              if(data.error_code == 0) {
                UIToast('操作成功');
                this._reset(0);
                this._delayLoading();
              } else {
                UIToast('操作失败');
              }
            });
          }
      }});
    }
    _delete = (t) => {
      let state = this.state;
      if(state.checkTotal[0] == 0) {
        UIToast(t == 0 ? '请选择要还原的商品' : (t == 1 ? '请选择要删除的商品' : '请选择要彻底删除的商品'));
        return;
      }
      DeviceEventEmitter.emit('confirmShow', {keys: 4, data: {
          text: t == 0 ? '是否还原所选商品' : (t == 1 ? '是否删除所选商品' : '是否彻底删除所选商品'),
          confirm: () => {
            let ids = [];
            state.havenCheck[0].map((v, k) => {
              if(v) ids.push(state.list1[k].goods_id);
            })
            let idsString = ids.join(',');
            fetch(Config.PHPAPI + 'api/mapp/goods-seller/delete', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body:`id=${idsString}&status=${t}&token=${token}`
            })
            .then(response => response.json())
            .then((data) => {
              if(data.error_code == 0) {
                UIToast('操作成功');
                this._reset(0);
                this._delayLoading();
              } else {
                UIToast('操作失败');
              }
            });
          }
      }});
    }
    _unBunging = (t) => {
      let state = this.state;
      if(state.checkTotal[1] == 0) {
        UIToast('请选择解绑商品');
        return;
      }
      DeviceEventEmitter.emit('confirmShow', {keys: 4, data: {
          text: '是否解绑所选商品',
          confirm: () => {
            let ids = [];
            state.havenCheck[1].map((v, k) => {
              if(v) ids.push(state.list2[k].goods_id);
            })
            let idsString = ids.join(',');
            fetch(Config.PHPAPI + 'api/mapp/goods-seller/unjc', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body:`id=${idsString}&dType=1&token=${token}`
            })
            .then(response => response.json())
            .then((data) => {
                if(data.error_code == 0) {
                  UIToast('操作成功');
                  this._reset(1);
                  this._delayLoading();
                } else {
                  UIToast('操作失败');
                }
            });
          }
      }});
    }
    _binging = () => {
      let state = this.state;
      if(state.checkTotal[1] == 0) {
        UIToast('请选择即采商品');
        return;
      }
      let ids = [];
      state.havenCheck[1].map((v, k) => {
        if(v) ids.push(state.list2[k].goods_id);
      })
      let idsString = ids.join(',');
      DeviceEventEmitter.emit('confirmShow', {keys: 4, data: {
          text: '是否即采所选商品',
          confirm: () => {
            /****先判断是否有重名的商品****/
            fetch(Config.PHPAPI + 'api/goods/product/validate-name', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body:`id=${idsString}&token=${token}`
            })
            .then(response => response.json())
            .then((data) => {
              if(data.error_code == 500) {
                this.timer = setTimeout(() => {
                  DeviceEventEmitter.emit('confirmShow', {keys: 4, data: {
                      text: '已存在相同商品名称，您是否继续即采?',
                      confirm: () => {
                        fetch(Config.PHPAPI + 'api/mapp/goods-seller/unjc', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                          },
                          body:`id=${idsString}&dType=2&token=${token}`
                        })
                        .then(response => response.json())
                        .then((r) => {
                            if(r.flag == 1) {
                              UIToast('操作成功');
                              this._reset(1);
                              this._delayLoading();
                            } else {
                              UIToast('操作失败');
                            }
                        });
                      }
                    }
                  });
                }, 300);
              } else if(data.error_code == 0) {
                  this.timer = setTimeout(() => {
                    DeviceEventEmitter.emit('confirmShow', {keys: 4, data: {
                        text: '是否确认一键即采所选'+ids.length+'件商品?',
                        confirm: () => {
                          fetch(Config.PHPAPI + 'api/mapp/goods-seller/unjc', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body:`id=${idsString}&dType=2&token=${token}`
                          })
                          .then(response => response.json())
                          .then((r) => {
                              if(r.flag == 1) {
                                UIToast('操作成功');
                                this._reset(1);
                                this._delayLoading();
                              } else {
                                UIToast('操作失败');
                              }
                          });
                        }
                      }
                    });
                  }, 300);
                } else {
                  UIToast('操作失败');
                }
              });
          }
      }});
    }
    _close = () => {
      this.setState({ visible: false });
    }
    _openFilter = () => {
      this.setState({ visible: true });
      requestAnimationFrame(() => {
        this.refs.cateScrollView.scrollTo({x: this.state.filterTabIndex * Utils.width, y: 0, animated: false});
      });
    }
    _selectCate = (level, k, item) => {
      //如果已选分类，再次点击取消已选
      if(this.state.cateIndex[level] == k) {
          if(level == 0) {
            this.setState({
              cateIndex: [-1, -1, -1],
              cateLv2: [],
              cateLv3: [],
              cateId: '',
              brandId: '',
              brandIndex: [-1, -1]
            });
            this._getBrand();
          } else if(level == 1) {
            let _tempCateIndex = this.state.cateIndex;
            _tempCateIndex[1] = -1;
            _tempCateIndex[2] = -1;
            this.setState({
              cateIndex: _tempCateIndex,
              cateLv3: [],
              cateId: this.state.cateLv1[this.state.cateIndex[0]].id,
              brandId: '',
              brandIndex: [-1, -1]
            });
            this._getBrand(_tempCateIndex);
          } else {
            let _tempCateIndex = this.state.cateIndex;
            _tempCateIndex[2] = -1;
            this.setState({
              cateIndex: _tempCateIndex,
              cateId: (this.state.cateLv1[this.state.cateIndex[0]].id + ',' + this.state.cateLv2[this.state.cateIndex[1]].id),
              brandId: '',
              brandIndex: [-1, -1]
            });
            this._getBrand(_tempCateIndex);
          }
      } else {
        this.setState({filterTabIndex: level+1});
        this.refs.cateScrollView.scrollTo({x: (level+1) * Utils.width, y: 0});
        requestAnimationFrame(() => {
          if (level == 0) {
            this.setState({
              cateIndex: [k, -1, -1],
              cateId: this.state.cateLv1[k].id,
              cateLv2: item.list || [],
              cateLv3: [],
              brandIndex: [-1, -1]
             });
            this._getBrand([k, -1, -1]);
          } else if (level == 1) {
            let _temp = this.state.cateIndex;
            _temp[1] = k;
            this.setState({
              cateIndex: _temp,
              cateId: (this.state.cateLv1[this.state.cateIndex[0]].id + ',' + this.state.cateLv2[k].id),
              cateLv3: item.list || [],
              brandIndex: [-1, -1]
            });
            this._getBrand(_temp);
          } else if (level == 2) {
            let _temp = this.state.cateIndex;
            _temp[2] = k;
            this.setState({
              cateIndex: _temp,
              cateId: (this.state.cateLv1[this.state.cateIndex[0]].id + ',' + this.state.cateLv2[this.state.cateIndex[1]].id + ',' + this.state.cateLv3[k].id),
              brandIndex: [-1, -1]
            });
            this._getBrand(_temp);
          }
        });
      }
    }
    _filterTabFunc = (level) => {
      this.setState({filterTabIndex: level});
      this.refs.cateScrollView.scrollTo({x: level * Utils.width, y: 0});
    }
    _selectBrand = (k, k1, bid) => {
      if(this.state.brandIndex[0] == k && this.state.brandIndex[1] == k1) {
        this.setState({brandIndex: [-1, -1], brandId: ''});
      } else {
        this.setState({brandIndex: [k, k1], brandId: bid});
      }
    }
    _filterInit = () => {
      this.setState({
        cateId: '',
        cateLv2: [],
        cateLv3: [],
        cateIndex: [-1, -1, -1],
        brandId: '',
        brand: [],
        brandIndex: [-1, -1],
        filterTabIndex: 0
      });
      this._getBrand();
    }
    _filterReset = () => {
      this.refs.cateScrollView.scrollTo({x: 0, y: 0});
      this._filterInit();
      this._close();
      this._reset(this.state.type);
      this._delayLoading();
    }
    _filterConfirm = () => {
      this._close();
      this._reset(this.state.type);
      this._delayLoading();
    }
}
