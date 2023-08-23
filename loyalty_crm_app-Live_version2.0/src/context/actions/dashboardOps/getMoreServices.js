import {GET_SERVICES} from '@env';
import {
  GET_MORE_SERVICES_SUCCESS,
  GET_SERVICES_FAUILER,
  GET_SERVICES_LOADING,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import {errorMessage, warningMessage} from '../common';

export default pageNo => (bottomMessageDispatch, dispatch) => onComplete => {
  dispatch({type: GET_SERVICES_LOADING});
  console.log("getmoreservices111",pageNo)
  axios
    .get(GET_SERVICES, {
      params: {
        page: pageNo,
        itemCountPerPage: 10,
      },
    })
    .then(res => {
      setTimeout(() => {
        if (res.data.status === 'failure') {
          warningMessage(bottomMessageDispatch, res.data.message);
          dispatch({
            type: GET_SERVICES_FAUILER,
            payload: res.data.message,
          });
        } else if (res.data.status === 'success') {
          console.log("getmoreservices",res.data.data)
          dispatch({
            type: GET_MORE_SERVICES_SUCCESS,
            payload: res.data.data,
          });
        }
        onComplete();
      }, 3000);
    })
    .catch(error => {
      errorMessage(bottomMessageDispatch, error.message);
      dispatch({
        type: GET_SERVICES_FAUILER,
        payload: error?.message
          ? error.message
          : {error: 'Something went wrong, try agin'},
      });
      onComplete();
    });
};
