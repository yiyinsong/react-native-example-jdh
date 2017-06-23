import { NavigationActions } from 'react-navigation';
import Config from './config';

export default {
  checkLogin(t) {
    fetch(Config.PHPAPI + 'api/mapp/member/verify-login?token=' + token, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
        if(data.error_code != 0) {
          t.props.navigation.navigate('Login');
        }
    })
    .catch((error) => {
        console.error(error);
    });
  }
}
