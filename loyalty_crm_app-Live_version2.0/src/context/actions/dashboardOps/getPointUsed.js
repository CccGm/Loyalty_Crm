import { POINTS_HISTORY } from '@env';
import {
    GET_POINTS_USED_LOADING,
    GET_POINTS_USED_SUCCESS,
    GET_POINTS_USED_FAUILER,
    GET_MORE_POINTS_USED_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import { errorMessage, hideLoding, showLoding, warningMessage } from '../common';

export default (loaderDispatch, bottomMessageDispatch, dispatch) =>
    onSuccess => {
        showLoding(loaderDispatch);
        dispatch({ type: GET_POINTS_USED_LOADING });
        axios
            .get(POINTS_HISTORY, {
                params: {
                    // page:1,
                    // itemCoutPerPage:10,
                    type: 1,
                },
            })
            .then(async res => {
                console.log('resresresres', res)
                if (res.data.status === 'failure') {
                    warningMessage(bottomMessageDispatch, res.data.message);
                    dispatch({
                        type: GET_POINTS_USED_FAUILER,
                        payload: res.data.message,
                    });
                    onSuccess(res);
                } else if (res.data.status === 'success') {
                    dispatch({ type: GET_POINTS_USED_SUCCESS, payload: res.data.data });
                }
                onSuccess(res);
                hideLoding(loaderDispatch);
            })
            .catch(error => {
                errorMessage(bottomMessageDispatch, error.message);
                dispatch({
                    type: GET_POINTS_USED_FAUILER,
                    payload: error?.message
                        ? error.message
                        : { error: 'Something went wrong, try agin' },
                });
                hideLoding(loaderDispatch);
            });
    };
