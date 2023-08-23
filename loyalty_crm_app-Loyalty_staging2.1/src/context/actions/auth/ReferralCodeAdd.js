import {SETREFFERAL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  REFERRALCODE_FAUILER,
  REFERRALCODE_SUCCESS,
  REFERRALCODE_LOADING,
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

export default (loaderDispatch, bottomMessageDispatch, dispatch,referral_membership_code) =>
onSuccess => {
  console.log("acessToken",referral_membership_code)
  let json = {
    referral_membership_code:referral_membership_code
  };
  showLoding(loaderDispatch);
  dispatch({type: REFERRALCODE_LOADING});
  // setTimeout(async () => {
  //   await AsyncStorage.removeItem(ACCESS_TOKEN);
  //   await AsyncStorage.removeItem(USER);
  //   hideLoding(loaderDispatch);
  //   successMessage(bottomMessageDispatch, 'Log out Successfully');
  //   dispatch({type: LOGOUT_SUCCESS});
  // }, 1000);
  axios
    .post(SETREFFERAL, json)
    .then(async res => {
      if (res.data.status === 'failure') {
        warningMessage(bottomMessageDispatch, res.data.message);
        dispatch({
          type: REFERRALCODE_FAUILER,
          payload: res.data.message,
        });
        hideLoding(loaderDispatch);
        onSuccess(res.data)
      } else if (res.data.status === 'success'){
        // await AsyncStorage.removeItem(ACCESS_TOKEN);
        // await AsyncStorage.removeItem(USER);
        successMessage(bottomMessageDispatch, res.data.message);
        dispatch({type: REFERRALCODE_SUCCESS});
        hideLoding(loaderDispatch);
        onSuccess(res.data)
      }
    })
    .catch(error => {
      errorMessage(bottomMessageDispatch, error.message);
      dispatch({
        type: REFERRALCODE_FAUILER,
        payload: error?.message
          ? error.message
          : {error: 'You already logged in with another device. Please try again.'},
      });
      hideLoding(loaderDispatch);
    });
};
