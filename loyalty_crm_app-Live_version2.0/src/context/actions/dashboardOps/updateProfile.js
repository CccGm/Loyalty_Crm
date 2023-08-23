import {SIGN_UP} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER, USER_FIRST_NAME} from '../../../constants/prefrenceKeys';
import axios from '../../../helpers/axiosIntersepter';
import {
  errorMessage,
  hideLoding,
  showLoding,
  successMessage,
  warningMessage,
} from '../common';

export default ({
    firstName: first_name,
    lastName: last_name,
    phoneNo,
    email,
    profile,
    birthdate

  }) =>
  (loaderDispatch, bottomMessageDispatch) => 
    onSuccess => { 
      let json = {
      first_name:first_name== undefined?first_name:first_name.trim(),
      last_name: last_name== undefined?last_name:last_name.trim(),
      mobile_number:phoneNo== undefined?phoneNo:phoneNo.trim(),
      email: email==undefined?email:email.trim(),
      birthdate:birthdate,
      profile: profile,
    };
    
    showLoding(loaderDispatch);
    axios
      .post(SIGN_UP, json)
      .then(async res => {
        hideLoding(loaderDispatch);
        if (res.data.status === 'failure') {
          warningMessage(bottomMessageDispatch, res.data.message, true);
          onSuccess(res.data)
        } else if (res.data.status === 'success') {
          let usr = JSON.parse(await AsyncStorage.getItem(USER));
          usr.first_name = res.data.data.list.first_name;
          usr.last_name = res.data.data.list.last_name;
          usr.image = res.data.data.list.image;
          const userFirstNameP = [
            USER_FIRST_NAME,
            res.data.data.list.first_name,
          ];
          const userP = [USER, JSON.stringify(usr)];
          await AsyncStorage.multiSet([userFirstNameP, userP]);
          successMessage(bottomMessageDispatch, 'Profile updated successfully');
          onSuccess(res.data)
        }
      })
      .catch(error => {
        hideLoding(loaderDispatch);
        errorMessage(bottomMessageDispatch, error.message, true);
      });
  
};
