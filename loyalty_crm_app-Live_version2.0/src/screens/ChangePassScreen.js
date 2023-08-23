import React, {useContext, useState} from 'react';
import ChangePassComponent from '../components/ChangePassComponent';
import changePassword from '../context/actions/auth/changePassword';
import {GlobalContext} from '../context/Provider';

const ChangePassScreen = () => {
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {authDispatch} = useContext(GlobalContext);

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
    if (!form.current_password) {
      setErrors(prev => {
        return {...prev, current_password: 'Please enter a current password'};
      });
    } else if (!form.new_password) {
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
      Object.values(form).length === 3 &&
      Object.values(form).every(item => item.trim().length > 0) &&
      Object.values(errors).every(item => !item)
    ) {
      changePassword(form)(loaderDispatch, bottomMessageDispatch, authDispatch);
    }
  };

  return (
    <ChangePassComponent
      onChange={onChange}
      onSubmit={onSubmit}
      form={form}
      errors={errors}
    />
  );
};

export default ChangePassScreen;
