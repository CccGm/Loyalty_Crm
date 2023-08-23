import {
  GET_GUEST_DASHBOARD_LOADING,
  GET_GUEST_DASHBOARD_SUCCESS,
  GET_GUEST_DASHBOARD_FAUILER,
  } from '../../constants/actionTypes';
  
  export default guestdashboardReducer = (state, {type, payload}) => {
    switch (type) {
      case GET_GUEST_DASHBOARD_LOADING:
        return {
          ...state,
          loading: true,
        };
      case GET_GUEST_DASHBOARD_FAUILER:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case GET_GUEST_DASHBOARD_SUCCESS:
        return {
          ...state,
          data: payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  