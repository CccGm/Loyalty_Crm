import {UPDATE_APPT} from '@env';
import {
  UPDATE_APPT_FAUILER,
  UPDATE_APPT_LOADING,
  UPDATE_APPT_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import {
  errorMessage,
  hideLoding,
  showLoding,
  successMessage,
  warningMessage,
} from '../common';

export default ({appointment_id, from_date, to_date,remarks}) =>
  (loaderDispatch, bottomMessageDispatch, dispatch) =>
  onSuccess => {
    let json = {
      appointment_id: appointment_id,
      start_date: from_date,
      end_date: to_date,
      remark:remarks
    };
    console.log("jsonjsonjson",json)
    showLoding(loaderDispatch);
    dispatch({type: UPDATE_APPT_LOADING});
    axios
      .post(UPDATE_APPT, json)
      .then(res => {
        if (res.data.status === 'failure') {
          hideLoding(loaderDispatch);
          dispatch({type: UPDATE_APPT_FAUILER, payload: res.data.message});
          warningMessage(bottomMessageDispatch, res.data.message);
        } else if (res.data.status === 'success') {
          hideLoding(loaderDispatch);
          dispatch({type: UPDATE_APPT_SUCCESS, payload: json});
          successMessage(bottomMessageDispatch, res.data.message);
          onSuccess();
        }
      })
      .catch(error => {
        hideLoding(loaderDispatch);
        dispatch({
          type: UPDATE_APPT_FAUILER,
          payload: error?.message
            ? error.message
            : {error: 'Something went wrong, try agin'},
        });
        errorMessage(bottomMessageDispatch, error.message);
      });
  };
