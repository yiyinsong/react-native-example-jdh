import React,{Component} from 'react';

import {
  View,
  ScrollView,
  Image,
  InteractionManager
} from 'react-native';

import Config from '../../../config/config';
import styles from '../../../css/styles';
import Utils from '../../../js/utils';
import Loading from '../../common/ui-loading';

export default class NewsMoreScreen extends Component {
    constructor(props){
    	super(props);
      let _query = this.props.navigation.state.params;
    	this.state = {
        src: _query.src,
        bodyShow: false,
        width: 0,
        height: 0,
        mt: 0
      };
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        this.setState({
          loadingVisible: true,
          bodyShow: true
        });
      });
    }
    render() {
        return (
            <View style={[styles.common.flex, styles.news.moreContainer]}>
              <ScrollView>
              {this.state.bodyShow ?
                <Image source={{uri: this.state.src}} style={[styles.news.img, {width: this.state.width,height: this.state.height, marginTop: this.state.mt}]} onLoadEnd={this._complete}/>
              : null}
              </ScrollView>
              <Loading visible={this.state.loadingVisible}></Loading>
            </View>
        );
    }
    _complete = () => {
      Image.getSize(this.state.src, (width, height) => {
        let _scale = width/height;
        let _mt = (Utils.height - Utils.width * .8 * _scale - 65)/2;
        if(_mt < 0) _mt = 0;
        this.setState({
          width: Utils.width * .8,
          height: Utils.width * .8 * _scale,
          mt: _mt,
          loadingVisible: false
        });
      });
    }
}
