import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useRef, useState, useEffect } from 'react';
import AppointmentComponent from '../components/AppointmentComponent';
import PointHistoryComponent from '../components/PointHistoryComponent';
import {
  DASHBOARD,
  HISTORY_APPOINTMENT,
  LOYALTY_POINTS,
  UPCOMINGS_APPOINTMENT,
} from '../constants/routeName';
import { GlobalContext } from '../context/Provider';
import {Text, View, StyleSheet, BackHandler, Alert} from 'react-native';
import LoyaltyPointScreen from './LoyaltyPointScreen';
const PointHistory = (data) => {
 
  const { loaderDispatch } = useContext(GlobalContext);
  const { bottomMessageDispatch } = useContext(GlobalContext);
  
  const {PointHistoryState} = useContext(GlobalContext);
  const {PointUsedState} = useContext(GlobalContext);
  const { bsState } = useContext(GlobalContext);
  console.log("PointHistoryState",PointHistoryState.data.list)
  console.log("viewall",data)
  const navigation = useNavigation();
  const { navigate } = useNavigation();
  const route = useRoute();
  const URL = data.route.params == undefined?"":data.route.params.data;
  console.log("routenavigationApp",data.route.params)
  console.log("routenavigation.",data.route)
  useEffect(() => {
    
    const backAction = () => {
      console.log("urldata",URL)
      if(URL == ""){
       navigate(DASHBOARD)
       return true
      }
      else if(data.route.params.data == "ViewPoint"){
        console.log("DASHBOARDBacK")
        navigation.dispatch(StackActions.pop(1));
        return true;
      }
    
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // const [upcomingAppointmentArr, setUpcomingAppointmentArr] = useState([])
  // const [historyAppointmentArr, setHistoryAppointmentArr] = useState([])
  //     const dataRef = useRef({
  //   upcomingAppointment: upcomingData,
  //   historyAppointment: historyData
  // }).current

  // useEffect(() => {
  //   if (dataRef.upcomingAppointment !== upcomingData) {
  //     setUpcomingAppointmentArr(upcomingData)
  //   }

  //   if (dataRef.historyAppointment !== historyData) {
  //     setHistoryAppointmentArr(historyData)
  //   }

  //   return () => {
  //     dataRef.upcomingAppointment = upcomingData,
  //       dataRef.historyAppointment = historyData
  //   }
  // }, [upcomingData, historyData])




  // console.log("upcomingData", upcomingData.upcoming_appointment)
  // console.log("historyData", historyData.history_appointment)

  function handleUpcomingAppoimentClick(item) {
    navigate(UPCOMINGS_APPOINTMENT, { item });
  }

  function handleHistoryItemClick(item) {
    navigate(HISTORY_APPOINTMENT, { item });
  }

  const updata = [{id:1,date:'22-12-1998',data:[{did:1,time:'8.25PM',appt:"Payment",desc:'Grabe Food', points:"12"},{did:2,time:'8.25PM',appt:"Payment",desc:'Grabe Food', points:"13"}]},{id:2,date:'22-12-1998',data:[{did:1,time:'8.25PM',appt:"Payment",desc:'Grabe Food', points:"2"}]}]
  const hdata = [{id:1,date:'22-12-1998',data:[{did:1,time:'8.25PM',appt:"Payment",desc:'Grabe Food', points:"12"},{did:2,time:'8.25PM',appt:"Payment",desc:'Grabe Food', points:"13"}]},{id:2,date:'22-12-1998',data:[{did:1,time:'8.25PM',appt:"Payment",desc:'Grabe Food', points:"2"}]}]


  return (
    <PointHistoryComponent
      upcomingApptData={PointHistoryState.data.list}
      historyApptData={PointUsedState.data.list}
      upcomingItemClick={(item) => handleUpcomingAppoimentClick(item)}
      historyItemClick={(item) => handleHistoryItemClick(item)}
      data={data}
    />
  );
};

export default PointHistory;
