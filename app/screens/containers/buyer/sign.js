import React,{Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  InteractionManager,
  Modal
} from 'react-native';

import HTMLView from 'react-native-htmlview';

import ScreenInit from '../../../config/screenInit';
import UIToast from '../../common/ui-toast';
import Config from '../../../config/config';
import Utils from '../../../js/utils';
import styles from '../../../css/styles';

import Loading from '../../common/ui-loading';

export default class SignScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        data: {
          is_sign: false,
          content: ''
        },
        loadingVisible: false,
        list: [],
        start: [],
        end: [],
        tipsVisible: false,
        ticketVisible: false,
        ticketMsg: '',
        signedVisible: false
      };
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        this.setState({loadingVisible: true});
        ScreenInit.checkLogin(this);
        this._init();
      });
    }
    render() {
        return (
            <View style={[styles.common.flexv, styles.common.initWhite]}>
              <View>
                <TouchableOpacity activeOpacity={.8} style={styles.sign.tipsLink} onPress={() => this._setTipsVisible(true)}>
                  <Image source={require('../../../images/sign-rule.png')} style={styles.sign.tipsIcon} />
                </TouchableOpacity>
                <Image source={require('../../../images/sign-bg.png')} style={[styles.common.flexCenterh, styles.common.flexCenterv, {width: Utils.width, height: Utils.width/1.63}]} resizeMode="contain">
                  {
                    this.state.data.is_sign ?
                    <TouchableOpacity activeOpacity={.8} onPress={() => this._setSignedVisible(true)}>
                      <Image source={require('../../../images/sign-btn-active.png')} style={[styles.common.flexCenterv, styles.common.flexCenterh, {width: Utils.width*.3, height: Utils.width*.3}]} resizeMode="contain">
                        <Text style={styles.sign.signedText}>已连续<Text style={styles.sign.signedDay}>{this.state.data.signinnum}</Text>天</Text>
                      </Image>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity activeOpacity={.8} onPress={this._signFunc}>
                      <Image source={require('../../../images/sign-btn.png')} style={{width: Utils.width*.3, height: Utils.width*.3}} resizeMode="contain"/>
                    </TouchableOpacity>
                  }
                </Image>
                <ScrollView>
                  <Text style={styles.sign.date}>{this.state.data.Y}/{this.state.data.m}</Text>
                  <View style={styles.sign.table}>
                    <View style={[styles.common.flexDirectionRow, {width: Math.floor((Utils.width-21)/7)*7+1}]}>
                      <Text style={[styles.common.flex, styles.sign.week]}>日</Text>
                      <Text style={[styles.common.flex, styles.sign.week]}>一</Text>
                      <Text style={[styles.common.flex, styles.sign.week]}>二</Text>
                      <Text style={[styles.common.flex, styles.sign.week]}>三</Text>
                      <Text style={[styles.common.flex, styles.sign.week]}>四</Text>
                      <Text style={[styles.common.flex, styles.sign.week]}>五</Text>
                      <Text style={[styles.common.flex, styles.sign.week]}>六</Text>
                    </View>
                    <View style={[styles.common.flexDirectionRow, styles.sign.tbody, {width: Math.floor((Utils.width-21)/7)*7+1}]}>
                      {this.state.start.map((v, k) => {
                        return (
                          <View style={[styles.common.flexCenterh, styles.sign.day, {width: Math.floor((Utils.width-21)/7)}]} key={k}>
                          </View>
                        );
                      })}
                      {this.state.list.map((v, k) => {
                        return (
                          <View style={[styles.common.flexCenterh, styles.sign.day, {width: Math.floor((Utils.width-21)/7)}, v.isSign ? styles.sign.dayActive : '']} key={k}>
                            <Text style={styles.sign.dayText}>{v.date}</Text>
                            {v.isSign ? <Image source={require('../../../images/sign-signed.png')} style={styles.sign.daySignIcon}/> : null}
                          </View>
                        );
                      })}
                      {this.state.end.map((v, k) => {
                        return (
                          <View style={[styles.common.flexCenterh, styles.sign.day, {width: Math.floor((Utils.width-21)/7)}]} key={k}>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </ScrollView>
              </View>
              <Loading visible={this.state.loadingVisible}></Loading>
              <Modal
              animationType='fade'
              transparent={true}
              visible={this.state.tipsVisible}
              onRequestClose={() => {this._setTipsVisible(false)}}
              >
                <View style={[styles.modal.container, styles.common.flexCenterh]}>
                  <View style={styles.sign.tips}>
                    <Text style={styles.sign.tipsTitle}>签到规则</Text>
                    <HTMLView value={this.state.data.content.replace(/\<br \/\>/ig, '')}></HTMLView>
                  </View>
                  <View style={styles.sign.tipsLine}></View>
                  <TouchableWithoutFeedback onPress={() => this._setTipsVisible(false)}>
                    <Image source={require('../../../images/sign-close.png')} style={styles.sign.tipsClose}/>
                  </TouchableWithoutFeedback>
                </View>
              </Modal>
              <Modal
              animationType='fade'
              transparent={true}
              visible={this.state.signedVisible}
              onRequestClose={() => {this._setSignedVisible(false)}}
              >
                <View style={[styles.modal.container, styles.common.flexCenterh]}>
                  <View style={[styles.sign.tips, styles.sign.signed]}>
                    <TouchableOpacity activeOpacity={.8} style={styles.sign.signCloseAbsolute} onPress={() => this._setSignedVisible(false)}>
                      <Image source={require('../../../images/icon-close.png')} style={styles.sign.signedClose} />
                    </TouchableOpacity>
                    <Text style={styles.sign.signedTitle}>今日已签到</Text>
                    <Image source={require('../../../images/signed.png')} style={[styles.sign.signedImg, {width: Utils.width - 120, height: (Utils.width - 120)/1.6}]} />
                    <Text style={styles.sign.signedOkText}>欢迎明天再来~</Text>
                  </View>
                </View>
              </Modal>
              <Modal
              animationType='fade'
              transparent={true}
              visible={this.state.ticketVisible}
              onRequestClose={() => {this._setTicketVisible(false)}}
              >
                <View style={[styles.modal.container, styles.common.flexCenterh]}>
                  <View style={styles.sign.tips}>
                    <Image source={require('../../../images/sign-ticket.png')} style={{width: Utils.width - 70, height: (Utils.width - 70)/1.22, resizeMode: 'contain'}}/>
                    <Text style={styles.sign.ticketMsg}>{this.state.ticketMsg}</Text>
                    <View style={styles.common.flexDirectionRow}>
                      <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.sign.ticketCancel]} onPress={() => this._setTicketVisible(false)}>
                        <Text style={styles.sign.ticketCancelText}>取消</Text>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.sign.ticketConfirm]}>
                        <Text style={styles.sign.ticketConfirmText}>去使用</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
        );
    }
    _init = () => {
      fetch(Config.PHPAPI + `api/mapp/sign/csh?token=${token}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then( r => {
        if(r.error_code === 0) {
            let _date = r.data.Y + '/' + r.data.m + '/1';
            let _start = new Date(_date).getDay(_date);
            let _tempStart = [],
                _tempEnd = [],
                _tempList = [];

            for(let i=0;i<_start;i++) {
              _tempStart.push(0);
            }
            for(let i=0,l=7 - (_start + parseInt(r.data.daynum))%7;i<l;i++) {
              _tempEnd.push(0);
            }

            for(let i=0; i<parseInt(r.data.daynum); i++) {
                let _sign = false;
                for(let item in r.data.d) {
                    if(r.data.d[item] == (i+1)) {
                        _sign = true;
                    }
                }
                _tempList.push({
                    date: i+1,
                    isSign: _sign ? 1 : 0
                });
            }
            this.setState({
              loadingVisible: false,
              data: r.data,
              start: _tempStart,
              list: _tempList,
              end: _tempEnd
            });
        }
      });
    }
    _setTipsVisible = (b) => {
      this.setState({tipsVisible: b});
    }
    _setTicketVisible = (b) => {
      this.setState({ticketVisible: b});
    }
    _setSignedVisible = (b) => {
      this.setState({signedVisible: b});
    }
    _signFunc = () => {
      fetch(Config.PHPAPI + `api/mapp/sign/signin?token=${token}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then( r => {
          if(r.error_code === 0) {
              this.setState({ticketMsg: r.msg});
              this._init();
              this._setTicketVisible(true);
          } else {
              UIToast('签到失败');
          }
      });
    }
}
