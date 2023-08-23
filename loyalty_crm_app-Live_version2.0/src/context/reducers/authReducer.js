import {
  ALREADY_LOGGEDIN,
  DEACTIVATE_SUCCESS,
  LOGIN_FAUILER,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGN_UP_FAUILER,
  SIGN_UP_LOADING,
  SIGN_UP_SUCCESS,
} from '../../constants/actionTypes';

export default authReducer = (state, {type, payload}) => {
  switch (type) {
    case LOGIN_LOADING:
    case SIGN_UP_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_FAUILER:
    case SIGN_UP_FAUILER:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        isLoggedIn: true,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: null,
        isLoggedIn: false,
      };
    case ALREADY_LOGGEDIN: {
      return {
        ...state,
        isLoggedIn: true,
      };
    };
    case DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: null,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};
