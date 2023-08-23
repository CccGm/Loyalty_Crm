import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import UpcomingApptDetailComponent from '../components/UpcomingApptDetailComponent';
import { dashboardNeedRefresh } from '../context/actions/common';
import cancelAppt from '../context/actions/dashboardOps/cancelAppt';
import getServices from '../context/actions/dashboardOps/getServices';
import { GlobalContext } from '../context/Provider';

const UpcomingApptScreen = () => {
  const navigation = useNavigation();

  const { loaderDispatch } = useContext(GlobalContext);
  const { bottomMessageDispatch } = useContext(GlobalContext);
  const { dashRefreshDispatch } = useContext(GlobalContext);
  const { apptsUpcomingDispatch } = useContext(GlobalContext);
  const { servicesDispatch } = useContext(GlobalContext);

  const { navigate } = useNavigation();
  const route = useRoute();
  console.log('UAS:: ' + JSON.stringify(route.params?.item));

  const cancelAppts = item => {
    console.log('cancel appt: ' + item.id);
    cancelAppt(item.id)(
      loaderDispatch,
      bottomMessageDispatch,
      apptsUpcomingDispatch,
    )(() => {
      getServices(
        loaderDispatch,
        bottomMessageDispatch,
        servicesDispatch,
      )(() => {
      });
      dashboardNeedRefresh(dashRefreshDispatch);
      navigation.dispatch(StackActions.pop(1));
    });
  };


    

  return (
    <UpcomingApptDetailComponent
      item={route.params?.item}
      cancelAppt={cancelAppts}
    />
  );
};

export default UpcomingApptScreen;
