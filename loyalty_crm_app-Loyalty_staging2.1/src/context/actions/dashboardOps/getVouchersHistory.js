import {GET_MY_VOUCHER} from '@env';
import {
  GET_HISTORY_VOUCHERS_FAUILER,
  GET_HISTORY_VOUCHERS_LOADING,
  GET_HISTORY_VOUCHERS_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import {errorMessage, hideLoding, showLoding, warningMessage} from '../common';

export default (loaderDispatch, bottomMessageDispatch, dispatch) =>
  onSuccess => {
    showLoding(loaderDispatch);
    dispatch({type: GET_HISTORY_VOUCHERS_LOADING});
    axios
      .get(GET_MY_VOUCHER, {
        params: {
          // page: 1,
          // itemCountPerPage: 10,
          expire:1
        },
      })
      .then(res => {
        if (res.data.status === 'failure') {
          // warningMessage(bottomMessageDispatch, res.data.message);
          dispatch({
            type: GET_HISTORY_VOUCHERS_FAUILER,
            payload: res.data.message,
          });
        } else if (res.data.status === 'success') {
          dispatch({type: GET_HISTORY_VOUCHERS_SUCCESS, payload: res.data.data});
        }
        onSuccess(res);
        hideLoding(loaderDispatch);
      })
      .catch(error => {
        errorMessage(bottomMessageDispatch, error.message);
        dispatch({
          type: GET_HISTORY_VOUCHERS_FAUILER,
          payload: error?.message
            ? error.message
            : {error: 'Something went wrong, try agin'},
        });
        hideLoding(loaderDispatch);
      });
  };
