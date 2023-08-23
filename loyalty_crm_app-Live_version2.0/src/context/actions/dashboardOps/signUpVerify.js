import {VERIFY_CUSTOMER_OTP} from '@env';
import {
  VERIFY_OTP_LOADING,
  VERIFY_OTP_FAUILER,
  VERIFY_OTP_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import {
  errorMessage,
  hideLoding,
  showLoding,
  successMessage,
  warningMessage,
} from '../common';

export default (data) =>
  (loaderDispatch, bottomMessageDispatch, dispatch) =>
  onSuccess =>{
    let json = {
        client_id:"pos_eyebrow",
        client_secret:"b6749639c6505cae92b6492bb2b93a8dc00e1cf5cb15bd055100a52f6043689e",
        scope: "",
        grant_type: "password",
        otp:data.form.otp,
        custo:data.custo,
    };
    
    showLoding(loaderDispatch);
    dispatch({type: VERIFY_OTP_LOADING});
    axios
      .post(VERIFY_CUSTOMER_OTP, json)
      .then(res => {
        if (res.data.status === 'failure') {
          hideLoding(loaderDispatch);
          dispatch({type: VERIFY_OTP_FAUILER, payload: res.data.message});
          warningMessage(bottomMessageDispatch, res.data.message);
          onSuccess(res.data)
        } else if (res.data.status === 'success') {
          hideLoding(loaderDispatch);
          dispatch({type: VERIFY_OTP_SUCCESS, payload: res.data.message});
        //   successMessage(bottomMessageDispatch, res.data.message);
          onSuccess(res.data)
        }
      })
      .catch(error => {
        hideLoding(loaderDispatch);
        dispatch({
          type: VERIFY_OTP_FAUILER,
          payload: error?.message
            ? error.message
            : {error: 'Something went wrong, try agin'},
        });
        errorMessage(bottomMessageDispatch, error.message);
      });
  };
