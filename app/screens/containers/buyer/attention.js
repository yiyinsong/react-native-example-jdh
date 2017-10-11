import React,{Component} from 'react';

import {
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  InteractionManager,
  Modal,
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
        list: [],
        tips: '',
        page: 0,
        cateId: '',
        cateList: [],
        saleType: 1,
        isLoading: false,
        bodyShow: false,
        panelCateVisible: false,
        panelTypeVisible: false        
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
              <TouchableHighlight underlayColor="#fafafa" style={styles.common.flex} onPress={this._filterAll}>
                <View style={[styles.common.flex, styles.common.flexCenterh]}>
                  <Text style={styles.attention.filterText}>全部</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="#fafafa" style={styles.common.flex} onPress={this._openCate}>
                <View style={[styles.common.flex, styles.common.flexCenterh, styles.common.flexCenterv]}>
                  <Text style={styles.attention.filterText}>分类</Text>
                  {this.state.panelCateVisible ?
                    <View style={[styles.icon.arrowUp]}></View>
                    :
                    <View style={[styles.icon.arrowDown]}></View>
                  }
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="#fafafa" style={styles.common.flex} onPress={this._openType}>
                <View style={[styles.common.flex, styles.common.flexCenterh, styles.common.flexCenterv]}>
                  <Text style={styles.attention.filterText}>{this.state.saleType === 1 ? '自营' : '分销'}</Text>
                  {this.state.panelTypeVisible ?
                    <View style={[styles.icon.arrowUp]}></View>
                    :
                    <View style={[styles.icon.arrowDown]}></View>
                  }
                </View>
              </TouchableHighlight>
            </View>
            {this.state.bodyShow ?
            <FlatList data={this.state.list}
              renderItem={({item}) => <AttentionItem data={item} type={this.state.saleType}></AttentionItem>}
              onRefresh={false}
              refreshing={false}
              onEndReachedThreshold={.1}
              onEndReached={this._loadingMore}
              ListFooterComponent={this._flatListFooter}
              style={styles.common.initWhite}/>
              : null}
            <Loading visible={this.state.loadingVisible}></Loading>
            <Modal
            animationType='fade'
            onRequestClose={() => this._panelCateClose()}
            visible={this.state.panelCateVisible}
            transparent={true}
             >
            <TouchableOpacity style={styles.modal.container} activeOpacity={1} onPress={this._panelCateClose}></TouchableOpacity>
            <ScrollView style={[styles.attention.panel]}>
                {this.state.cateList.map((v, k) => {
                  return (
                    <TouchableHighlight underlayColor="#fafafa" onPress={() => this._filterCate(v.id)}>
                      <Text style={[styles.attention.cateItem, this.state.cateId === v.id ? styles.attention.cateItemActive : '']}>{v.cat_name}</Text>
                    </TouchableHighlight>
                  );
                })}
            </ScrollView>
            </Modal>
            <Modal
            animationType='fade'
            onRequestClose={() => this._panelTypeClose()}
            visible={this.state.panelTypeVisible}
            transparent={true}
             >
            <TouchableOpacity style={styles.modal.container} activeOpacity={1} onPress={this._panelTypeClose}></TouchableOpacity>
            <ScrollView style={[styles.attention.panel]}>
                <TouchableHighlight underlayColor="#fafafa" onPress={() => this._filterType(1)}>
                  <Text style={styles.attention.cateItem}>自营</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#fafafa" onPress={() => this._filterType(2)}>
                <Text style={styles.attention.cateItem}>分销</Text>
              </TouchableHighlight>
            </ScrollView>
            </Modal>
          </View>
        )
    }
    _init = () => {
      this._getData();
      this._getCate();
    }
    _getData = (bool) => {
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
          let _tips = '';
            if(parseInt(r.data.currentPage) >= parseInt(r.data.pageCount)) {
              _tips = '没有更多数据';
            } else {
              _tips = '数据加载中...';
              this.state.isLoading = false;
            }
            this.setState({
              tips: _tips,
              list: bool ? r.data.list : [...this.state.list, ...r.data.list],
              bodyShow: true
            });
        }
      });
    }
    _getCate = () => {
      fetch(Config.PHPAPI + `api/mapp/shop/follow-cate?saleType=${this.state.saleType}&token=${token}`,{
        method: 'GET'
      })
      .then(response => response.json())
      .then( r => {
        if (r.error_code == 0) {
          this.setState({cateList: r.data});
        }
      })
    }
    _loadingMore = () => {
      this._getData();
    }
    _flatListFooter = () => {
        return (
          <Text style={styles.common.loadingTips}>{this.state.tips != '' ? this.state.tips : null}</Text>
        )
    }
    _panelCateClose = () => {
      this.setState({panelCateVisible: false});
    }
    _openCate = () => {
      this.setState({panelCateVisible: true});
    }
    _filterCate = (id) => {
      this.setState({cateId: id, panelCateVisible: false});
      if(this.state.cateId !== id) {
        this._filter();
      }
    }
    _filter = (loadingCate) => {
      this.setState({
        tips: '数据加载中...',
        page: 0,
        isLoading: false,
      });
      requestAnimationFrame(() => {
        this._getData(true);
        if(loadingCate) {
          this._getCate();
        }
      });
    }
    _filterAll = () => {
      if(this.state.cateId === '') return;
      this.state.cateId = '';
      this._filter();
    }
    _panelTypeClose = () => {
      this.setState({panelTypeVisible: false});
    }
    _filterType = (i) => {
      this.setState({saleType: i, panelTypeVisible: false});
      if(this.state.saleType !== i){
        this._filter();
      };
    }
    _openType = () => {
      this.setState({panelTypeVisible: true});
    }
}
