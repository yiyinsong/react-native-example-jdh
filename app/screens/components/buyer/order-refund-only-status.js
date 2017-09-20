import React,{Component} from 'react';

import {
  View,
  Text,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
  TouchableHighlight
} from 'react-native';

import styles from '../../../css/styles';
import Utils from '../../../js/utils';

export default class OrderRefundOnlyStatus extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        visible: false,
        list: [],
      };
      this.index = this.props.index;
    }
    componentDidMount() {
      this.listener_show = DeviceEventEmitter.addListener('orderRefundOnlyStatusShow', result => {
        if(result.index != this.index) return;
        this.setState({
          visible: true,
          list: result.list,
        });
      });
    }
    componentWillUnmount() {
      this.listener_show && this.listener_show.remove();
    }
    render() {
        let _list = this.state.list;
        let _title = this.state.title;
        return (
          <Modal animationType={"none"}
          transparent={true}
          visible={this.state.visible}
          onRequestClose={this._close}>
            <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={this._close}>
              <View style={styles.modal.container}></View>
            </TouchableOpacity>
            <View style={styles.order.refundList}>
              <View style={[styles.common.flexDirectionRow, styles.order.refundHeader]}>
                <Text style={[styles.common.flex, styles.order.refundTitle]} numberOfLines={1}>有退款</Text>
                <TouchableOpacity activeOpacity={.8} onPress={this._close}>
                  <Image source={require('../../../images/icon-close.png')}style={styles.order.refundClose} />
                </TouchableOpacity>
              </View>
              <View style={styles.order.refundBody}>
                <View style={[styles.common.flexDirectionRow, styles.order.refundDt]}>
                  <Text style={[styles.order.refundDtText, {width: Utils.width * .2}]}>申请时间</Text>
                  <Text style={[styles.common.flex, styles.order.refundDtText, {width: Utils.width * .25}]}>申请编号</Text>
                  <Text style={[styles.order.refundDtText, {width: Utils.width * .15}]}>申请金额</Text>
                  <Text style={[styles.order.refundDtText, {width: Utils.width * .2}]}>退款状态</Text>
                  <View style={styles.order.refundLastItem}></View>
                </View>
                <ScrollView>
                {_list.map((v, k) => {
                  return (
                    <TouchableHighlight underlayColor="#fafafa" onPress={() => this._toRefundDetail(v.id)}>
                      <View style={[styles.common.flexDirectionRow, styles.order.refundDd]}>
                        <Text style={[styles.order.refundDdText, {width: Utils.width * .2}]} numberOfLines={1}>{v.ctime}</Text>
                        <Text style={[styles.common.flex, styles.order.refundDdText, {width: Utils.width * .25}]} numberOfLines={1}>{v.sn}</Text>
                        <Text style={[styles.order.refundDdText, {width: Utils.width * .15}]} numberOfLines={1}>{v.refundAmount}</Text>
                        <Text style={[styles.order.refundDdText, {width: Utils.width * .2}]} numberOfLines={1}>{v.statusName}</Text>
                        <View style={styles.order.refundLastItem}>
                        <Image source={require('../../../images/sign-back.png')} style={styles.order.refundGoIcon}/>
                        </View>
                      </View>
                    </TouchableHighlight>
                  );
                })}
                </ScrollView>
              </View>
            </View>
          </Modal>
        );
    }
    _close = () => {
      this.setState({visible: false});
    }
    _toRefundDetail = (rid) => {

    }
}
