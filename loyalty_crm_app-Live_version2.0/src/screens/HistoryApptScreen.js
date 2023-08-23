import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext} from 'react';
import HistoryApptDetailComponent from '../components/HistoryApptDetailComponent';
import {GlobalContext} from '../context/Provider';

const HistoryApptScreen = () => {
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {authDispatch} = useContext(GlobalContext);

  const {navigate} = useNavigation();
  const route = useRoute();
  console.log('HAS:: ' + JSON.stringify(route.params?.item));
  return <HistoryApptDetailComponent item={route.params?.item} />;
};

export default HistoryApptScreen;
