import React, {Component} from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';

import styles from '../../css/styles';
import Utils from '../../js/utils';

export default class UiLoading extends Component {
  constructor(props){
  	super(props);
  }
  render() {
    return (
      <View style={[styles.loading.spinner, {left: Utils.width/2 - 14, top: Utils.height/2 - 14}]}>
        {this.props.visible ?
          <View style={styles.loading.content}>
          <Spinner color={'#000'} isVisible={this.props.visible} size={16} type={'Circle'} color={'#fff'}/>
          </View>
        : null}
      </View>
    )
  }
}
