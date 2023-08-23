import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React, {useContext, useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import getUpcomingAppts from '../context/actions/dashboardOps/getUpcomingAppts';
import {GlobalContext} from '../context/Provider';
import getHistoryAppts from '../context/actions/dashboardOps/getHistoryAppts';
import getServices from '../context/actions/dashboardOps/getServices';
import getDashboard from '../context/actions/dashboardOps/getDashboard';
import getServiceHistory from '../context/actions/dashboardOps/getServiceHistory';

export const BackgroundHandler = async () => {
  console.log('backgroung functoncallled');
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {apptsUpcomingDispatch} = useContext(GlobalContext);
  const {apptsHistoryDispatch} = useContext(GlobalContext);
  const {ServieceHistoryDispatch} = useContext(GlobalContext);
  const {servicesDispatch} = useContext(GlobalContext);
  const [internetCheck, setInternetCheck] = useState(0);
  const {dashBoardDispatch} = useContext(GlobalContext);
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    if (remoteMessage) {
      console.log('remote', remoteMessage);
      getDashboard(
        loaderDispatch,
        bottomMessageDispatch,
        dashBoardDispatch,
      )(() => {});
    }
    getUpcomingAppts(
      loaderDispatch,
      bottomMessageDispatch,
      apptsUpcomingDispatch,
    )(() => {});

    getHistoryAppts(
      loaderDispatch,
      bottomMessageDispatch,
      apptsHistoryDispatch,
    )(() => {});
  });
};
