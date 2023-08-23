import {
    GET_POINTS_USED_LOADING,
    GET_POINTS_USED_SUCCESS,
    GET_POINTS_USED_FAUILER,
    GET_MORE_POINTS_USED_SUCCESS,
} from '../../constants/actionTypes';

export default pointUsedReducer = (state, { type, payload }) => {
    switch (type) {
        case GET_POINTS_USED_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_POINTS_USED_FAUILER:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case GET_POINTS_USED_SUCCESS:
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
        case GET_MORE_POINTS_USED_SUCCESS:
            const hs1 = state.data.list;
            const hs2 = payload?.list ?? [];
            const hsA = [...hs1, ...hs2];
            console.log("hs1", hs1)
            console.log("hs2", hs2)
            console.log("hsA", hsA)
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
