import {GET_MY_VOUCHER} from '@env';
import {
  GET_MY_VOUCHER_FAUILER,
  GET_MY_VOUCHER_LOADING,
  GET_MY_VOUCHER_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import {errorMessage, hideLoding, showLoding, warningMessage} from '../common';

export default (loaderDispatch, bottomMessageDispatch, dispatch) =>
  onSuccess => {
    showLoding(loaderDispatch);
    dispatch({type: GET_MY_VOUCHER_LOADING});
    axios
      .get(GET_MY_VOUCHER, {
        // params: {
        //   page: 1,
        //   itemCountPerPage: 10,
        // },
      })
      .then(res => {
        if (res.data.status === 'failure') {
          // console.log("secoundapicall",res)
          // warningMessage(bottomMessageDispatch, res.data.message);
          dispatch({
            type: GET_MY_VOUCHER_FAUILER,
            payload: res.data.message,
          });
          dispatch({type: GET_MY_VOUCHER_SUCCESS, payload: []});
        } else if (res.data.status === 'success') {
          dispatch({type: GET_MY_VOUCHER_SUCCESS, payload: res.data.data});
        }
        onSuccess(res);
        hideLoding(loaderDispatch);
      })
      .catch(error => {
        errorMessage(bottomMessageDispatch, error.message);
        dispatch({
          type: GET_MY_VOUCHER_FAUILER,
          payload: error?.message
            ? error.message
            : {error: 'Something went wrong, try agin'},
        });
        hideLoding(loaderDispatch);
      });
  };
