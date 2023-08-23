import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext} from 'react';
import UpcomingApptMixDetailComponent from '../components/UpcomingApptMixDetailComponent';
import {dashboardNeedRefresh} from '../context/actions/common';
import cancelAppt from '../context/actions/dashboardOps/cancelAppt';
import {GlobalContext} from '../context/Provider';

const UpcomingApptMixScreen = () => {
  const navigation = useNavigation();

  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {dashRefreshDispatch} = useContext(GlobalContext);
  const {apptsUpcomingDispatch} = useContext(GlobalContext);

  const {navigate} = useNavigation();
  const route = useRoute();
  console.log('UAS:: ' + JSON.stringify(route.params?.item));

  const cancelAppts = item => {
    console.log('cancel appt: ' + item.id);
    cancelAppt(item.id)(
      loaderDispatch,
      bottomMessageDispatch,
      apptsUpcomingDispatch,
    )(() => {
      dashboardNeedRefresh(dashRefreshDispatch);
      navigation.dispatch(StackActions.pop(1));
    });
  };

  return (
    <UpcomingApptMixDetailComponent
      item={route.params?.item}
      cancelAppt={cancelAppts}
    />
  );
};

export default UpcomingApptMixScreen;
