/**
 *  面板：首页
 */
import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  Image,
  View
} from 'react-native';

import { NavigationActions } from 'react-navigation'

import SplashScreen from 'react-native-splash-screen';

import Swiper from 'react-native-swiper';

import Utils from '../js/utils';

export default class MainScreen extends Component {
    constructor(props) {
      super(props);
      this.state ={
        adShow: false
      };
    }
    componentWillMount() {
      storage.load({
        key: 'firstBoot',
        autoSync: false,
        syncInBackground: false,
      }).then( ret => {
        this._check();
      }).catch(err => {
        this.setState({adShow: true});
        storage.save({
          key: 'firstBoot',
          data: {
            init: true
          }
        });
      });
    }
    componentDidMount() {
        SplashScreen.hide();
    }
    render() {
      return (
        <View style={{flex: 1}}>
        {
          this.state.adShow ?
          <Swiper style={{flex: 1}} loop={false} showsPagination={false}>
            <Image
              source={require('../images/start-1.jpg')}
              style={{flex: 1,  width: Utils.width, height: Utils.height, resizeMode: 'contain'}} />
            <Image
              source={require('../images/start-2.jpg')}
              style={{flex: 1,  width: Utils.width, height: Utils.height, resizeMode: 'contain'}} />
            <TouchableWithoutFeedback onPress={this._toLogin}>
              <Image
                source={require('../images/start-3.jpg')}
                style={{flex: 1,  width: Utils.width, height: Utils.height, resizeMode: 'contain'}} />
            </TouchableWithoutFeedback>
        </Swiper>
        : null
        }
        </View>
      );
    }
    _check = () => {
      let Nav = this.props.navigation;
      storage.load({
          key: 'user',
          autoSync: false,
          syncInBackground: false,
      }).then(ret => {
        global.token = ret.token;
        Nav.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Buyer'})
          ]
        }));
      }).catch(err => {
        Nav.dispatch({
          type: 'ReplaceRoute',
          routeName: 'Login',
          params: {
            routeName: 'Buyer',
            params: {}
          },
          key: 'Login'
        });
      })
    }
    _toLogin = () => {
      this.props.navigation.dispatch({
        type: 'ReplaceRoute',
        routeName: 'Login',
        params: {
          routeName: 'Buyer',
          params: {}
        },
        key: 'Login'
      });
    }
}
