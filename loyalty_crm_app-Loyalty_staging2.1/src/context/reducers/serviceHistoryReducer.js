import {
    GET_HISTORY_SERVICES_FAUILER,
    GET_HISTORY_SERVICES_LOADING,
    GET_HISTORY_SERVICES_SUCCESS,
    GET_MORE_HISTORY_SERVICES_SUCCESS
     } from '../../constants/actionTypes';
     
     export default serviceHistoryReducer = (state, {type, payload}) => {
       switch (type) {
         case GET_HISTORY_SERVICES_LOADING:
           return {
             ...state,
             loading: true,
           };
         case GET_HISTORY_SERVICES_FAUILER:
           return {
             ...state,
             error: payload,
             loading: false,
           };
         case GET_HISTORY_SERVICES_SUCCESS:
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
               bookbtn:false
             }
           }
           case GET_MORE_HISTORY_SERVICES_SUCCESS:
             const hs1 = state.data.list;
             const hs2 = payload?.list ?? [];
             const hsA = [...hs1, ...hs2];
          
   
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
     