import {
  GET_MORE_VOUCHER_SUCCESS,
  GET_VOUCHER_FAUILER,
  GET_VOUCHER_LOADING,
  GET_VOUCHER_SUCCESS,
} from '../../constants/actionTypes';

export default voucherReducer = (state, {type, payload}) => {
  
  switch (type) {
    case GET_VOUCHER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_VOUCHER_FAUILER:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_VOUCHER_SUCCESS:
      return {
        ...state,
        data:{
          ...state.data,
          hasMore: payload?.hasMore ?? 0,
          pageNo:
            payload?.hasMore ?? 0 === 1
              ? state.data.pageNo + 1
              : state.data.pageNo,
          list: payload?.list ?? [],
        }
      }
      case GET_MORE_VOUCHER_SUCCESS:
        const hs1 = state.data.list;
        const hs2 = payload?.list ?? [];
        const hsA = [...hs1, ...hs2];
        console.log("called",hsA)
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
