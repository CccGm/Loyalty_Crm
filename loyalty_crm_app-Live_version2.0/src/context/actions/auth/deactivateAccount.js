import {DEACTIVATE_ACCOUNT} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DEACTIVATE_FAUILER,
  DEACTIVATE_LOADING,
  DEACTIVATE_SUCCESS,
  LOGOUT_FAUILER,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import {
  errorMessage,
  hideLoding,
  showLoding,
  successMessage,
  warningMessage,
} from '../common';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER,
  USER_FIRST_NAME,
  USER_MEMBERSHIP_CODE,
} from '../../../constants/prefrenceKeys';

export default () => (loaderDispatch, bottomMessageDispatch, dispatch,acessToken) => {
  console.log("acessToken",acessToken)
  let json = {
    accesstoken:acessToken
  };
  showLoding(loaderDispatch);
  dispatch({type: DEACTIVATE_LOADING});
  // setTimeout(async () => {
  //   await AsyncStorage.removeItem(ACCESS_TOKEN);
  //   await AsyncStorage.removeItem(USER);
  //   hideLoding(loaderDispatch);
  //   successMessage(bottomMessageDispatch, 'Log out Successfully');
  //   dispatch({type: LOGOUT_SUCCESS});
  // }, 1000);
  axios
    .post(DEACTIVATE_ACCOUNT, json)
    .then(async res => {
      if (res.data.status === 'failure') {
        warningMessage(bottomMessageDispatch, res.data.message);
        dispatch({
          type: DEACTIVATE_FAUILER,
          payload: res.data.message,
        });
        hideLoding(loaderDispatch);
      } else if (res.data.status === 'success'){
        await AsyncStorage.removeItem(ACCESS_TOKEN);
        await AsyncStorage.removeItem(USER);
        successMessage(bottomMessageDispatch, res.data.message);
        dispatch({type: DEACTIVATE_SUCCESS});
        hideLoding(loaderDispatch);
      }
    })
    .catch(error => {
      errorMessage(bottomMessageDispatch, error.message);
      dispatch({
        type: DEACTIVATE_FAUILER,
        payload: error?.message
          ? error.message
          : {error: 'You already logged in with another device. Please try again.'},
      });
      hideLoding(loaderDispatch);
    });
};
