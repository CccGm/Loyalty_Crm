import {SET_NEW_PASSWORD} from '@env';
import {
  CHANGE_PASS_FAUILER,
  CHANGE_PASS_LOADING,
  CHANGE_PASS_SUCCESS,
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
  onSuccess => {
      
      
    let json = {
      phone_number:data.phonenumber,
      password:data.form.new_password,
      confirm_password:data.form.confirm_password,
    };
    console.log("datadata",json)
    showLoding(loaderDispatch);
    dispatch({type: CHANGE_PASS_LOADING});
    axios
      .post(SET_NEW_PASSWORD, json)
      .then(res => {
        hideLoding(loaderDispatch);
        if (res.data.status === 'failure') {
          dispatch({
            type: CHANGE_PASS_FAUILER,
            payload: res.data.message,
          });
          warningMessage(bottomMessageDispatch, res.data.message);
        } else if (res.data.status === 'success') {
        //   successMessage(bottomMessageDispatch, res.data.message, true);
          dispatch({type: CHANGE_PASS_SUCCESS});
          onSuccess(res.data)
        }
      })
      .catch(error => {
        hideLoding(loaderDispatch);
        dispatch({
          type: CHANGE_PASS_FAUILER,
          payload: error?.message
            ? error.message
            : {error: 'Something went wrong, try agin'},
        });
        errorMessage(bottomMessageDispatch, error.message);
      });
  };
