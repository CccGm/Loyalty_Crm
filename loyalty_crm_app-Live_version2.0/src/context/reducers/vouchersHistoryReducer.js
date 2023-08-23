import {
    GET_HISTORY_VOUCHERS_FAUILER,
    GET_HISTORY_VOUCHERS_LOADING,
    GET_HISTORY_VOUCHERS_SUCCESS,
    GET_MORE_HISTORY_VOUCHERS_SUCCESS
    } from '../../constants/actionTypes';
    
    export default vouchersHistoryReducer = (state, {type, payload}) => {
      switch (type) {
        case GET_HISTORY_VOUCHERS_LOADING:
          return {
            ...state,
            loading: true,
          };
        case GET_HISTORY_VOUCHERS_FAUILER:
          return {
            ...state,
            error: payload,
            loading: false,
          };
        case GET_HISTORY_VOUCHERS_SUCCESS:
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
          case GET_MORE_HISTORY_VOUCHERS_SUCCESS:
            const hs1 = state.data.list;
            console.log("hs1",hs1)
            const hs2 = payload?.list ?? [];
            console.log("hs2",hs2)
            const hsA = [...hs1, ...hs2];
            console.log("hsA",hsA)
            return {
              ...state,
              data: {
                ...state.data,
                hasMore: payload?.hasMore ?? 0,
                pageNo:
                  payload?.hasMore ?? 0 === 1
                    ? state.data.pageNo + 1
                    : state.data.pageNo,
                    list: hsA,
              },
              loading: false,
            };
        default:
          return state;
      }
    };
    