import {
 GET_UNPAID_LOADING,
 GET_UNPAID_SUCCESS,
 GET_UNPAID_FAUILER,
 GET_MORE_UNPAID_SUCCESS,
  } from '../../constants/actionTypes';
  
  export default UnpaidReducer = (state, {type, payload}) => {
    switch (type) {
      case GET_UNPAID_LOADING:
        return {
          ...state,
          loading: true,
        };
      case GET_UNPAID_FAUILER:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case GET_UNPAID_SUCCESS:
        return {
          ...state,
          data: {
            ...state.data,
            hasMore: payload?.hasMore ?? 0,
            pageNo:
              payload?.hasMore ?? 0 === 1
                ? state.data.pageNo + 1
                : state.data.pageNo,
            list: payload?.list ?? [],
          }
        }
        case GET_MORE_UNPAID_SUCCESS:
          const hs1 = state.data.list;
          const hs2 = payload?.list ?? [];
          const hsA = [...hs1, ...hs2];
          console.log("hs1",hs1)
          console.log("hs2",hs2)
          console.log("hsA",hsA)
          console.log("payload", state.data.pageNo)

          return {
            ...state,
            data: {
              ...state.data,
              hasMore: payload?.hasMore ?? 0,
              pageNo:
                payload?.hasMore ?? 0 == 1
                  ? state.data.pageNo + 1
                  : 1,
                  list: hsA,
            },
            loading: false,
          };
      default:
        return state;
    }
  };
  