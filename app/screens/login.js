/**
 * component Login
 */
import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import { NavigationActions, Transitioner } from 'react-navigation';

import md5 from "../js/md5";
import Config from '../config/config';
import Utils from '../js/utils';

import UIToast from './common/ui-toast';

import styles from '../css/styles';

export default class LoginScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        username: '',
        password: '',
        ver: '',
        express: true,
        verShow: false
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
          <View style={[styles.common.flexv, styles.login.content]}>
            <View style={{paddingTop: Utils.height/10,paddingBottom: Utils.height/10}}>
              <Image style={styles.login.logoImg} source={require('../images/icon-jdh.png')}/>
            </View>
            <View style={styles.login.form}>
              <View style={[styles.login.formControl, styles.common.flexDirectionRow, styles.common.flexCenterv]}>
                <Image style={styles.login.icon} source={require('../images/icon-mobile.png')}/>
                <TextInput onChangeText={(text) => this.setState({username: text})} value={this.state.username} placeholder="请输入用户名" underlineColorAndroid='transparent' style={styles.login.input}/>
                <TouchableOpacity activeOpacity={.8} onPress={()=>{this.setState({username: ''})}}>
                <Image style={styles.login.icon} source={require('../images/icon-reset.png')}/>
                </TouchableOpacity>
              </View>
              <View style={[styles.login.formControl, styles.common.flexDirectionRow, styles.common.flexCenterv]}>
                <Image style={styles.login.icon} source={require('../images/icon-password.png')}/>
                <TextInput onChangeText={(text) => this.setState({password: text})} value={this.state.password} placeholder="请输入密码" secureTextEntry={this.state.express} underlineColorAndroid='transparent' style={styles.login.input}/>
                <TouchableOpacity activeOpacity={.8} onPress={()=>{this.setState({password: ''})}}><Image style={styles.login.icon} source={require('../images/icon-reset.png')}/></TouchableOpacity>
                {!this.state.express ?
                <TouchableOpacity activeOpacity={.8} onPress={()=>{this.setState({express: true})}}>
                <Image style={[styles.login.icon, styles.login.passwordType]} source={require('../images/icon-express.png')}/>
                </TouchableOpacity>
                : null}
                {this.state.express ?
                <TouchableOpacity activeOpacity={.8} onPress={()=>{this.setState({express: false})}}>
                <Image style={[styles.login.icon, styles.login.passwordType]} source={require('../images/icon-ciphertext.png')}/>
                </TouchableOpacity>
                : null}
              </View>
              {this.state.verShow ?
              <View style={[styles.login.formControl, styles.common.flexDirectionRow, styles.common.flexCenterv]}>
                <Image style={styles.login.icon} source={require('../images/icon-ver.png')}/>
                <TextInput onChangeText={(text) => this.setState({ver: text})} value={this.state.ver} placeholder="请输入验证码" underlineColorAndroid='transparent' style={styles.login.input}/>
                <Image style={styles.login.icon} source={require('../images/icon-reset.png')}/>
              </View>
              : null}
              <View>
                <TouchableOpacity activeOpacity={.8} onPress={this._login} style={styles.login.btn}><Text style={styles.login.btnText}>登录</Text></TouchableOpacity>
                <TouchableOpacity activeOpacity={.8}><Text style={styles.login.findpw} onPress={this._toFindPassword}>找回密码</Text></TouchableOpacity>
              </View>
            </View>
          </View>
      )
    }
    _toFindPassword = () => {
      this.props.navigation.navigate('findPassword');
    }
}
