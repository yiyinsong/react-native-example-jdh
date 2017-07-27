import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Modal,
    DeviceEventEmitter
} from 'react-native';

import styles from '../../css/styles';
import Utils from '../../js/utils';

export default class ModalPrompt extends Component{
    constructor(props){
        super(props)
        this.state = {
          keys: this.props.keys || 0,
          visible: false,
          data: this.props.data,
          notClose: this.props.notClose,
          params: {},
          input: '',
          error: ''
        };
    }
    componentDidMount() {
        this.listener_show = DeviceEventEmitter.addListener('promptShow', (data) => {
          if(data.keys != this.state.keys) return;
          this.setState({ visible: true, data: data.data || this.state.data, input: '', params: data.params, error: ''});
        });
        this.listener_tips = DeviceEventEmitter.addListener('promptTips', (data) => {
          if(data.keys != this.state.keys) return;
          this.setState({error: data.error});
        });
        this.listener_hide = DeviceEventEmitter.addListener('promptHide', (data) => {
          if(data.keys != this.state.keys) return;
          this.setState({ visible: false});
        });
    }
    componentWillUnmount() {
      this.listener_show && this.listener_show.remove();
      this.listener_tips && this.listener_tips.remove();
      this.listener_hide && this.listener_hide.remove();
    }
    _close=()=>{
      this.state.data.cancel && this.state.data.cancel();
      this.setState({ visible: false });
    }
    _confirm = () => {
      this.state.data.confirm && this.state.data.confirm.call(null, this.state.input, this.state.params);
      if(!this.state.notClose) {
        this.setState({ visible: false });
      }
    }
    _renderContent=()=>{
        return (
          <View style={[styles.modal.prompt.content, {width: Utils.width * .7}]}>
            <View style={styles.modal.prompt.container}>
              {
                this.state.error != '' ?
                <View style={styles.modal.prompt.error}>
                  <Text style={styles.modal.prompt.errorText}>{this.state.error}</Text>
                  <View style={styles.modal.prompt.triangle}></View>
                </View>
                : null
              }
              <Text style={styles.modal.prompt.text}>{this.state.data.text}</Text>
              <TextInput underlineColorAndroid="transparent" style={styles.modal.prompt.input} keyboardType="numeric" onChangeText={(text) => this.setState({input: text, error: ''})} value={this.state.text}/>
            </View>
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
