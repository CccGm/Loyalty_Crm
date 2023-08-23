import {BUY_VOUCHER} from '@env';
import {
  BUY_VOUCHER_FAUILER,
  BUY_VOUCHER_LOADING,
  BUY_VOUCHER_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import {
  errorMessage,
  hideLoding,
  showLoding,
  successMessage,
  warningMessage,
} from '../common';

export default ({voucher_id}) =>
  (loaderDispatch, bottomMessageDispatch, dispatch) =>
  onSuccess => {
    let json = {
        voucher_id: voucher_id,
    };
    showLoding(loaderDispatch);
    dispatch({type: BUY_VOUCHER_LOADING});
    axios
      .post(BUY_VOUCHER, json)
      .then(res => {
        if (res.data.status === 'failure') {
          hideLoding(loaderDispatch);
          dispatch({type: BUY_VOUCHER_FAUILER, payload: res.data.message});
          warningMessage(bottomMessageDispatch, res.data.message);
        } else if (res.data.status === 'success') {
          hideLoding(loaderDispatch);
          dispatch({type: BUY_VOUCHER_SUCCESS, payload: res.data.message});
          successMessage(bottomMessageDispatch, res.data.message);
          onSuccess();
        }
      })
      .catch(error => {
        hideLoding(loaderDispatch);
        dispatch({
          type: BUY_VOUCHER_FAUILER,
          payload: error?.message
            ? error.message
            : {error: 'Something went wrong, try agin'},
        });
        errorMessage(bottomMessageDispatch, error.message);
      });
  };
