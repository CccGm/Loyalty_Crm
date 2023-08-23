import {
  ALREADY_LOGGEDIN,
  DASH_REFRESH_F,
  DASH_REFRESH_T,
  GET_SYSTEM_CONFIG_SUCCESS,
  HIDE_BS,
  HIDE_LOADING,
  MESSAGE_CLEAR,
  MESSAGE_FAUILER,
  MESSAGE_INFO,
  MESSAGE_SUCCESS,
  MESSAGE_WARNING,
  SHOW_BS,
  SHOW_LOADING,
  GET_BANNER_SUCCESS,
  GET_FCM_TOKEN,
  GET_TAB_INDEX,
  GET_SERVICE_TAB_INDEX,
  GET_POINT_TAB_INDEX,
  GET_TAB_VIEW
} from '../../constants/actionTypes';

export const showLoding = dispatch => dispatch({ type: SHOW_LOADING });
export const hideLoding = dispatch => dispatch({ type: HIDE_LOADING });

export const successMessage = (dispatch, message, long) =>
  dispatch({ type: MESSAGE_SUCCESS, message: message, long: long });
export const warningMessage = (dispatch, message, long) =>
  dispatch({ type: MESSAGE_WARNING, message: message, long: long });
export const errorMessage = (dispatch, message, long) =>
  dispatch({ type: MESSAGE_FAUILER, message: message, long: long });
export const infoMessage = (dispatch, message, long) =>
  dispatch({ type: MESSAGE_INFO, message: message, long: long });
export const clearMessage = (dispatch, message, long) =>
  dispatch({ type: MESSAGE_CLEAR, message: message, long: long });

export const showBS = (dispatch, body,canceledOnTouchOutside ) =>{
  dispatch({type: SHOW_BS,body: body,canceledOnTouchOutside: canceledOnTouchOutside});
}


export const hideBS = dispatch => dispatch({type: HIDE_BS});
export const alreadyLoggedIn = dispatch => dispatch({ type: ALREADY_LOGGEDIN });

export const dashboardNeedRefresh = dispatch =>
  dispatch({ type: DASH_REFRESH_T });
export const dashboardNotNeedRefresh = dispatch =>
  dispatch({ type: DASH_REFRESH_F });

export const getSystemConfig = (dispatch, data) => {
  var data = JSON.parse(data)
  dispatch({ type: GET_SYSTEM_CONFIG_SUCCESS, payload: data });
}
export const getbannerData = (dispatch, data) => {
  dispatch({ type:GET_BANNER_SUCCESS , payload: data });
}

export const getfcmtoken = (dispatch, data) => {
  console.log("GET_FCM_TOKEN",data)
  dispatch({ type:GET_FCM_TOKEN , payload: data });
}

export const getabindex = (dispatch, data) => {
  console.log("GET_TAB_INDEX",data)
  dispatch({ type:GET_TAB_INDEX , payload: data });
}

export const getServicetabIndex = (dispatch, data) => {
  console.log("GET_SERVICE_TAB_INDEX",data)
  dispatch({ type:GET_SERVICE_TAB_INDEX , payload: data });
}

export const getPointndex = (dispatch, data) => {
  console.log("GET_POINT_TAB_INDEX",data)
  dispatch({ type:GET_POINT_TAB_INDEX , payload: data });
}


export const gettabviewdata = (dispatch,data) => {
  // console.log("GET_POINT_TAB_INDEX",data)
  dispatch({ type:GET_TAB_VIEW , payload: data });
}



