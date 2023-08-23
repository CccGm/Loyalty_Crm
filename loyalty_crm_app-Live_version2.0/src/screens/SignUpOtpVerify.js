import {useNavigation} from '@react-navigation/core';
import React, {useContext, useState} from 'react';
import ForgotPassComponent from '../components/ForgotPassComponent';
import OtpVerifyComponent from '../components/OtpVerifyComponent';
import {
  LOGIN,
  SET_NEW_PASSWORD,
  SIGN_UP_OTP_VERIFY,
} from '../constants/routeName';
import forgotPassword from '../context/actions/auth/forgotPassword';
import resendOtp from '../context/actions/auth/resendOtp';
import signUpVerify from '../context/actions/dashboardOps/signUpVerify';
import verifyOtp from '../context/actions/dashboardOps/verifyOtp';
import {GlobalContext} from '../context/Provider';

const SignUpOtpVerify = phonenumber => {
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {verifyOtpDispatch} = useContext(GlobalContext);
  const navigation = useNavigation();
  const [form, setForm] = useState({});
  const [phone_number, setphone_number] = useState(
    phonenumber.route.params.custo,
  );

  const [errors, setErrors] = useState({});
  const {authDispatch} = useContext(GlobalContext);

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
    } else if (form.otp.length < 4) {
      setErrors(prev => {
        return {...prev, otp: 'Please enter 4 digit OTP'};
      });
    } else if (
      Object.values(form).length === 1 &&
      Object.values(form).every(item => item.trim().length > 0) &&
      Object.values(errors).every(item => !item)
    ) {
      signUpVerify({form, custo: phonenumber.route.params.custo})(
        loaderDispatch,
        bottomMessageDispatch,
        verifyOtpDispatch,
      )(data => {
        if (data.status == 'success') {
          navigation.reset({
            index: 0,
            routes: [{name: LOGIN}],
          });
          // navigate(LOGIN);
        }
      });
    }
  };

  const ResendOtp = () => {
    console.log('phonenumber.route.params.number', form);
    resendOtp({phone_number})(
      loaderDispatch,
      bottomMessageDispatch,
      authDispatch,
    )(data => {});
    setForm({});
  };

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

export default SignUpOtpVerify;
