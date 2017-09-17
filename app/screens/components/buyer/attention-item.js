import React,{Component} from 'react';

import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';

import styles from '../../../css/styles';

export default class AttentionItem extends Component {
    constructor(props){
    	super(props);
    	this.state = {};
    }
    render() {
        let data = this.props.data;
        let type = this.props.type;
        return (
            <TouchableHighlight underlayColor="#fafafa" style={[styles.attentionItem.container]}>
              <View style={[styles.common.flexDirectionRow, styles.attentionItem.item]}>
                  <Image source={{uri: data.goods_img1}} style={styles.attentionItem.img}>
                    {data.on_sale == 0 ? <Text style={[styles.common.flex, styles.attentionItem.underSale]}>已下架</Text> : null}
                  </Image>
                  <View style={[styles.common.flexv, styles.attentionItem.info]}>
                    <Text style={styles.attentionItem.goodsName} numberOfLines={2}>{data.goods_name}</Text>
                    <View style={styles.common.flexDirectionRow}>
                        <View style={styles.common.flex}>
                            {data.source == 1 ? <Text style={[styles.attentionItem.type, styles.attentionItem.type1]}>自营</Text>: null}
                            {data.source == 2 ? <Text style={[styles.attentionItem.type, styles.attentionItem.type2]}>入驻商</Text>: null}
                            {data.source == 3 ? <Text style={[styles.attentionItem.type, styles.attentionItem.type3]}>会员店</Text>: null}
                            {data.active_val ? <Text style={[styles.attentionItem.type, styles.attentionItem.type4]}>{data.active_val}</Text>: null}
                        </View>
                        <View>
                            {this._renderPrice(data, type)}
                        </View>
                    </View>
                  </View>
              </View>
            </TouchableHighlight>
        );
    }
    _renderPrice = (data, type) => {
        if(data.sale_model == 1) {
            return <Text style={styles.attentionItem.price}>平台价：<Text style={styles.attentionItem.priceRed}>￥{data.pf_price}</Text></Text>;
        } else if(data.sale_model == 2) {
            return (
                <View>
                    <Text style={styles.attentionItem.price}>即采价：<Text style={styles.attentionItem.priceRed}>￥{data.jc_price}</Text></Text>
                    <Text style={styles.attentionItem.price}>优惠：<Text style={styles.attentionItem.priceRed}>￥{data.jc_profit}</Text></Text>
                </View>
            )
        } else if(data.sale_model == 3) {
            if(type == 1) {
                return <Text style={styles.attentionItem.price}>平台价：<Text style={styles.attentionItem.priceRed}>￥{data.pf_price}</Text></Text>;
            } else if(type == 2) {
                return (
                    <View>
                        <Text style={styles.attentionItem.price}>即采价：<Text style={styles.attentionItem.priceRed}>￥{data.jc_price}</Text></Text>
                        <Text style={styles.attentionItem.price}>优惠：<Text style={styles.attentionItem.priceRed}>￥{data.jc_profit}</Text></Text>
                    </View>
                )
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
