import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {DefaultTheme, HelperText, TextInput} from 'react-native-paper';
import {PERMISSIONS} from 'react-native-permissions';
import colors from '../../assets/theme/colors';
import {LOGIN} from '../../constants/routeName';
import {CREATE_AN_ACCOUNT, SIGN_UP} from '../../constants/strings';
import {checkAndGetPemission} from '../../utils/Permissions';
import BottomSheet from '../common/BottomSheet';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import styles from './styles';
import RadioForm from 'react-native-simple-radio-button';
import CustomDatepicker from '../common/CustomDatepicker';
import moment from 'moment';
import ContryPicker, {DARK_THEME} from 'react-native-country-picker-modal';

const SignUpComponent = ({
  imageSource,
  setImageSource,
  errors,
  form,
  onChange,
  onSubmit,
  callingCode,
  onChangeCallingcode,
  // countryCode,
  // callingCode
}) => {
  const {navigate} = useNavigation();
  const [bsVisible, setBSVisible] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntry1, setIsSecureEntry1] = useState(true);
  const inputFiledRef = useRef(new Array());
  const [chosenOption, setChosenOption] = useState('1');
  const [birthdate, setBirthdate] = useState('');
  const [countryCode, setCountryCode] = useState('SG');
  const [callingCodes, setcallingCode] = useState('65');

  const optionsd = [
    {label: 'Male', value: '1'},
    {label: 'Female', value: '2'},
  ];
  const textInputTheme = {
    ...DefaultTheme,
    colors: {
      text: colors.black,
      primary: colors.primary,
      placeholder: colors.grey,
      background: colors.transparent,
    },
  };
  const majorVersionIOS = parseInt(Platform.Version, 10);
  console.log('iOS version ' + majorVersionIOS);
  let options = {
    maxWidth: 1024,
    maxHeight: 1024,
    quality: 1,
    includeBase64: true,
    storageOptions: {
      skipBackup: true,
    },
  };
  const checkCameraPermission = () => {
    setBSVisible(false);
    const camPermission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA;
    checkAndGetPemission(camPermission, () => {
      captureFromCamera();
    });
  };
  const checkGalleryPermission = () => {
    setBSVisible(false);
    const camPermission =
      Platform.OS == 'android'
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY;

    checkAndGetPemission(camPermission, () => {
      pickFromLibrary();
    });
  };

  const captureFromCamera = () => {
    launchCamera(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const source = {
          uri: 'data:image/jpeg;base64,' + response?.assets[0]?.base64,
        };
        setImageSource(source);
      }
    });
  };

  const pickFromLibrary = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const source = {
          uri: 'data:image/jpeg;base64,' + response?.assets[0]?.base64,
        };
        setImageSource(source);
      }
    });
  };

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
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>{CREATE_AN_ACCOUNT}</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setBSVisible(true);
              }}>
              <View
                style={
                  imageSource ? styles.imageBackground : styles.imageBackgroundP
                }>
                <Image
                  style={
                    imageSource ? styles.profileImage : styles.profileImageP
                  }
                  source={
                    imageSource || require('../../assets/images/ic_user.png')
                  }
                />
              </View>
              <Text style={styles.addImageText}>Upload Image</Text>
            </TouchableOpacity>
            <TextInput
              label="First Name"
              theme={textInputTheme}
              underlineColor={colors.grey}
              style={styles.inputFiled}
              dense={true}
              blurOnSubmit={false}
              value={form.firstName || null}
              onChangeText={value => {
                onChange({name: 'firstName', value});
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                inputFiledRef?.current['lastName']?.focus();
              }}
            />
            {errors.firstName && (
              <HelperText
                type="error"
                style={styles.inputFiledError}
                visible={errors.firstName}>
                {errors.firstName}
              </HelperText>
            )}
            <TextInput
              label="Last Name"
              theme={textInputTheme}
              underlineColor={colors.grey}
              style={styles.inputFiled}
              dense={true}
              blurOnSubmit={false}
              value={form.lastName || null}
              onChangeText={value => {
                onChange({name: 'lastName', value});
              }}
              returnKeyType="next"
              ref={element => (inputFiledRef.current['lastName'] = element)}
              onSubmitEditing={() => {
                inputFiledRef?.current['phoneNo']?.focus();
              }}
            />
            {/* {errors.lastName && (
              <HelperText
                type="error"
                style={styles.inputFiledError}
                visible={errors.lastName}>
                {errors.lastName}
              </HelperText>
            )} */}
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
                  withFlag
                  withAlphaFilter={false}
                  withCurrencyButton={false}
                  withCallingCode
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
                  //  onSelect={value=>{
                  //   console.log("country",value)
                  //   const {cca2,callingCode}= value
                  //   setCountryCode(cca2)
                  //   setcallingCode(value.callingCode[0])
                  //   onChange({ name: 'contrycode', callingCode });
                  //  }}
                  containerButtonStyle={{
                    // borderWidth:1,
                    // height:47.5,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottomWidth: 1.8,
                    borderColor: textInputTheme ? colors.primary : colors.grey,
                    // width:35,
                    // alignItems:'center',
                    // justifyContent:'center',
                    // borderWidth:1,
                    // width:40,
                    // height:'110%',
                    // alignItems:'center',
                    // marginLeft:10
                  }}></ContryPicker>
              </View>
              <View style={{width: dynamicwidth()}}>
                <TextInput
                  placeholder="Phone Number"
                  // label="Phone Number"
                  theme={textInputTheme}
                  underlineColor={colors.grey}
                  keyboardType="phone-pad"
                  style={styles.inputFiled}
                  maxLength={10}
                  dense={true}
                  blurOnSubmit={false}
                  value={form.phoneNo || null}
                  onChangeText={value => {
                    onChange({name: 'phoneNo', value});
                    // onChange({ name: 'callingCode', callingCode});
                  }}
                  returnKeyType="next"
                  ref={element => (inputFiledRef.current['phoneNo'] = element)}
                  onSubmitEditing={() => {
                    inputFiledRef?.current['email']?.focus();
                  }}
                />
              </View>
            </View>

            {errors.phoneNo && (
              <HelperText
                type="error"
                style={styles.inputFiledError}
                visible={errors.phoneNo}>
                {errors.phoneNo}
              </HelperText>
            )}

            <View style={{borderBottomWidth: 1, borderColor: colors.grey}}>
              <View style={{marginTop: 5}}>
                <Text
                  style={{color: colors.grey, fontWeight: '400', fontSize: 15}}>
                  {' '}
                  Select Your Gender
                </Text>
              </View>
              <View style={{marginTop: 5}}>
                <RadioForm
                  theme={textInputTheme}
                  radio_props={optionsd}
                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={'#cdcdcd'}
                  labelColor={colors.grey}
                  selectedButtonColor={'#ad2e8d'}
                  initial={0} //initial value of this group
                  onPress={value => {
                    onChange({name: 'gender', value});
                  }} //if the user changes options, set the new value
                />
              </View>
            </View>
            <View style={{borderBottomWidth: 1, borderColor: colors.grey}}>
              <View style={{marginTop: 7}}>
                <Text
                  style={{color: colors.grey, fontWeight: '400', fontSize: 15}}>
                  Birth Date
                </Text>
              </View>
              <View style={{marginTop: 5}}>
                <CustomDatepicker
                  textStyle={{
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                  }}
                  onDateChange={value => {
                    onChange({name: 'birthdate', value});
                  }}
                />
              </View>
            </View>
            <TextInput
              label="Email Address"
              theme={textInputTheme}
              underlineColor={colors.grey}
              keyboardType="default"
              style={styles.inputFiled}
              dense={true}
              blurOnSubmit={false}
              value={form.email || null}
              onChangeText={value => {
                onChange({name: 'email', value});
              }}
              returnKeyType="next"
              ref={element => (inputFiledRef.current['email'] = element)}
              onSubmitEditing={() => {
                inputFiledRef?.current['password']?.focus();
              }}
            />
            {errors.emailAdd && (
              <HelperText
                type="error"
                style={styles.inputFiledError}
                visible={errors.emailAdd}>
                {errors.emailAdd}
              </HelperText>
            )}
            <TextInput
              label="Password"
              secureTextEntry={isSecureEntry}
              theme={textInputTheme}
              underlineColor={colors.grey}
              style={styles.inputFiled}
              dense={true}
              blurOnSubmit={false}
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
              value={form.password || null}
              onChangeText={value => {
                onChange({name: 'password', value});
              }}
              ref={element => (inputFiledRef.current['password'] = element)}
              returnKeyType="next"
              onSubmitEditing={() => {
                inputFiledRef?.current['confirmPassword']?.focus();
              }}
            />
            {errors.password && (
              <HelperText
                type="error"
                style={styles.inputFiledError}
                visible={errors.password}>
                {errors.password}
              </HelperText>
            )}

            <TextInput
              label="Confirm Password"
              secureTextEntry={isSecureEntry1}
              theme={textInputTheme}
              underlineColor={colors.grey}
              style={styles.inputFiled}
              dense={true}
              value={form.confirmPassword || null}
              onChangeText={value => {
                onChange({name: 'confirmPassword', value});
              }}
              right={
                <TextInput.Icon
                  icon={isSecureEntry1 ? 'eye-off' : 'eye'}
                  onPress={() => {
                    isSecureEntry1
                      ? setIsSecureEntry1(false)
                      : setIsSecureEntry1(true);
                  }}
                />
              }
              ref={element =>
                (inputFiledRef.current['confirmPassword'] = element)
              }
              onSubmitEditing={() => {
                onSubmit();
              }}
            />
            {errors.confirmPassword && (
              <HelperText
                type="error"
                style={styles.inputFiledError}
                visible={errors.confirmPassword}>
                {errors.confirmPassword}
              </HelperText>
            )}
            <TextInput
              label="Referral code"
              theme={textInputTheme}
              underlineColor={colors.grey}
              keyboardType="default"
              style={styles.inputFiled}
              dense={true}
              blurOnSubmit={false}
              value={form.referral_membership_code || null}
              onChangeText={value => {
                onChange({name: 'referral_membership_code', value});
              }}
              returnKeyType="next"
              ref={element =>
                (inputFiledRef.current['referral_membership_code'] = element)
              }
              onSubmitEditing={() => {
                inputFiledRef?.current['referral_membership_code']?.focus();
              }}
            />

            <CustomButton
              style={styles.btnLogin}
              onPress={onSubmit}
              title={SIGN_UP}
              primary
            />
            <View style={styles.signupTextWrapper}>
              <Text style={styles.signupText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigate(LOGIN);
                }}>
                <Text style={styles.signupLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomSheet
        visible={bsVisible}
        setVisibility={setBSVisible}
        canceledOnTouchOutside={true}
        body={
          <ChooseBS
            captureFromCamera={checkCameraPermission}
            pickFromLibrary={checkGalleryPermission}
          />
        }
      />
    </Container>
  );
};

const ChooseBS = ({pickFromLibrary, captureFromCamera}) => {
  return (
    <View>
      <Text style={styles.bsTitle}>Choose an action</Text>
      <View style={styles.bsSelectionWrapper}>
        <TouchableOpacity
          style={styles.bsSelection}
          onPress={captureFromCamera}>
          <Image
            style={styles.bsIcon}
            source={require('../../assets/images/ic_camera_big.png')}
          />
          <Text style={styles.bsIconTitle}>Camera</Text>
        </TouchableOpacity>
        <View style={styles.bsIconDivider} />
        <TouchableOpacity style={styles.bsSelection} onPress={pickFromLibrary}>
          <Image
            style={styles.bsIcon}
            source={require('../../assets/images/ic_gallery.png')}
          />
          <Text style={styles.bsIconTitle}>Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpComponent;
