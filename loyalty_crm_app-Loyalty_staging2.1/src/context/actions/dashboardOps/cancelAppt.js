import {CANCEL_APPT} from '@env';
import {
  CANCEL_APPT_FAUILER,
  CANCEL_APPT_LOADING,
  CANCEL_APPT_SUCCESS,
} from '../../../constants/actionTypes';
import {STATUS_APPT_CANCEL} from '../../../constants/status';
import axios from '../../../helpers/axiosIntersepter';
import {
  errorMessage,
  hideLoding,
  showLoding,
  successMessage,
  warningMessage,
} from '../common';

export default appointment_id =>
  (loaderDispatch, bottomMessageDispatch, dispatch) =>
  onSuccess => {
    showLoding(loaderDispatch);
    dispatch({type: CANCEL_APPT_LOADING});
    axios
      .get(CANCEL_APPT, {
        params: {
          appointment_id: appointment_id,
          status: STATUS_APPT_CANCEL,
        },
      })
      .then(res => {
        hideLoding(loaderDispatch);
        if (res.data.status === 'failure') {
          dispatch({type: CANCEL_APPT_FAUILER, payload: res.data.message});
          warningMessage(bottomMessageDispatch, res.data.message);
        } else if (res.data.status === 'success') {
          dispatch({type: CANCEL_APPT_SUCCESS, payload: {id: appointment_id}});
          successMessage(bottomMessageDispatch, res.data.message);
          onSuccess();
        }
      })
      .catch(error => {
        hideLoding(loaderDispatch);
        dispatch({
          type: CANCEL_APPT_FAUILER,
          payload: error?.message
            ? error.message
            : {error: 'Something went wrong, try agin'},
        });
        errorMessage(bottomMessageDispatch, error.message);
      });
  };
