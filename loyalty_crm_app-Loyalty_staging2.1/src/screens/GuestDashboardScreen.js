import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import DashboardComponent from '../components/DashboardComponent';
import { ACCESS_TOKEN, USER } from '../constants/prefrenceKeys';
import { APPOINTMENT, UPCOMINGS_APPOINTMENT, VOUCHER_DETAIL } from '../constants/routeName';
import logout from '../context/actions/auth/logout';
import logoutSession from '../context/actions/auth/logoutSession';
import { dashboardNotNeedRefresh, getabindex, getPointndex, getServicetabIndex, hideBS } from '../context/actions/common';
import getDashboard from '../context/actions/dashboardOps/getDashboard';
import getProfile from '../context/actions/dashboardOps/getProfile';
import { GlobalContext } from '../context/Provider';
import messaging from '@react-native-firebase/messaging';
import getUpcomingAppts from '../context/actions/dashboardOps/getUpcomingAppts';
import getHistoryAppts from '../context/actions/dashboardOps/getHistoryAppts';
import getServices from '../context/actions/dashboardOps/getServices';
import getServiceHistory from '../context/actions/dashboardOps/getServiceHistory';
import GuestDashboardComponent from '../components/GuestDashboardComponent';
import getGuestDashboard from '../context/actions/dashboardOps/getGuestDashboard';
const GuestDashboardScreen = () => {

  const { loaderDispatch } = useContext(GlobalContext);
  const { bottomMessageDispatch } = useContext(GlobalContext);
  const { dashBoardDispatch } = useContext(GlobalContext);
  const { apptsUpcomingDispatch } = useContext(GlobalContext);
  const { apptsHistoryDispatch } = useContext(GlobalContext);
 
  const { profileDispatch } = useContext(GlobalContext);
  const { dashboardState } = useContext(GlobalContext);
  const { servicesDispatch } = useContext(GlobalContext);
  const { ServieceHistoryDispatch } = useContext(GlobalContext);
 
 
  
  const { profileState } = useContext(GlobalContext);
  
  const { GuestDashDispatch } = useContext(GlobalContext);
  const {navigate} = useNavigation();
  const  navigatation  = useNavigation();
  const {
    dashRefreshState: { needRefresh },
    dashRefreshDispatch,
  } = useContext(GlobalContext);
  const { bsDispatch,authDispatch } = useContext(GlobalContext);
  const [dashboardData, setDashboardData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { GuestDashState } = useContext(GlobalContext);

  console.log("GuestDashState",GuestDashState.data)


  messaging().setBackgroundMessageHandler(async remoteMessage => {
    if(remoteMessage){
      console.log("remote",remoteMessage)
      getGuestDashboard(
        loaderDispatch,
        bottomMessageDispatch,
        GuestDashDispatch,
    )(() => {

    });
    }
    getUpcomingAppts(
      loaderDispatch,
      bottomMessageDispatch,
      apptsUpcomingDispatch,
  )(() => { });

  getHistoryAppts(
      loaderDispatch,
      bottomMessageDispatch,
      apptsHistoryDispatch,
  )(() => { });

  getServices(
    loaderDispatch,
    bottomMessageDispatch,
    servicesDispatch,
)(() => {

});
getServiceHistory(
    loaderDispatch,
    bottomMessageDispatch,
    ServieceHistoryDispatch,
  )(() => {
   
  });
  });



  const logoutClick = () => {
    logoutSession()(loaderDispatch, bottomMessageDispatch, authDispatch);
  };

    // useEffect(() => {
    //   needRefresh && dashboardNotNeedRefresh(dashRefreshDispatch);
    //   setLoading(true);
    //   hideBS(bsDispatch)
    //   getDashboard(
    //     loaderDispatch,
    //     bottomMessageDispatch,
    //     dashBoardDispatch,
    //   )(dashboardData => {
    //     console.log("logoutAllSession",dashboardData)
    //     if(dashboardData.data.message == "Something went wrong." ||dashboardData.data.message == "Authentication failure"){
    //       logoutClick()
    //     }
    //     setLoading(false);
      
        
        
    //   });
  
    //   getProfile(
    //     loaderDispatch,
    //     bottomMessageDispatch,
    //     profileDispatch,
    //   )(() => { });
  
    // }, [needRefresh]);



    React.useEffect(() => {
      // const unsubscribe = navigatation.addListener('focus', () => {
        getabindex(bsDispatch,0)
        getServicetabIndex(bsDispatch,0)
        getPointndex(bsDispatch,0)
        setLoading(true);
        getGuestDashboard(
          loaderDispatch,
          bottomMessageDispatch,
          GuestDashDispatch,
          )(dashboardData => {
            if(dashboardData.data.status == "failure"){
              logoutClick()
            }
            setLoading(false);
          
            
            
          });
      // });
  
      // return unsubscribe;
    }, []);

    function handleApptItemClick(item) {
      getabindex(bsDispatch,0)
      navigate(VOUCHER_DETAIL,{ item: item ,guest:"guest"});
    }

  
 

 

  return (
    <GuestDashboardComponent isLoading={isLoading} dashboardData={GuestDashState.data} profiledata={profileState}  ApptItemClick={(item) => handleApptItemClick(item)} />
  );
};

export default GuestDashboardScreen;
