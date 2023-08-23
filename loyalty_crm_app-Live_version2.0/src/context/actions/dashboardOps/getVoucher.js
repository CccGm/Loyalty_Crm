import {GET_VOUCHER} from '@env';
import {
  GET_VOUCHER_FAUILER,
  GET_VOUCHER_LOADING,
  GET_VOUCHER_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import {errorMessage, hideLoding, showLoding, warningMessage} from '../common';

export default (loaderDispatch, bottomMessageDispatch, dispatch) =>
  onSuccess => {
    showLoding(loaderDispatch);
    dispatch({type: GET_VOUCHER_LOADING});
    axios
      .get(GET_VOUCHER,{
        // params: {
        //   // page: 1,
        //   // itemCountPerPage: 50,
        // },
      })
      .then(res => {
         console.log("resres",res)
        if (res.data.status === 'failure') {
          // warningMessage(bottomMessageDispatch, res.data.message);
          dispatch({type: GET_VOUCHER_SUCCESS, payload: []});
          dispatch({
            type: GET_VOUCHER_FAUILER,
            payload: res.data.message,
          });
          onSuccess(res);
        } else if (res.data.status === 'success') {
          dispatch({type: GET_VOUCHER_SUCCESS, payload: res.data.data});
        }
        onSuccess(res);
        hideLoding(loaderDispatch);
      })
      .catch(error => {
        errorMessage(bottomMessageDispatch, error.message);
        dispatch({
          type: GET_VOUCHER_FAUILER,
          payload: error?.message
            ? error.message
            : {error: 'Something went wrong, try agin'},
        });
        onSuccess(res);
        hideLoding(loaderDispatch);
      });
  };
