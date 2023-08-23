import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import LoyaltyPointComponent from '../components/LoyaltyPointComponent';
import { GlobalContext } from '../context/Provider';

const LoyaltyPointScreen = () => {
  const { loaderDispatch } = useContext(GlobalContext);
  const { bottomMessageDispatch } = useContext(GlobalContext);
  const { authDispatch } = useContext(GlobalContext);

  const { navigate } = useNavigation();

  const {voucherState: { data: voucherData }} = useContext(GlobalContext);
  const {myvoucherState} = useContext(GlobalContext);
  const {VouchersHistoryState} = useContext(GlobalContext);
  console.log("VouchersHistoryState",VouchersHistoryState)

  return (
    <LoyaltyPointComponent
      voucherData={voucherData.list}
      myVoucherData={myvoucherState.data.list}
      VouchersHistoryData={VouchersHistoryState.data.list}
      
    />
  );
};

export default LoyaltyPointScreen;

