import React,{Component} from 'react';

import {
  View,
  Image,
  InteractionManager
} from 'react-native';

import Config from '../../../config/config';
import styles from '../../../css/styles';
import Utils from '../../../js/utils';

export default class NewsMoreScreen extends Component {
    constructor(props){
    	super(props);
      let _query = this.props.navigation.state.params;
    	this.state = {
        src: _query.src,
        bodyShow: false
      };
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        this.setState({
          bodyShow: true
        });
      });
    }
    render() {
        return (
            <View style={[styles.common.flex, styles.common.flexCenterh, styles.common.flexCenterv, styles.news.moreContainer]}>
              {this.state.bodyShow ?
                <Image source={{uri: this.state.src}} style={{width: Utils.width * .7,height: Utils.width * .7, resizeMode: 'contain'}} />
              : null}
            </View>
        );
    }
}
