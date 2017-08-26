import React,{Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  InteractionManager
} from 'react-native';

import ScreenInit from '../../../config/screenInit';
import Config from '../../../config/config';
import Utils from '../../../js/utils';
import styles from '../../../css/styles';

import Loading from '../../common/ui-loading';

export default class HomeSignScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        data: {},
        signed: true,
        loadingVisible: false,
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
                <TouchableOpacity activeOpacity={.8} style={styles.sign.tipsLink}>
                  <Image source={require('../../../images/sign-rule.png')} style={styles.sign.tipsIcon} />
                </TouchableOpacity>
                <Image source={require('../../../images/sign-bg.png')} style={[styles.common.flexCenterh, styles.common.flexCenterv, {width: Utils.width, height: Utils.width/1.63}]} resizeMode="contain">
                  {
                    this.state.signed ?
                    <Image source={require('../../../images/sign-btn-active.png')} style={[styles.common.flexCenterv, styles.common.flexCenterh, {width: Utils.width*.3, height: Utils.width*.3}]} resizeMode="contain">
                      <Text style={styles.sign.signedText}>已连续<Text style={styles.sign.signedDay}>{this.state.data.signinnum}</Text>天</Text>
                    </Image>
                    :
                    <TouchableOpacity activeOpacity={.8}>
                      <Image source={require('../../../images/sign-btn.png')} style={{width: Utils.width*.3, height: Utils.width*.3}} resizeMode="contain"/>
                    </TouchableOpacity>
                  }
                </Image>
                <ScrollView>
                </ScrollView>
              </View>
              <Loading visible={this.state.loadingVisible}></Loading>
            </View>
        );
    }
    _init = () => {
      fetch(Config.PHPAPI + `api/mapp/sign/csh?token=${token}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then( r => {
        this.setState({loadingVisible: false});
        if(r.error_code === 0) {
            this.setState({data: r.data});
        }
      });
    }
}
