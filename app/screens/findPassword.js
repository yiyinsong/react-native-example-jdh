/**
 * component FindPassword
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import styles from '../css/styles';
import UIToast from './common/ui-toast';
import Config from '../config/config';

import md5 from "../js/md5";

export default class FindPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      ver: '',
      pwd: '',
      rpwd: '',
      sending: false,
      countDown: 60
    };
  }
  render() {
    return (
      <View style={[styles.common.flexv, styles.fpw.content]}>
        <View style={styles.fpw.form}>
          <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.fpw.formControl]}>
            <View style={[styles.common.flex, styles.common.flexCenterv, styles.fpw.formItem]}>
              <Text style={styles.fpw.label}>手机号</Text>
              <TextInput onChangeText={(text) => this.setState({mobile: text})} value={this.state.mobile} placeholder="请输入手机号" underlineColorAndroid='transparent' style={styles.fpw.input}/>
            </View>
          </View>
          <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.common.flexEndv, styles.fpw.formControl]}>
            <View style={[styles.common.flex, styles.common.flexCenterv, styles.fpw.formItem]}>
              <Text style={styles.fpw.label}>验证码</Text>
              <TextInput onChangeText={(text) => this.setState({ver: text})} value={this.state.ver} placeholder="请输入验证码" underlineColorAndroid='transparent' style={styles.fpw.input}/>
            </View>
            <TouchableOpacity activeOpacity={.8} onPress={this._sendVer}>
              {
                !this.state.sending ? <Text style={styles.fpw.send}>发送验证码</Text> : <Text style={[styles.fpw.send, styles.fpw.sendDisabled]}>({this.state.countDown}s)重发</Text>
              }
            </TouchableOpacity>
          </View>
          <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.fpw.formControl]}>
            <View style={[styles.common.flex, styles.common.flexCenterv, styles.fpw.formItem]}>
              <Text style={styles.fpw.label}>输入密码</Text>
              <TextInput onChangeText={(text) => this.setState({pwd: text})} value={this.state.pwd} placeholder="请输入新密码" secureTextEntry={true} underlineColorAndroid='transparent' style={styles.fpw.input}/>
            </View>
          </View>
          <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.fpw.formControl]}>
            <View style={[styles.common.flex, styles.common.flexCenterv, styles.fpw.formItem]}>
              <Text style={styles.fpw.label}>再次输入</Text>
              <TextInput onChangeText={(text) => this.setState({rpwd: text})} value={this.state.rpwd} placeholder="请输入确认密码" secureTextEntry={true} underlineColorAndroid='transparent' style={styles.fpw.input}/>
            </View>
          </View>
        </View>
        <TouchableOpacity activeOpacity={.8} style={styles.login.btn} onPress={this._submit}><Text style={styles.login.btnText}>确定</Text></TouchableOpacity>
      </View>
    )
  }
  _submit = () => {
    if(this.state.mobile == '') {
      UIToast('请输入手机号码');
      return;
    } else if(this.state.ver == '') {
      UIToast('请输入验证码');
      return;
    } else if(this.state.pwd == '') {
      UIToast('请输入新密码');
      return;
    } else if(this.state.rpwd == '') {
      UIToast('请输入确认密码');
      return;
    }

    let _time = Math.round(new Date().getTime()/1000);
    let str = `app_key=mappmobile=${this.state.mobile}password=${this.state.pwd}repassword=${this.state.rpwd}smscode=${this.state.ver}time_stamp=${_time}c5221148d7ae84bf34e85c6499207ece`;
    str = md5.hex_md5(str);

    fetch(Config.PHPAPI + 'api/mapp/member/findpwd',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `mobile=${this.state.mobile}&password=${this.state.pwd}&repassword=${this.state.rpwd}&smscode=${this.state.ver}&sign=${str}&time_stamp=${_time}&app_key=mapp`
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.error_code == 0) {
        UIToast('修改成功');
        this.backTimer = setTimeout(() => {
          this.props.navigation.goBack();
        }, 2000);
      } else {
        UIToast(data.msg);
      }
    });
  }
  _sendVer = () => {
    if(this.state.sending) return;

    if(this.state.mobile == '') {
      UIToast('请输入手机号码');
      return;
    }
    let _time = Math.round(new Date().getTime()/1000);
    let str = `app_key=mappmobile=${this.state.mobile}shop_type=1time_stamp=${_time}type=2c5221148d7ae84bf34e85c6499207ece`;
    str = md5.hex_md5(str);

    fetch(Config.PHPAPI + 'api/common/index/msg-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `mobile=${this.state.mobile}&type=2&shop_type=1&sign=${str}&time_stamp=${_time}&app_key=mapp`,
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({sending: true});
      this.timeCountDown();
      UIToast(data.msg || '短信发送失败');
    });
  }
  componentWillUnmount() {
    this.backTimer && clearTimeout(this.backTimer);
    this.verTimer && clearTimeout(this.verTimer);
  }
  timeCountDown = () => {
    if(this.state.countDown == 0) {
      this.setState({
        sending: false,
        countDown: 60
      });
      this.verTimer && clearTimeout(this.verTimer);
    } else {
      this.setState({countDown: --this.state.countDown});
      this.verTimer = setTimeout(() => {
        this.timeCountDown();
      }, 1000);
    }
  }
}
