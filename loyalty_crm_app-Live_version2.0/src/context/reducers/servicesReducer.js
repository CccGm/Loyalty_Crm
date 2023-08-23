import {
 GET_SERVICES_LOADING,
 GET_SERVICES_SUCCESS,
 GET_SERVICES_FAUILER,
 GET_MORE_SERVICES_SUCCESS,
  } from '../../constants/actionTypes';
  
  export default servicesReducer = (state, {type, payload}) => {
    switch (type) {
      case GET_SERVICES_LOADING:
        return {
          ...state,
          loading: true,
        };
      case GET_SERVICES_FAUILER:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case GET_SERVICES_SUCCESS:
        console.log("payload?.hasMore",payload?.hasMore)
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
        case GET_MORE_SERVICES_SUCCESS:
          const hs1 = state.data.list;
          const hs2 = payload?.list ?? [];
          const hsA = [...hs1, ...hs2];
          console.log("hs1",hs1)
          console.log("hs2",hs2)
          console.log("hsA",hsA)
          console.log("payload", payload?.hasMore)

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
  