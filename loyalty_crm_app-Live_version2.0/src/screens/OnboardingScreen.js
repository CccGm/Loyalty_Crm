import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Text } from 'react-native';
import OnboardingComponent from '../components/OnboardingComponent';
import { GlobalContext } from '../context/Provider';
const OnboardingScreen = () => {
  const { bannerState } = useContext(GlobalContext);
  return (<OnboardingComponent
   bannerData={bannerState.data}
  />
  ) 
};

export default OnboardingScreen;
