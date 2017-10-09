import React, { Component } from 'react';
import {
    View,
    Image,
    Modal,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';

import Swiper from 'react-native-swiper';

import Utils from '../../../js/utils';
import styles from '../../../css/styles';

export default class ViewSwiper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
        this.index = this.props.index;
    }
    componentDidMount() {
        this.listener_show = DeviceEventEmitter.addListener('viewSwiperShow', result => {
            if(result.index != this.index) return;
            this.setState({
              modalVisible: true,
            });
            let _number = result.number;
            setTimeout(() => {
                this.refs.swiper.scrollBy(_number, false);
            }, 200);
        });
    }
    componentWillUnmount() {
        this.listener_show && this.listener_show.remove();
    }
    render() {
        let _data = this.props.data;
        return (
            <Modal
            animationType={'fade'}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {this._setModalVisible(false)}}>
                <TouchableOpacity style={styles.swiper.container} activeOpacity={1} onPress={() => {this._setModalVisible(false)}}></TouchableOpacity>
                <View style={styles.swiper.wrapper}>
                    <View style={styles.swiper.back}>
                        <TouchableOpacity onPress={() => {this._setModalVisible(false)}}>
                            <Image style={styles.swiper.backArrow} source={require('../../../images/icon-back-w.png')} />
                        </TouchableOpacity>
                    </View>
                    <Swiper style={{flex: 1}} showsPagination={false} loop={false} ref="swiper">
                        {_data.map((v, k) => {
                            return (
                                <Image
                                source={{uri: v}}
                                style={{flex: 1, resizeMode: 'contain'}} />
                            );
                        })}
                    </Swiper>
                </View>
            </Modal>
        );
    }
    _setModalVisible = (bool) => {
        this.setState({modalVisible: bool});
    }
}
