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
        return (
            <TouchableHighlight underlayColor="#fafafa" style={[styles.attentionItem.container]}>
              <View></View>
            </TouchableHighlight>
        );
    }
}
