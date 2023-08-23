import {FORGOT_PASSWORD} from '@env';
import {
  FORGOT_PASS_FAUILER,
  FORGOT_PASS_LOADING,
  FORGOT_PASS_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import {
  errorMessage,
  hideLoding,
  showLoding,
  successMessage,
  warningMessage,
} from '../common';

export default ({phone_number}) =>
  (loaderDispatch, bottomMessageDispatch,callingCode, dispatch) => 
   onSuccees => {
    console.log("phone_number",phone_number)
    let json = {
      isd_code:callingCode,
      phone_number: phone_number,
    };
    showLoding(loaderDispatch);
    dispatch({type: FORGOT_PASS_LOADING});
    axios
      .post(FORGOT_PASSWORD,json)
      .then(res => {
        hideLoding(loaderDispatch);
        if (res.data.status === 'failure') {
          dispatch({
            type: FORGOT_PASS_FAUILER,
            payload: res.data.message,
          });
          warningMessage(bottomMessageDispatch, res.data.message);
        } else if (res.data.status === 'success') {
          successMessage(bottomMessageDispatch, res.data.message, true);
          dispatch({type: FORGOT_PASS_SUCCESS});
          onSuccees(res.data)
        
        }
      })
      .catch(error => {
        hideLoding(loaderDispatch);
        dispatch({
          type: FORGOT_PASS_FAUILER,
          payload: error?.message
            ? error.message
            : {error: 'Something went wrong, try agin'},
        });
        errorMessage(bottomMessageDispatch, error.message);
      });
  };
