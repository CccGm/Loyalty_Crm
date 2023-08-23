import { GET_MY_VOUCHER } from '@env';
import {
    GET_MY_MORE_VOUCHER_SUCCESS,
    GET_MY_VOUCHER_LOADING,
    GET_MY_VOUCHER_FAUILER,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import { errorMessage, warningMessage } from '../common';

export default pageNo => (bottomMessageDispatch, dispatch) => onComplete => {
    dispatch({ type: GET_MY_VOUCHER_LOADING });
    axios
        .get(GET_MY_VOUCHER, {
            params: {
                page: pageNo,
                itemCountPerPage: 8,
            },
        })
        .then(res => {
            setTimeout(() => {
                if (res.data.status === 'failure') {
                    warningMessage(bottomMessageDispatch, res.data.message);
                    dispatch({
                        type: GET_MY_VOUCHER_FAUILER,
                        payload: res.data.message,
                    });
                } else if (res.data.status === 'success') {
                    console.log("mastermind",res.data.data)
                    dispatch({
                        type: GET_MY_MORE_VOUCHER_SUCCESS,
                        payload: res.data.data,
                    });
                }
                onComplete();
            }, 3000);
        })
        .catch(error => {
            errorMessage(bottomMessageDispatch, error.message);
            dispatch({
                type: GET_MY_VOUCHER_FAUILER,
                payload: error?.message
                    ? error.message
                    : { error: 'Something went wrong, try agin' },
            });
            onComplete();
        });
};
