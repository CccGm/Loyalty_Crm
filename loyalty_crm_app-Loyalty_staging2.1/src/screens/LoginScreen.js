import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import LoginComponent from '../components/LoginComponent';
import {SIGN_UP} from '../constants/routeName';
import login from '../context/actions/auth/login';
import {GlobalContext} from '../context/Provider';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import colors from '../assets/theme/colors';
const LoginScreen = () => {
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {authDispatch} = useContext(GlobalContext);
  const {systemConfigState} = useContext(GlobalContext);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [fcmtoken, setfcmtoken] = useState('');
  const {navigate} = useNavigation();
  const {params} = useRoute();
  const [callingCode, setcallingCode] = useState('65');

  useEffect(() => {
    getFcmToken();
  }, []);

  const onChangeCallingcode = value => {
    setcallingCode(value);
  };

  const getFcmToken = async () => {
    let checkToken = await AsyncStorage.getItem('fcmToken');
    setfcmtoken(checkToken);
    if (!checkToken) {
      try {
        const fcmToken = await messaging().getToken();
        if (!!fcmToken) {
          setfcmtoken(fcmToken);
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      } catch (error) {
        console.log('error in fcm token', error);
      }
    }
  };

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});

    if (value !== '') {
      setErrors(prev => {
        return {...prev, [name]: null};
      });
    } else {
      setErrors(prev => {
        return {...prev, [name]: 'This field is required'};
      });
    }
  };

  const onSubmit = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let phonenumberreg = /^(\+\d{1,3}[- ]?)?\d{8}$/;
    if (!form.email) {
      setErrors(prev => {
        return {
          ...prev,
          email:
            systemConfigState.data.customer_info_login_username == 'email'
              ? 'Please enter a email address'
              : 'Please enter phone number.',
        };
      });
    }
    // else if(systemConfigState.data.customer_info_login_username =='email'? !reg.test(form.email):isNaN(form.email) || !phonenumberreg.test(form.email)) {
    //   setErrors(prev => {
    //     return {...prev, email: systemConfigState.data.customer_info_login_username =='email'?'Please enter a valid email address':'Please enter valid 8 digits phone number.'};
    //   });
    // }
    if (!form.password) {
      setErrors(prev => {
        return {...prev, password: 'Please enter a password.'};
      });
    }
    if (
      Object.values(form).length === 2 &&
      Object.values(form).every(item => item.trim().length > 0) &&
      Object.values(errors).every(item => !item)
    ) {
      login(form)(
        loaderDispatch,
        bottomMessageDispatch,
        callingCode,
        authDispatch,
        fcmtoken,
      );
    }
  };

  const onSignUpNavigate = () => {
    setForm({});
    setErrors({});
    navigate(SIGN_UP);
  };

  return (
    <View style={{backgroundColor: colors.white, flex: 1}}>
      <LoginComponent
        onChange={onChange}
        onSubmit={onSubmit}
        onSignUpNavigate={onSignUpNavigate}
        form={form}
        errors={errors}
        callingCode={callingCode}
        onChangeCallingcode={onChangeCallingcode}
      />
    </View>
  );
};

export default LoginScreen;
