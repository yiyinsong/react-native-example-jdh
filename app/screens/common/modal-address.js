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
          visible: false,
          result: [],
          list: [],
          index: [-1, -1, -1, -1, -1],
          tindex: 0,
          level: this.props.level || 5,
          keys: this.props.keys || 0,
          backup_index: [-1, -1, -1, -1, -1],
          backup_tindex: 0,
          backup_result: [],
          backup_list: [],
          init: true
        };
    }
    _close=()=>{
      this.setState({ visible: false });
    }
    _initAddress = () => {

    }
    componentDidMount(){
      /**绑定显示事件侦听**/
      this.listener_show = DeviceEventEmitter.addListener('addressShow', (initData) => {
        if(initData.keys != this.state.keys) return;
        /**如果是第一次打开，并且有数据，初始化数据**/
        if(this.state.init) {
          this.setState({visible: true});
          if(initData.init) {
            this.getAddr({
              type: 1,
              callback: (data) => {
                 if(data.error_code == 0) {
                   let _finalResult = [];
                   let _finalIndex = [];
                   let _finalList = [data.data];

                   const updateState = (i) => {
                     this.setState({
                       result: _finalResult,
                       index: _finalIndex,
                       list: _finalList,
                       tindex: i,
                       init: false,
                       backup_index: _finalIndex,
                       backup_tindex: i,
                       backup_result: _finalResult,
                       backup_list: _finalList
                     });
                     this.refs.scrollView.scrollTo(0, Utils.width * i, false);
                   }
                   data.data.forEach((v, k) => {
                     if(v.region_id == initData.init.province_id) {
                       _finalResult.push(v);
                       _finalIndex.push(k);
                       updateState(0);

                       this.getAddr({
                         type: 2,
                         region_id: v.region_id,
                         callback: (data2) => {
                            if(data2.error_code == 0) {
                              _finalList.push(data2.data);
                              data2.data.forEach((v2, k2) => {
                                if(v2.region_id == initData.init.city_id) {
                                  _finalResult.push(v2);
                                  _finalIndex.push(k2);
                                  updateState(1);

                                  this.getAddr({
                                    type: 3,
                                    region_id: v2.region_id,
                                    callback: (data3) => {
                                       if(data3.error_code == 0) {
                                         _finalList.push(data3.data);
                                         data3.data.forEach((v3, k3) => {
                                           if(v3.region_id == initData.init.county_id) {
                                             _finalResult.push(v3);
                                             _finalIndex.push(k3);
                                             updateState(2);

                                             if(this.state.level > 3) {
                                               this.getAddr({
                                                 type: 4,
                                                 region_id: v3.region_id,
                                                 callback: (data4) => {
                                                    if(data4.error_code == 0) {
                                                      _finalList.push(data4.data);
                                                      data4.data.forEach((v4, k4) => {
                                                        if(v4.region_id == initData.init.town_id) {
                                                          _finalResult.push(v4);
                                                          _finalIndex.push(k4);
                                                          updateState(3);

                                                          this.getAddr({
                                                            type: 5,
                                                            region_id: v4.region_id,
                                                            callback: (data5) => {
                                                               if(data5.error_code == 0) {
                                                                 _finalList.push(data5.data);
                                                                 data5.data.forEach((v5, k5) => {
                                                                   if(v5.region_id == initData.init.village_id) {
                                                                     _finalResult.push(v5);
                                                                     _finalIndex.push(k5);
                                                                     updateState(4);

                                                                   }
                                                                 });
                                                               }
                                                            }
                                                          });
                                                        }
                                                      });
                                                    }
                                                 }
                                               });
                                             } else {
                                               updateState(2);
                                             }
                                           }
                                         });
                                       }
                                    }
                                  });
                                }
                              });
                            }
                         }
                       });
                     }
                   });
                 }
              }
            });
          } else {
            this.setState({init: false});
          }
        } else {
          /**还原默认选择**/
          let _tempIndex = [...this.state.backup_index];
          this.setState({
            index: _tempIndex,
            tindex: this.state.backup_tindex,
            visible: true,
            result: [...this.state.backup_result],
            list: this.state.backup_list.length > 0 ? [...this.state.backup_list] : [...this.state.list]
          });
        }
      });
      /**获取国内各省**/
      this.getAddr({
        type: 1,
        callback: (data) => {
           if(data.error_code == 0) {
             if(this.state.list.length == 0) {
               this.setState({
                 list: [
                   data.data
                 ]
               });
             }
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
              <TouchableOpacity activeOpacity={.8} style={styles.modal.address.tabItem} onPress={() => {this._tab(0)}}>
                <Text style={[styles.modal.address.tabItemText, {maxWidth: (Utils.width-50)/5, borderBottomColor: this.state.tindex == 0 ? '#f64848' : '#fff'}]} numberOfLines={1}>{this.state.result[0] && this.state.result[0].provice_name || '请选择'}</Text>
              </TouchableOpacity>
              {this.state.tindex > 0 ?
              <TouchableOpacity activeOpacity={.8} style={styles.modal.address.tabItem} onPress={() => {this._tab(1)}}>
                <Text style={[styles.modal.address.tabItemText, {maxWidth: (Utils.width-50)/5, borderBottomColor: this.state.tindex == 1 ? '#f64848' : '#fff'}]} numberOfLines={1}>{this.state.result[1] && this.state.result[1].city_name || '请选择'}</Text>
              </TouchableOpacity>
              : null}
              {this.state.tindex > 1 ?
              <TouchableOpacity activeOpacity={.8} style={styles.modal.address.tabItem} onPress={() => {this._tab(2)}}>
                <Text style={[styles.modal.address.tabItemText, {maxWidth: (Utils.width-50)/5, borderBottomColor: this.state.tindex == 2 ? '#f64848' : '#fff'}]} numberOfLines={1}>{this.state.result[2] && this.state.result[2].county_name || '请选择'}</Text>
              </TouchableOpacity>
              : null}
              {this.state.tindex > 2 ?
              <TouchableOpacity activeOpacity={.8} style={styles.modal.address.tabItem} onPress={() => {this._tab(3)}}>
                <Text style={[styles.modal.address.tabItemText, {maxWidth: (Utils.width-50)/5, borderBottomColor: this.state.tindex == 3 ? '#f64848' : '#fff'}]} numberOfLines={1}>{this.state.result[3] && this.state.result[3].town_name || '请选择'}</Text>
              </TouchableOpacity>
              : null}
              {this.state.tindex > 3 ?
              <TouchableOpacity activeOpacity={.8} style={styles.modal.address.tabItem} onPress={() => {this._tab(4)}}>
                <Text style={[styles.modal.address.tabItemText, {maxWidth: (Utils.width-50)/5, borderBottomColor: this.state.tindex == 4 ? '#f64848' : '#fff'}]} numberOfLines={1}>{this.state.result[4] && this.state.result[4].village_name || '请选择'}</Text>
              </TouchableOpacity>
              : null}
            </View>
            <ScrollView horizontal={true} scrollEnabled={false} ref="scrollView" showsHorizontalScrollIndicator={false}>
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
                animationType='fade'
                onRequestClose={() => this._close()}
                visible={this.state.visible}
                transparent={true}
                onShow={this._modalShow}
                 >
                <TouchableOpacity style={{flex:1}} activeOpacity={1}>
                <View style={[styles.modal.container, styles.common.flexEndh]}>
                    {this._renderContent()}
                </View>
                </TouchableOpacity>
            </Modal>
        )
    }
    _modalShow = () => {
      /**重置滚动视图，滚动到特定的序列**/
      this.refs.scrollView.scrollTo(0, Utils.width * this.state.tindex, false);
    }
    _tab = (type) => {
      if(this.state.tindex == type) return;
      let _tempResult = this.state.result;
      _tempResult.splice(type);
      let _tempIndex = this.state.index;
      for(let i=_tempIndex.length-1; i>=type; i--) {
        _tempIndex[i] = -1;
      }
      this.setState({
        tindex: type,
        index: _tempIndex,
        result: _tempResult
      });
      this.refs.scrollView.scrollTo(0, Utils.width * (type), true);
    }
    _selectItem = (type, k, v) => {
        let _tempIndex = this.state.index;
        _tempIndex[type] = k;
        let _tempResult = this.state.result;
        _tempResult[type] = v;
        let _tempType = type + 1;
        this.setState({
          tindex: (_tempType >= this.state.level ? type : _tempType),
          index: _tempIndex,
          result: _tempResult,
        });
        if(type == this.state.level - 1) {
            DeviceEventEmitter.emit('addressSelect', {
              keys: this.state.keys,
              province: (this.state.result[0] && this.state.result[0].provice_name) || '',
              province_id: (this.state.result[0] && this.state.result[0].region_id) || '',
              city: (this.state.result[1] && this.state.result[1].city_name) || '',
              city_id: (this.state.result[1] && this.state.result[1].region_id) || '',
              county: (this.state.result[2] && this.state.result[2].county_name) || '',
              county_id: (this.state.result[2] && this.state.result[2].region_id) || '',
              town: (this.state.result[3] && this.state.result[3].town_name) || '',
              town_id: (this.state.result[3] && this.state.result[3].region_id) || '',
              village: (this.state.result[4] && this.state.result[4].village_name) || '',
              village_id: (this.state.result[4] && this.state.result[4].region_id) || ''
            });
            requestAnimationFrame(() => {
              /**备份上次选择结果**/
              this.setState({
                visible: false,
                backup_index: [...this.state.index],
                backup_tindex: this.state.tindex,
                backup_result: [...this.state.result]
              });
            });
        } else {
            this.getAddr({
              type: type + 2,
              region_id: v.region_id,
              callback: (data) => {
                if(data.error_code == 0) {
                  let _tempList = this.state.list;
                  _tempList[type+1] = data.data;
                  this.setState({
                    list: _tempList
                  });
                  this.refs.scrollView.scrollTo(0, Utils.width * (type+1), true);
                }
              }
            });
        }
    }
    componentWillUnmount() {
      this.listener_show.remove();
    }
}
