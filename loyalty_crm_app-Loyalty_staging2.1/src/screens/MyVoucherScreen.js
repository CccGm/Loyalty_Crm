import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext} from 'react';
import MyVoucherDetailComponent from '../components/MyVoucherDetailComponent';
import {GlobalContext} from '../context/Provider';

const MyVoucherScreen = () => {
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {authDispatch} = useContext(GlobalContext);

  const {navigate} = useNavigation();
  const route = useRoute();
  console.log('MVS:: ' + JSON.stringify(route.params?.item));
  return <MyVoucherDetailComponent item={route.params?.item} />;
};

export default MyVoucherScreen;
