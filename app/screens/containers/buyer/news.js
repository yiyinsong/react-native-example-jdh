/**
 * Component: 动态列表
 * author: yiyinSong
 * date: 2017-11-09
 */
import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  InteractionManager
  } from 'react-native';

  import Config from '../../../config/config';
  import Utils from '../../../js/utils';
  import Loading from '../../common/ui-loading';
  import styles from '../../../css/styles';
  import ScreenInit from '../../../config/screenInit';
  

  export default class NewsScreen extends Component {
      constructor(props) {
          super(props);
          this.state = {
            loadingVisible: false,
            index: 0,
            page: 0,
            loadingEnd: false,
            list: [],
          };
      }
      componentDidMount() {
            InteractionManager.runAfterInteractions(() => {
                ScreenInit.checkLogin(this);
                this.setState({loadingVisible: true});
                this._init(0);
            });
        }
      render() {
          return (
              <View style={[styles.common.flexv, styles.common.initWhite]}>
                <View style={[styles.common.flexDirectionRow, styles.news.tab]}>
                    <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.common.flexCenterh]} onPress={() => this._fnTab(0)}>
                        <Text style={[styles.news.tabText, this.state.index === 0 ? styles.news.tabTextActive : null]}>最新动态</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.common.flexCenterh]} onPress={() => this._fnTab(1)}>
                        <Text style={[styles.news.tabText, this.state.index === 1 ? styles.news.tabTextActive : null]}>商品动态</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                data={this.state.list}
                renderItem={({item}) => this._fnRenderItem(item) }
                onRefresh={false}
                refreshing={false}
                onEndReachedThreshold={0.9}
                onEndReached={() => this.state.page === 0 ? null : this._loadingMore()}
                ListFooterComponent={() => this._flatListFooter()}
                style={{width: Utils.width}}/>
                <Loading visible={this.state.loadingVisible}></Loading>       
              </View>
          )
      }
      _fnRenderItem = (item) => {
        if(item.is_top == 1 && item.form_top) {
            return (
                <TouchableHighlight underlayColor="#f5f5f5" style={styles.news.item} onPress={() => this._fnToDetail(item.id)}>
                    <View style={styles.common.flexDirectionRow}>
                        <Image source={{uri: Config.IMGURL + item.img}} style={styles.news.itemImg} resizeMode="stretch" />
                        <View style={[styles.common.flexv, styles.news.itemInfo]}>
                            <View style={styles.common.flexDirectionRow}>
                                <View style={styles.news.top}><Text style={styles.news.topText}>置顶</Text></View>
                                <Text numberOfLines={1} style={styles.news.itemTitle}>{item.title}</Text>
                            </View>
                            <Text style={styles.news.itemContent}>{item.content}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            );
        } else if(item.is_top == 0) {
            return (
                <TouchableHighlight underlayColor="#f5f5f5" style={styles.news.item} onPress={() => this._fnToDetail(item.id)}>
                    <View style={styles.common.flexDirectionRow}>
                        <Image source={{uri: Config.IMGURL + item.img}} style={styles.news.itemImg} resizeMode="stretch" />
                        <View style={[styles.common.flexv, styles.news.itemInfo]}>
                            <View style={styles.common.flexDirectionRow}>
                                <Text numberOfLines={1} style={styles.news.itemTitle}>{item.title}</Text>
                            </View>
                            <Text style={styles.news.itemContent}>{item.content}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            );
        } else {
            return null;
        }
      }
      _flatListFooter = () => {
        return (
            <Text style={styles.common.loadingTips}>{this.state.loadingEnd ? '没有更多数据了！' : '正在加载中...'}</Text>           
        );
      }
      _loadingMore = () => {
        if(this.state.loadingEnd) return;
        let _type = this.state.index;
        this.state.page ++;
        fetch(`${Config.PHPAPI}api/mapp/dynamics/dylist?type=${_type}&token=${token}&page=${this.state.page}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(r => {
            if(r.error_code === 0) {
                if(_type !== this.state.index) return;
                if(r.data.currentPage >= r.data.pageCount) {
                    this.state.loadingEnd = true;
                }
                this.setState({list: [...this.state.list, ...r.data.list]});
            }
            this.setState({loadingVisible: false});
        });
      }
      _init = (type) => {
        fetch(`${Config.PHPAPI}api/mapp/dynamics/top?type=${type}&token=${token}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(r => {
            if(r.error_code === 0 && r.data) {
                let _temp = this.state.list;
                r.data.form_top = true;
                _temp.unshift(r.data);
                this.setState({
                    list: _temp
                });
            }
            this.setState({loadingVisible: false});
            this._loadingMore();
        });
      }
      _fnTab = (i) => {
        if(this.state.index === i) return;
        this.state.page = 0;
        this.state.loadingEnd = false;
        this.state.list = [];
        this.setState({
            index: i
        });
        this._init(i);
      }
      _fnToDetail = (id) => {
        this.props.navigation.navigate('NewsDetail', {
            id
        });
      }
  }