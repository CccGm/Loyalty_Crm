import { GET_UPCOMING_APPT } from '@env';
import {
  GET_UPCOMING_APPTS_FAUILER,
  GET_UPCOMING_APPTS_LOADING,
  GET_MORE_UPCOMMING_APPTS_SUCCESS
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import {errorMessage, warningMessage} from '../common';

export default pageNo => (bottomMessageDispatch, dispatch) => onComplete => {
  dispatch({type: GET_UPCOMING_APPTS_LOADING});
  axios
    .get(GET_UPCOMING_APPT, {
      params: {
        page: pageNo,
        itemCoutPerPage: 10,
      },
    })
    .then(res => {
      setTimeout(() => {
        if (res.data.status === 'failure') {
          warningMessage(bottomMessageDispatch, res.data.message);
          dispatch({
            type: GET_UPCOMING_APPTS_FAUILER,
            payload: res.data.message,
          });
        } else if (res.data.status === 'success') {
          dispatch({
            type: GET_MORE_UPCOMMING_APPTS_SUCCESS,
            payload: res.data.data,
          });
        }
        onComplete();
      }, 3000);
    })
    .catch(error => {
      errorMessage(bottomMessageDispatch, error.message);
      dispatch({
        type: GET_UPCOMING_APPTS_FAUILER,
        payload: error?.message
          ? error.message
          : {error: 'Something went wrong, try agin'},
      });
      onComplete();
    });
};
