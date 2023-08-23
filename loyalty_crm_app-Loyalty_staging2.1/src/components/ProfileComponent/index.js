import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Button,
  Share,
  ToastAndroid,
} from 'react-native';
import {build, version} from '../../../package.json';
import colors from '../../assets/theme/colors';
import {USER} from '../../constants/prefrenceKeys';
import {
  CHANGE_PASSWORD,
  EDIT_PROFILE,
  PROFILE,
} from '../../constants/routeName';
import Container from '../common/Container';
import Toolbar from '../common/Toolbar';
import styles from './styles';
import Barcode from 'react-native-barcode-builder';
import {GlobalContext} from '../../context/Provider';
import {useContext} from 'react';
import moment from 'moment';
import CustomButton from '../common/CustomButton';
import {CANCEL, CONFIRM} from '../../constants/strings';
import BottomSheet from '../common/BottomSheet';
import {gettabviewdata} from '../../context/actions/common';
import {DefaultTheme} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ReferralCodeAdd from '../../context/actions/auth/ReferralCodeAdd';
import RBSheet from 'react-native-raw-bottom-sheet';
import Ionicons from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Clipboard from '@react-native-community/clipboard';
import {ToasterHelper} from 'react-native-customizable-toast';
import Ioniconss from 'react-native-vector-icons/FontAwesome5';
import dynamicLinks from '@react-native-firebase/dynamic-links';
const ProfileComponent = ({
  logoutClick,
  DeactiveAccounts,
  profiledata,
  profileDetails,
}) => {
  const textInputTheme = {
    ...DefaultTheme,
    colors: {
      text: colors.black,
      primary: colors.primary,
      placeholder: colors.grey,
      background: colors.transparent,
    },
  };

  const {navigate} = useNavigation();
  const Sheet = useRef(null);
  const Sheet1 = useRef(null);
  const Sheet3 = useRef(null);
  const [user, setUser] = useState('');
  const {getItem} = useAsyncStorage(USER);
  const [bsVVisible, setBSVVisible] = useState(false);
  const [bsrefrrel, setBsrefrrel] = useState(false);
  const [refrrelcode, setrefrrelcode] = useState('');
  const {systemConfigState} = useContext(GlobalContext);
  const {bsDispatch} = useContext(GlobalContext);
  const [deletetext, setdeletetext] = useState('');
  console.log('systemConfigState', systemConfigState);
  const [clipboardString, setClipboardString] = useState('');

  useEffect(async () => {
    let isCancelled = false;
    const usr = JSON.parse(await getItem());

    if (!isCancelled) {
      setUser(usr);
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const createTwoButtonAlert = () =>
    Alert.alert('Delete Account', 'Are you sure delete your account?', [
      {text: 'OK', onPress: () => setBSVVisible(true)},
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'default',
      },
    ]);

  const RedeemVoucherBS = ({onPositiveClick, onNegativeClick}) => {
    const {dashboardState} = useContext(GlobalContext);
    const [text, setText] = useState('');
    const [error, seterror] = useState();

    return (
      <View
        style={{
          padding: 15,
          flex: 1,
          // justifyContent: 'space-around',
        }}>
        <Text style={styles.bsTitle}>
          Are you sure you want to delete your account?
        </Text>
        <Text style={styles.bsSubTitle}>This cannot be undone </Text>
        <Text style={styles.bsTitle1}>
          To confirm deletion, Please write word DELETE and proceed
        </Text>
        {/* <TextInput placeholder="Username" style={styles.textInput} /> */}
        <View
          style={{
            backgroundColor: 'white',
            marginTop: 12,
          }}>
          <TextInput
            placeholder="Delete"
            style={{
              height: 40,
              borderColor: colors.grey,
              borderBottomWidth: 1,
              marginBottom: 10,
              fontWeight: 'bold',
            }}
            onChangeText={newText => setText(newText)}
          />
          <Text style={{color: 'red'}}>{error}</Text>
          {/* <Button title="Submit" onPress={() => null} /> */}
        </View>
        <View style={styles.bsBtnWrapper}>
          <CustomButton
            style={styles.bsBtn}
            primaryLight
            title={CANCEL}
            onPress={onNegativeClick}
          />
          <CustomButton
            style={styles.bsBtn}
            primary
            title={CONFIRM}
            onPress={() => {
              if (text == '') {
                seterror('please enter text');
              } else if (text.trim() == 'delete' || text.trim() == 'Delete') {
                // seterror("complate text")
                // onPositiveClick({
                DeactiveAccounts();
                Sheet1.current.close();

                // gettabviewdata(bsDispatch, true);

                // });
              } else {
                seterror('Invalid text provided');
              }
            }}
          />
        </View>
      </View>
    );
  };

  // const onShare = async code => {
  //   const link = await dynamicLinks().buildShortLink({
  //     link: `https://eyebrow.staging.gosolutions.sg?invitedBy=${code}`,
  //     domainUriPrefix: `https://eyebrowstaging.page.link`, // The prefix for your dynamic link URL
  //     android: {
  //       packageName: 'sg.co.gosolution.loyaltycrm.beta',
  //     },
  //     ios: {
  //       bundleId: 'sg.co.gosolution.lcrm.eyebrow.beta', // Your iOS bundle identifier
  //       appStoreId: '1666220460',
  //     },
  //     suffix: {
  //       option: 'SHORT',
  //     },
  //   });

  const onShare = async code => {
    const Url = 'https://eyebrow.staging.gosolutions.sg/admin/store/85';
    // const link = await dynamicLinks().buildShortLink({
    //   link: `https://eyebrow.staging.gosolutions.sg?invitedBy=${code}`,
    //   domainUriPrefix: `https://eyebrowstaging.page.link`, // The prefix for your dynamic link URL
    //   android: {
    //     packageName: 'sg.co.gosolution.loyaltycrm.beta', // Your Android package name
    //   },
    //   ios: {
    //     bundleId: 'sg.co.gosolution.lcrm.eyebrow.beta', // Your iOS bundle identifier
    //     appStoreId: '1666220460',
    //   },
    //   suffix: {
    //     option: 'SHORT',
    //   },
    // });

    try {
      const result = await Share.share({
        title: 'The eyebrow city rewards',
        message: `Hello! Sign up for The Eyebrow City Loyalty Membership using my referral code ${code}. You will receive ${
          systemConfigState.data
            .customer_reward_info_reward_points_for_new_joinee
        } points after you complete ${
          systemConfigState.data.customer_reward_info_when_reward_credits == 1
            ? 'the registration.'
            : 'your 1st purchase.'
        } Here's the link: 
${Url}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // alert(error.message);
    }
  };

  const handleClipboardAction = str => {
    Clipboard.setString(str);
    if (Platform.OS == 'ios') {
      Alert.alert('Copied to clipboard!');
      setClipboardString(setClipboardString);
    } else {
      ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
    }
  };

  const Referral_Code = ({onPositiveClick, onNegativeClick}) => {
    const {dashboardState} = useContext(GlobalContext);
    const [refrrelcode, setrefrrelcode] = useState('');
    const [error, seterror] = useState();
    const {loaderDispatch} = useContext(GlobalContext);
    const {bottomMessageDispatch} = useContext(GlobalContext);
    const {bsDispatch, authDispatch} = useContext(GlobalContext);

    return (
      <View
        style={{
          padding: 15,
          flex: 1,
          // justifyContent: 'space-around',
        }}>
        <Text style={styles.bsTitlerfrel}>Referral Code</Text>
        <View style={{width: '80%', height: 50}}></View>
        <View style={{width: '80%', height: 50}}></View>

        {/* <Text style={styles.bsTitle1}>To confirm deletion, Please write word DELETE and proceed</Text> */}
        {/* <TextInput placeholder="Username" style={styles.textInput} /> */}
        <View
          style={{
            backgroundColor: 'white',
            // marginTop: 15,
          }}>
          <TextInput
            placeholder="Enter Referral Code"
            style={{
              height: 40,
              borderColor: colors.grey,
              borderBottomWidth: 1,
              marginBottom: 10,
              fontWeight: 'bold',
            }}
            returnKeyType="done"
            onChangeText={newText => setrefrrelcode(newText)}
          />
          <Text style={{color: 'red'}}>{error}</Text>
          {/* <Button title="Submit" onPress={() => null} /> */}
        </View>
        <View style={styles.bsBtnWrapper}>
          <CustomButton
            style={styles.bsBtn}
            primaryLight
            title={CANCEL}
            onPress={onNegativeClick}
          />
          <CustomButton
            style={styles.bsBtn}
            primary
            title={CONFIRM}
            onPress={() => {
              if (refrrelcode == '') {
                seterror('please enter referral code');
              } else if (refrrelcode) {
                // seterror("")
                ReferralCodeAdd(
                  loaderDispatch,
                  bottomMessageDispatch,
                  authDispatch,
                  refrrelcode,
                )(res => {
                  // console.log('sdskdmdsmksdmlsdmdsmsldmlsds', res);
                  if (res.status == 'failure') {
                    Alert.alert('Invalid Referral Code.');
                    // Sheet.current.close();
                    // setBsrefrrel(true);
                    profileDetails();
                    // gettabviewdata(bsDispatch, true)
                    // return 0
                    // gettabviewdata(bsDispatch, true)
                  } else {
                    // seterror('DSd');
                    // setBsrefrrel(false);
                    Sheet.current.close();
                    // gettabviewdata(bsDispatch, true);
                    profileDetails();
                  }
                });
                // seterror("complate text")
                // onPositiveClick({
                // Referral_CodeAdd(refrrelcode)
                // gettabviewdata(bsDispatch, true)

                // });
              } else {
                // seterror("Invalid text provided")
              }
              // setBsrefrrel(false)
              // gettabviewdata(bsDispatch, true)
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <Container>
      {systemConfigState.data.customer_info_allow_customer_to_edit_profile ==
      1 ? (
        <Toolbar
          title={PROFILE}
          hideBackBtn
          rightOptionMenu={
            <TouchableOpacity
              onPress={() => {
                navigate(EDIT_PROFILE);
              }}>
              <Image source={require('../../assets/images/ic_edit.png')} />
            </TouchableOpacity>
          }
        />
      ) : (
        <Toolbar title={PROFILE} hideBackBtn />
      )}

      <ScrollView>
        {profiledata.data.length == 0 ? (
          <View></View>
        ) : (
          <View style={styles.topWrapper}>
            <View style={styles.proflieWrapper}>
              <Image
                style={{height: 120, width: 120, borderRadius: 90}}
                source={
                  profiledata.data?.image?.length > 0
                    ? {uri: profiledata.data.image}
                    : require('../../assets/images/img_profile_big.png')
                }
                PlaceholderContent={<ActivityIndicator />}
              />
              <Text style={styles.profileName}>
                {profiledata.data.first_name == null
                  ? ''
                  : profiledata.data.first_name}{' '}
                {profiledata.data.last_name == null
                  ? ' '
                  : profiledata.data.last_name}
                {/* {profiledata.data.first_name + ' ' + profiledata.data.last_name} */}
              </Text>

              <View
                style={{
                  // borderWidth: 1,
                  paddingHorizontal: 5,
                  marginTop: 5,
                  // paddingVertical: 10,
                  width: '90%',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Poppins-Regular',
                      fontSize: 15,
                      color: '#717981',
                    }}>
                    {`Refer your friends by sharing your invite code! Receive ${
                      systemConfigState.data
                        .customer_reward_info_reward_points_for_referral
                    } points once your friend make their ${
                      systemConfigState.data
                        .customer_reward_info_when_reward_credits == 1
                        ? 'completes registration.'
                        : 'first purchase.'
                    } `}
                  </Text>
                  <View
                    style={{
                      // borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // borderWidth: 1,
                      }}>
                      <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                        Share Your Membership Code
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity
                        style={{
                          marginTop: 5,
                          // width: 200,
                          paddingHorizontal: 9,
                          height: 40,
                          borderWidth: 1.2,
                          borderRadius: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#f9e6ed',
                          borderStyle: 'dashed',
                          flexDirection: 'row',
                          borderColor: '#b73e96',
                        }}
                        onPress={() => {
                          handleClipboardAction(
                            profiledata.data.membership_code,
                          );
                        }}>
                        <Text
                          style={{
                            color: '#b73e96',
                            fontSize: 20,
                            fontFamily: 'Poppins-SemiBold',
                          }}>
                          {profiledata.data.membership_code}
                        </Text>
                        {/* <TouchableOpacity
                          style={{
                            // marginTop: 5,
                            // width: 50,
                            // height: 40,
                            marginLeft: 5,
                            // borderRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            // backgroundColor: '#ffff',
                          }}
                          onPress={() => {
                            onShare(profiledata.data.membership_code);
                          }}>
                          <Ioniconss
                            name="share-alt"
                            size={22}
                            color={colors.accent}
                          />
                        </TouchableOpacity> */}
                      </TouchableOpacity>
                      {systemConfigState.data
                        .customer_reward_info_share_referral_via_link == 1 ? (
                        <TouchableOpacity
                          style={{
                            marginTop: 5,
                            // width: 50,
                            // height: 40,
                            marginLeft: 10,
                            // borderRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            // backgroundColor: '#ffff',
                          }}
                          onPress={() => {
                            onShare(profiledata.data.membership_code);
                          }}>
                          <Ioniconss
                            name="share-alt"
                            size={23}
                            color={colors.accent}
                          />
                        </TouchableOpacity>
                      ) : (
                        <View></View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.detailWrapper}>
              <Text style={styles.lable}>Email</Text>
              <TextInput
                style={styles.value}
                value={profiledata.data.email}
                editable={false}
              />
              <Text style={styles.lable}>Phone Number</Text>
              <TextInput
                style={styles.value}
                value={profiledata.data.phone_number}
                editable={false}
              />
              {profiledata.data.birthdate == null ||
              profiledata.data.birthdate == '0000-00-00' ? (
                <View></View>
              ) : (
                <View>
                  <Text style={styles.lable}>Birth Date</Text>
                  <TextInput
                    style={styles.value}
                    value={moment(profiledata.data.birthdate).format(
                      'DD-MM-YYYY',
                    )}
                    editable={false}
                  />
                </View>
              )}
              {/* {profiledata.data.referral_membership_code == null ? (
                <View></View>
              ) : (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.lable}>Referral Code</Text>
                  </View>
                </View>
              )} */}
              {/* {profiledata.data.referral_membership_code ? (
                <View></View>
              ) : systemConfigState.data
                  .customer_reward_info_add_referral_code_after_registration ==
                1 ? (
                <TouchableOpacity
                  style={{borderBottomWidth: 0.5, borderColor: colors.grey}}
                  onPress={() => {
                    Sheet.current.open();
                    // gettabviewdata(bsDispatch, false);
                    // setBsrefrrel(true);
                  }}>
                  <Text style={styles.changePassword}>Referral Code</Text>
                </TouchableOpacity>
              ) : (
                <View></View>
              )} */}
              {profiledata.data.referral_membership_code ? (
                <View></View>
              ) : systemConfigState.data
                  .customer_reward_info_add_referral_code_after_registration ==
                1 ? (
                <TouchableOpacity
                  style={{borderBottomWidth: 0.5, borderColor: colors.grey}}
                  onPress={() => {
                    Sheet.current.open();
                  }}>
                  <Text style={styles.changePassword}>Referral Code</Text>
                </TouchableOpacity>
              ) : (
                <View></View>
              )}

              <TouchableOpacity
                style={{borderBottomWidth: 0.5, borderColor: colors.grey}}
                onPress={() => {
                  navigate(CHANGE_PASSWORD);
                }}>
                <Text style={styles.changePassword}>Change Password</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{borderBottomWidth: 0.5, borderColor: colors.grey}}
                onPress={() => {
                  logoutClick();
                }}>
                <Text style={styles.changePassword}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Sheet1.current.open();
                  // gettabviewdata(bsDispatch, false);
                  // setBSVVisible(true);
                }}>
                <Text style={styles.changePassword1}>Delete Account</Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.grey,
                  alignSelf: 'flex-end',
                }}>
                Version:{version}.{build} (190723)
              </Text>
              <Barcode
                value={
                  profiledata.data == ''
                    ? '0'
                    : profiledata.data.membership_code
                }
                format="CODE128"
                width={2}
                height={50}
                text={
                  profiledata.data == ''
                    ? '0'
                    : profiledata.data.membership_code
                }
              />
            </View>
          </View>
        )}
      </ScrollView>

      <RBSheet
        ref={Sheet}
        height={380}
        // duration={250}
        customStyles={{
          wrapper: {
            // borderWidth: 1,
            // backgroundColor: 'transparent',
          },
          container: {
            // borderWidth: 1,
            backgroundColor: '#fff',
            borderTopStartRadius: 12,
            borderTopEndRadius: 12,
          },
          draggableIcon: {
            backgroundColor: '#FA9A5B',
          },
        }}>
        <Referral_Code
          // item={item}
          onNegativeClick={() => {
            Sheet.current.close();
            // setBsrefrrel(false);
            // gettabviewdata(bsDispatch, true);
          }}
          onPositiveClick={updateObj => {
            // setBsrefrrel(false);
            Sheet.current.close();
            // gettabviewdata(bsDispatch, true);
            // buyVoucher(updateObj);
          }}
        />
      </RBSheet>

      <RBSheet
        ref={Sheet3}
        height={200}
        // duration={250}
        customStyles={{
          wrapper: {
            // borderWidth: 1,
            // backgroundColor: 'transparent',
          },
          container: {
            // borderWidth: 1,
            backgroundColor: '#fff',
            borderTopStartRadius: 12,
            borderTopEndRadius: 12,
          },
          draggableIcon: {
            backgroundColor: '#FA9A5B',
          },
        }}></RBSheet>

      <RBSheet
        ref={Sheet1}
        height={400}
        // duration={250}200
        customStyles={{
          wrapper: {
            // borderWidth: 1,
            // backgroundColor: 'transparent',
          },
          container: {
            // borderWidth: 1,
            backgroundColor: '#fff',
            borderTopStartRadius: 12,
            borderTopEndRadius: 12,
          },
          draggableIcon: {
            backgroundColor: '#FA9A5B',
          },
        }}>
        <RedeemVoucherBS
          // item={item}
          onNegativeClick={() => {
            Sheet1.current.close();
            // setBSVVisible(false);
            // gettabviewdata(bsDispatch, true);
          }}
          onPositiveClick={updateObj => {
            Sheet1.current.close();
            // setBSVVisible(false);
            // gettabviewdata(bsDispatch, true);
            // buyVoucher(updateObj);
          }}
        />
      </RBSheet>

      {/* {bsrefrrel == true ? (
        <BottomSheet
          visible={bsrefrrel}
          setVisibility={setBsrefrrel}
          canceledOnTouchOutside={false}
          body={
            <Referral_Code
              // item={item}
              onNegativeClick={() => {
                setBsrefrrel(false);
                gettabviewdata(bsDispatch, true);
              }}
              onPositiveClick={updateObj => {
                setBsrefrrel(false);
                gettabviewdata(bsDispatch, true);
                // buyVoucher(updateObj);
              }}
            />
          }
        />
      ) : (
        <BottomSheet
          visible={bsVVisible}
          setVisibility={setBSVVisible}
          canceledOnTouchOutside={false}
          body={
            <RedeemVoucherBS
              // item={item}
              onNegativeClick={() => {
                setBSVVisible(false);
                gettabviewdata(bsDispatch, true);
              }}
              onPositiveClick={updateObj => {
                setBSVVisible(false);
                gettabviewdata(bsDispatch, true);
                // buyVoucher(updateObj);
              }}
            />
          }
        />
      )} */}
    </Container>
  );
};

export default ProfileComponent;
