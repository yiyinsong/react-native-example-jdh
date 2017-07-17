import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  InteractionManager
} from 'react-native';

import styles from '../../../css/styles';
import OrderItem from '../../components/seller/tab-order-item';
import Loading from '../../common/ui-loading';
import UIToast from '../../common/ui-toast';
import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';

export default class OrderDetailScreen extends Component{
  constructor(props){
  	super(props);
    let _query = this.props.navigation.state.params;
  	this.state = {
      loadingVisible: false,
      data: {
      },
      id: _query.id,
      shopid: _query.shopid
    };
  }
  componentWillMount() {
    this.setState({loadingVisible: true});
    InteractionManager.runAfterInteractions(() => {
      ScreenInit.checkLogin(this);
      this._init();
    })
  }
  render() {
    let _data = this.state.data;
    return (
      <View>
        <ScrollView style={[styles.common.init]}>

        </ScrollView>
        <Loading visible={this.state.loadingVisible}></Loading>
      </View>
    );
  }
  _init = () => {
    fetch(Config.JAVAAPI + `shop/mobile/refund/bgetInfo?id=${this.state.id}&shopId=${this.state.shopid}&token=${token}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then((data) => {
        this.setState({loadingVisible: false});
        this.setState({data: data});
    });
  }
}
