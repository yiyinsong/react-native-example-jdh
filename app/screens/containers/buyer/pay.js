import React,{Component} from 'react';

import {
  View,
  Image,
  Text,
  ScrollView,
  InteractionManager,
  TouchableOpacity,
  TouchableHighlight,
  Modal
} from 'react-native';

import Loading from '../../common/ui-loading';
import UIToast from '../../common/ui-toast';
import Config from '../../../config/config';
import styles from '../../../css/styles';
import Utils from '../../../js/utils';


export default class Pay extends Component {
    constructor(props){
    	super(props);
      let _query = this.props.navigation.state.params;
    	this.state = {
        ordersn: _query.ordersn,
        data: {},
        loadingVisible: false,
        index: 0,
        posCodeVisible: false,
        posCodeSrc: ''
      };
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        this.setState({loadingVisible: true});
        this._init();
      });
    }
    render() {
        return (
            <View style={styles.common.flexv}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.pay.block}>
                  <View style={[styles.pay.orderItem, styles.common.flexDirectionRow]}>
                    <Text style={styles.pay.ol}>订单编号：</Text>
                    <Text style={[styles.common.flex, styles.pay.or]}>{this.state.data.orderSn}</Text>
                  </View>
                  <View style={[styles.pay.orderItem, styles.common.flexDirectionRow]}>
                    <Text style={styles.pay.ol}>支付金额：</Text>
                    <Text style={[styles.common.flex, styles.pay.or]}>{this.state.data.totalAmount}元</Text>
                  </View>
                </View>
                <View style={styles.pay.block}>
                  <View style={[styles.pay.money, styles.common.flexDirectionRow]}>
                    <Text style={styles.pay.ol}>还需支付：</Text>
                    <Text style={[styles.common.flex, styles.pay.redText]}>{this.state.data.totalAmount}元</Text>
                  </View>
                  <View>
                    <TouchableHighlight underlayColor='#fafafa' onPress={() => this._select(0)}>
                      <View style={[styles.common.flexDirectionRow, styles.pay.item]}>
                        <Text style={[styles.common.flex, styles.pay.text]}>立即支付</Text>
                        <View style={[styles.pay.radio, this.state.index === 0 ? styles.pay.radioActive : '']}>
                          {this.state.index === 0 ?
                            <Image source={require('../../../images/icon-checked-blue.png')} style={styles.pay.radioImg} />
                          : null}
                        </View>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='#fafafa' onPress={() => this._select(1)}>
                      <View style={[styles.common.flexDirectionRow, styles.pay.item]}>
                        <Text style={[styles.common.flex, styles.pay.text]}>POS支付</Text>
                        <View style={[styles.pay.radio, this.state.index === 1 ? styles.pay.radioActive : '']}>
                          {this.state.index === 1 ?
                            <Image source={require('../../../images/icon-checked-blue.png')} style={styles.pay.radioImg} />
                          : null}
                        </View>
                      </View>
                    </TouchableHighlight>
                    {this.state.data.supportWxPay ?
                      <TouchableHighlight underlayColor='#fafafa' onPress={() => this._select(2)}>
                        <View style={[styles.common.flexDirectionRow, styles.pay.item]}>
                          <Text style={[styles.common.flex, styles.pay.text]}>微信支付</Text>
                          <View style={[styles.pay.radio, this.state.index === 2 ? styles.pay.radioActive : '']}>
                            {this.state.index === 2 ?
                              <Image source={require('../../../images/icon-checked-blue.png')} style={styles.pay.radioImg} />
                            : null}
                          </View>
                        </View>
                      </TouchableHighlight>
                    : null}
                  </View>
                </View>
                <TouchableOpacity activeOpacity={.8} style={styles.pay.submit} onPress={this._submit}>
                  <Text style={styles.pay.submitText}>确认支付</Text>
                </TouchableOpacity>
              </ScrollView>
              <Modal
                visible={this.state.posCodeVisible}
                animationType={'fade'}
                transparent = {true}
                onRequestClose={()=> this.setState({posCodeVisible: false})}
            >
            <TouchableOpacity activeOpacity={1} style={[styles.common.flex, styles.common.flexCenterv, styles.common.flexCenterh, styles.ewm.container]} onPress={()=>this.setState({posCodeVisible: false})}>
              <Image source={{uri: this.state.posCodeSrc}} style={{width: Utils.width * .4, height: Utils.width * .4}} resizeMode ={'contain'}/>
            </TouchableOpacity>
            </Modal>
              <Loading visible={this.state.loadingVisible}></Loading>
            </View>
        );
    }
    _init = () => {
      fetch(Config.JAVAAPI + `shop/wap/order/detail?orderSn=${this.state.ordersn}&token=${token}`, {
          method: 'POST'
      })
      .then(response => response.json())
      .then((data) => {
          this.setState({loadingVisible: false});
          if (data.code == 1) {
              this.setState({data: data.obj});
          } else {
            UIToast(data.message || '加载数据失败');
          }
      });
    }
    _select = (i) => {
      this.setState({index: i});
    }
    _posPay = (sn) => {
      this.setState({
        posCodeVisible: true,
        posCodeSrc: `${Config.JAVAAPI}qrcode?text=${sn}&w=150`
      });
    }
    _submit = () => {
      if(this.state.index === 1) {
        this._posPay(this.state.ordersn);
      }
    }
}
