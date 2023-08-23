import {GET_APPT_CODE} from '@env';
import {
  GET_APPT_CODE_FAUILER,
  GET_APPT_CODE_LOADING,
  GET_APPT_CODE_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import {errorMessage, hideLoding, showLoding, warningMessage} from '../common';

export default appointment_id =>
  (loaderDispatch, bottomMessageDispatch, dispatch) =>
  onSuccess => {
    showLoding(loaderDispatch);
    dispatch({type: GET_APPT_CODE_LOADING});
    axios
      .get(GET_APPT_CODE, {params: {appointment_id: appointment_id}})
      .then(res => {
        if (res.data.status === 'failure') {
          warningMessage(bottomMessageDispatch, res.data.message);
          dispatch({
            type: GET_APPT_CODE_FAUILER,
            payload: res.data.message,
          });
        } else if (res.data.status === 'success') {
          dispatch({
            type: GET_APPT_CODE_SUCCESS,
            payload: {appointment_id: appointment_id, code: res.data.data},
          });
          onSuccess(res.data.data.code);
        }
        hideLoding(loaderDispatch);
      })
      .catch(error => {
        errorMessage(bottomMessageDispatch, error.message);
        dispatch({
          type: GET_APPT_CODE_FAUILER,
          payload: error?.message
            ? error.message
            : {error: 'Something went wrong, try agin'},
        });
        hideLoding(loaderDispatch);
      });
  };
