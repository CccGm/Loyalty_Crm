import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext} from 'react';
import BookApptComponent from '../components/BookApptComponent';
import { dashboardNeedRefresh } from '../context/actions/common';
import bookAppointment from '../context/actions/dashboardOps/bookAppointment';
import getServices from '../context/actions/dashboardOps/getServices';
import getUpcomingAppts from '../context/actions/dashboardOps/getUpcomingAppts';

import {GlobalContext} from '../context/Provider';
const BookApptScreen = () => {
  const navigation = useNavigation();
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {dashRefreshDispatch} = useContext(GlobalContext);
  const {bookAppointmenDispatch} = useContext(GlobalContext);
  const {servicesDispatch} = useContext(GlobalContext);
  const {apptsUpcomingDispatch} = useContext(GlobalContext);
  
  const {navigate} = useNavigation();
  const route = useRoute();
  console.log('BAS:: ' + JSON.stringify(route.params?.item));

  const bookAppts = updateObj => {
   
    bookAppointment(updateObj)(
        loaderDispatch,
        bottomMessageDispatch,
        bookAppointmenDispatch,
      )(() => {
        getServices(
          loaderDispatch,
          bottomMessageDispatch,
          servicesDispatch,
        )(() => { });
        getUpcomingAppts(
          loaderDispatch,
          bottomMessageDispatch,
          apptsUpcomingDispatch,
        )(() => {
          
        });
        dashboardNeedRefresh(dashRefreshDispatch);
        navigation.dispatch(StackActions.pop(2));
      });
    
    };
  
    // bookAppt(updateObj)(
    //   loaderDispatch,
    //   bottomMessageDispatch,
    //   apptsUpcomingDispatch,
    // )(() => {
    //   dashboardNeedRefresh(dashRefreshDispatch);
    //   navigation.dispatch(StackActions.pop(2));
    // });

  return <BookApptComponent item={route.params?.item} bookAppt={bookAppts}  />;
};

export default BookApptScreen;
