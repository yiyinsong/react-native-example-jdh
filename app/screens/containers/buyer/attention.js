import React,{Component} from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  InteractionManager
} from 'react-native';

import styles from '../../../css/styles';

import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';

import Loading from '../../common/ui-loading';
import UIToast from '../../common/ui-toast';

import AttentionItem from '../../components/buyer/attention-item';

export default class AttentionScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        loadingVisible: false,
        cateOpen: false,
        typeOpen: false,
        list: [],
        tips: '',
        page: 0,
        cateId: '',
        saleType: 1,
        isLoading: false
      };
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        this.setState({loadingVisible: true});
        ScreenInit.checkLogin(this);
        this._init();
      })
    }
    render() {
        return (
          <View style={[styles.common.flexv, styles.common.initWhite]}>
            <View style={[styles.common.flexDirectionRow, styles.attention.filter]}>
              <TouchableHighlight underlayColor="#fafafa" style={styles.common.flex}>
                <View style={[styles.common.flex, styles.common.flexCenterh]}>
                  <Text style={styles.attention.filterText}>全部</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="#fafafa" style={styles.common.flex}>
                <View style={[styles.common.flex, styles.common.flexCenterh, styles.common.flexCenterv]}>
                  <Text style={styles.attention.filterText}>分类</Text>
                  {this.state.cateOpen ?
                    <View style={[styles.icon.arrowUp]}></View>
                    :
                    <View style={[styles.icon.arrowDown]}></View>
                  }
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="#fafafa" style={styles.common.flex}>
                <View style={[styles.common.flex, styles.common.flexCenterh, styles.common.flexCenterv]}>
                  <Text style={styles.attention.filterText}>自营</Text>
                  {this.state.typeOpen ?
                    <View style={[styles.icon.arrowUp]}></View>
                    :
                    <View style={[styles.icon.arrowDown]}></View>
                  }
                </View>
              </TouchableHighlight>
            </View>
            <FlatList data={this.state.list}
              renderItem={({item}) => <AttentionItem data={item} type={this.state.saleType}></AttentionItem>}
              onRefresh={false}
              refreshing={false}
              onEndReachedThreshold={.5}
              onEndReached={() => this._loadingMore()}
              ListFooterComponent={this._flatListFooter}
              style={styles.common.initWhite}/>
            <Loading visible={this.state.loadingVisible}></Loading>
          </View>
        )
    }
    _init = () => {
      this._getData();
    }
    _getData = () => {
      if(this.state.isLoading) return;
      this.state.page++;
      this.state.isLoading = true;
      fetch(Config.PHPAPI + `api/mapp/shop/follow?page=${this.state.page}&pageSize=10&cateId=${this.state.cateId}&saleType=${this.state.saleType}&token=${token}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then( r => {
        this.setState({loadingVisible: false});
        if(r.error_code == 0) {
          this.state.isLoading = false;
          let _tips = '';
            if(parseInt(r.data.currentPage) >= parseInt(r.data.pageCount)) {
              _tips = '没有更多数据';
            } else {
              _tips = '数据加载中...';
            }
            this.setState({
              tips: _tips,
              list: r.data.list,
            });
        }
      });
    }
    _loadingMore = () => {
      this._getData();
    }
    _flatListFooter = () => {
        return (
          <Text style={styles.common.loadingTips}>{this.state.tips != '' ? this.state.tips : null}</Text>
        )
    }
}
