import {GET_SERVICES} from '@env';
import {
  GET_MORE_HISTORY_SERVICES_SUCCESS,
  GET_HISTORY_SERVICES_LOADING,
  GET_HISTORY_SERVICES_FAUILER,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import {errorMessage, warningMessage} from '../common';

export default pageNo => (bottomMessageDispatch, dispatch) => onComplete => {
  dispatch({type: GET_HISTORY_SERVICES_LOADING});
  axios
    .get(GET_SERVICES, {
      params: {
        page: pageNo,
        itemCountPerPage: 10,
        history:1
      },
    })
    .then(res => {
      setTimeout(() => {
        if (res.data.status === 'failure') {
          warningMessage(bottomMessageDispatch, res.data.message);
          dispatch({
            type: GET_HISTORY_SERVICES_FAUILER,
            payload: res.data.message,
          });
        } else if (res.data.status === 'success') {
          dispatch({
            type: GET_MORE_HISTORY_SERVICES_SUCCESS,
            payload: res.data.data,
          });
        }
        onComplete();
      }, 3000);
    })
    .catch(error => {
      errorMessage(bottomMessageDispatch, error.message);
      dispatch({
        type: GET_HISTORY_SERVICES_FAUILER,
        payload: error?.message
          ? error.message
          : {error: 'Something went wrong, try agin'},
      });
      onComplete();
    });
};
