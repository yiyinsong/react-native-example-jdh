import Toast from 'react-native-root-toast';

export default (text) => {
  Toast.show(text, {
      duration: 1000,
      backgroundColor: 'rgba(0,0,0,.8)',
      position: Toast.positions.BOTTOM
  });
}
