import { useNavigation } from '@react-navigation/core';
import React, {useContext, useState} from 'react';
import { Alert } from 'react-native';
import ChangePassComponent from '../components/ChangePassComponent';
import ResetPasswordComponent from '../components/ResetPasswordComponent';
import { LOGIN } from '../constants/routeName';
import changePassword from '../context/actions/auth/changePassword';
import resetPassword from '../context/actions/auth/resetPassword';
import {GlobalContext} from '../context/Provider';

const ResetPasswordScreen = (phonenumber) => {
 
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {authDispatch} = useContext(GlobalContext);
  const {navigate} = useNavigation();

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

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
    console.log("resetPassword")
     if (!form.new_password) {
      setErrors(prev => {
        return {...prev, new_password: 'Please enter a new password'};
      });
    } else if (!form.confirm_password) {
      setErrors(prev => {
        return {...prev, confirm_password: 'Please enter a confirm password'};
      });
    } else if (form.new_password !== form.confirm_password) {
      setErrors(prev => {
        return {...prev, confirm_password: 'Passwords are not same'};
      });
    } else if (
    
      Object.values(form).every(item => item.trim().length > 0) &&
      Object.values(errors).every(item => !item)
    ) {
      console.log("resetPasswordddddddd")
      resetPassword({form,phonenumber:phonenumber.route.params.phonenumber})(
        loaderDispatch,
        bottomMessageDispatch,
        authDispatch,
      )((data) => {
        console.log("data",data)
        if(data.status == "success"){
          Alert.alert(
            'Success',
            'Your password updated successfully.',
            [
              {
                text: "OK",
                onPress: () => {
                  navigate(LOGIN);
                },
              },
            ],
            {
              cancelable: false,
            },
          );
        }
      });
      // changePassword(form)(loaderDispatch, bottomMessageDispatch, authDispatch);
    }
  };

  return (
    <ResetPasswordComponent
      onChange={onChange}
      onSubmit={onSubmit}
      form={form}
      errors={errors}
    />
  );
};

export default ResetPasswordScreen;
