import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext} from 'react';
import ServiceDetailComponent from '../components/ServiceDetailComponent';
import {GlobalContext} from '../context/Provider';
import bookingAvailablecheck from '../context/actions/dashboardOps/bookingAvailablecheck';
import { BOOK_APPT } from '../constants/routeName';


const ServiceDetailScreen = () => {
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {bookServiescheckDispatch} = useContext(GlobalContext);
  const {bookServiescheckState} = useContext(GlobalContext);
  const {navigate} = useNavigation();
  const route = useRoute();



  const bookAppts = (updateObj,itemdata) => {
    
    bookingAvailablecheck(updateObj)(
      loaderDispatch,
      bottomMessageDispatch,
      bookServiescheckDispatch,
    )((data) => {
       if(data.allowBooking == true){
        navigate(BOOK_APPT, { item: itemdata.item, count: itemdata.count });
       }
    });

    };

  

  return <ServiceDetailComponent item={route.params?.item} bookAppt={bookAppts} />;
};

export default ServiceDetailScreen;
