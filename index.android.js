/**
 * Sample React Native App
 * author: @yiyinsong
 */

 import React, { Component } from 'react';
 import { AppRegistry, Image, TouchableOpacity } from 'react-native';
 import { StackNavigator } from 'react-navigation';
 //安卓实现左右切换
 import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

 //初始化项目
 import Init from './app/config/init';

 import Route from './app/config/route';

 import UIToast from './app/screens/common/ui-toast';
 import styles from './app/css/styles';


 const ReactNativeJdh = StackNavigator(Route, {
   navigationOptions: ({ navigation, screenProps }) => ({
     headerStyle: styles.common.header,
     headerTitleStyle : styles.common.headerTitle,
     headerLeft: (<TouchableOpacity onPress={ () => {navigation.goBack()} }>
               <Image style={styles.common.iconBackArrow} source={require('./app/images/icon-back.png')} />
           </TouchableOpacity>),
     headerRight: <TouchableOpacity style={styles.common.headerBtnRight}></TouchableOpacity>
   }),
   transitionConfig: () => ({
     transitionSpec: {
       duration: 250
     },
    screenInterpolator: (sceneProps) => {
      if (sceneProps.scene.route.withoutAnimation) return null;
      return CardStackStyleInterpolator.forHorizontal(sceneProps)
    },
  }),
 });

 let exit = false;
 let exitTimer = null;

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
     } else if(state && action.type === 'ReplaceMultiRoute') {
       let replaceNumber = 1;
       if(action.replaceNumber && action.replaceNumber <= state.routes.length) {
         replaceNumber = action.replaceNumber;
       }
       state.routes.splice(state.routes.length - replaceNumber, replaceNumber);
       const routes = state.routes;
       routes.push(action);
       return {
         ...state,
         routes,
         index: routes.length - 1
       }
     } else if(action.type === 'Navigation/BACK') {
       let _currentRouteName = state.routes[state.routes.length - 1];
       if(_currentRouteName.routeName === 'Seller' || _currentRouteName.routeName === 'Buyer' || _currentRouteName.routeName === 'Login') {
         clearTimeout(exitTimer);
         if(exit) {
           exit = false;
           return null;
         } else {
           UIToast('再按一次退出应用');
           exit =  true;
           exitTimer = setTimeout(() => {
             exit = false;
           }, 1000);
           return {
             ...state,
             index: state.routes.length - 1,
           }
         }
       }
     }
     return prevGetStateForAction(action, state);
 }

 // 关闭屏幕黄色警告提示
 console.disableYellowBox = true;

 AppRegistry.registerComponent('ReactNativeJdh', () => ReactNativeJdh);
