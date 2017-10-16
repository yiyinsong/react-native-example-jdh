import React,{Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  InteractionManager
} from 'react-native';

import ScreenInit from '../../../config/screenInit';
import UIToast from '../../common/ui-toast';
import Config from '../../../config/config';
import styles from '../../../css/styles';

export default class SearchScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        keywords: '',
        history: []
      };
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        ScreenInit.checkLogin(this);
        this.refs.searchInput.focus();
        this._init();
      });
    }
    render() {
        return (
            <View style={[styles.common.flexv, styles.common.initWhite]}>
              <View style={[styles.common.flexDirectionRow,  styles.common.flexCenterv, styles.common.header]}>
                <TouchableOpacity onPress={ () => {this.props.navigation.goBack()}}>
                    <Image style={styles.common.iconBackArrow} source={require('../../../images/icon-back.png')} />
                </TouchableOpacity>
                <View style={[styles.common.flex, styles.common.flexCenterv, styles.search.searchContainer]}>
                  <Image source={require('../../../images/icon-search-b.png')} style={styles.search.icon} />
                  <TextInput onChangeText={(text) => {this.setState({keywords: text})}} value={this.state.keywords} underlineColorAndroid="transparent"
                  onSubmitEditing={this._submit} style={styles.search.input}
                  placeholder="搜索商品名称"
                  ref="searchInput"/>
                </View>
                <TouchableOpacity activeOpacity={.8} onPress={this._submit}>
                  <Text style={styles.search.btn}>搜索</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.search.body}>
                {this.state.history.length > 0 ?
                  <View>
                    <View style={styles.common.flexDirectionRow}>
                      <Text style={[styles.common.flex, styles.search.recent]}>最近搜索</Text>
                      <TouchableOpacity activeOpacity={.8} onPress={this._clear}>
                        <Text style={styles.search.clear}>清除</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.search.history}>
                      {this.state.history.map((v, k) => {
                        return (
                          <TouchableOpacity activeOpacity={.8} onPress={() => this._historySearch(v.keywords)} key={v.id}>
                            <Text style={styles.search.historyText} numberOfLines={1}>{v.keywords}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                : null}
              </ScrollView>
            </View>
        );
    }
    _init = () => {
      fetch(Config.PHPAPI + `api/mapp/searchkeywords/index?token=${token}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then( r => {
        if(r.error_code == 0) {
          this.setState({history: r.data});
        }
      });
    }
    _clear = () => {
      fetch(Config.PHPAPI + `api/mapp/searchkeywords/delete?token=${token}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then( r => {
        if(r.error_code == 0) {
          this.setState({history:[]});
        }
      });
    }
    _submit = () => {
      if(this.state.keywords === '') {

      } else {
        if(!/[\w\u4e00-\u9fa5]/.test(this.state.keywords)) {
          UIToast('只能搜索中文、英文、数字');
          return;
        }
        fetch(Config.PHPAPI + `api/mapp/searchkeywords/add?keywords=${this.state.keywords}&token=${token}`, {
          method: 'GET'
        })
        .then(response => response.json())
        .then( r => {});
      }

    }
    _historySearch = (kw) => {
      alert(kw);
    }
}
