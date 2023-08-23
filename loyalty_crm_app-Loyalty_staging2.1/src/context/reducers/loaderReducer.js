import {HIDE_LOADING, SHOW_LOADING} from '../../constants/actionTypes';

export default loaderReducer = (state, {type}) => {
  switch (type) {
    case SHOW_LOADING:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case HIDE_LOADING:
      return state.counter > 0
        ? {
            ...state,
            counter: state.counter - 1,
          }
        : {
            ...state,
          };
    default:
      return state;
  }
};
