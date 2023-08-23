import { GET_PROFILE } from '@env';
import {
    GET_PROFILE_LOADING,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAUILER,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import { errorMessage, hideLoding, showLoding, warningMessage } from '../common';

export default (loaderDispatch, bottomMessageDispatch, dispatch) =>
    onSuccess => {
        showLoding(loaderDispatch);
        dispatch({ type: GET_PROFILE_LOADING });
        axios
            .get(GET_PROFILE)
            .then(res => {
                if (res.data.status === 'failure') {
                    warningMessage(bottomMessageDispatch, res.data.message);
                    dispatch({
                        type: GET_PROFILE_FAUILER,
                        payload: res.data.message,
                    });
                    onSuccess(res);
                } else if (res.data.status === 'success') {
                    
                    dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data.data[0] });
                }
                onSuccess(res);
                hideLoding(loaderDispatch);
            })
            .catch(error => {
                errorMessage(bottomMessageDispatch, error.message);
                dispatch({
                    type: GET_PROFILE_FAUILER,
                    payload: error?.message
                        ? error.message
                        : { error: 'Something went wrong, try agin' },
                });
                hideLoding(loaderDispatch);
            });
    };
