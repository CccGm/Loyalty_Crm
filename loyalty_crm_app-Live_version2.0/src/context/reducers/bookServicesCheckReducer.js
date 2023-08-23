import {
    BOOK_SERVICES_CHECK_FAUILER,
    BOOK_SERVICES_CHECK_SUCCESS,
    BOOK_SERVICES_CHECK_LOADING,
  } from '../../constants/actionTypes';
  
  export default bookServicesCheckReducer = (state, {type, payload}) => {
    switch (type) {
      case BOOK_SERVICES_CHECK_LOADING:
        return {
          ...state,
          loading: true,
        };
      case BOOK_SERVICES_CHECK_FAUILER:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case BOOK_SERVICES_CHECK_SUCCESS:
        return {
          ...state,
          data: payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  