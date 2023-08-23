import {GET_DASHBOARD} from '@env';
import axios from '../../../helpers/axiosIntersepter';
import {
  GET_DASHBOARD_LOADING,
  GET_DASHBOARD_FAUILER,
  GET_DASHBOARD_SUCCESS,
  LOGOUT_SUCCESS,
} from '../../../constants/actionTypes';
import {errorMessage, hideLoding, showLoding, warningMessage} from '../common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN, USER} from '../../../constants/prefrenceKeys';

export default (loaderDispatch, bottomMessageDispatch, dispatch) =>
  onSuccess => {
    showLoding(loaderDispatch);
    dispatch({type: GET_DASHBOARD_LOADING});
    axios
      .get(GET_DASHBOARD, {
        params: {
          sort: 'appointment_date_from',
          dir: 'ASC',
        },
      })
      .then(async res => {
        if (res.data == undefined) {
          // await AsyncStorage.removeItem(ACCESS_TOKEN);
          // await AsyncStorage.removeItem(USER);
          // dispatch({type: LOGOUT_SUCCESS});
        } else if (res.data.status === 'failure') {
          onSuccess(res);
          // dispatch({type: LOGOUT_SUCCESS});
          // console.log("failure",res)

          // await AsyncStorage.removeItem(ACCESS_TOKEN);
          // await AsyncStorage.removeItem(USER);
          dispatch({
            type: GET_DASHBOARD_FAUILER,
            payload: res.data.message,
          });

          warningMessage(bottomMessageDispatch, res.data.message);
          hideLoding(loaderDispatch);
        } else if (res.data.error_no == 401) {
          console.log('401', res);
          await AsyncStorage.removeItem(ACCESS_TOKEN);
          await AsyncStorage.removeItem(USER);
        } else if (res.data.status === 'success') {
          console.log('success', res);
          dispatch({
            type: GET_DASHBOARD_SUCCESS,
            payload: res.data.data,
          });
          hideLoding(loaderDispatch);
          onSuccess(res.data);
        }
      })
      .catch(async error => {
        console.log('error', error);
        dispatch({
          type: GET_DASHBOARD_FAUILER,
          payload: res.data.message,
        });
        await AsyncStorage.removeItem(ACCESS_TOKEN);
        await AsyncStorage.removeItem(USER);
        errorMessage(bottomMessageDispatch, error.message);
        hideLoding(loaderDispatch);
      });
  };
