import {StackActions, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useContext, useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {HelperText} from 'react-native-paper';
import {PERMISSIONS} from 'react-native-permissions';
import colors from '../../assets/theme/colors';
import {EDIT_PROFILE} from '../../constants/routeName';
import {CANCEL, SAVE} from '../../constants/strings';
import {GlobalContext} from '../../context/Provider';
import {checkAndGetPemission} from '../../utils/Permissions';
import BottomSheet from '../common/BottomSheet';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import CustomDatepicker from '../common/CustomDatepicker';
import Toolbar from '../common/Toolbar';
import styles from './styles';

const EditProfileComponent = ({
  imageSource,
  setImageSource,
  errors,
  form,
  onChange,
  onSubmit,
}) => {
  const navigation = useNavigation();
  const [bsVisible, setBSVisible] = useState(false);
  const inputFiledRef = useRef(new Array());
  const {systemConfigState} = useContext(GlobalContext);

  console.log(
    'systemConfigState',
    systemConfigState.data.customer_info_allow_customer_to_edit_profile,
  );

  let options = {
    maxWidth: 256,
    maxHeight: 256,
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

  return (
    <Container>
      <Toolbar title={EDIT_PROFILE} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.wrapper}>
            <View style={styles.proflieWrapper}>
              <View>
                <Image
                  style={{height: 90, width: 90, borderRadius: 50}}
                  source={
                    imageSource ||
                    require('../../assets/images/img_profile.png')
                  }
                />
                {systemConfigState.data
                  .customer_info_allow_customer_to_edit_profile == 1 ? (
                  <TouchableOpacity
                    style={styles.camera}
                    onPress={() => {
                      setBSVisible(true);
                    }}>
                    <Image
                      source={require('../../assets/images/ic_camera.png')}
                    />
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}
              </View>
            </View>
            <Text style={styles.lable}>First Name</Text>
            <TextInput
              blurOnSubmit={false}
              value={form.firstName || null}
              onChangeText={value => {
                onChange({name: 'firstName', value});
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                inputFiledRef?.current['lastName']?.focus();
              }}
              style={styles.value}
              editable={
                systemConfigState.data
                  .customer_info_allow_customer_to_edit_profile == 1
                  ? true
                  : false
              }
            />
            {errors.firstName && (
              <HelperText type="error" style={styles.inputFiledError}>
                {errors.firstName}
              </HelperText>
            )}
            <Text style={styles.lable}>Last Name</Text>
            <TextInput
              blurOnSubmit={true}
              value={form.lastName || null}
              onChangeText={value => {
                onChange({name: 'lastName', value});
              }}
              returnKeyType="done"
              ref={element => (inputFiledRef.current['lastName'] = element)}
              onSubmitEditing={onSubmit}
              style={styles.value}
              editable={
                systemConfigState.data
                  .customer_info_allow_customer_to_edit_profile == 1
                  ? true
                  : false
              }
            />
            {errors.lastName && (
              <HelperText type="error" style={styles.inputFiledError}>
                {errors.lastName}
              </HelperText>
            )}
            <Text style={styles.lable}>Email</Text>
            <TextInput
              blurOnSubmit={false}
              value={form.email || null}
              onChangeText={value => {
                onChange({name: 'email', value});
              }}
              returnKeyType="next"
              ref={element => (inputFiledRef.current['email'] = element)}
              onSubmitEditing={() => {
                inputFiledRef?.current['phoneNo']?.focus();
              }}
              editable={
                systemConfigState.data
                  .customer_info_allow_customer_to_edit_profile == 1
                  ? true
                  : false
              }
              style={styles.value}
            />
            {errors.emailAdd && (
              <HelperText type="error" style={styles.inputFiledError}>
                {errors.emailAdd}
              </HelperText>
            )}
            <Text style={styles.lable}>Phone</Text>
            <TextInput
              value={form.phoneNo || null}
              onChangeText={value => {
                onChange({name: 'phoneNo', value});
              }}
              returnKeyType="done"
              ref={element => (inputFiledRef.current['phoneNo'] = element)}
              onSubmitEditing={onSubmit}
              style={styles.value}
              editable={
                systemConfigState.data
                  .customer_info_allow_customer_to_edit_profile == 1
                  ? true
                  : false
              }
            />
            {errors.phoneNo && (
              <HelperText type="error" style={styles.inputFiledError}>
                {errors.phoneNo}
              </HelperText>
            )}
            <View style={{borderBottomWidth: 0.5, borderColor: colors.grey}}>
              <View style={{marginTop: 7}}>
                <Text
                  style={{color: colors.grey, fontWeight: '400', fontSize: 13}}>
                  Birth Date
                </Text>
              </View>
              <View style={{marginTop: 0}}>
                {systemConfigState.data
                  .customer_info_allow_customer_to_edit_profile == 1 ? (
                  <CustomDatepicker
                    textStyle={{
                      paddingVertical: 15,
                      paddingHorizontal: 10,
                      borderWidth: 1,
                    }}
                    data={form.birthdate}
                    Edit={'edit'}
                    onDateChange={value => {
                      onChange({name: 'birthdate', value});
                    }}
                  />
                ) : (
                  <TextInput
                    value={form.birthdate}
                    onChangeText={value => {
                      onChange({name: 'phoneNo', value});
                    }}
                    returnKeyType="next"
                    ref={element =>
                      (inputFiledRef.current['phoneNo'] = element)
                    }
                    onSubmitEditing={onSubmit}
                    style={styles.value}
                    editable={
                      systemConfigState.data
                        .customer_info_allow_customer_to_edit_profile == 1
                        ? true
                        : false
                    }
                  />
                )}
                <View style={{padding: 3}}></View>
              </View>
            </View>
            {/* {systemConfigState.data.customer_reward_info_add_referral_code_after_registration == 1 ?
              <View style={{ borderBottomWidth: 0.5, borderColor: colors.grey }}>
                <View style={{ marginTop: 7, }}>
                  <Text style={{ color: colors.grey, fontWeight: '400', fontSize: 13 }}>Referral code</Text>
                </View>
                <View style={{ marginTop: 0, }}>
                  <TextInput
                    label="Referral code"
                    underlineColor={colors.grey}
                    keyboardType="default"
                    style={styles.value}
                    dense={true}
                    blurOnSubmit={false}
                    value={form.referral_membership_code || null}
                    onChangeText={value => {
                      onChange({ name: 'referral_membership_code', value });
                    }}

                    returnKeyType="done"
                    ref={element => (inputFiledRef.current['referral_membership_code'] = element)}
                    onSubmitEditing={() => {
                      inputFiledRef?.current['referral_membership_code']?.focus();
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
                </View>
              </View> :
              <View></View> */}
            {/* } */}
            <View style={styles.btnWrapper}>
              <CustomButton
                style={[styles.btn, {marginEnd: 10}]}
                primaryLight
                title={CANCEL}
                onPress={() => {
                  navigation.dispatch(StackActions.pop(1));
                }}
              />
              <CustomButton
                style={[styles.btn, {marginStart: 10}]}
                primary
                title={SAVE}
                onPress={onSubmit}
              />
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

export default EditProfileComponent;
