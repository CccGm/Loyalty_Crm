import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, useWindowDimensions, View,Platform } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import colors from '../../../assets/theme/colors';
import { APPOINTMENT, DASHBOARD, LOGIN } from '../../../constants/routeName';
import { GlobalContext } from '../../../context/Provider';
import GuestDashboardComponent from '../../GuestDashboardComponent';
import Toolbar from '../Toolbar';

const AlertComponent = () => {
    const [visible, setVisible] = React.useState(false);
    const navigated = useNavigation();
    const { navigate } = useNavigation();
    const route = useRoute();
    console.log(route)
    const [isLoading, setLoading] = useState(false);
  const { GuestDashState } = useContext(GlobalContext);
    const layout = useWindowDimensions()
    React.useEffect(() => {
        const unsubscribe = navigated.addListener('focus', () => {
            showDialog()
        })
        return unsubscribe;
    }, [])

    const showDialog = () => setVisible(true);

    const hideDialog = () => {
        setVisible(false)
        navigate(DASHBOARD)
    };
    const loginRedirect = () => {
        setVisible(false)
        navigate(LOGIN)
    }

    return (
       
       
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // marginTop: 22
        }}>
           <GuestDashboardComponent dashboardData={GuestDashState.data}>

           </GuestDashboardComponent>
          
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}

            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 60, }}>
                    <View style={{ width: '100%', height:Platform.OS=="ios"?'14%':'14%', borderRadius: 10, backgroundColor: '#FFFFFF',shadowColor: '#171717',shadowOffset: {width: 2, height: 4},shadowOpacity: 0.2,elevation:2, shadowRadius: 10, }}>
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 17, fontFamily: 'Poppins-Regular', color: colors.primary }}>Please Login</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', padding: 10, }}>
                            <TouchableOpacity style={{ width: 100, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#aaaaaa', borderRadius: 5 }}><Text style={{ color: '#fbfbfb', fontFamily: 'Poppins-Regular', fontSize: 15 }} onPress={() => hideDialog()}>CANCEL</Text></TouchableOpacity>
                            <TouchableOpacity style={{ width: 100, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, borderRadius: 5 }}><Text style={{ color: '#fbfbfb', fontFamily: 'Poppins-Regular', fontSize: 15 }} onPress={() => loginRedirect()}>LOG IN</Text></TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View >

      

    );
};

export default AlertComponent;