import Toast from 'react-native-root-toast';

export default (text) => {
  Toast.show(text, {
      duration: Toast.durations.SHORT,
      backgroundColor: 'rgba(0,0,0,.8)',
      position: 0
  });
}
