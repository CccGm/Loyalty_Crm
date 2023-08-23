import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext} from 'react';
import RescheduleApptComponent from '../components/RescheduleApptComponent';
import {dashboardNeedRefresh} from '../context/actions/common';
import getUpcomingAppts from '../context/actions/dashboardOps/getUpcomingAppts';
import updateAppt from '../context/actions/dashboardOps/updateAppt';
import {GlobalContext} from '../context/Provider';
const RescheduleApptScreen = () => {
  const navigation = useNavigation();
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {dashRefreshDispatch} = useContext(GlobalContext);
  const {apptsUpcomingDispatch} = useContext(GlobalContext);

  const {navigate} = useNavigation();
  const route = useRoute();
  console.log('RAS:: ' + JSON.stringify(route.params?.item));

  const updateAppts = updateObj => {
    
    updateAppt(updateObj)(
      loaderDispatch,
      bottomMessageDispatch,
      apptsUpcomingDispatch,
    )(() => {
      dashboardNeedRefresh(dashRefreshDispatch);
      getUpcomingAppts(
        loaderDispatch,
        bottomMessageDispatch,
        apptsUpcomingDispatch,
      )(() => {});
      navigation.dispatch(StackActions.pop(2));
    });
  };

  return (
    <RescheduleApptComponent
      item={route.params?.item}
      updateAppt={updateAppts}
    />
  );
};

export default RescheduleApptScreen;
