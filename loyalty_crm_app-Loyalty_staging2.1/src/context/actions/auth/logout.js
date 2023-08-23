import {LOGOUT} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
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

export default () => (loaderDispatch, bottomMessageDispatch, dispatch,acessToken, fcmtoken) => {
  // console.log("fcmtoken",fcmtoken)
  let json = {
    fcm_token:fcmtoken,
  };
  showLoding(loaderDispatch);
  dispatch({type: LOGOUT_LOADING});
  // setTimeout(async () => {
  //   await AsyncStorage.removeItem(ACCESS_TOKEN);
  //   await AsyncStorage.removeItem(USER);
  //   hideLoding(loaderDispatch);
  //   successMessage(bottomMessageDispatch, 'Log out Successfully');
  //   dispatch({type: LOGOUT_SUCCESS});
  // }, 1000);
  axios
    .post(LOGOUT, json)
    .then(async res => {
      console.log("calleddddudjusdLOGOUT",res)
      if (res.data.status === 'failure') {
        warningMessage(bottomMessageDispatch, res.data.message);
        dispatch({
          type: LOGOUT_FAUILER,
          payload: res.data.message,
        });
        hideLoding(loaderDispatch);
      } else if (res.data.status === 'success'){
        await AsyncStorage.removeItem(ACCESS_TOKEN);
        await AsyncStorage.removeItem(USER);
        successMessage(bottomMessageDispatch, res.data.message);
        dispatch({type: LOGOUT_SUCCESS});
        hideLoding(loaderDispatch);
      }
    })
    .catch(error => {
      errorMessage(bottomMessageDispatch, error.message);
      dispatch({
        type: LOGOUT_FAUILER,
        payload: error?.message
          ? error.message
          : {error: 'You already logged in with another device. Please try again.'},
      });
      hideLoding(loaderDispatch);
    });
};
