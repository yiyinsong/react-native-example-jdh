/**
 * Component: 添加商品
 * author: yiyinSong
 * date: 2017-10-18
 */
import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  InteractionManager,
  DeviceEventEmitter
  } from 'react-native';

import Config from '../../../config/config';
import Utils from '../../../js/utils';
import Loading from '../../common/ui-loading';
import styles from '../../../css/styles';
import UIToast from '../../common/ui-toast';
import ScreenInit from '../../../config/screenInit';


  export default class QuickBuildGoodsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
      headerLeft: <TouchableOpacity activeOpacity={.8} style={styles.addGoods.back} onPress={() => navigation.goBack()}><Text style={styles.addGoods.backText}>取消</Text></TouchableOpacity>
    });
    constructor(props){
    	super(props);
    	this.state = {
        visibleTips: true,
        loadingVisible: false,
        modelName: '',
        modelAttr: '',
        modelPrice: '',
        modelInv: '',
        categoryText1: '默认分类',
        categoryText2: '未分类',
        cid: -1,
        bid: -1,
        brandName: '未选择'
      };
    }
    render() {
      return(
        <View style={[styles.common.flexv, styles.common.init]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.visibleTips ?
            <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.addGoods.tips]}>
              <Text style={[styles.common.flex, styles.addGoods.tipsText]}>因编辑商品信息会同时更新手机端与电脑端，为方便您修改及预览商品详情，建议在PC端进行商品新建与编辑</Text>
              <TouchableOpacity activeOpacity={.8} onPress={this._closeTips}>
                <View style={styles.addGoods.close}>
                  <View style={styles.addGoods.closeLine1}></View>
                  <View style={styles.addGoods.closeLine2}></View>
                </View>
              </TouchableOpacity>
            </View>
            : null}
            <View style={[styles.addGoods.block, styles.addGoods.borderTopNone]}>
              <TextInput
              style={styles.addGoods.name}
              onChangeText={(text) => this.setState({modelName: text})}
              value={this.state.modelName}
              underlineColorAndroid="transparent"
              placeholder="请输入商品名称(50字以内)"
              multiline={true}
              maxLength={50}
            />
            <View style={[styles.common.flexDirectionRow, styles.addGoods.imgs]}>
              <View style={styles.addGoods.imgItem}>
                <TouchableOpacity  activeOpacity={.8} style={styles.addGoods.imgClose}>
                  <View>
                    <View style={styles.addGoods.imgClose1}></View>
                    <View style={styles.addGoods.imgClose2}></View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.8}>
                  <Image source={{uri: 'https://img6.bdstatic.com/img/image/smallpic/xiaoqingxbanq.jpg'}} style={styles.addGoods.thumb} resizeMode="cover">
                    <Text style={styles.addGoods.thumbText}>主图</Text>
                  </Image>
                </TouchableOpacity>
              </View>
              <TouchableOpacity activeOpacity={.8} style={[styles.common.flexCenterh, styles.common.flexCenterv, styles.addGoods.imgsBtn]}>
                  <Text style={styles.addGoods.imgsBtnIcon}>+</Text>
                  <Text style={styles.addGoods.imgsBtnText}>添加细节图</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.common.flexDirectionRow, styles.addGoods.uploadTips]}>
              <Image source={require('../../../images/goods-add-tips.png')} style={styles.addGoods.uploadTipsImg} resizeMode="contain" />
              <Text style={styles.addGoods.uploadTipsText}>拍照时请保持手机竖向，商品尽量居中屏幕内，图片比例建议为1:1</Text>
            </View>
            </View>
            <View style={styles.addGoods.block}>
              <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.addGoods.item, styles.addGoods.borderTopNone]}>
                <Text style={styles.addGoods.itemText}>商品规格：</Text>
                <TextInput
                style={[styles.common.flex, styles.addGoods.itemInput]}
                onChangeText={(text) => this.setState({modelAttr: text})}
                value={this.state.modelAttr}
                underlineColorAndroid="transparent"
              />
              </View>
              <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.addGoods.item]}>
                <Text style={styles.addGoods.itemText}>价格：</Text>
                <Text style={[styles.addGoods.itemGrayText]}>￥</Text>
                <TextInput
                style={[styles.common.flex, styles.addGoods.itemInput]}
                onChangeText={(text) => this.setState({modelPrice: text})}
                value={this.state.modelPrice}
                underlineColorAndroid="transparent"
              />
              </View>
              <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.addGoods.item]}>
                <Text style={styles.addGoods.itemText}>库存：</Text>
                <TextInput
                style={[styles.common.flex, styles.addGoods.itemInput]}
                onChangeText={(text) => this.setState({modelInv: text})}
                value={this.state.modelInv}
                underlineColorAndroid="transparent"
              />
              </View>
            </View>
            <View style={styles.addGoods.block}>
              <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.addGoods.item, styles.addGoods.borderTopNone]}>
                  <Text style={styles.addGoods.itemText}>商品图文描述：</Text>
                  <Text style={styles.addGoods.chosen}>已选择</Text>
                  <Image source={require('../../../images/icon-arb.png')} resizeMode="contain" style={styles.addGoods.arrow} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.addGoods.item]} onPress={this._toSelectCategory}>
                <Text style={styles.addGoods.itemText}>店铺分类：</Text>
                <Text style={styles.addGoods.chosen} numberOfLines={1}>{this.state.categoryText1}-{this.state.categoryText2}</Text>
                <Image source={require('../../../images/icon-arb.png')} resizeMode="contain" style={styles.addGoods.arrow} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.8} style={[styles.common.flexDirectionRow, styles.common.flexCenterv, styles.addGoods.item]} onPress={this._toSelectBrand}>
                <Text style={styles.addGoods.itemText}>选择品牌：</Text>
                <Text style={styles.addGoods.chosen}>{this.state.brandName}</Text>
                <Image source={require('../../../images/icon-arb.png')} resizeMode="contain" style={styles.addGoods.arrow} />
              </TouchableOpacity>
            </View>
            <View style={[styles.common.flexDirectionRow, styles.addGoods.agreement]}>
              <View style={styles.control.checkboxRectSmall}></View>
              <Image source={require('../../../images/icon-check-rect.png')} style={styles.control.checkedSmall} resizeMode="contain"/>
              <TouchableOpacity activeOpacity={.8}>
                <Text style={styles.addGoods.agreementText}>《商品信息发布规范》</Text>
              </TouchableOpacity>  
              <TouchableOpacity activeOpacity={.8}>
                <Text style={styles.addGoods.agreementText}>《禁发商品及信息管理规范》</Text>
              </TouchableOpacity>  
            </View>
          </ScrollView>
          <View style={[styles.common.flexDirectionRow, styles.common.flexCenterh, styles.addGoods.btn]}>
              <TouchableOpacity activeOpacity={.8} style={styles.common.flex}>
                <Text style={styles.addGoods.btnRed}>发布商品并上架</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.8} style={styles.common.flex}>
                <Text style={styles.addGoods.btnBlue}>发布商品暂不上架</Text>
              </TouchableOpacity>
          </View>
          <Loading visible={this.state.loadingVisible}></Loading>           
        </View>
      );
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        ScreenInit.checkLogin(this);
        // this.setState({loadingVisible: true});
        this._init();
      });
      this.listener_cate = DeviceEventEmitter.addListener('addGoodsSelectCategory', (r) => {
        this.setState({
          cid: r.cid,
          categoryText1: r.lv1text,
          categoryText2: r.lv2text
        });
      });
      this.listener_brand = DeviceEventEmitter.addListener('addGoodsSelectBrand', (r) => {
        this.setState({
          bid: r.bid,
          brandName: r.brandname,
        });
      });
    }
    componentWillUnmount = () => {
      this.listener_cate && this.listener_cate.remove();
      this.listener_brand && this.listener_brand.remove();
    }
    
    _init = () => {
      // fetch(`${Config.PHPAPI}api/mapp/shop/cate?token=${token}`, {
      //   method: 'post'
      // })
      // .then(response => response.json())
      // .then(r => {
      //   this.setState({loadingVisible: false});
      //   if(r.error_code == 0) {
      //     this.setState({data: r.data});
      //   } else {
      //     UIToast('获取分类失败');
      //   }
      // });
    }
    _closeTips = () => {
      this.setState({
        visibleTips: false
      });
    }
    _toSelectCategory = () => {
      this.props.navigation.navigate('SellerBuildGoodsCategory', {cid: this.state.cid});
    }
    _toSelectBrand = () => {
      this.props.navigation.navigate('SellerBuildGoodsBrand', {bid: this.state.bid});      
    }
  }
