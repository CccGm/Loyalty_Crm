import { GET_UPCOMING_APPT } from '@env';
import {
  GET_UPCOMING_APPTS_FAUILER,
  GET_UPCOMING_APPTS_LOADING,
  GET_UPCOMING_APPTS_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import { errorMessage, hideLoding, showLoding, warningMessage } from '../common';

export default (loaderDispatch, bottomMessageDispatch, dispatch) =>
  onSuccess => {
    showLoding(loaderDispatch);
    dispatch({ type: GET_UPCOMING_APPTS_LOADING });
    axios
      .get(GET_UPCOMING_APPT,{
        params: {
          page:1,
          itemCoutPerPage:10,
          sort: "appointment_date_from",
          dir: "ASC",
        },
      })
      .then(res => {
        if (res.data.status === 'failure') {
          // warningMessage(bottomMessageDispatch, res.data.message);
          dispatch({
            type: GET_UPCOMING_APPTS_FAUILER,
            payload: res.data.message,
          });
          onSuccess(res);
        } else if (res.data.status === 'success') {
          dispatch({ type: GET_UPCOMING_APPTS_SUCCESS, payload: res.data.data });
        }
        onSuccess(res);
        hideLoding(loaderDispatch);
      })
      .catch(error => {
        errorMessage(bottomMessageDispatch, error.message);
        dispatch({
          type: GET_UPCOMING_APPTS_FAUILER,
          payload: error?.message
            ? error.message
            : { error: 'Something went wrong, try agin' },
        });
        hideLoding(loaderDispatch);
      });
  };
