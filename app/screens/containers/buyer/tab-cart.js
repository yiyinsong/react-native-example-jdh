import React, { Component } from 'react';
import {
  Image,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  DeviceEventEmitter
  } from 'react-native';

  import styles from '../../../css/styles';

  export default class CartScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {};
    }
    componentWillMount() {
      this.props.navigation.setParams({headerRight: '编辑'});
    }
    componentDidMount() {
      this.listener_edit = DeviceEventEmitter.addListener('cartEdit', () => {
        if(this.props.navigation.state.params.headerRight == '编辑') {
          this.props.navigation.setParams({headerRight: '完成'});
        } else {
          this.props.navigation.setParams({headerRight: '编辑'});
        }
      });
    }
    componentWillUnmount() {
      this.listener_edit && this.listener_edit.remove();
    }
    render() {
      return(
        <KeyboardAvoidingView behavior="position" contentContainerStyle={[styles.common.flexv, styles.common.initWhite]} style={[styles.common.flexv, styles.common.initWhite]}>
          <ScrollView>
          </ScrollView>
        </KeyboardAvoidingView>
      );
    }
  }
