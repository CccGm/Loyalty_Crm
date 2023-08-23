import {
    GET_BANNER_LOADING,
    GET_BANNER_FAUILER,
    GET_BANNER_SUCCESS,
  } from '../../constants/actionTypes';
  
  export default bannerReducer = (state, {type, payload}) => {
    switch (type) {
      case GET_BANNER_LOADING:
        return {
          ...state,
          loading: true,
        };
      case GET_BANNER_FAUILER:
        return {
          ...state,
          error: payload,
          loading: false,
          visible:false
        };
      case GET_BANNER_SUCCESS:
        return {
          ...state,
          data: payload,
          loading: false,
          visible:true
        };
      default:
        return state;
    }
  };
  