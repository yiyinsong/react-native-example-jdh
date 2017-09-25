import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Image,
    Text,
    Modal,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';

import styles from '../../../css/styles';

export default class ViewRefundGoods extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
        this.index = this.props.index;
    }
    componentDidMount() {
        this.listener_show = DeviceEventEmitter.addListener('viewRefundGoodsShow', result => {
            if(result.index != this.index) return;
            this.setState({
              modalVisible: true,
            });
        });
    }
    componentWillUnmount() {
        this.listener_show && this.listener_show.remove();
    }
    render() {
        let _data = this.props.data;
        let _totalNum = this.props.totalNum;
        let _totalPrice = this.props.totalPrice;
        return (
            <Modal
            animationType={'none'}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {this._setModalVisible(false)}}>
                <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={() => {this._setModalVisible(false)}}>
                    <View style={styles.modal.container}></View>
                </TouchableOpacity>
                <View style={styles.order.refundList}>
                    <View style={[styles.common.flexDirectionRow, styles.order.refundHeader]}>
                        <Text style={[styles.common.flex, styles.order.refundTitle]}>申请商品</Text>
                        <TouchableOpacity activeOpacity={.8} onPress={() => {this._setModalVisible(false)}}>
                            <Image source={require('../../../images/icon-close.png')}style={styles.order.refundClose} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        {_data.map((v, k) => {
                            return (
                                <View style={[styles.common.flexDirectionRow, styles.vrg.item]}>
                                    <Image source={{uri: v.imgUrlSmall}} style={styles.vrg.itemImg} />
                                    <View style={[styles.common.flexv, styles.vrg.info]}>
                                        <Text numberOfLines={2} style={styles.vrg.itemGoodsName}>{v.goodsName}</Text>
                                        <Text numberOfLines={1} style={styles.vrg.itemAttr}>{v.skuAttr}</Text>
                                        <View style={[styles.common.flexDirectionRow, styles.vrg.others]}>
                                            <Text style={styles.vrg.othersText}>
                                                申请数量：
                                                <Text style={styles.vrg.othersActive}>x {v.qty}</Text>
                                            </Text>
                                            <Text style={styles.vrg.othersText}>
                                                申请金额：
                                                <Text style={styles.vrg.othersActive}>￥ {v.refundAmount}</Text>
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                    <View style={[styles.common.flexDirectionRow, styles.vrg.footer]}>
                        <View style={[styles.common.flexv, styles.common.flexCenterh]}>
                            <Text style={styles.vrg.account}>
                                申请商品数：<Text style={styles.vrg.accountActive}>{_totalNum}</Text>
                            </Text>
                            <Text style={styles.vrg.account}>
                                申请总金额：<Text style={styles.vrg.accountActive}>{_totalPrice}</Text>
                            </Text>
                        </View>
                        <TouchableOpacity activeOpacity={.8} onPress={() => {this._setModalVisible(false)}}>
                            <Text style={styles.vrg.closeBtn}>关闭</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
    _setModalVisible = (bool) => {
        this.setState({modalVisible: bool});
    }
}
