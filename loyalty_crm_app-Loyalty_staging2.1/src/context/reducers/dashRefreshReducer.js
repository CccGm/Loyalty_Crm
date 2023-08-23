import {DASH_REFRESH_F, DASH_REFRESH_T} from '../../constants/actionTypes';

export default dashRefreshReducer = (state, {type}) => {
  switch (type) {
    case DASH_REFRESH_T:
      return state.needRefresh
        ? {
            ...state,
          }
        : {
            needRefresh: true,
          };
    case DASH_REFRESH_F:
      return state.needRefresh
        ? {
            needRefresh: false,
          }
        : {
            ...state,
          };
    default:
      return state;
  }
};
