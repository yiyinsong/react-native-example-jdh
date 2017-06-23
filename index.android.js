/**
 * Sample React Native App
 * author: @yiyinsong
 */

 import React, { Component } from 'react';
 import { AppRegistry, Image, StyleSheet, TouchableOpacity } from 'react-native';
 import { StackNavigator } from 'react-navigation';
 //安卓实现左右切换
 // import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

 //初始化项目
 import Init from './app/config/init';

 import Route from './app/config/route';

 const styles = StyleSheet.create({
   iconBackArrow: {
     width: 18,
     height: 18,
     marginLeft: 10,
     resizeMode: 'contain'
   },
   headerBtnRight: {
     width: 18,
     height: 18,
     marginRight: 10
   }
 });

 const ReactNativeJdh = StackNavigator(Route, {
   navigationOptions: ({ navigation, screenProps }) => ({
     headerStyle: {
       backgroundColor: '#fff',
       height: 65,
       elevation: 0,
       shadowOpacity: 0,
       borderBottomColor: '#ddd',
       borderBottomWidth: 1,
       paddingTop: 20,
     },
     headerTitleStyle : {
         color: '#333',
         fontSize: 16,
         alignSelf: 'center',
         fontWeight: '100'
     },
     headerLeft: (<TouchableOpacity onPress={ () => {navigation.goBack()} }>
               <Image style={styles.iconBackArrow} source={require('./app/images/icon-back.png')} />
           </TouchableOpacity>),
     headerRight: <TouchableOpacity style={styles.headerBtnRight}></TouchableOpacity>
   }),
  //  transitionConfig: () => ({
  //     screenInterpolator:CardStackStyleInterpolator.forHorizontal,
  //  })
 });

 const prevGetStateForAction = ReactNativeJdh.router.getStateForAction;
 ReactNativeJdh.router.getStateForAction = (action, state) => {
     if(state && action.type === 'ReplaceRoute') {
       const routes = state.routes.slice(0, state.routes.length - 1);
       routes.push(action);
       return {
         ...state,
         routes,
         index: routes.length - 1
       }
     }
     return prevGetStateForAction(action, state);
 }

 // 关闭屏幕黄色警告提示
 console.disableYellowBox = true;

 AppRegistry.registerComponent('ReactNativeJdh', () => ReactNativeJdh);
