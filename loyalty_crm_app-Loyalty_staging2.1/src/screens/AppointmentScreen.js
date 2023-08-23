import { useNavigation } from '@react-navigation/native';
import React, { useContext, useRef, useState, useEffect } from 'react';
import AppointmentComponent from '../components/AppointmentComponent';
import {
  HISTORY_APPOINTMENT,
  UPCOMINGS_APPOINTMENT,
} from '../constants/routeName';
import { GlobalContext } from '../context/Provider';

const AppointmentScreen = (data) => {
  console.log("viewall",)
  const { loaderDispatch } = useContext(GlobalContext);
  const { bottomMessageDispatch } = useContext(GlobalContext);
  const {
    apptsUpcomingState: { data: upcomingData },
  } = useContext(GlobalContext);
  const {
    apptsHistoryState: { data: historyData },
  } = useContext(GlobalContext);
  const { bsState } = useContext(GlobalContext);
  console.log("bsState",bsState)
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


  const { navigate } = useNavigation();


  // console.log("upcomingData", upcomingData.upcoming_appointment)
  // console.log("historyData", historyData.history_appointment)

  function handleUpcomingAppoimentClick(item) {
    navigate(UPCOMINGS_APPOINTMENT, { item });
  }

  function handleHistoryItemClick(item) {
    navigate(HISTORY_APPOINTMENT, { item });
  }


  return (
    <AppointmentComponent
      upcomingApptData={upcomingData}
      historyApptData={historyData}
      upcomingItemClick={(item) => handleUpcomingAppoimentClick(item)}
      historyItemClick={(item) => handleHistoryItemClick(item)}
      data={data}
    />
  );
};

export default AppointmentScreen;
