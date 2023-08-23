import {CHANGE_PASSWORD} from '@env';
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

export default ({current_password, new_password, confirm_password}) =>
  (loaderDispatch, bottomMessageDispatch, dispatch) => {
    let json = {
      current_password: current_password,
      new_password: new_password,
      confirm_password: confirm_password,
    };
    showLoding(loaderDispatch);
    dispatch({type: CHANGE_PASS_LOADING});
    axios
      .post(CHANGE_PASSWORD, json)
      .then(res => {
        hideLoding(loaderDispatch);
        if (res.data.status === 'failure') {
          dispatch({
            type: CHANGE_PASS_FAUILER,
            payload: res.data.message,
          });
          warningMessage(bottomMessageDispatch, res.data.message);
        } else if (res.data.status === 'success') {
          successMessage(bottomMessageDispatch, res.data.message, true);
          dispatch({type: CHANGE_PASS_SUCCESS});
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
