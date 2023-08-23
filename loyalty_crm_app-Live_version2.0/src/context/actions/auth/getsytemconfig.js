import {SYSTEM_CONFIG} from '@env';
import {
  GET_SYSTEM_CONFIG_LOADING,
  GET_SYSTEM_CONFIG_FAUILER,
  GET_SYSTEM_CONFIG_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {errorMessage, hideLoding, showLoding, warningMessage} from '../common';

export default (loaderDispatch, bottomMessageDispatch, dispatch) =>
  onSuccess => {
    showLoding(loaderDispatch);
    dispatch({type: GET_SYSTEM_CONFIG_LOADING});
    axios
      .get(SYSTEM_CONFIG)
      .then(async res => {
        if (res.data.status === 'failure') {
          warningMessage(bottomMessageDispatch, res.data.message);
          dispatch({
            type: GET_SYSTEM_CONFIG_FAUILER,
            payload: res.data.message,
          });
        } else if (res.data.status === 'success') {
          const systemConfigUsername = res.data.data;
          const configName = JSON.stringify(systemConfigUsername);
          dispatch({type: GET_SYSTEM_CONFIG_SUCCESS, payload: res.data.data});
          await AsyncStorage.setItem('systemConfigUsername', configName);
        }
        onSuccess();
        hideLoding(loaderDispatch);
      })
      .catch(error => {
        errorMessage(bottomMessageDispatch, error.message);
        dispatch({
          type: GET_SYSTEM_CONFIG_FAUILER,
          payload: error?.message
            ? error.message
            : {error: 'Something went wrong, try agin'},
        });
        hideLoding(loaderDispatch);
      });
  };
