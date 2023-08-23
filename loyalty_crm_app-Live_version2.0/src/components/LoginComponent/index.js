import {useNavigation} from '@react-navigation/native';
import React, {createRef, useState, useContext} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {DefaultTheme, HelperText, TextInput} from 'react-native-paper';
import colors from '../../assets/theme/colors';
import {
  DASHBOARD,
  FORGOT_PASS,
  LOYALTY_POINTS,
  OTP_VERIFY,
} from '../../constants/routeName';
import {SIGN_IN, WELCOME_BACK} from '../../constants/strings';
import {GlobalContext} from '../../context/Provider';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons';

import ContryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
const LoginComponent = ({
  errors,
  form,
  onSignUpNavigate,
  onChange,
  onSubmit,
  callingCode,
  onChangeCallingcode,
}) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const passwordRef = createRef();
  const {navigate} = useNavigation();
  const {systemConfigState} = useContext(GlobalContext);
  const [password, setPassword] = useState('');
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [countryCode, setCountryCode] = useState('SG');
  const [callingCodes, setcallingCode] = useState('65');

  const textInputTheme = {
    ...DefaultTheme,
    colors: {
      text: colors.black,
      primary: colors.primary,
      placeholder: colors.grey,
      background: colors.transparent,
    },
  };
  // console.log("callingCodes",callingCodes.length)

  const dynamicwidth = () => {
    if (callingCodes == undefined) {
      return '89%';
    } else if (callingCodes.length == 2) {
      return '78%';
    } else if (callingCodes.length == 3) {
      return '75%';
    } else if (callingCodes.length == 4) {
      return '73%';
    }
  };
  return (
    // <View style={{flex:1}}>
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <Image
            style={styles.loginBgImage}
            source={require('../../assets/images/logo_login.png')}
          />
          <View style={{flex: 1, backgroundColor: colors.white}}>
            <View style={styles.container}>
              <Text style={styles.title}>{WELCOME_BACK}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  height: 45,
                  marginTop: 10,
                  alignItems: 'center',
                  height: 50,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <ContryPicker
                    withFilter
                    countryCode={countryCode}
                    countryCodes
                    withAlphaFilter={false}
                    withCurrencyButton={false}
                    withCallingCode={true}
                    onSelect={value => {
                      const {cca2, callingCode} = value;
                      const abc = value.cca2;
                      onChangeCallingcode(value.callingCode[0]);
                      // console.log("abc",abc)
                      // console.log("cca2",cca2)
                      // onChange({ name:'countryCode',value});
                      // onChange({ name: 'callingCode', abc});
                      setCountryCode(value.cca2);
                      setcallingCode(value.callingCode[0]);
                    }}
                    containerButtonStyle={{
                      // borderWidth:1,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottomWidth: 1.8,
                      borderColor: textInputTheme
                        ? colors.primary
                        : colors.grey,
                      // marginBottom:5
                      // borderWidth:1,
                      // width:30

                      // width:35,
                      // alignItems:'center',
                      // justifyContent:'center',
                      // borderWidth:1,
                      // width:40,
                      // height:'110%',
                      // alignItems:'center',
                      // marginLeft:10
                    }}></ContryPicker>
                  {/* <View style={{height:47.5,width:40,borderBottomWidth: 2,borderColor: textInputTheme ? colors.primary : colors.grey,}}>
                  <Text style={{ fontFamily: 'Poppins-Bold',fontSize:13,marginTop:13}}>+{callingCodes}</Text>
                  </View> */}
                </View>

                <View style={{width: dynamicwidth()}}>
                  <TextInput
                    placeholder="Phone Number"
                    // label={systemConfigState.data.customer_info_login_username == 'email' ? 'Email Address' : "Phone Number"}
                    theme={textInputTheme}
                    underlineColor={colors.grey}
                    keyboardType={
                      systemConfigState.data.customer_info_login_username ==
                      'email'
                        ? 'email-address'
                        : 'phone-pad'
                    }
                    style={styles.inputFiled}
                    dense={true}
                    blurOnSubmit={false}
                    value={form.email || null}
                    onChangeText={value => {
                      onChange({name: 'email', value});
                    }}
                    // returnKeyType="next"
                    onSubmitEditing={() => {
                      passwordRef?.current?.focus();
                    }}
                  />
                </View>
              </View>
              {errors.email && (
                <HelperText
                  type="error"
                  style={styles.inputFiledError}
                  visible={errors.email}>
                  {errors.email}
                </HelperText>
              )}

              <TextInput
                placeholder="Password"
                // label="Password"
                // keyboardType={systemConfigState.data.customer_info_login_username == 'email' ? "email-address" : 'email-address'}
                secureTextEntry={isSecureEntry}
                theme={textInputTheme}
                underlineColor={colors.grey}
                style={styles.inputFiled}
                right={
                  <TextInput.Icon
                    icon={isSecureEntry ? 'eye-off' : 'eye'}
                    onPress={() => {
                      isSecureEntry
                        ? setIsSecureEntry(false)
                        : setIsSecureEntry(true);
                    }}
                  />
                }
                dense={true}
                value={form.password || null}
                onChangeText={value => {
                  onChange({name: 'password', value});
                }}
                onSubmitEditing={() => {
                  onSubmit();
                }}
                ref={passwordRef}
              />
              {errors.password && (
                <HelperText
                  type="error"
                  style={styles.inputFiledError}
                  visible={errors.password}>
                  {errors.password}
                </HelperText>
              )}

              <TouchableOpacity
                style={styles.forgotPassContainer}
                onPress={() => {
                  navigate(FORGOT_PASS);
                }}>
                <Text style={styles.forgotPass}>Set New Password</Text>
              </TouchableOpacity>

              <CustomButton
                style={styles.btnLogin}
                onPress={onSubmit}
                title={SIGN_IN}
                primary
              />
              <View style={{}}>
                <TouchableOpacity
                  style={styles.forgotPassContainer1}
                  onPress={() => {
                    navigate(DASHBOARD);
                  }}>
                  <Text style={styles.forgotPass}>Skip Login</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.signupTextWrapper}>
              <Text style={styles.signupText}>You don't have an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  onSignUpNavigate();
                }}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
              <Text style={styles.signupText}> now</Text>
            </View>
          </View>
          <View style={{padding: 10}}></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
    // {/* </View> */}
  );
};

export default LoginComponent;
