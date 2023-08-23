import {GET_POINT_TAB_INDEX, GET_SERVICE_TAB_INDEX, GET_TAB_INDEX, GET_TAB_VIEW, HIDE_BS, SHOW_BS} from '../../constants/actionTypes';

export default bsReducer = (state, {type, body, canceledOnTouchOutside,payload}) => {
  console.log(payload)
  switch (type) {
    case SHOW_BS:
      return {
        ...state,
        visible: true,
        canceledOnTouchOutside: canceledOnTouchOutside,
        body: body,
      };
    case HIDE_BS:
      return {
        ...state,
        visible: false,
        canceledOnTouchOutside: true,
        body: null,
      };
     case GET_TAB_INDEX:
       return{
        ...state,
        visible: false,
        canceledOnTouchOutside: true,
        body: null,
        index:payload
       }
       case GET_SERVICE_TAB_INDEX:
         return{
          ...state,
          visible: false,
          canceledOnTouchOutside: true,
          body: null,
          sindex:payload
         }
         case GET_POINT_TAB_INDEX:
          return{
            ...state,
            visible: false,
            canceledOnTouchOutside: true,
            body: null,
            lindex:payload
           }
           case GET_TAB_VIEW:
            return{
              ...state,
              visible: false,
              canceledOnTouchOutside: true,
              body: null,
              lindex:payload,
              btvisible:payload
             }
    default:
      return state;
  }
};
