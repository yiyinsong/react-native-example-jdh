import React,{Component} from 'react';

import {
  View,
  Text,
  Image,
  Flatlist,
  TouchableHighlight,
  InteractionManager
} from 'react-native';

import styles from '../../../css/styles';

import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';

import Loading from '../../common/ui-loading';
import UIToast from '../../common/ui-toast';

import AttentionItem from '../../components/buyer/attention-item.js';

export default class AttentionScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        loadingVisible: false,
        cateOpen: false,
        typeOpen: false,
        list: [],
        tips: ''
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
          <View>
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
            <FlatList
              data={this.state.list}
              renderItem={({item}) => {}}
              onRefresh={false}
              refreshing={false}
              onEndReachedThreshold={2}
              onEndReached={() => this._loadingMore(this.state.activeIndex)}
              ListFooterComponent={this._flatListFooter}
              style={styles.common.init}/>
            <Loading visible={this.state.loadingVisible}></Loading>
          </View>
        )
    }
    _init = () => {
      this._getData();
    }
    _getData = () => {

    }
    _loadingMore = () => {

    }
    _flatListFooter = () => {
        return (
          <Text style={styles.common.loadingTips}>{this.state.tips != '' ? this.state.tips : null}</Text>
        )
    }
}
