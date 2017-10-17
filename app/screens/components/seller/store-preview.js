/**
 * Component: 店铺预览
 * author: yiyinSong
 * date: 2017-10-17
 */
import React, { Component } from 'react';
import {
  WebView
  } from 'react-native';

  import Config from '../../../config/config';
  import Utils from '../../../js/utils';
  import styles from '../../../css/styles';

  export default class StoreScreen extends Component {
    constructor(props){
        super(props);
        let _query = this.props.navigation.state.params;
    	this.state = {
            url: `${Config.WAPURL}home.html?storeid=${_query.shopid}`
        };
    }
    render() {
      return(
        <WebView
        automaticallyAdjustContentInsets={false}
       
        source={{uri: this.state.url}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
        scalesPageToFit={true}
      />
      )
    }
  }