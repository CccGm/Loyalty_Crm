import { BOOK_SERVICES_CHECK } from '@env';
import {
    BOOK_SERVICES_CHECK_LOADING,
    BOOK_SERVICES_CHECK_FAUILER,
    BOOK_SERVICES_CHECK_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import {
    errorMessage,
    hideLoding,
    showLoding,
    successMessage,
    warningMessage,
} from '../common';

export default (data) =>
    (loaderDispatch, bottomMessageDispatch,dispatch) =>
        onSuccess => {
            showLoding(loaderDispatch);
            dispatch({ type: BOOK_SERVICES_CHECK_LOADING });
             console.log("Apicalled",data)
            axios
                .post(BOOK_SERVICES_CHECK, data)
                .then(res => {
                    if (res.data.status === 'failure') {
                        hideLoding(loaderDispatch);
                        dispatch({ type: BOOK_SERVICES_CHECK_FAUILER, payload: res.data.message });
                        warningMessage(bottomMessageDispatch, res.data.message);
                    } else if (res.data.status === 'success') {
                        hideLoding(loaderDispatch);
                        dispatch({ type: BOOK_SERVICES_CHECK_SUCCESS, payload: res.data });
                        warningMessage(bottomMessageDispatch, res.data.message);
                        onSuccess(res.data);
                    } else if (res.data.message) {
                        hideLoding(loaderDispatch);
                        dispatch({ type: BOOK_SERVICES_CHECK_FAUILER, payload: res.data.message });
                        warningMessage(bottomMessageDispatch, res.data.message);
                    }
                })
                .catch(error => {
                    hideLoding(loaderDispatch);
                    dispatch({
                        type: BOOK_SERVICES_CHECK_FAUILER,
                        payload: error?.message
                            ? error.message
                            : { error: 'Something went wrong, try agin' },
                    });
                    errorMessage(bottomMessageDispatch, error.message);
                });
        };
