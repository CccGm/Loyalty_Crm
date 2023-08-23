import {
  CLIENT_ID,
  CLIENT_SECRET,
  LOGIN,
  STAGINGCLIENT_ID,
  STAGINGCLIENT_SECRET,
} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Platform} from 'react-native';
import {
  LOGIN_FAUILER,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from '../../../constants/actionTypes';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER,
  USER_FIRST_NAME,
  USER_MEMBERSHIP_CODE,
} from '../../../constants/prefrenceKeys';
import axios from '../../../helpers/axiosIntersepter';
import {
  errorMessage,
  hideLoding,
  showLoding,
  successMessage,
  warningMessage,
} from '../common';

console.log('LoginCLIENT_ID', CLIENT_ID);
console.log('CLIENT_SECRET', CLIENT_SECRET);
//import {MD5} from '../../../utils/MD5';

export default ({email, password}) =>
  (loaderDispatch, bottomMessageDispatch, callingCode, dispatch, token) => {
    let json = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: '',
      grant_type: 'password',
      isd_code: callingCode,
      username: email,
      password: password,
      fcm_token: token,
      type: 2,
    };
    console.log('json', json);
    showLoding(loaderDispatch);
    dispatch({type: LOGIN_LOADING});
    axios
      .post(LOGIN, json)
      .then(async res => {
        if (res.data.status === 'failure') {
          // warningMessage(bottomMessageDispatch, res.data.message, true);
          {
            Platform.OS == 'ios'
              ? Alert.alert(res.data.message)
              : warningMessage(bottomMessageDispatch, res.data.message, true);
          }
          hideLoding(loaderDispatch);
          dispatch({
            type: LOGIN_FAUILER,
            payload: res.data.message,
          });
        } else if (res.data.status === 'success') {
          const accessTokenP = [
            ACCESS_TOKEN,
            res.data.data.customer_info.access_token,
          ];
          const refreshTokenP = [
            REFRESH_TOKEN,
            res.data.data.customer_info.refresh_token,
          ];
          const userFirstNameP = [
            USER_FIRST_NAME,
            res.data.data.customer_info.first_name,
          ];
          const userMembershipCode = [
            USER_MEMBERSHIP_CODE,
            res.data.data.customer_info.membership_code,
          ];
          const userP = [USER, JSON.stringify(res.data.data.customer_info)];
          await AsyncStorage.multiSet([
            accessTokenP,
            refreshTokenP,
            userFirstNameP,
            userMembershipCode,
            userP,
          ]);
          successMessage(bottomMessageDispatch, 'Successfully Logged In');
          hideLoding(loaderDispatch);
          dispatch({type: LOGIN_SUCCESS, payload: res.data.data.customer_info});
        }
      })
      .catch(error => {
        errorMessage(bottomMessageDispatch, error.message);
        hideLoding(loaderDispatch);
        dispatch({
          type: LOGIN_FAUILER,
          payload: error?.message
            ? error.message
            : {error: 'Something went wrong, try agin'},
        });
      });
  };
