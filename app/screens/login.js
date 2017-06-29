/**
 * component Login
 */
import React, { Component } from 'react';
import {
    Button,
    Text,
    TextInput,
    View,
    StyleSheet
} from 'react-native';

import { NavigationActions, Transitioner } from 'react-navigation';

import md5 from "../js/md5";
import Config from '../config/config';

import UIToast from './common/ui-toast';

const styles = StyleSheet.create({
  login: {},
  formControl: {}
});

export default class LoginScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        username: '',
        password: ''
      };
    }
    _login = () => {
      if(this.state.username == '') {
        UIToast('请填写用户名');
        return;
      }
      if(this.state.password == '') {
        UIToast('请填写密码');
        return;
      }
      let _time = Math.round(new Date().getTime()/1000);
      let str = 'app_key=mapppassword='+this.state.password+'time_stamp=' + _time + 'username='+this.state.username+'c5221148d7ae84bf34e85c6499207ece';
      str = md5.hex_md5(str);

      fetch(Config.PHPAPI + 'api/mapp/member/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'username='+this.state.username+'&password='+this.state.password+'&sign='+str+'&time_stamp='+_time+'&app_key=mapp',
      })
      .then((response) => response.json())
      .then((data) => {
          if(data.error_code == 0) {
            storage.save({
              key: 'user',
              data: data.data
            });
            global.token = data.data.token;
            const { routeName, params } = this.props.navigation.state.params;
            if(routeName) {
              this.props.navigation.dispatch({
                key: routeName,
                type: 'ReplaceRoute',
                routeName,
                params,
              });
            } else {
              this.props.navigation.goBack();
            }
          } else {
            UIToast(data.msg || '登录失败');
          }
      })
      .catch((err) => {
          UIToast(data.msg || '登录失败');
      });
    }
    render() {
        return (
          <View style={styles.login}>
            <View style={styles.formControl}>
              <Text>用户名：</Text>
              <TextInput onChangeText={(text) => this.setState({username: text})} value={this.state.username} placeholder="请输入用户名"/>
            </View>
            <View style={styles.formControl}>
              <Text>密码：</Text>
              <TextInput onChangeText={(text) => this.setState({password: text})} value={this.state.password} placeholder="请输入密码" secureTextEntry={true}/>
            </View>
            <Button title="登录" onPress={this._login}/>
          </View>
      )
    }
}
