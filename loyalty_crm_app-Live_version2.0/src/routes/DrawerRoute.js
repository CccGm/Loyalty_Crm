import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useContext} from 'react';
import colors from '../assets/theme/colors';
import {DASHBOARD} from '../constants/routeName';
import {APP_NAME} from '../constants/strings';
import {GlobalContext} from '../context/Provider';
import DashboardScreen from '../screens/DashboardScreen';

const DrawerRoute = () => {
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {authDispatch} = useContext(GlobalContext);
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName={DASHBOARD}
      //backBehavior="history" this is default behavior avoid to use this
      //backBehavior="firstRoute" this will set first screen as inital screen
      backBehavior="initialRoute"
      screenOptions={{
        headerTintColor: colors.white,
        headerShown: true,
        headerStyle: {backgroundColor: colors.primary},
      }}>
      <Drawer.Screen
        name={DASHBOARD}
        component={DashboardScreen}
        options={{title: APP_NAME}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerRoute;
