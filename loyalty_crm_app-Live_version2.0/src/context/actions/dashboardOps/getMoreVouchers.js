import { GET_VOUCHER } from '@env';
import {
    GET_MORE_VOUCHER_SUCCESS,
    GET_VOUCHER_LOADING,
    GET_VOUCHER_FAUILER,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosIntersepter';
import { errorMessage, warningMessage } from '../common';

export default pageNo => (bottomMessageDispatch, dispatch) => onComplete => {
    console.log("pageNo",pageNo)
    dispatch({ type: GET_VOUCHER_LOADING });
    axios
        .get(GET_VOUCHER, {
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
                        type: GET_VOUCHER_FAUILER,
                        payload: res.data.message,
                    });
                } else if (res.data.status === 'success') {
                    console.log("mastermind",res.data)
                    dispatch({
                        type: GET_MORE_VOUCHER_SUCCESS,
                        payload: res.data.data,
                    });
                }
                onComplete();
            }, 3000);
        })
        .catch(error => {
            errorMessage(bottomMessageDispatch, error.message);
            dispatch({
                type: GET_VOUCHER_FAUILER,
                payload: error?.message
                    ? error.message
                    : { error: 'Something went wrong, try agin' },
            });
            onComplete();
        });
};
