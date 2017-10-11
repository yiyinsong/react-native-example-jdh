import React, {Component} from 'react';
import { View, ActivityIndicator } from 'react-native';

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
        <ActivityIndicator
          animating={this.props.visible}
          size="small"
          color="#ffffff" />
        </View>
      : null}
      </View>
    )
  }
}
