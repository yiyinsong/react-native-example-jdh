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
  FlatList,
  TouchableHighlight,
  InteractionManager
  } from 'react-native';

  import Config from '../../../config/config';
  import Loading from '../../common/ui-loading';
  import styles from '../../../css/styles';
  import ScreenInit from '../../../config/screenInit';

  export default class CategoryScreen extends Component {
      constructor(props) {
          super(props);
          this.state = {
            loadingVisible: false
          };
      }
      componentDidMount() {
            InteractionManager.runAfterInteractions(() => {
                ScreenInit.checkLogin(this);
                this.setState({loadingVisible: true});
                // this._init();
            });
        }
      render() {
          return (
              <View style={[styles.common.flexv, styles.common.init]}>
                <Loading visible={this.state.loadingVisible}></Loading>       
              </View>
          )
      }
  }