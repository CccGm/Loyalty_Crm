import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import SignUpComponent from '../components/SignUpComponent';
import {LOGIN, OTP_VERIFY, SIGN_UP_OTP_VERIFY} from '../constants/routeName';
import {OK} from '../constants/strings';
import signup from '../context/actions/auth/signup';
import {GlobalContext} from '../context/Provider';
import dynamicLinks from '@react-native-firebase/dynamic-links';
const SignUpScreen = () => {
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {authDispatch} = useContext(GlobalContext);
  const {systemConfigState} = useContext(GlobalContext);
  console.log(systemConfigState);
  const {navigate} = useNavigation();
  console.log(
    'signupsignup',
    systemConfigState.data.customer_info_customer_verification_required,
  );
  const [imageSource, setImageSource] = useState(null);
  const [form, setForm] = useState({gender: '1'});
  const [callingCode, setcallingCode] = useState('65');
  const [errors, setErrors] = useState({});

  const onChangeCallingcode = value => {
    setcallingCode(value);
  };

  useEffect(() => {
    getReffrelcode();
  }, []);

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
  console.log('signupform', form);
  useEffect(() => {
    imageSource &&
      setForm({
        ...form,
        ['profile']: imageSource.uri.replace('data:image/jpeg;base64,', ''),
      });
  }, [imageSource]);

  const getReffrelcode = async () => {
    // console.log('getReffrelcode');
    const url = await dynamicLinks().getInitialLink();
    // console.log('url', url);
    if (url) {
      const ID = getParameterFromUrl(url.url, 'invitedBy');
      // console.log('IDdsddsdssddsds', ID);
      setForm({referral_membership_code: ID});
    }
  };

  const getParameterFromUrl = (url, param) => {
    const regex = new RegExp('.*[?&]' + param + '=([^&]+)(&|$)');
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  const onSubmit = () => {
    console.log('form', form);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    console.log('form.emailform.email', form.email);

    if (!form.firstName) {
      setErrors(prev => {
        return {...prev, firstName: 'Please enter a first name'};
      });
    }
    if (!form.phoneNo) {
      setErrors(prev => {
        return {...prev, phoneNo: 'Please enter a phone number'};
      });
    }
    if (!form.password) {
      setErrors(prev => {
        return {...prev, password: 'Please enter a password'};
      });
    }
    if (!form.confirmPassword) {
      setErrors(prev => {
        return {...prev, confirmPassword: 'Please enter a confirm password'};
      });
    } else if (form.password !== form.confirmPassword) {
      setErrors(prev => {
        return {...prev, confirmPassword: 'Passwords are not same'};
      });
    } else if (Object.values(form).length >= 5) {
      console.log('formdata', form);
      if (form.email == undefined || form.email == '') {
        signup(form)(
          loaderDispatch,
          bottomMessageDispatch,
          callingCode,
          authDispatch,
        )(res => {
          if (
            systemConfigState.data
              .customer_info_customer_verification_required == 1
          ) {
            if (
              systemConfigState.data.customer_info_customer_verification_mode ==
              'mobile_no'
            ) {
              navigate(SIGN_UP_OTP_VERIFY, {
                number: form.phoneNo,
                signup: 'signUp',
                custo: res.list.custo,
              });
            }
          }
          if (
            systemConfigState.data.customer_info_customer_verification_mode ==
            'email'
          ) {
            if (form.email == '' || form.email == undefined) {
              Alert.alert(
                'Registration success',
                'Your registration is successfully done please contact admin to get approval',
                [
                  {
                    text: OK,
                    onPress: () => {
                      navigate(LOGIN);
                    },
                  },
                ],
                {
                  cancelable: false,
                },
              );
            } else {
              navigate(SIGN_UP_OTP_VERIFY, {
                number: form.phoneNo,
                signup: 'signUp',
                custo: res.list.custo,
              });
            }
            console.log('formsggdsgddssddhsgdsdsgsd ', form);
          } else {
            // navigate(LOGIN);
            console.log('not mobile_no or not email');
            setForm({gender: '1'});
            // Alert.alert(
            //   'Registration success',
            //   'Your registration is successfully done please contact admin to get approval',
            //   [
            //     {
            //       text: OK,
            //       onPress: () => {
            //         navigate(LOGIN);
            //       },
            //     },
            //   ],
            //   {
            //     cancelable: false,
            //   },
            // );
          }
        });
      } else if (!reg.test(form.email)) {
        setErrors(prev => {
          return {...prev, emailAdd: 'Please enter a valid email address'};
        });
      } else {
        signup(form)(
          loaderDispatch,
          bottomMessageDispatch,
          callingCode,
          authDispatch,
        )(res => {
          console.log('signupsignup', res);
          if (
            systemConfigState.data
              .customer_info_customer_verification_required == 1
          ) {
            if (
              systemConfigState.data.customer_info_customer_verification_mode ==
              'mobile_no'
            ) {
              navigate(SIGN_UP_OTP_VERIFY, {
                number: form.phoneNo,
                signup: 'signUp',
                custo: res.list.custo,
              });
            }
          }
          if (
            systemConfigState.data.customer_info_customer_verification_mode ==
            'email'
          ) {
            if (form.email == '' || form.email == undefined) {
              Alert.alert(
                'Registration success',
                'Your registration is successfully done please contact admin to get approval',
                [
                  {
                    text: OK,
                    onPress: () => {
                      navigate(LOGIN);
                    },
                  },
                ],
                {
                  cancelable: false,
                },
              );
            } else {
              navigate(SIGN_UP_OTP_VERIFY, {
                number: form.phoneNo,
                signup: 'signUp',
                custo: res.list.custo,
              });
            }

            // console.log("ffhhfhhhfhhh", form)
            //  Alert.alert(
            //   'Registration success',
            //   'Your registration is successfully done please contact admin to get approval',
            //   [
            //     {
            //       text: OK,
            //       onPress: () => {
            //         navigate(LOGIN);
            //       },
            //     },
            //   ],
            //   {
            //     cancelable: false,
            //   },
            // );
          } else {
            // navigate(LOGIN);
            console.log('not mobile_no or not email');
            // Alert.alert(
            //   'Registration success',
            //   'Your registration is successfully done please contact admin to get approval',
            //   [
            //     {
            //       text: OK,
            //       onPress: () => {
            //         navigate(LOGIN);
            //       },
            //     },
            //   ],
            //   {
            //     cancelable: false,
            //   },
            // );
          }
        });
      }
    }
  };

  return (
    <SignUpComponent
      onChange={onChange}
      onSubmit={onSubmit}
      form={form}
      imageSource={imageSource}
      setImageSource={setImageSource}
      errors={errors}
      callingCode={callingCode}
      onChangeCallingcode={onChangeCallingcode}
    />
  );
};

export default SignUpScreen;
