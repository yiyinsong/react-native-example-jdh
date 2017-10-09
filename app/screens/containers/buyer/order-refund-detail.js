import React,{Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  InteractionManager,
  DeviceEventEmitter
} from 'react-native';

import styles from '../../../css/styles';
import Loading from '../../common/ui-loading';
import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';
import Utils from '../../../js/utils';

import ViewRefundGoods from '../../components/seller/view-refund-goods';
import ViewSwiper from '../../components/seller/view-swiper';

export default class OrderRefundDetailScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
      headerTitle: navigation.state.params.title,
    });
    constructor(props){
    	super(props);
      let _query = this.props.navigation.state.params;
    	this.state = {
        id: _query && _query.id,
        data: {
          order: {
            orderSn: ''
          },
          refund: {},
          refundGoods: []
        },
        imgs: [],
        bodyShow: false,
        goodsTotalQty: 0,
        goodsTotalPrice: 0,
        loadingVisible: false,
      };
    }
    componentWillMount() {
      InteractionManager.runAfterInteractions(() => {
        this.setState({loadingVisible: true});
        ScreenInit.checkLogin(this);
        this._init();
      });
    }
    render() {
       let data = this.state.data;
        return (
            <View style={[styles.common.flexv, styles.common.initWhite]}>
              {
                this.state.bodyShow ?
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.refundDetail.dl}>
                      <Text style={styles.refundDetail.dt}>订单{data.order.orderSn + (data.refund.type ? (data.refund.type == 1 ? '退款' : '退货退款') : '')}详情</Text>
                      <View style={[styles.common.flexDirectionRow, styles.refundDetail.dd]}>
                        <Text style={styles.refundDetail.text1}>售后类型：</Text>
                        {data.refund.type ?
                        <Text style={[styles.common.flex, styles.refundDetail.text2]}>{data.refund.type == 1 ? '我要退款' : '我要退货退款'}</Text> : null}
                      </View>
                      <View style={[styles.common.flexDirectionRow, styles.refundDetail.dd]}>
                        <Text style={styles.refundDetail.text1}>售后原因：</Text>
                        <Text style={[styles.common.flex, styles.refundDetail.text2]}>{data.refund.refundReasonName}</Text>
                      </View>
                      <View style={[styles.common.flexDirectionRow, styles.refundDetail.dd]}>
                        <Text style={styles.refundDetail.text1}>退款金额：</Text>
                        <Text style={[styles.common.flex, styles.refundDetail.text2]}>{data.refund.refundAmount}</Text>
                      </View>
                      {data.refund.type && data.refund.type !== 1 ?
                      <View style={[styles.common.flexDirectionRow, styles.refundDetail.dd]}>
                        <Text style={styles.refundDetail.text1}>退款商品数：</Text>
                        <Text style={[styles.common.flex, styles.refundDetail.text2]}>{this.state.goodsTotalQty}</Text>
                        <TouchableOpacity activeOpacity={.8} onPress={this._viewRefundGoods}>
                          <View style={[styles.common.flexDirectionRow, styles.common.flexCenterv]}>
                            <Text style={styles.refundDetail.viewGoodsBtnText}>查看申请商品</Text>
                            <Image source={require('../../../images/icon-arb.png')} style={styles.refundDetail.viewGoodsBtnImg}/>
                          </View>
                        </TouchableOpacity>
                      </View>
                      : null}
                      <View style={[styles.common.flexDirectionRow, styles.refundDetail.dd]}>
                        <Text style={styles.refundDetail.text1}>退款说明：</Text>
                        <Text style={[styles.common.flex, styles.refundDetail.text2]}>{data.refund.refundNote}</Text>
                      </View>
                      {data.uimg1 || data.uimg2 || data.uimg3 || data.uimg4 || data.uimg5 ?
                      <View style={[styles.common.flexDirectionRow, styles.refundDetail.dd]}>
                        <Text style={styles.refundDetail.text1}>已上传照片：</Text>
                        <View style={[styles.common.flex, styles.refundDetail.imgGroup]}>
                          <TouchableOpacity activeOpacity={.8} onPress={() => this._viewBigImgs(0)}>
                            <Image source={{uri: data.uimg1}} style={styles.refundDetail.img}/>
                          </TouchableOpacity>
                          <TouchableOpacity activeOpacity={.8} onPress={() => this._viewBigImgs(1)}>
                            <Image source={{uri: data.uimg2}} style={styles.refundDetail.img}/>
                          </TouchableOpacity>
                          <TouchableOpacity activeOpacity={.8} onPress={() => this._viewBigImgs(2)}>
                            <Image source={{uri: data.uimg3}} style={styles.refundDetail.img}/>
                          </TouchableOpacity>
                          <TouchableOpacity activeOpacity={.8} onPress={() => this._viewBigImgs(3)}>
                            <Image source={{uri: data.uimg4}} style={styles.refundDetail.img}/>
                          </TouchableOpacity>
                          <TouchableOpacity activeOpacity={.8} onPress={() => this._viewBigImgs(4)}>
                            <Image source={{uri: data.uimg5}} style={styles.refundDetail.img}/>
                          </TouchableOpacity>
                        </View>
                      </View>
                      : null}
                    </View>
                    <View style={styles.refundDetail.dl}>
                      <Text style={styles.refundDetail.dt}>退款进度</Text>
                      <View style={[styles.refundDetail.dd]}>
                        {data.traces.map((v, k) => {
                          return (
                            <View style={[styles.common.flexDirectionRow, styles.refundDetail.progress]}>
                            <View style={styles.common.flexCenterv}>
                              <View style={[styles.refundDetail.circle, k === 0 ? styles.refundDetail.circleActive: '']}></View>
                              <View style={[styles.refundDetail.line]}></View>
                            </View>
                            <Text style={[styles.refundDetail.time, k === 0 ? styles.refundDetail.timeActive : '']}>{v.ctime}</Text>
                            <View style={styles.common.flex}>
                              <Text style={[styles.refundDetail.detail, k === 0 ? styles.refundDetail.detailActive : '']}>{v.content}</Text>
                            </View>
                          </View>
                        )
                        })}
                      </View>
                    </View>
                  </ScrollView>
                : null}
              <View style={styles.common.flexDirectionRow}>
                {data.refund.status == 10 ?
                <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.common.flexCenterh, styles.btn.primarySolid]}>
                  <Text style={styles.btn.text}>修改</Text>
                </TouchableOpacity>
                : null}
                {(data.refund.status == 10 || data.refund.status == 20 || data.refund.status == 30 || data.refund.status == 60) ?
                <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.common.flexCenterh, styles.btn.orangeSolid]}>
                  <Text style={styles.btn.text}>撤销</Text>
                </TouchableOpacity>
                : null}
                {data.refund.status == 30 ?
                <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.common.flexCenterh, styles.btn.primarySolid]}>
                  <Text style={styles.btn.text}>查看物流</Text>
                </TouchableOpacity>
                : null}
                {data.refund.status == 20 ?
                <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.common.flexCenterh, styles.btn.primarySolid]}>
                  <Text style={styles.btn.text}>填写物流</Text>
                </TouchableOpacity>
                : null}
                {data.refund.orderType == 20 && data.refund.status == 50 ?
                <TouchableOpacity activeOpacity={.8} style={[styles.common.flex, styles.common.flexCenterh, styles.btn.primarySolid]}>
                  <Text style={styles.btn.text}>申请平台介入</Text>
                </TouchableOpacity>
                : null}
              </View>
              {data.refund.type && data.refund.type !== 1 ?
                <ViewRefundGoods index={2} data={data.refundGoods} totalNum={this.state.goodsTotalQty} totalPrice={this.state.goodsTotalPrice}/>
                : null}
              <Loading visible={this.state.loadingVisible}></Loading>
              <ViewSwiper data={this.state.imgs} index={2} />
            </View>
        );
    }
    _init = () => {
      fetch(Config.JAVAAPI + `shop/mobile/refund/getInfo?id=${this.state.id}&token=${token}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then( r => {
        let _data = r;
        if(_data.refund) {
            switch(_data.refund.refundReason) {
                case 1:
                    _data.refund.refundReasonName = '退运费';
                break;
                case 2:
                    _data.refund.refundReasonName = '商品瑕疵';
                break;
                case 3:
                    _data.refund.refundReasonName = '质量问题';
                break;
                case 4:
                    _data.refund.refundReasonName = '颜色/尺寸/参数不符';
                break;
                case 5:
                    _data.refund.refundReasonName = '少件/漏发';
                break;
                case 6:
                    _data.refund.refundReasonName = '收到商品时候有划痕/破损';
                break;
                case 7:
                    _data.refund.refundReasonName = '假冒品牌';
                break;
                case 8:
                    _data.refund.refundReasonName = '发票问题';
                break;
                case 99:
                    _data.refund.refundReasonName = '其他';
                break;
                default:
                    _data.refund.refundReasonName = '';
                break;
            }
        }
        switch(_data.refund.status) {
            case -10:
                _data.refund.statusName = '退款失败';
            break;
            case 0:
                _data.refund.statusName = '退款关闭';
            break;
            case 10:
                _data.refund.statusName = '待审核';
            break;
            case 20:
                _data.refund.statusName = '待买家退货';
            break;
            case 30:
                _data.refund.statusName = '退货待退款';
            break;
            case 40:
                if(_data.refund.payStatus == 0 || _data.refund.payStatus == 2) {
                    _data.refund.statusName = '退款失败 ';
                } else if(_data.refund.payStatus == 3 || _data.refund.payStatus == 4) {
                    _data.refund.statusName = '退款成功';
                } else {
                    _data.refund.statusName = '退款中';
                }
            break;
            case 50:
                _data.refund.statusName = '卖家拒绝退款';
            break;
            case 60:
                _data.refund.statusName = '待平台介入';
            break;
            default:
                _data.refund.statusName = '';
            break;
        }
        if(_data.uimg1) this.state.imgs.push(_data.uimg1);
        if(_data.uimg2) this.state.imgs.push(_data.uimg2);
        if(_data.uimg3) this.state.imgs.push(_data.uimg3);
        if(_data.uimg4) this.state.imgs.push(_data.uimg4);
        if(_data.uimg5) this.state.imgs.push(_data.uimg5);
        let _gn = 0;
        let _gp = 0;
        if(_data.refund.type != 1 && _data.refundGoods) {
            _data.refundGoods.forEach((v, k) => {
                _gn += v.qty;
                _gp += v.refundAmount;
            });
        }
        this.props.navigation.setParams({title: _data.refund.statusName});
        this.setState({
          loadingVisible: false,
          bodyShow: true,
          data: _data,
          goodsTotalQty: _gn,
          goodsTotalPrice: _gp
        });
      });
    }
    _viewRefundGoods = () => {
      DeviceEventEmitter.emit('viewRefundGoodsShow', {index: 2});
    }
    _viewBigImgs = (i) => {
      DeviceEventEmitter.emit('viewSwiperShow', {index: 2, number: i});
    }
}
