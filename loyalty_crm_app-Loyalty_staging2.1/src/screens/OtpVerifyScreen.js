import { useNavigation } from '@react-navigation/core';
import React, {useContext, useState} from 'react';
import ForgotPassComponent from '../components/ForgotPassComponent';
import OtpVerifyComponent from '../components/OtpVerifyComponent';
import { SET_NEW_PASSWORD } from '../constants/routeName';
import forgotPassword from '../context/actions/auth/forgotPassword';
import verifyOtp from '../context/actions/dashboardOps/verifyOtp';
import {GlobalContext} from '../context/Provider';

const OtpVerifyScreen = (phonenumber) => {

  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {verifyOtpDispatch} = useContext(GlobalContext);
  const { navigate } = useNavigation();
  const [form, setForm] = useState({});
  const [phone_number, setphone_number] = useState(phonenumber.route.params.number);
  const [callingCode, setcallingCode] = useState(phonenumber.route.params.callingCode);
  const [errors, setErrors] = useState({});
  const {authDispatch } = useContext(GlobalContext); 

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
   
    if (!form.otp) {
      setErrors(prev => {
        return {...prev, otp: 'Please enter a OTP'};
      });
    }else if(form.otp.length<4){
      setErrors(prev => {
        return {...prev, otp: 'Please enter 4 digit OTP'};
      });
    } else if (
      Object.values(form).length === 1 &&
      Object.values(form).every(item => item.trim().length > 0) &&
      Object.values(errors).every(item => !item)
    ) {
     
      verifyOtp({form,phonenumber:phonenumber.route.params.number})(
        loaderDispatch,
        bottomMessageDispatch,
        verifyOtpDispatch,
      )((data) => {
        if(data.status == "success"){
          navigate(SET_NEW_PASSWORD,{
            phonenumber:phonenumber.route.params.number
          });
        }
      });
    }
  };

  const ResendOtp = () =>{


    {
      forgotPassword({phone_number})(
        loaderDispatch,
        bottomMessageDispatch,
        callingCode,
        authDispatch,
      )((data) => {
        // if(data.status == "success"){
        //   navigate(OTP_VERIFY,{
        //     number:form.phone_number,
        //     callingCode:callingCode
        //   });
        // }
      })


    }
    // console.log("phonenumber.route.params.number",form)
    // forgotPassword({phone_number})(
    //   loaderDispatch,
    //   bottomMessageDispatch,
    //   authDispatch,
    //   callingCode,
      
    // )((data) => {
      
    // })
    setForm({});
  }


  return (
    <OtpVerifyComponent
      onChange={onChange}
      onSubmit={onSubmit}
      form={form}
      errors={errors}
      number={phonenumber.route.params.number}
      ResendOtp={ResendOtp}
    />
  );
};

export default OtpVerifyScreen;
