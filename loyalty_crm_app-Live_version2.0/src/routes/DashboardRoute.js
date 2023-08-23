import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {Image} from 'react-native';
import colors from '../assets/theme/colors';
import VoucherDetailComponent from '../components/VoucherDetailComponent';
import {
  APPOINTMENT,
  BOOK_APPT,
  CHANGE_PASSWORD,
  DASHBOARD,
  EDIT_PROFILE,
  HISTORY_APPOINTMENT,
  LOYALTY_POINTS,
  MY_SERVICE,
  MY_SERVICE_DETAIL,
  MY_VOUCHER_DETAIL,
  PROFILE,
  RESCHEDULE_APPOINTMENT,
  SEARCH,
  UPCOMINGS_APPOINTMENT,
  UPCOMINGS_MIX_APPOINTMENT,
  USEDSESSION,
  VOUCHER_DETAIL,
  POINT_HISTORY,
} from '../constants/routeName';
import {GlobalContext} from '../context/Provider';
import AppointmentScreen from '../screens/AppointmentScreen';
import BookApptScreen from '../screens/BookApptScreen';
import ChangePassScreen from '../screens/ChangePassScreen';
import DashboardScreen from '../screens/DashboardScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import HistoryApptScreen from '../screens/HistoryApptScreen';
import LoyaltyPointScreen from '../screens/LoyaltyPointScreen';
import MyVoucherScreen from '../screens/MyVoucherScreen';
import PointHistory from '../screens/PointHistory';
import ProfileScreen from '../screens/ProfileScreen';
import RescheduleApptScreen from '../screens/RescheduleApptScreen';
import SearchScreen from '../screens/SearchScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import ServiceScreen from '../screens/ServiceScreen';
import UpcomingApptMixScreen from '../screens/UpcomingApptMixScreen';
import UpcomingApptScreen from '../screens/UpcomingApptScreen';
import UsedSessionDetailScreen from '../screens/UsedSessionDetailScreen';
import VoucherScreen from '../screens/VoucherScreen';

const DashboardRoute = prop => {
  console.log('DashboardRoutedddd', prop);
  const BottomTabNav = createBottomTabNavigator();
  const StackNav = createStackNavigator();

  const screenOptions = {
    headerShown: false,
    gestureEnabled: true,
    //cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
  };

  const tab = () => {
    const {bsState} = useContext(GlobalContext);
    console.log('bsState');
    return (
      <BottomTabNav.Navigator
        backBehavior="initialRoute"
        screenOptions={({route}) => ({
          // tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({focused, color, size}) => {
            let src;
            if (route.name === DASHBOARD) {
              src = require('./../assets/images/ic_home.png');
            } else if (route.name === APPOINTMENT) {
              src = require('./../assets/images/ic_appointment.png');
            } else if (route.name === LOYALTY_POINTS) {
              src = require('./../assets/images/ic_loyalty_points.png');
            } else if (route.name === PROFILE) {
              src = require('./../assets/images/ic_profile.png');
            } else if (route.name === MY_SERVICE) {
              src = require('./../assets/images/ic_service.png');
            }
            return <Image source={src} style={{opacity: focused ? 1 : 0.5}} />;
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
        <BottomTabNav.Screen name={DASHBOARD} component={DashboardScreen} />
        <BottomTabNav.Screen name={APPOINTMENT} component={AppointmentScreen} />
        <BottomTabNav.Screen name={MY_SERVICE} component={ServiceScreen} />
        <BottomTabNav.Screen
          name={LOYALTY_POINTS}
          component={LoyaltyPointScreen}
        />

        {/* <BottomTabNav.Screen
        name={POINT_HISTORY}
        component={PointHistory}
      /> */}

        <BottomTabNav.Screen
          name={PROFILE}
          options={navigation => ({
            // tabBarIcon: ,
            tabBarVisible: bsState.btvisible == true ? true : false,
          })}
          component={ProfileScreen}
        />
      </BottomTabNav.Navigator>
    );
  };

  const HomeStack = () => {
    return (
      <StackNav.Navigator screenOptions={screenOptions}>
        <StackNav.Screen name={DASHBOARD} component={DashboardScreen} />
      </StackNav.Navigator>
    );
  };

  const AppointmentStack = () => {
    return (
      <StackNav.Navigator screenOptions={screenOptions}>
        <StackNav.Screen name={APPOINTMENT} component={AppointmentScreen} />
        <StackNav.Screen
          name={UPCOMINGS_APPOINTMENT}
          component={UpcomingApptScreen}
        />
        <StackNav.Screen
          name={RESCHEDULE_APPOINTMENT}
          component={RescheduleApptScreen}
        />
        <StackNav.Screen
          name={UPCOMINGS_MIX_APPOINTMENT}
          component={UpcomingApptMixScreen}
        />
        <StackNav.Screen
          name={HISTORY_APPOINTMENT}
          component={HistoryApptScreen}
        />
      </StackNav.Navigator>
    );
  };

  const ServiceStack = () => {
    return (
      <StackNav.Navigator screenOptions={screenOptions}>
        <StackNav.Screen name={MY_SERVICE} component={ServiceScreen} />
      </StackNav.Navigator>
    );
  };

  const LoyaltyPointStack = () => {
    return (
      <StackNav.Navigator screenOptions={screenOptions}>
        <StackNav.Screen name={LOYALTY_POINTS} component={LoyaltyPointScreen} />
        <StackNav.Screen name={VOUCHER_DETAIL} component={VoucherScreen} />
        <StackNav.Screen name={MY_VOUCHER_DETAIL} component={MyVoucherScreen} />
      </StackNav.Navigator>
    );
  };

  const ProfileStack = () => {
    return (
      <StackNav.Navigator screenOptions={screenOptions}>
        <StackNav.Screen name={PROFILE} component={ProfileScreen} />
        <StackNav.Screen name={EDIT_PROFILE} component={EditProfileScreen} />
        <StackNav.Screen name={CHANGE_PASSWORD} component={ChangePassScreen} />
      </StackNav.Navigator>
    );
  };

  return (
    <StackNav.Navigator screenOptions={screenOptions}>
      <StackNav.Screen name={DASHBOARD} component={tab} />
      <StackNav.Screen name={SEARCH} component={SearchScreen} />
      <StackNav.Screen name={LOYALTY_POINTS} component={LoyaltyPointScreen} />
      <StackNav.Screen
        name={UPCOMINGS_APPOINTMENT}
        component={UpcomingApptScreen}
      />
      <StackNav.Screen
        name={RESCHEDULE_APPOINTMENT}
        component={RescheduleApptScreen}
      />
      <StackNav.Screen
        name={HISTORY_APPOINTMENT}
        component={HistoryApptScreen}
      />
      <StackNav.Screen name={VOUCHER_DETAIL} component={VoucherScreen} />
      <StackNav.Screen name={MY_VOUCHER_DETAIL} component={MyVoucherScreen} />
      <StackNav.Screen name={APPOINTMENT} component={AppointmentScreen} />
      <StackNav.Screen
        name={MY_SERVICE_DETAIL}
        component={ServiceDetailScreen}
      />
      <StackNav.Screen name={USEDSESSION} component={UsedSessionDetailScreen} />
      <StackNav.Screen name={BOOK_APPT} component={BookApptScreen} />
      <StackNav.Screen name={POINT_HISTORY} component={PointHistory} />
      <StackNav.Screen name={EDIT_PROFILE} component={EditProfileScreen} />
      <StackNav.Screen name={CHANGE_PASSWORD} component={ChangePassScreen} />
    </StackNav.Navigator>
  );

  // const getTabBarVisibility = route => {
  //   const routeName = getFocusedRouteNameFromRoute(route) ?? ' ';
  //   switch (routeName) {
  //     case SEARCH:
  //     case UPCOMINGS_APPOINTMENT:
  //     case HISTORY_APPOINTMENT:
  //     case RESCHEDULE_APPOINTMENT:
  //     case EDIT_PROFILE:
  //     case CHANGE_PASSWORD:
  //     case VOUCHER_DETAIL:
  //     case MY_VOUCHER_DETAIL:
  //     case MY_SERVICE_DETAIL:
  //     case USEDSESSION:
  //     case BOOK_APPT:
  //       return false;
  //     default:
  //       return true;
  //   }
};
export default DashboardRoute;
