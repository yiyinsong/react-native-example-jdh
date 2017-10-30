import Toast from 'react-native-root-toast';

export default (text, time) => {
  Toast.show(text, {
      duration: time || 1000,
      backgroundColor: 'rgba(0,0,0,.8)',
      position: -40,
      shadow: false
  });
}
