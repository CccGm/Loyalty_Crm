import {GET_SERVICES} from '@env';
import {
  GET_SERVICES_LOADING,
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAUILER,
  GET_MORE_SERVICES_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import {errorMessage, hideLoding, showLoding, warningMessage} from '../common';

export default (loaderDispatch, bottomMessageDispatch, dispatch) =>
  onSuccess => {
    showLoding(loaderDispatch);
    dispatch({type: GET_SERVICES_LOADING});
    axios
      .get(GET_SERVICES, {
        params: {
          page: 1,
          itemCoutPerPage: 10,
          is_remaining: 1,
        },
      })
      .then(async res => {
        if (res.data.status === 'failure') {
          // warningMessage(bottomMessageDispatch, res.data.message);
          dispatch({
            type: GET_SERVICES_FAUILER,
            payload: res.data.message,
          });
          onSuccess(res);
        } else if (res.data.status === 'success') {
          console.log('getservices', res.data.data);
          dispatch({type: GET_SERVICES_SUCCESS, payload: res.data.data});
          // dispatch({type: GET_MORE_SERVICES_SUCCESS, payload:res.data.data});
          console.log('resssss,', res.data.data);
        }
        onSuccess(res);
        hideLoding(loaderDispatch);
      })
      .catch(error => {
        errorMessage(bottomMessageDispatch, error.message);
        dispatch({
          type: GET_SERVICES_FAUILER,
          payload: error?.message
            ? error.message
            : {error: 'Something went wrong, try agin'},
        });
        hideLoding(loaderDispatch);
      });
  };
