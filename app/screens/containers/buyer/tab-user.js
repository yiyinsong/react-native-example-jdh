import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity
  } from 'react-native';

  export default class ShoppingScreen extends Component {
    constructor(props){
    	super(props);
    	this.state = {};
    }
    render() {
      return(
        <View>
          <Text>列表</Text>
          <Text>列表</Text>
          <Text>列表</Text>
          <Text>列表</Text>
          <Text>列表</Text>
          <Text>列表</Text>
          <TouchableOpacity activeOpacity={.8} onPress={() => this.props.navigation.navigate('UserSeller')}>
            <Text>卖家中心</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
