import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image } from 'react-native';
import colors from '../assets/theme/colors';
import { FORGOT_PASS, LOGIN, SIGN_UP, ON_BOADRDING, OTP_VERIFY, SET_NEW_PASSWORD, SIGN_UP_OTP_VERIFY, LOYALTY_POINTS, DASHBOARD, APPOINTMENT, MY_SERVICE, PROFILE, VOUCHER_DETAIL, PROFILE1 } from '../constants/routeName';
import DashboardScreen from '../screens/DashboardScreen';
import ForgotPassScreen from '../screens/ForgotPassScreen';
import LoginScreen from '../screens/LoginScreen';
import OtpVerifyScreen from '../screens/OtpVerifyScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import SignUpOtpVerify from '../screens/SignUpOtpVerify';
import SignUpScreen from '../screens/SignUpScreen';
import AppointmentScreen from '../screens/AppointmentScreen';
import ServiceScreen from '../screens/ServiceScreen';
import LoyaltyPointScreen from '../screens/LoyaltyPointScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalContext } from '../context/Provider';
import AlertComponent from '../components/common/AlertComponent';
import GuestDashboardScreen from '../screens/GuestDashboardScreen';
import VoucherScreen from '../screens/VoucherScreen';

const AuthRoute = () => {
  const AuthStack = createStackNavigator();
  const BottomTabNav = createBottomTabNavigator();
  // const {
  //   authState: { isLoggedIn },
  //   authDispatch,
  // } = useContext(GlobalContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);
  const tab = () => {


    useEffect(() => {
      getUser();
    }, []);

   
    const getUser = async () => {
      try {
        authLoaded && setAuthLoaded(false);
        // const user = await AsyncStorage.getItem(USER);
        const accesstoken = await AsyncStorage.getItem(ACCESS_TOKEN);
        console.log("AccesstokenData",accesstoken)
        if (accesstoken) {
          setIsAuthenticated(true);
          setAuthLoaded(true);
          // !isLoggedIn && alreadyLoggedIn(authDispatch);
          
  
        } else {
          console.log("AccesstokenDataelse",accesstoken)
          setIsAuthenticated(false);
          setAuthLoaded(true);  
        }
      } catch (error) { }
    };


 

  return (
    <BottomTabNav.Navigator
      backBehavior="initialRoute"
      screenOptions={({ route }) => ({
        // tabBarVisible: getTabBarVisibility(route),
        tabBarIcon: ({ focused, color, size }) => {
          let src;
          if (route.name === DASHBOARD) {
            src = require('./../assets/images/ic_home.png');
          } else if (route.name === APPOINTMENT) {
            src = require('./../assets/images/ic_appointment.png');
          } else if (route.name === LOYALTY_POINTS) {
            src = require('./../assets/images/ic_loyalty_points.png');
          } else if (route.name === PROFILE1) {
            src = require('./../assets/images/ic_profile.png');
          } else if (route.name === MY_SERVICE) {
            src = require('./../assets/images/ic_service.png');
          }
          return <Image source={src} style={{ opacity: focused ? 1 : 0.5 }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#ffffff',
        inactiveTintColor: '#ffffff80',
        tabStyle: {
          marginVertical: 6,
          borderColor: '#FFFFFF33',
          borderEndWidth: 0.3,
        },
        style: {
          backgroundColor: colors.primary,
          // height: 58,
          borderTopWidth: 0,
        },
      }}>
      <BottomTabNav.Screen name={DASHBOARD} component={GuestDashboardScreen} />
      <BottomTabNav.Screen name={APPOINTMENT} component={isAuthenticated == false?AlertComponent:DashboardScreen} />
      <BottomTabNav.Screen name={MY_SERVICE} component={isAuthenticated == false?AlertComponent:ServiceScreen} />
      <BottomTabNav.Screen
        name={LOYALTY_POINTS}
        component={isAuthenticated == false?AlertComponent:LoyaltyPointScreen}
      />
      {/* <BottomTabNav.Screen
        name={POINT_HISTORY}
        component={PointHistory}
      /> */}

      <BottomTabNav.Screen name={PROFILE1} component={isAuthenticated == false?AlertComponent:ProfileScreen} />
    </BottomTabNav.Navigator>
  )
}
return (
  <AuthStack.Navigator
    initialRouteName={LOGIN}
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
    }}>


    <AuthStack.Screen name={LOGIN} component={LoginScreen} />
    <AuthStack.Screen name={SIGN_UP} component={SignUpScreen} />
    <AuthStack.Screen name={FORGOT_PASS} component={ForgotPassScreen} />
    <AuthStack.Screen name={DASHBOARD} component={tab} />
    <AuthStack.Screen name={SIGN_UP_OTP_VERIFY} component={SignUpOtpVerify} />
    <AuthStack.Screen name={OTP_VERIFY} component={OtpVerifyScreen} />
    <AuthStack.Screen name={SET_NEW_PASSWORD} component={ResetPasswordScreen} />
    <AuthStack.Screen name={VOUCHER_DETAIL} component={VoucherScreen} />
  </AuthStack.Navigator>
);
};

export default AuthRoute;
