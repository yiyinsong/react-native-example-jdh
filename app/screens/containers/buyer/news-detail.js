/**
 * Component: 动态详情
 * author: yiyinSong
 * date: 2017-11-09
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    InteractionManager,
    WebView
  } from 'react-native';
import HTMLView from 'react-native-htmlview';

import moment from 'moment';

  import Config from '../../../config/config';
  import Utils from '../../../js/utils';
  import Loading from '../../common/ui-loading';
  import styles from '../../../css/styles';
  import ScreenInit from '../../../config/screenInit';
  

  export default class NewsDetailScreen extends Component {
      constructor(props) {
          super(props);
          this.state = {
              id: this.props.navigation.state.params.id,
              data: {
                  title: '',
                  ctime: '',
                  article_text: ''
              },
              bodyShow: false
          };
      }
      componentDidMount() {
            InteractionManager.runAfterInteractions(() => {
                ScreenInit.checkLogin(this);
                this.setState({loadingVisible: true});
                this._init();
            });
    }
    render() {
        return (
            <View style={[styles.common.flexv, styles.common.initWhite]}>
                {
                    this.state.bodyShow ?
                    <View style={[styles.common.flexv, styles.newsDetail.container]}>
                        <Text style={styles.newsDetail.title}>{this.state.data.title}</Text>
                        <Text style={styles.newsDetail.time}>{moment(this.state.data.ctime * 1000).format("YYYY-MM-DD")} <Text>{this.state.data.type == 0 ? '最新动态' : '商品动态'}</Text></Text>
                        <WebView
                        automaticallyAdjustContentInsets={false}
                        style={styles.newsDetail.webView}
                        source={{html: this.state.data.article_text}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        decelerationRate="normal"
                        startInLoadingState={true}
                      />
                    </View>
                    : null
                }
                <Loading visible={this.state.loadingVisible}></Loading> 
            </View>
        )
    }
    _init = () => {
        fetch(`${Config.PHPAPI}api/mapp/dynamics/dydetail?id=${this.state.id}&token=${token}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(r => {
            if(r.error_code === 0) {
                let _html = `<!DOCTYPE html>
                <html lang="zh-CN">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>动态详情</title>
                    <style type="text/css">
                        img{
                            max-width: 100%;
                        }
                    </style>
                </head>
                <body>
                    <div>${r.data.article_text}</div>
                </body>
                </html>`;
                r.data.article_text = _html;
                this.setState({
                    loadingVisible: false,
                    data: r.data,
                    bodyShow: true
                });
            }
        });
    }
}