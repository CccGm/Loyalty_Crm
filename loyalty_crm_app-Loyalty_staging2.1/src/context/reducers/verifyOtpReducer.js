import {
    VERIFY_OTP_LOADING,
    VERIFY_OTP_FAUILER,
    VERIFY_OTP_SUCCESS,
  } from '../../constants/actionTypes';
  
  export default verifyOtpReducer = (state, {type, payload}) => {
    switch (type) {
      case VERIFY_OTP_LOADING:
        return {
          ...state,
          loading: true,
        };
      case VERIFY_OTP_FAUILER:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case VERIFY_OTP_SUCCESS:
        return {
          ...state,
          data: payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  