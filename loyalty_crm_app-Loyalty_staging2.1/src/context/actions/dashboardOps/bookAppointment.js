import { BOOK_SERVICES } from '@env';
import {
    BOOK_APPOINTMENT_FAUILER,
    BOOK_APPOINTMENT_LOADING,
    BOOK_APPOINTMENT_SUCCESS,
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
    (loaderDispatch, bottomMessageDispatch, dispatch) =>
        onSuccess => {
            showLoding(loaderDispatch);
            dispatch({ type: BOOK_APPOINTMENT_LOADING });
           
            axios
                .post(BOOK_SERVICES, data)
                .then(res => {
                    
                    if (res.data.status === 'failure') {
                        hideLoding(loaderDispatch);
                        dispatch({ type: BOOK_APPOINTMENT_FAUILER, payload: res.data.message });
                        warningMessage(bottomMessageDispatch, res.data.message);
                    } else if (res.data.status === 'success') {
                        hideLoding(loaderDispatch);
                        dispatch({ type: BOOK_APPOINTMENT_SUCCESS, payload: res.data.message });
                        successMessage(bottomMessageDispatch, res.data.message);
                        onSuccess();
                    } else if (res.data.message) {
                        hideLoding(loaderDispatch);
                        dispatch({ type: BOOK_APPOINTMENT_FAUILER, payload: res.data.message });
                        warningMessage(bottomMessageDispatch, res.data.message);
                    }
                })
                .catch(error => {
                    hideLoding(loaderDispatch);
                    dispatch({
                        type: BOOK_APPOINTMENT_FAUILER,
                        payload: error?.message
                            ? error.message
                            : { error: 'Something went wrong, try agin' },
                    });
                    errorMessage(bottomMessageDispatch, error.message);
                });
        };
