import { useNavigation, useRoute ,StackActions} from '@react-navigation/native';
import React, { useContext } from 'react';
import VoucherDetailComponent from '../components/VoucherDetailComponent';
import { dashboardNeedRefresh } from '../context/actions/common';
import buyVoucher from '../context/actions/dashboardOps/buyVoucher';
import GetCustomerVoucher from '../context/actions/dashboardOps/GetCustomerVoucher';
import { GlobalContext } from '../context/Provider';

const VoucherScreen = () => {
  const { loaderDispatch } = useContext(GlobalContext);
  const { bottomMessageDispatch } = useContext(GlobalContext);
  const { authDispatch } = useContext(GlobalContext);
  const { dashRefreshDispatch } = useContext(GlobalContext);
  const { buyVoucherDispatch } = useContext(GlobalContext);
  const { myVoucherDispatch } = useContext(GlobalContext);
  const navigation = useNavigation();
  const route = useRoute();
  console.log('VS:: ' + JSON.stringify(route.params?.item));

  const buyVouchers = updateObj => {
    buyVoucher(updateObj)(
      loaderDispatch,
      bottomMessageDispatch,
      buyVoucherDispatch,
    )(() => {
      GetCustomerVoucher(
        loaderDispatch,
        bottomMessageDispatch,
        myVoucherDispatch,
      )(() => { });
      dashboardNeedRefresh(dashRefreshDispatch);
      navigation.dispatch(StackActions.pop(1));
    });
  };
  return <VoucherDetailComponent
    item={route.params?.item}
    buyVoucher={buyVouchers}
  />;
};

export default VoucherScreen;
