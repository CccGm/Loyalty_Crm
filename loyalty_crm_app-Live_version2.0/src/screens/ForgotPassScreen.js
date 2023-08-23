import { useNavigation } from '@react-navigation/core';
import React, { useContext, useState } from 'react';
import ForgotPassComponent from '../components/ForgotPassComponent';
import { OTP_VERIFY } from '../constants/routeName';
import forgotPassword from '../context/actions/auth/forgotPassword';
import { GlobalContext } from '../context/Provider';

const ForgotPassScreen = () => {
  const { loaderDispatch } = useContext(GlobalContext);
  const { bottomMessageDispatch } = useContext(GlobalContext);
  const { authDispatch } = useContext(GlobalContext);
  const { navigate } = useNavigation();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [callingCode, setcallingCode] = useState("65");

  const onChangeCallingcode = (value) =>{
    setcallingCode(value)
  }

  const onChange = ({ name, value }) => {
    setForm({ ...form, [name]: value });

    if (value !== '') {
      setErrors(prev => {
        return { ...prev, [name]: null };
      });
    } else {
      setErrors(prev => {
        return { ...prev, [name]: 'This field is required' };
      });
    }
  };

  const onSubmit = () => {
    console.log("form.phone_number",form.phone_number)
    if (!form.phone_number) {
      setErrors(prev => {
        return { ...prev, phone_number: 'Please enter a phone number' };
      });
    } 
    // else if (isNaN(form.phone_number)) {
    //   setErrors(prev => {
    //     return { ...prev, phone_number: 'Please enter a number' };
    //   });
    // } else if(form.phone_number.length < 8 ) {
    //   setErrors(prev => {
    //     return { ...prev, phone_number: 'Please enter valid phone number' };
    //   });
    // }
    if (
      Object.values(form).length === 1 &&
      Object.values(form).every(item => item.trim().length > 0) &&
      Object.values(errors).every(item => !item)
    ) {
      forgotPassword(form)(
        loaderDispatch,
        bottomMessageDispatch,
        callingCode,
        authDispatch,
      )((data) => {
        if(data.status == "success"){
          navigate(OTP_VERIFY,{
            number:form.phone_number,
            callingCode:callingCode
          });
        }
      })


    }
  };

  return (
    <ForgotPassComponent
      onChange={onChange}
      onSubmit={onSubmit}
      form={form}
      errors={errors}
      onChangeCallingcode={onChangeCallingcode}
    />
  );
};

export default ForgotPassScreen;
