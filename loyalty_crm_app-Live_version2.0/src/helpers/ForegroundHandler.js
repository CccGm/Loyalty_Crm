import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React, {useContext, useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import getUpcomingAppts from '../context/actions/dashboardOps/getUpcomingAppts';
import {GlobalContext} from '../context/Provider';
import getHistoryAppts from '../context/actions/dashboardOps/getHistoryAppts';
import getServices from '../context/actions/dashboardOps/getServices';
import getDashboard from '../context/actions/dashboardOps/getDashboard';
import getServiceHistory from '../context/actions/dashboardOps/getServiceHistory';
import GetPointsHistory from '../context/actions/dashboardOps/GetPointsHistory';
import getPointUsed from '../context/actions/dashboardOps/getPointUsed';
import NavigationService from './NavigationService';
import {POINT_HISTORY} from '../constants/routeName';
import getsytemconfig from '../context/actions/auth/getsytemconfig';

const ForegroundHandler = () => {
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {apptsUpcomingDispatch} = useContext(GlobalContext);
  const {apptsHistoryDispatch} = useContext(GlobalContext);
  const {ServieceHistoryDispatch} = useContext(GlobalContext);
  const {servicesDispatch} = useContext(GlobalContext);
  const {PointHistoryDispatch} = useContext(GlobalContext);
  const {PointUsedDispatch} = useContext(GlobalContext);
  const {systemConfigDispatch} = useContext(GlobalContext);

  const [internetCheck, setInternetCheck] = useState(0);

  const {
    dashRefreshState: {needRefresh},
    dashRefreshDispatch,
  } = useContext(GlobalContext);
  const {dashBoardDispatch} = useContext(GlobalContext);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      const {notification, messageId, data} = remoteMessage;

      if (remoteMessage) {
        getDashboard(
          loaderDispatch,
          bottomMessageDispatch,
          dashBoardDispatch,
        )(() => {});
        console.log('remoteMessage', remoteMessage);
        // const focus = navigation.addListener('focus', () => {
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
      }
      getServices(
        loaderDispatch,
        bottomMessageDispatch,
        servicesDispatch,
      )(() => {});
      getServiceHistory(
        loaderDispatch,
        bottomMessageDispatch,
        ServieceHistoryDispatch,
      )(() => {});

      GetPointsHistory(
        loaderDispatch,
        bottomMessageDispatch,
        PointHistoryDispatch,
      )(() => {});

      getsytemconfig(
        loaderDispatch,
        bottomMessageDispatch,
        systemConfigDispatch,
      )(() => {});

      getPointUsed(
        loaderDispatch,
        bottomMessageDispatch,
        PointUsedDispatch,
      )(() => {});
      if (Platform.OS == 'ios') {
        PushNotificationIOS.addNotificationRequest({
          id: messageId,
          body: notification.body,
          title: notification.title,
          sound: 'default',
          ignoreInForeground: false,
        });
        PushNotification.configure({
          // (optional) Called when Token is generated (iOS and Android)
          onRegister: function (token) {
            console.log('TOKEN:', token);
          },

          // (required) Called when a remote or local notification is opened or received
          onNotification: function (notification) {
            if (
              notification.userInteraction == true &&
              data.redirect == 'reward_points'
            ) {
              NavigationService.navigate(POINT_HISTORY);
            }
            // if(notification){
            //
            // }
            console.log('NOTIFICATIONPROcess:', notification);

            // process the notification
          },
        });
      } else {
        PushNotification.localNotification({
          channelId: 'fcm_fallback_notification_channel',
          message: notification.body,
          title: notification.title,
          soundName: 'default',
          vibrate: true,
          playSound: true,
          ignoreInForeground: false,
          // onMessage: data.redirect == "reward_points" ? createTwoButtonAlert() : null
        });

        PushNotification.configure({
          // (optional) Called when Token is generated (iOS and Android)
          onRegister: function (token) {
            console.log('TOKEN:', token);
          },

          // (required) Called when a remote or local notification is opened or received
          onNotification: function (notification) {
            if (
              notification.ignoreInForeground == false &&
              data.redirect == 'reward_points'
            ) {
              NavigationService.navigate(POINT_HISTORY);
            }
            // if(notification){
            //
            // }
            console.log('NOTIFICATIONPROcess:', notification);

            // process the notification
          },
        });
      }
    });

    return unsubscribe;
  }, [internetCheck]);
  return null;
};

export default ForegroundHandler;
