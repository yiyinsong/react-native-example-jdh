import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    Modal,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';

import Config from '../../config/config';
import styles from '../../css/styles';
import Utils from '../../js/utils';

export default class ModalAddress extends Component{
    constructor(props){
        super(props)
        this.state = {
          visible: true,
          result: [],
          list: [],
          index: [-1, -1, -1, -1, -1],
          level: this.props.level || 5
        };
    }
    _close=()=>{
      this.setState({ visible: false });
    }
    componentWillReceiveProps(props) {
        this.setState({ visible: props.visible });
    }
    componentDidMount(){
      /**获取国内各省**/
      this.getAddr({
        type: 1,
        callback: (data) => {
           if(data.error_code == 0) {
             this.setState({
               list: [
                 data.data
               ]
             });
           }
        }
      });

    }
    getAddr = (arg) => {
      fetch(Config.PHPAPI + 'api/common/region/area-data?type='+(arg.type || '')+'&region_id='+(arg.region_id || ''), {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((data) => {
        arg.callback && arg.callback.call(null, data);
      });
    }
    _renderContent=()=>{
        return (
          <View style={[styles.modal.address.content, {width: Utils.width, height: Utils.height * .5}]}>
            <View style={[styles.modal.address.title]}>
              <Text style={[styles.modal.address.titleText]}>所在地区</Text>
              <TouchableOpacity activeOpacity={.8} onPress={this._close} style={styles.modal.address.closec}>
                <Image source={require('../../images/icon-close.png')} style={styles.modal.address.close} />
              </TouchableOpacity>
            </View>
            <View style={[styles.common.flexDirectionRow, styles.modal.address.tab]}>
              <TouchableOpacity activeOpacity={.8} style={styles.modal.address.tabItem}>
                <Text style={[styles.modal.address.tabItemText, {maxWidth: Utils.width/5, borderBottomColor: '#f64848'}]} numberOfLines={1}>{this.state.result[0] && this.state.result[0].provice_name || '请选择'}</Text>
              </TouchableOpacity>
              {this.state.result.length > 1 ?
              <TouchableOpacity activeOpacity={.8} style={styles.modal.address.tabItem}>
                <Text style={styles.modal.address.tabItemText} numberOfLines={1}>{this.state.result[1] && this.state.result[1].city_name || '请选择'}</Text>
              </TouchableOpacity>
              : null}
              {this.state.result.length > 2 ?
              <TouchableOpacity activeOpacity={.8} style={styles.modal.address.tabItem}>
                <Text style={styles.modal.address.tabItemText} numberOfLines={1}>{this.state.result[2] && this.state.result[2].county_name || '请选择'}</Text>
              </TouchableOpacity>
              : null}
              {this.state.result.length > 3 ?
              <TouchableOpacity activeOpacity={.8} style={styles.modal.address.tabItem}>
                <Text style={styles.modal.address.tabItemText} numberOfLines={1}>{this.state.result[3] && this.state.result[3].town_name || '请选择'}</Text>
              </TouchableOpacity>
              : null}
              {this.state.result.length > 4 ?
              <TouchableOpacity activeOpacity={.8} style={styles.modal.address.tabItem}>
                <Text style={styles.modal.address.tabItemText} numberOfLines={1}>{this.state.result[4] && this.state.result[4].village_name || '请选择'}</Text>
              </TouchableOpacity>
              : null}
            </View>
            <ScrollView horizontal={true} scrollEnabled={false} ref="scrollView">
              <ScrollView style={[styles.modal.address.sv,{width: Utils.width}]}>
                <View style={styles.modal.address.svc}>
                  {this.state.list[0] && this.state.list[0].map((v, k) => {
                    return (
                      <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.modal.address.item]} onPress={() => {this._selectItem(0, k, v)}}>
                        <Text style={styles.modal.address.itemText}>{v.provice_name}</Text>
                        {
                          this.state.index[0] == k ?
                          <Image source={require('../../images/red-tick.png')} style={styles.modal.address.itemImg}/>
                          : null
                        }
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </ScrollView>
              <ScrollView style={[styles.modal.address.sv,{width: Utils.width}]}>
                <View style={styles.modal.address.svc}>
                  {this.state.list[1] && this.state.list[1].map((v, k) => {
                    return (
                      <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.modal.address.item]} onPress={() => {this._selectItem(1, k, v)}}>
                        <Text style={styles.modal.address.itemText}>{v.city_name}</Text>
                        {
                          this.state.index[1] == k ?
                          <Image source={require('../../images/red-tick.png')} style={styles.modal.address.itemImg}/>
                          : null
                        }
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </ScrollView>
              <ScrollView style={[styles.modal.address.sv,{width: Utils.width}]}>
                <View style={styles.modal.address.svc}>
                  {this.state.list[2] && this.state.list[2].map((v, k) => {
                    return (
                      <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.modal.address.item]} onPress={() => {this._selectItem(2, k, v)}}>
                        <Text style={styles.modal.address.itemText}>{v.county_name}</Text>
                        {
                          this.state.index[2] == k ?
                          <Image source={require('../../images/red-tick.png')} style={styles.modal.address.itemImg}/>
                          : null
                        }
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </ScrollView>
              <ScrollView style={[styles.modal.address.sv,{width: Utils.width}]}>
                <View style={styles.modal.address.svc}>
                  {this.state.list[3] && this.state.list[3].map((v, k) => {
                    return (
                      <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.modal.address.item]} onPress={() => {this._selectItem(3, k, v)}}>
                        <Text style={styles.modal.address.itemText}>{v.town_name}</Text>
                        {
                          this.state.index[3] == k ?
                          <Image source={require('../../images/red-tick.png')} style={styles.modal.address.itemImg}/>
                          : null
                        }
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </ScrollView>
              <ScrollView style={[styles.modal.address.sv,{width: Utils.width}]}>
                <View style={styles.modal.address.svc}>
                  {this.state.list[4] && this.state.list[4].map((v, k) => {
                    return (
                      <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.modal.address.item]} onPress={() => {this._selectItem(4, k, v)}}>
                        <Text style={styles.modal.address.itemText}>{v.village_name}</Text>
                        {
                          this.state.index[4] == k ?
                          <Image source={require('../../images/red-tick.png')} style={styles.modal.address.itemImg}/>
                          : null
                        }
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </ScrollView>
            </ScrollView>
          </View>
        )
    }
    render(){
        return(
            <Modal
                animationType='slide'
                onRequestClose={() => this._close()}
                visible={this.state.visible}
                transparent={true}
                 >
                <TouchableOpacity style={{flex:1}} activeOpacity={1}>
                <View style={[styles.modal.container, styles.common.flexEndh]}>
                    {this._renderContent()}
                </View>
                </TouchableOpacity>
            </Modal>
        )
    }
    _selectItem = (type, k, v) => {
        let _tempIndex = this.state.index;
        _tempIndex[type] = k;
        let _tempResult = this.state.result;
        _tempResult[type] = v;
        this.setState({
          index: _tempIndex,
          result: _tempResult,
        });
        if(type == this.state.level - 1) {

        } else {
          this.slideTimer = setTimeout( ()=>{
            this.getAddr({
              type: 1,
              region_id: v.region_id,
              callback: (data) => {
                if(data.error_code == 0) {
                  let _tempList = this.state.list;
                  _tempList[1] = data.data;
                  this.setState({
                    list: _tempList
                  });
                  this.refs.scrollView.scrollTo(0, Utils.width * (type+1), true);
                }
              }
            });
          }, 500);
        }
    }
    componentWillUnmount() {
      this.slideTimer && clearTimeout(this.slideTimer);
    }
}
