/**
 *  面板：首页
 */
import React, { Component } from 'react';
import {
    View
} from 'react-native';


export default class MainScreen extends Component {
    componentWillMount() {
      let Nav = this.props.navigation;
      storage.load({
          key: 'user',
          autoSync: false,
          syncInBackground: false,
      }).then(ret => {
        global.token = ret.token;
        Nav.dispatch({
          type: 'ReplaceRoute',
          routeName: 'Entrance',
          params: {},
          key: 'Entrance'
        });
      }).catch(err => {
        Nav.dispatch({
          type: 'ReplaceRoute',
          routeName: 'Login',
          params: {
            routeName: 'Entrance',
            params: {}
          },
          key: 'Login'
        });
      })
    }
    render() {
        return (
            <View></View>
        );
    }
}
