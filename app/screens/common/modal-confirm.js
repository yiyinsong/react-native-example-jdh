import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Modal,
    DeviceEventEmitter
} from 'react-native';

import styles from '../../css/styles';
import Utils from '../../js/utils';

export default class ModalConfirm extends Component{
  static get defaultProps() {
    return {
      data: {
        confirmText: '确认',
        cancelText: '取消',
        text: '提示'
      },
      params: {}
    }
  }
    constructor(props){
        super(props)
        this.state = {
          keys: this.props.keys || 0,
          visible: false,
          data: this.props.data,
          params: {}
        };
    }
    componentDidMount() {
        this.listener_show = DeviceEventEmitter.addListener('confirmShow', (data) => {
          if(data.keys != this.state.keys) return;
          this.setState({ visible: true, data: data.data || this.state.data, params: data.params });
        });
    }
    componentWillUnmount() {
      this.listener_show && this.listener_show.remove();
    }
    _close=()=>{
      this.state.data.cancel && this.state.data.cancel();
      this.setState({ visible: false });
    }
    _confirm = () => {
      this.state.data.confirm && this.state.data.confirm.call(null, this.state.params);
      this.setState({ visible: false });
    }
    _renderContent=()=>{
        return (
          <View style={[styles.modal.confirm.content, {width: Utils.width * .7}]}>
            <Text style={styles.modal.confirm.text}>{this.state.data.text}</Text>
            <View style={styles.modal.confirm.btn}>
              <TouchableOpacity activeOpacity={.8} onPress={this._confirm} style={styles.modal.confirm.confirm}>
                  <Text style={styles.modal.confirm.confirmText}>{this.state.data.confirmText || '确认'}</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.8} onPress={this._close} style={styles.modal.confirm.cancel}>
                  <Text style={styles.modal.confirm.cancelText}>{this.state.data.cancelText || '取消'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
    }
    render(){
        return(
            <Modal
                animationType='fade'
                onRequestClose={() => this._close()}
                visible={this.state.visible}
                transparent={true}
                 >
                <TouchableOpacity style={{flex:1}} activeOpacity={1}>
                <View style={styles.modal.container}>
                    {this._renderContent()}
                </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}
