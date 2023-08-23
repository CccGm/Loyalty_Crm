import {
    BOOK_APPOINTMENT_LOADING,
    BOOK_APPOINTMENT_FAUILER,
    BOOK_APPOINTMENT_SUCCESS,
  } from '../../constants/actionTypes';
  
  export default bookAppointmentReducer = (state, {type, payload}) => {
    switch (type) {
      case BOOK_APPOINTMENT_LOADING:
        return {
          ...state,
          loading: true,
        };
      case BOOK_APPOINTMENT_FAUILER:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case BOOK_APPOINTMENT_SUCCESS:
        return {
          ...state,
          data: payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  