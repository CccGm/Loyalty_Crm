import { GET_HISTORY_APPT } from '@env';
import {
  GET_HISTORY_APPTS_FAUILER,
  GET_HISTORY_APPTS_LOADING,
  GET_HISTORY_APPTS_SUCCESS,
  GET_MORE_HISTORY_APPTS_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import { errorMessage, hideLoding, showLoding, warningMessage } from '../common';

export default (loaderDispatch, bottomMessageDispatch, dispatch) =>
  onSuccess => {
    showLoding(loaderDispatch);
    dispatch({ type: GET_HISTORY_APPTS_LOADING });
    axios
      .get(GET_HISTORY_APPT,{
        params: {
          page:1,
          itemCoutPerPage:10,
          sort: "appointment_date_from",
          dir: "DESC",
        },
      })
      .then(res => {
        if (res.data.status === 'failure') {
          // warningMessage(bottomMessageDispatch, res.data.message);
          dispatch({
            type: GET_HISTORY_APPTS_FAUILER,
            payload: res.data.message,
          });
          onSuccess(res);
        } else if (res.data.status === 'success') {
          
          dispatch({ type: GET_HISTORY_APPTS_SUCCESS, payload: res.data.data });
         
        }
        onSuccess(res);
        hideLoding(loaderDispatch);
      })
      .catch(error => {
        errorMessage(bottomMessageDispatch, error.message);
        dispatch({
          type: GET_HISTORY_APPTS_FAUILER,
          payload: error?.message
            ? error.message
            : { error: 'Something went wrong, try agin' },
        });
        hideLoding(loaderDispatch);
      });
  };
