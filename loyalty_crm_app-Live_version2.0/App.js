import React, { useContext, useEffect, useMemo, useState } from 'react';
// import { SafeAreaView, Alert } from 'react-native';
import { requestUserPermission,notificationListner } from './src/helpers/notificationServices';
import { GlobalProvider } from './src/context/Provider';
import { AppNavContainer } from './src/routes';
import messaging from '@react-native-firebase/messaging';
import ForegroundHandler from './src/helpers/ForegroundHandler';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {


 

  useEffect(() => {
    
    requestUserPermission()
    notificationListner()
  
  }, []);

  return (
    <GlobalProvider>
      <ForegroundHandler/>
      <SafeAreaView style={{ flex: 1}}>
      <AppNavContainer />
      </SafeAreaView>
    </GlobalProvider>
  );
};
export default App;
