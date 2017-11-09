/**
 * Component: 我的顾客
 * author: yiyinSong
 * date: 2017-11-06
 */
import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  InteractionManager,
  Alert,
  Linking
  } from 'react-native';

import Config from '../../../config/config';
import Utils from '../../../js/utils';
import Loading from '../../common/ui-loading';
import styles from '../../../css/styles';
import ScreenInit from '../../../config/screenInit';

export default class CustomerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingVisible: false,
            text: '',
            list: [],
            page: 0,
            loadEnd: false,
            loading: false
        };
    }
    render() {
        return (
            <View style={[styles.common.flexv, styles.common.initWhite]}>
                <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.customer.search]}>
                    <TextInput 
                    style={[styles.common.flex, styles.customer.searchInput]}
                    onChangeText={(text) => {this.setState({text})}}
                    value={this.state.text}
                    placeholder="请输入用户名或手机号"
                    underlineColorAndroid="transparent"
                    onSubmitEditing={this._search}
                    />
                    <TouchableOpacity activeOpacity={.8} onPress={this._search}>
                        <Image source={require('../../../images/icon-search@30x30.png')} style={styles.customer.searchIcon} resizeMode="contain" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.common.flexDirectionRow, styles.customer.dt]}>
                    <View style={styles.common.flex}><Text style={styles.customer.dtText}>姓名</Text></View>
                    <View style={styles.common.flex}><Text style={styles.customer.dtText}>手机</Text></View>
                    <View style={styles.common.flex}><Text style={styles.customer.dtText}>相关订单</Text></View>
                </View>
                <FlatList
                    data={this.state.list}
                    renderItem={this._renderItem}
                    getItemLayout={(data, index) => ( {length: 38, offset: 38 * index, index} )}
                    onEndReached={this._loadMore}
                    onEndReachedThreshold={.2}
                    ListFooterComponent={() => <Text style={styles.common.loadingTips}>{this.state.loadEnd ? '没有更多数据！' : '正在加载中...'}</Text>}
                />
                <Loading visible={this.state.loadingVisible}></Loading>                
            </View>   
        )
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            ScreenInit.checkLogin(this);
            this.setState({loadingVisible: true});
        });
    }
    _init = () => {
        this.state.loading = true;
        let _name = '',
            _mobile = '';
        if(this.state.text !== '') {
            if(/^\d{11}$/g.test(this.state.text)) {
                _mobile = this.state.text;
            } else {
                _name = this.state.text;
            }
        }
        fetch(`${Config.JAVAAPI}shop/wap/client/order/shopCustomer?token=${token}&pageIndex=${this.state.page}&name=${_name}&mobile=${_mobile}`, {
            method: 'POST'
        })
        .then((response) => response.json())
        .then(r => {
            this.setState({loadingVisible: false});
            this.state.loading = false;
            if(r.code === 1) {
                if(r.obj.pageIndex >= r.obj.totalPage) {
                    this.state.loadEnd = true;
                }
                this.setState({list: [...this.state.list, ...r.obj.results]});
            }
        });
    }
    _renderItem = (item) => {
        return (
            <View style={[styles.common.flexDirectionRow, styles.customer.dd]}>
                <View style={styles.common.flex}><Text style={styles.customer.ddText} numberOfLines={1}>{item.item.name}</Text></View>
                <TouchableOpacity activeOpacity={1} style={styles.common.flex} onPress={() => this._fnTel(item.item.mobile)}><Text style={styles.customer.ddText} numberOfLines={1}>{item.item.mobile}</Text></TouchableOpacity>
                <View style={styles.common.flex}><Text style={styles.customer.ddText} numberOfLines={1}>{item.item.orderCount}</Text></View>
            </View>
        )
    }
    _loadMore = () => {
        if(this.state.loading || this.state.loadEnd) return;
        this.state.page ++;
        this._init();
    }
    _search = () => {
        this.setState({
            page: 0,
            list: [],
            loadEnd: false,
            loadingVisible: false
        });
        this._init();
    }
    _fnTel = (numbers) => {
        Alert.alert(
        '提示',
        `是否拨打${numbers}`,
        [
            {text: '取消'},
            {text: '确定', onPress: () => Linking.openURL(`tel:${numbers}`)},
        ],
        { cancelable: false }
        );
    }
}