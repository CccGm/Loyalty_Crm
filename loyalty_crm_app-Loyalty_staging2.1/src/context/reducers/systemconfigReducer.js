import {
  GET_SYSTEM_CONFIG_FAUILER,
  GET_SYSTEM_CONFIG_SUCCESS,
  GET_SYSTEM_CONFIG_LOADING,
  GET_FCM_TOKEN
} from '../../constants/actionTypes';

export default systemconfigReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_SYSTEM_CONFIG_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_SYSTEM_CONFIG_FAUILER:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_SYSTEM_CONFIG_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case GET_FCM_TOKEN: {
      return {
        ...state,
        fcmToken: payload,
        loading: false,

      }
    }
    default:
      return state;
  }
};
