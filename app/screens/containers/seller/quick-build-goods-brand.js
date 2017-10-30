/**
 * Component: 添加商品选择品牌
 * author: yiyinSong
 * date: 2017-10-25
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  InteractionManager,
  DeviceEventEmitter,
  Modal,
  TextInput,
  Picker,
  Image
  } from 'react-native';
import ImagePicker from 'react-native-image-picker';
  
import Config from '../../../config/config';
import Loading from '../../common/ui-loading';
import UIToast from '../../common/ui-toast';
import styles from '../../../css/styles';
import ScreenInit from '../../../config/screenInit';
import Utils from '../../../js/utils';

let imagePickerOptions = {
  title: '请选择品牌图片',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '相册',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};



  export default class QuickBuildGoodsBrandScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        loadingVisible: false,
        list: [],
        index: -1,
        bid: this.props.navigation.state.params.bid,
        modalVisible: false,
        modalName: '',
        letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        modalLetter: '',
        modalImg: ''
      };
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        ScreenInit.checkLogin(this);
        this.setState({loadingVisible: true});
        this._init();
      });
    }
    render() {
      return(
        <View style={[styles.common.flexv, styles.common.initWhite]}>
          <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.list.map((v, k) => {
            return (
              <TouchableHighlight underlayColor="#f5f5f5" onPress={() => {this._select(v, k)}}>
                <Text style={[styles.addGoodsBrand.item, this.state.index === k ? styles.addGoodsBrand.itemActive : null]} numberOfLines={1}>{v.brand_name}</Text>
              </TouchableHighlight>
            )
          })}
          </ScrollView>
          <TouchableOpacity activeOpacity={.8} onPress={this._add}>
            <Text style={styles.addGoodsBrand.btn}>新建品牌</Text>
          </TouchableOpacity>
          <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this._closeModal}
          >
            <View style={styles.addGoodsBrand.modal}>
              <View style={styles.addGoodsBrand.modalContainer}>
                <View style={[styles.common.flexDirectionRow, styles.addGoodsBrand.modalHeader]}>
                  <Text style={[styles.common.flex, styles.addGoodsBrand.modalTitle]}>新建品牌</Text>
                  <TouchableOpacity activeOpacity={1} onPress={this._closeModal}>
                    <View style={styles.common.close}>
                      <View style={styles.common.closeLine1}></View>
                      <View style={styles.common.closeLine2}></View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.addGoodsBrand.modalContent}>
                  <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.addGoodsBrand.modalItem]}>
                    <Text style={styles.addGoodsBrand.modalLabel}>品牌名称：</Text>
                    <TextInput
                    onChangeText={(text) => this.setState({modalName: text})}
                    value={this.state.modalName}
                    underlineColorAndroid="transparent"
                    style={[styles.common.flex, styles.addGoodsBrand.modalInput]}
                    />
                  </View>
                  <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.addGoodsBrand.modalItem]}>
                    <Text style={styles.addGoodsBrand.modalLabel}>品牌字母：</Text>
                    <Text style={styles.common.flex}>{this.state.modalLetter}</Text>
                    <Image source={require('../../../images/icon-select.png')} style={[styles.deliver.selectIcon]}/>
                    <Picker
                    selectedValue={this.state.modalLetter}
                    onValueChange={(item) => this._picker(item)}
                    style={[styles.common.flex, styles.deliver.input, styles.deliver.select]}>
                      <Picker.Item label="请选择" value="" />
                      {this.state.letter.map((v, k) => {
                        return(
                            <Picker.Item label={v} value={v}/>
                        )
                      })}
                    </Picker>
                  </View>
                  <View style={[styles.common.flexDirectionRow, styles.addGoodsBrand.modalItem, styles.sexamine.borderNone]}>
                    <Text style={styles.addGoodsBrand.modalLabel}>品牌图片：</Text>
                    <View style={styles.common.flexv}>
                      <TouchableOpacity activeOpacity={1} onPress={this._selectImg}>
                        {this.state.modalImg == '' ?
                        <Text style={styles.addGoodsBrand.uploadBtn}>上传图片</Text>
                        : <Image source={{uri: Config.IMGURL + this.state.modalImg}} resizeMode="stretch" style={styles.addGoodsBrand.uploadImg} />
                        }
                      </TouchableOpacity>
                      <Text style={styles.addGoodsBrand.tips}>
                        图片尽量按照上面虚线的尺寸比例上传(例如：宽290px高120px，白底)
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity activeOpacity={.8} onPress={this._addSubmit}>
                      <Text style={styles.addGoodsBrand.submit}>完成</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Loading visible={this.state.loadingVisible}></Loading>           
        </View>
      );
    }
    _init = () => {
      fetch(`${Config.PHPAPI}api/mapp/easy-shelf/brand?token=${token}`, {
        method: 'post'
      })
      .then(response => response.json())
      .then(r => {
        this.setState({loadingVisible: false});
        if(r.error_code == 0) {
          r.data.forEach((v, k) => {
            if(v.brand_id === this.state.bid) {
              this.state.index = k;
            }
          });
          this.setState({list: r.data});
        } else {
          UIToast('获取分类失败');
        }
      });
    }
    _select = (v, k) => {
      this.setState({index: k});
      DeviceEventEmitter.emit('addGoodsSelectBrand', {
        bid: v.brand_id,
        brandname: v.brand_name
      });
      requestAnimationFrame(() => {
        this.props.navigation.goBack();
      });
    }
    _closeModal = () => {
      this.setState({modalVisible: false});
    }
    _picker = (v) => {
        this.setState({
          modalLetter: v
        });
    }
    _addSubmit = () => {
      if(this.state.modalName === '') {
        UIToast('请填写品牌名称');
        return;
      }else if(!/[\w\u4e00-\u9fa5]/.test(this.state.modalName)) {
        UIToast('品牌名称只能由中文、英文、数字组成');
        return;
      }else if(this.state.modalName.length > 60) {
        UIToast('品牌名称最多只能由60个字符组成');
        return;
      }

      if(this.state.modalLetter === '') {
        UIToast('请选择品牌字母');
        return;
      }
      if(this.state.modalImg === '') {
        UIToast('请上传品牌图片');
        return;
      }
      fetch(`${Config.PHPAPI}api/mapp/easy-shelf/add-brand`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `token=${token}&brandName=${this.state.modalName}&brandLetter=${this.state.modalLetter}&brandImg=${this.state.modalImg}`
      })
      .then(response => response.json())
      .then(r => {
        if(r.error_code === 0) {
          let _temp = this.state.list;
          _temp.push(r.data);
          this.setState({
            list: _temp,
            modalName: '',
            modalLetter: '',
            modalImg: '',
            modalVisible: false
          });
        } else {
          UIToast(r.msg);
        }
      })
    }
    _add = () => {
      this.setState({'modalVisible': true});
    }
    _selectImg = () => {
      ImagePicker.showImagePicker(imagePickerOptions, (response) => { 
        if (response.didCancel) {
        }
        else if (response.error) {
        }
        else {
          // UIToast('图片上传中...', 9999);
          Utils.uploadImgFn(response.uri, (r) => {
            this.setState({modalImg: r['200x0']});
          }, (err) => {
          });
        }
      });
    }
  }
