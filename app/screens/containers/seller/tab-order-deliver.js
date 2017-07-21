import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  InteractionManager,
  Picker
} from 'react-native';

import styles from '../../../css/styles';
import UIToast from '../../common/ui-toast';
import Config from '../../../config/config';
import ScreenInit from '../../../config/screenInit';

export default class OrderSearchScreen extends Component {
  constructor(props) {
    super(props);
    let _query = this.props.navigation.state.params;
    this.state = {
      language: ''
    };
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      ScreenInit.checkLogin(this);
    });
  }
  render() {
    return (
      <View style={[styles.common.flexv, styles.common.initWhite]}>
      <Picker
      selectedValue={this.state.language}
      onValueChange={(lang) => this.setState({language: lang})}>
        <Picker.Item label="请选择" value="" />
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      </View>
    );
  }
}
