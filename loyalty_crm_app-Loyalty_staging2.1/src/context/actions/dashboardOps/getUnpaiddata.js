import {GETUNPAIDDATA} from '@env';
import {
  GET_UNPAID_LOADING,
 GET_UNPAID_SUCCESS,
 GET_UNPAID_FAUILER,
 GET_MORE_UNPAID_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import {errorMessage, hideLoding, showLoding, warningMessage} from '../common';

export default (loaderDispatch, bottomMessageDispatch, dispatch) =>
  onSuccess => {
    showLoding(loaderDispatch);
    dispatch({type: GET_UNPAID_LOADING});
    axios
      .get(GETUNPAIDDATA,{
        // params: {
        //     page:1,
        //     itemCoutPerPage:10,
        // },
      })
      .then(async res => {
        if (res.data.status === 'failure') {
          // warningMessage(bottomMessageDispatch, res.data.message);
          dispatch({
            type: GET_UNPAID_FAUILER,
            payload: res.data.message,
          });
          onSuccess(res);
        } else if (res.data.status === 'success') {
          console.log("getservices",res.data.data)
          dispatch({type: GET_UNPAID_SUCCESS, payload: res.data.data});
          // dispatch({type: GET_MORE_UNPAID_SUCCESS, payload: res.data.data});
        }
        onSuccess(res);
        hideLoding(loaderDispatch);
      })
      .catch(error => {
        errorMessage(bottomMessageDispatch, error.message);
        dispatch({
          type: GET_UNPAID_FAUILER,
          payload: error?.message
            ? error.message
            : {error: 'Something went wrong, try agin'},
        });
        hideLoding(loaderDispatch);
      });
  };
