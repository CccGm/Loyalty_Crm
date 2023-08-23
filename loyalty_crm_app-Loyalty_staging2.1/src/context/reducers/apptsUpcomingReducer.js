import {
  CANCEL_APPT_FAUILER,
  CANCEL_APPT_LOADING,
  CANCEL_APPT_SUCCESS,
  GET_APPT_CODE_FAUILER,
  GET_APPT_CODE_LOADING,
  GET_APPT_CODE_SUCCESS,
  GET_MORE_UPCOMMING_APPTS_SUCCESS,
  GET_UPCOMING_APPTS_FAUILER,
  GET_UPCOMING_APPTS_LOADING,
  GET_UPCOMING_APPTS_SUCCESS,
  UPDATE_APPT_FAUILER,
  UPDATE_APPT_LOADING,
  UPDATE_APPT_SUCCESS,
} from '../../constants/actionTypes';

export default apptsReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_UPCOMING_APPTS_LOADING:
    case UPDATE_APPT_LOADING:
    case CANCEL_APPT_LOADING:
    case GET_APPT_CODE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_UPCOMING_APPTS_FAUILER:
    case UPDATE_APPT_FAUILER:
    case CANCEL_APPT_FAUILER:
    case GET_APPT_CODE_FAUILER:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    // case GET_UPCOMING_APPTS_SUCCESS:
    //   return {
    //     ...state,
    //     data: payload,
    //     loading: false,
    //   };
    case GET_UPCOMING_APPTS_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          hasMore: payload?.hasMore ?? 0,
          pageNo:
            payload?.hasMore ?? 0 === 1
              ? state.data.pageNo + 1
              : state.data.pageNo,
          upcoming_appointment: payload?.upcoming_appointment ?? [],
        },
        loading: false,
      };
    case GET_MORE_UPCOMMING_APPTS_SUCCESS:
      const hs1 = state.data.upcoming_appointment;
      const hs2 = payload?.upcoming_appointment ?? [];
      const hsA = [...hs1, ...hs2];

      return {
        ...state,
        data: {
          ...state.data,
          hasMore: payload?.hasMore ?? 0,
          pageNo:
            payload?.hasMore ?? 0 === 1
              ? state.data.pageNo + 1
              : state.data.pageNo,
          upcoming_appointment: hsA,
        },
        loading: false,
      };
    case UPDATE_APPT_SUCCESS:
      console.log('DDDD::::  ' + JSON.stringify(state));
      return {
        ...state,
        data: {
          ...state.data,
          upcoming_appointment: state.data.upcoming_appointment.map(appt =>
            appt.id == payload.appointment_id
              ? {
                ...appt,
                appointment_date_from: payload.from_date,
                appointment_date_to: payload.to_date,
              }
              : appt,
          ),
        },
      };
    case GET_APPT_CODE_SUCCESS:
      console.log('DDDD::PP::::  ' + JSON.stringify(payload));
      return {
        ...state,
        data: {
          ...state.data,
          upcoming_appointment: state.data.upcoming_appointment.map(appt =>
            appt.id == payload.appointment_id
              ? {
                ...appt,
                code: payload.code,
              }
              : appt,
          ),
        },
      };
    case CANCEL_APPT_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          upcoming_appointment: state.data.upcoming_appointment.filter(
            appt => appt.id !== payload.id,
          ),
        },
      };
    default:
      return state;
  }
};
