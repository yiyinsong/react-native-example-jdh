import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Image,
    Modal,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';

import styles from '../../../css/styles';

export default class ViewRefundGoods extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true
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
        return (
            <Modal
            animationType={'none'}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {this._setModalVisible(false)}}>
                <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={() => {this._setModalVisible(false)}}>
                    <View style={styles.modal.container}></View>
                </TouchableOpacity>
            </Modal>
        );
    }
    _setModalVisible = (bool) => {
        this.setState({modalVisible: bool});
    }
}
