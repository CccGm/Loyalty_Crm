import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import { useNavigation,StackActions } from '@react-navigation/core';
import React, {useContext, useEffect, useState} from 'react';
import EditProfileComponent from '../components/EditProfileComponent';
import {USER} from '../constants/prefrenceKeys';
import getProfile from '../context/actions/dashboardOps/getProfile';
import updateProfile from '../context/actions/dashboardOps/updateProfile';
import {GlobalContext} from '../context/Provider';

const EditProfileScreen = () => {
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {authDispatch} = useContext(GlobalContext);
  const {profileDispatch} = useContext(GlobalContext);
  const navigation = useNavigation();
  const {getItem} = useAsyncStorage(USER);
  const { profileState } = useContext(GlobalContext);
  const [imageSource, setImageSource] = useState(null);
  

  useEffect(async () => {
    let isCancelled = false;
    const usr = JSON.parse(await getItem());
    if (!isCancelled) {
      setImageSource({
        uri: profileState.data.image,
      });
      setForm({
        firstName:profileState.data.first_name,
        lastName: profileState.data.last_name,
        email: profileState.data.email,
        phoneNo: profileState.data.phone_number,
        birthdate:profileState.data.birthdate,
        profile: profileState.data.profile ?? '',
      });
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const setImageSrc = source => {
    setImageSource(source);
    setForm({
      ...form,
      profile: source?.uri?.replace('data:image/jpeg;base64,', '') ?? ' ',
    });
  };

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});

    if (value !== '') {
      setErrors(prev => {
        return {...prev, [name]: null};
      });
    }
  };

  const getProfiledata = () =>{
    getProfile(
      loaderDispatch,
      bottomMessageDispatch,
      profileDispatch,
    )(() => {
      navigation.dispatch(StackActions.pop(1));
    })
  }

  const onSubmit = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!form.firstName) {
      setErrors(prev => {
        return {...prev, firstName: 'Please enter a first name'};
      });
    
    }else if (!form.phoneNo) {
      setErrors(prev => {
        return {...prev, phoneNo: 'Please enter a phone number'};
      });
    } else if (
      Object.values(form).length >= 5
    ) {
      if(form.email == undefined||form.email == ""){
      updateProfile(form)(loaderDispatch, bottomMessageDispatch)((res)=>{
        if(res.status == "success"){
          setTimeout(getProfiledata,2000);
        }
      });
      
      }else if(!reg.test(form.email)){
        console.log("ifgdddffdfgg")
        setErrors(prev => {
          return {...prev, emailAdd: 'Please enter a valid email address'};
        });
      }else{
        console.log("elseeegggevgevgevgevgev")
        updateProfile(form)(loaderDispatch, bottomMessageDispatch)((res)=>{
          if(res.status == "success"){
            setTimeout(getProfiledata,2000);
          }
        });
        // updateProfile(form)(loaderDispatch, bottomMessageDispatch);
        // setTimeout(getProfiledata,2000);
      }
  
    
    }
  };
  console.log("ddddd",imageSource)
  return (
    <EditProfileComponent
      onChange={onChange}
      onSubmit={onSubmit}
      form={form}
      imageSource={imageSource}
      setImageSource={setImageSrc}
      errors={errors}
    />
  );
};

export default EditProfileScreen;
