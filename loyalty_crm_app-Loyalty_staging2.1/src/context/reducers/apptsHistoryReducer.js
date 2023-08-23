import {
  GET_HISTORY_APPTS_FAUILER,
  GET_HISTORY_APPTS_LOADING,
  GET_HISTORY_APPTS_SUCCESS,
  GET_MORE_HISTORY_APPTS_SUCCESS,
} from '../../constants/actionTypes';

export default apptsReducer = (state, {type, payload}) => {
  
  switch (type) {
    case GET_HISTORY_APPTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_HISTORY_APPTS_FAUILER:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_HISTORY_APPTS_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          hasMore: payload?.hasMore ?? 0,
          pageNo:
            payload?.hasMore ?? 0 === 1
              ? state.data.pageNo + 1
              : state.data.pageNo,
          history_appointment: payload?.history_appointment ?? [],
        },
        loading: false,
      };
    case GET_MORE_HISTORY_APPTS_SUCCESS:
      const hs1 = state.data.history_appointment;
      const hs2 = payload?.history_appointment ?? [];
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
          history_appointment: hsA,
        },
        loading: false,
      };
    default:
      return state;
  }
};
