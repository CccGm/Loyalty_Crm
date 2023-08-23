import {
    BUY_VOUCHER_FAUILER,
    BUY_VOUCHER_LOADING,
    BUY_VOUCHER_SUCCESS,
  } from '../../constants/actionTypes';
  
  export default buyVoucherReducer = (state, {type, payload}) => {
    switch (type) {
      case BUY_VOUCHER_LOADING:
        return {
          ...state,
          loading: true,
        };
      case BUY_VOUCHER_FAUILER:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case BUY_VOUCHER_SUCCESS:
        return {
          ...state,
          data: payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  