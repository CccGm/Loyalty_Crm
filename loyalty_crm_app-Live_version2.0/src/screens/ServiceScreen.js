import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import ServiceComponent from '../components/ServiceComponent';
import { MY_SERVICE_DETAIL } from '../constants/routeName';
import {GlobalContext} from '../context/Provider';

const ServiceScreen = () => {
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);

  const {navigate} = useNavigation();

  function handleActiveAppoimentClick(item) {
    navigate(MY_SERVICE_DETAIL, { item ,active:"active"});
  }

  function handleHistoryItemClick(item) {
    navigate(MY_SERVICE_DETAIL, { item,history:"history" });
  }

  

  return <ServiceComponent 
  ActiveItemClick={(item) => handleActiveAppoimentClick(item)}
  historyItemClick={(item) => handleHistoryItemClick(item)} />;
};

export default ServiceScreen;
