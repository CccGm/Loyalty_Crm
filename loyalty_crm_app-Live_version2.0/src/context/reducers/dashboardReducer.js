import {
    GET_DASHBOARD_LOADING,
    GET_DASHBOARD_FAUILER,
    GET_DASHBOARD_SUCCESS,
  } from '../../constants/actionTypes';
  
  export default dashboardReducer = (state, {type, payload}) => {
    switch (type) {
      case GET_DASHBOARD_LOADING:
        return {
          ...state,
          loading: true,
        };
      case GET_DASHBOARD_FAUILER:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case GET_DASHBOARD_SUCCESS:
        return {
          ...state,
          data: payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  