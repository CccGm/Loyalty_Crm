import React, {createContext, useReducer} from 'react';
import apptsHistoryInitialState from './initialStates/apptsHistoryInitialState';
import apptsUpcomingInitialState from './initialStates/apptsUpcomingInitialState';
import authInitialState from './initialStates/authInitialState';
import bottomMsgInitialState from './initialStates/bottomMsgInitialState';
import bsInitialState from './initialStates/bsInitialState';
import buyVoucherIntialState from './initialStates/buyVoucherIntialState';
import dashboardIntialState from './initialStates/dashboardIntialState';
import dashRefreshInitialState from './initialStates/dashRefreshInitialState';
import loaderInitialState from './initialStates/loaderInitialState';
import myVoucherIntialState from './initialStates/myVoucherIntialState';
import systemIntialState from './initialStates/systemIntialState';
import voucherInitialState from './initialStates/voucherInitialState';
import apptsHistoryReducer from './reducers/apptsHistoryReducer';
import apptsUpcomingReducer from './reducers/apptsUpcomingReducer';
import authReducer from './reducers/authReducer';
import bottomMsgReducer from './reducers/bottomMsgReducer';
import bsReducer from './reducers/bsReducer';
import buyVoucherReducer from './reducers/buyVoucherReducer';
import dashboardReducer from './reducers/dashboardReducer';
import dashRefreshReducer from './reducers/dashRefreshReducer';
import loaderReducer from './reducers/loaderReducer';
import myVoucherReducer from './reducers/myVoucherReducer';
import systemconfigReducer from './reducers/systemconfigReducer';
import voucherReducer from './reducers/voucherReducer';
import bannerReducer from './reducers/bannerReducer';
import bannerIntitialState from './initialStates/bannerIntitialState';
import servicesIntialState from './initialStates/servicesIntialState';
import servicesReducer from './reducers/servicesReducer';
import bookAppointmentIntialState from './initialStates/bookAppointmentIntialState';
import bookAppointmentReducer from './reducers/bookAppointmentReducer';
import profileIntialState from './initialStates/profileIntialState';
import profileReducer from './reducers/profileReducer';
import bookServicesCheckIntialState from './initialStates/bookServicesCheckIntialState';
import bookServicesCheckReducer from './reducers/bookServicesCheckReducer';
import verifyOtpReducer from './reducers/verifyOtpReducer';
import VerifyOtpIntialState from './initialStates/VerifyOtpIntialState';
import serviceHistoryIntialState from './initialStates/serviceHistoryIntialState';
import serviceHistoryReducer from './reducers/serviceHistoryReducer';
import VouchersHistoryIntialState from './initialStates/VouchersHistoryIntialState';
import vouchersHistoryReducer from './reducers/vouchersHistoryReducer';
import pointHistoryReducer from './reducers/pointHistoryReducer';
import pointHistoryIntialState from './initialStates/pointHistoryIntialState';
import pointUsedReducer from './reducers/pointUsedReducer';
import pointUsedIntialState from './initialStates/pointUsedIntialState';
import guestdashboardReducer from './reducers/guestdashboardReducer';
import guestdashboardIntialState from './initialStates/guestdashboardIntialState';
import UnpaidIntialState from './initialStates/UnpaidIntialState';
import UnpaidReducer from './reducers/UnpaidReducer';
export const GlobalContext = createContext({});

export const GlobalProvider = ({children}) => {
  const [loaderState, loaderDispatch] = useReducer(
    loaderReducer,
    loaderInitialState,
  );
  const [bottomMessageState, bottomMessageDispatch] = useReducer(
    bottomMsgReducer,
    bottomMsgInitialState,
  );
  const [bsState, bsDispatch] = useReducer(bsReducer, bsInitialState);
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [dashRefreshState, dashRefreshDispatch] = useReducer(
    dashRefreshReducer,
    dashRefreshInitialState,
  );
  const [apptsUpcomingState, apptsUpcomingDispatch] = useReducer(
    apptsUpcomingReducer,
    apptsUpcomingInitialState,
  );
  const [apptsHistoryState, apptsHistoryDispatch] = useReducer(
    apptsHistoryReducer,
    apptsHistoryInitialState,
  );
  const [voucherState, voucherDispatch] = useReducer(
    voucherReducer,
    voucherInitialState,
  );
  const [myvoucherState, myVoucherDispatch] = useReducer(
    myVoucherReducer,
    myVoucherIntialState,
  );
  const [systemConfigState, systemConfigDispatch] = useReducer(
    systemconfigReducer,
    systemIntialState,
  );
  const [dashboardState, dashBoardDispatch] = useReducer(
    dashboardReducer,
    dashboardIntialState,
  );
  const [buyVoucherState, buyVoucherDispatch] = useReducer(
    buyVoucherReducer,
    buyVoucherIntialState
  );

  const [bookAppointmentState, bookAppointmenDispatch] = useReducer(
    bookAppointmentReducer,
    bookAppointmentIntialState
  );

  const [bannerState, bannerDispatch] = useReducer(
    bannerReducer,
    bannerIntitialState
  );

  const [servicesState, servicesDispatch] = useReducer(
    servicesReducer,
    servicesIntialState
  );
  const [profileState,profileDispatch] = useReducer(
    profileReducer,
    profileIntialState
  );
  const [bookServiescheckState,bookServiescheckDispatch] = useReducer(
    bookServicesCheckReducer,
    bookServicesCheckIntialState
  );

  const [verifyOtpState,verifyOtpDispatch] = useReducer(
    verifyOtpReducer,
    VerifyOtpIntialState
  );

  const [ServieceHistoryState,ServieceHistoryDispatch] = useReducer(
    serviceHistoryReducer,
    serviceHistoryIntialState
  );

  const [VouchersHistoryState,VouchersHistoryDispatch] = useReducer(
    vouchersHistoryReducer,
    VouchersHistoryIntialState,
  );

  const [PointHistoryState,PointHistoryDispatch] = useReducer(
    pointHistoryReducer,
    pointHistoryIntialState,
  );
  const [PointUsedState,PointUsedDispatch] = useReducer(
    pointUsedReducer,
    pointUsedIntialState,
  );
  const [GuestDashState,GuestDashDispatch] = useReducer(
    guestdashboardReducer,
    guestdashboardIntialState,
  );

  const [UnpaidState,UnpaidDispatch] = useReducer(
    UnpaidReducer,
    UnpaidIntialState,
  );


  

  
  return (
    <GlobalContext.Provider
      value={{
        loaderState,
        bottomMessageState,
        bsState,
        authState,
        dashRefreshState,
        apptsUpcomingState,
        apptsHistoryState,
        voucherState,
        systemConfigState,
        myvoucherState,
        dashboardState,
        buyVoucherState,
        bannerState,
        servicesState,
        bookAppointmentState,
        profileState,
        bookServiescheckState,
        verifyOtpState,
        ServieceHistoryState,
        VouchersHistoryState,
        PointHistoryState,
        PointUsedState,
        GuestDashState,
        UnpaidState,
        systemConfigDispatch,
        loaderDispatch,
        bottomMessageDispatch,
        bsDispatch,
        authDispatch,
        dashRefreshDispatch,
        apptsUpcomingDispatch,
        apptsHistoryDispatch,
        voucherDispatch,
        myVoucherDispatch,
        dashBoardDispatch,
        buyVoucherDispatch,
        bannerDispatch,
        servicesDispatch,
        bookAppointmenDispatch,
        profileDispatch,
        bookServiescheckDispatch,
        verifyOtpDispatch,
        ServieceHistoryDispatch,
        VouchersHistoryDispatch,
        PointHistoryDispatch,
        PointUsedDispatch,
        GuestDashDispatch,
        UnpaidDispatch
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
