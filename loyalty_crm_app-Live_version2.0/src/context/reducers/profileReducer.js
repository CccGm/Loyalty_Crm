import {
    GET_PROFILE_LOADING,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAUILER,
  } from '../../constants/actionTypes';
  
  export default profileReducer = (state, {type, payload}) => {
    switch (type) {
      case GET_PROFILE_LOADING:
        return {
          ...state,
          loading: true,
        };
      case GET_PROFILE_FAUILER:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case GET_PROFILE_SUCCESS:
        return {
          ...state,
          data: payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  