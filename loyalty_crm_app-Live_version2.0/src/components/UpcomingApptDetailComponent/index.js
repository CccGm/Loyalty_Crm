import {useNavigation, useRoute, StackActions} from '@react-navigation/native';
import moment from 'moment';
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import colors from '../../assets/theme/colors';
import {APPOINTMENT, RESCHEDULE_APPOINTMENT} from '../../constants/routeName';
import {
  CANCEL,
  I_HAVE_ARRIVED,
  NO_KEEP_IT,
  RESCHEDULE,
  VIEW_APPOINTMENT_CODE,
  YES_CANCEL,
} from '../../constants/strings';
import getApptCode from '../../context/actions/dashboardOps/getApptCode';
import {GlobalContext} from '../../context/Provider';
import BottomSheet from '../common/BottomSheet';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import Toolbar from '../common/Toolbar';
import styles from './styles';

const UpcomingApptDetailComponent = ({item, cancelAppt}) => {
  console.log('UpcomingApptDetailComponent', item);

  const {
    apptsUpcomingState: {data: upcomingData},
  } = useContext(GlobalContext);

  const [bsVisible, setBSVisible] = useState(false);
  const [bsCodeVisible, setBSCodeVisible] = useState(false);
  const [bsArrivedCodeVisible, setBSArrivedCodeVisible] = useState(false);
  const {navigate} = useNavigation();
  const navigation = useNavigation();
  const route = useRoute();

  const [itemObj, setItemObj] = useState(item || {});

  console.log('itemObjitemObjitemObj', itemObj);
  useEffect(() => {
    if (route.params.dashboard) {
      setItemObj(itemObj);
    } else {
      const upcomingAppointments = upcomingData.upcoming_appointment;
      console.log('upcomingAppointments', upcomingAppointments);
      if (upcomingAppointments.length == 0) {
        navigation.dispatch(StackActions.pop(1));
        console.log('upcomingAppointments_length', upcomingAppointments);
        setItemObj(item);
      } else {
        console.log(
          'find',
          upcomingAppointments.find(i => i?.id == itemObj?.id),
        );
        setItemObj(upcomingAppointments.find(i => i?.id == itemObj?.id));
      }
    }
  }, [upcomingData.upcoming_appointment]);

  const renderColor = colors => {
    if (colors == 'Pending') {
      return 'orange';
    } else if (colors == 'Confirmed') {
      return '#53a7fe';
    } else if (colors == 'Completed') {
      return 'green';
    } else if (colors == 'Cancelled') {
      return 'red';
    } else if (colors == 'Expired') {
      return 'red';
    }
  };
  const jsCoreDateCreator = dateString => {
    // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"
    let dateParam = dateString.split(/[\s-:]/);
    dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString();
    return new Date(...dateParam);
  };

  const renderColors = colors => {
    let dateTo = jsCoreDateCreator(`${colors.appointment_date_to}`);
    // var CurrentdateTime = moment().format('YYYY-MM-DD hh:mm:ss');
    var CurrentdateTime = new Date();
    // console.log("appdate from Api",dateTo)
    var ExpireDateTime = dateTo;
    // console.log("CurrentdateTime",CurrentdateTime)

    // console.log("ExpireDateTimevvvvvvvvv",ExpireDateTime)

    if (CurrentdateTime >= ExpireDateTime) {
      return 'red';
    } else {
      return 'black';
    }
  };

  if (!itemObj?.id) {
    console.log('sfvfsvgsvgsvgsggvssvssggsvg', !itemObj?.id);
    navigation.dispatch(StackActions.pop(1));
    return <></>;
  }

  return (
    <Container>
      <Toolbar title={itemObj?.booking_id ?? ' '} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View>
          <Image
            style={{
              width: '100%',
              height: 190,
            }}
            source={{uri: itemObj.appointment_service[0]?.product_image ?? ' '}}
          />
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Service Included:</Text>
            <View style={styles.cardDetail}>
              {itemObj.appointment_service.length > 0 ? (
                itemObj.appointment_service.map((as, index) => {
                  return <LeftIconText key={index} title={as.product_name} />;
                })
              ) : (
                <Text>No data</Text>
              )}
              {itemObj.appointment_service.length > 0 ? (
                itemObj.appointment_service.map((as, index) => {
                  {
                    return as.variation_name == null ? (
                      <View></View>
                    ) : (
                      <VariationText
                        key={index}
                        title={as.variation_name}
                        type="v"
                      />
                    );
                  }
                })
              ) : (
                <Text>No data</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.wrapper}>
          {/* {false && <Text style={styles.sessionTitle}>Session 01</Text>} */}
          <Text style={styles.title}>Date & Time</Text>
          <View style={styles.apptDateTimeWrapper}>
            <Image
              style={styles.apptDateTimeIcon}
              source={require('../../assets/images/ic_calendar.png')}
            />
            <TextInput
              style={[styles.apptDateTimeValue, {color: renderColors(itemObj)}]}
              editable={false}
              blurOnSubmit={false}
              value={
                moment(itemObj.appointment_date_from)
                  .format('DD MMMM, ')
                  .toUpperCase() +
                ' AT ' +
                moment(itemObj.appointment_date_from).format('hh:mm A') +
                ' - ' +
                moment(itemObj.appointment_date_to).format('hh:mm A')
              }
            />
          </View>
          {!itemObj.code && (
            <View>
              {/* <Text
                style={{
                  fontSize: 11,
                  marginTop: 18,
                  color: colors.black,
                  fontFamily: 'Poppins-Regular',
                }}>
                Do you want to Cancel or Reschedule the Appointment?
              </Text> */}
              {/* <View
                style={{
                  flexDirection: 'row',
                }}>
                <CustomButton
                  style={{flex: 1, marginEnd: 4, height: 32}}
                  title={CANCEL}
                  onPress={() => {
                    setBSVisible(true);
                  }}
                />
                <CustomButton
                  style={{flex: 1, marginStart: 4, height: 32}}
                  primary
                  title={RESCHEDULE}
                  onPress={() => {
                    navigate(RESCHEDULE_APPOINTMENT, {item: item});
                  }}
                />
              </View> */}
              {/* <View
                style={{
                  height: 1,
                  marginTop: 16,
                  width: '100%',
                  backgroundColor: colors.grey20,
                }}
              /> */}
            </View>
          )}
          {/* <Text style={styles.title}>Internal Remarks</Text>
          <Text style={styles.description}>
            {itemObj.staff_remark == "" || itemObj.staff_remark == null ? '-' : itemObj.staff_remark}
          </Text> */}
          <Text style={styles.title}>Customer Remarks</Text>
          <Text style={styles.description}>
            {itemObj.customer_remark == null || itemObj.customer_remark == ''
              ? '-'
              : itemObj.customer_remark}
          </Text>
          {itemObj.appointment_service[0].service_personnel.length ? (
            <View>
              <Text style={styles.title}>Staff Name</Text>
              <StylistList item={itemObj} />
            </View>
          ) : (
            <View></View>
          )}
          {/* <Text style={styles.title}>Staff Name</Text>
          <Text style={styles.description}>
            {itemObj.staff_remark == null || itemObj.staff_remark == "" ? '-' : itemObj.staff_remark}
          </Text> */}
          <Text style={styles.title}>Description</Text>
          <Text style={styles.description}>
            {itemObj?.appointment_service[0]?.description ?? '-'}
          </Text>
          {itemObj.location_number == null ? (
            <View></View>
          ) : (
            <View>
              <Text style={styles.title}>Note </Text>
              <Text style={styles.description}>
                {`Kindly send a message via WhatsApp or call ${itemObj.location_number} if you wish to reschedule or cancel your appointment `}
              </Text>
            </View>
          )}
          <Text style={styles.title}>Status </Text>
          <Text
            style={{
              fontSize: 15,
              color: renderColor(itemObj.status_text),
              // fontWeight: '500',
              fontFamily: 'Poppins-Regular',
              marginTop: 5,
            }}>
            {itemObj.status_text}
          </Text>
        </View>
        <View style={{padding: 40}}></View>

        {
          itemObj.status_text == 'Pending' ? (
            <View></View>
          ) : (
            <View style={{flex: 1}}>
              <CustomButton
                style={styles.btnArrived}
                primaryLight
                title={I_HAVE_ARRIVED}
                onPress={() => {
                  setBSCodeVisible(true);
                }}
              />
            </View>
          )

          // <CustomButton
          //   style={styles.btnArrived}
          //   primaryLight
          //   title={I_HAVE_ARRIVED}
          //   onPress={() => {
          //     getApptCode(item.id)(
          //       loaderDispatch,
          //       bottomMessageDispatch,
          //       apptsUpcomingDispatch,
          //     )(code => {
          //       item.code = code;
          //       setBSArrivedCodeVisible(true);
          //     });
          //   }}
          // />
        }
      </ScrollView>

      <BottomSheet
        visible={bsVisible}
        setVisibility={setBSVisible}
        canceledOnTouchOutside={true}
        body={
          <CancelBS
            item={itemObj}
            onNegativeClick={() => {
              setBSVisible(false);
            }}
            onPositiveClick={() => {
              setBSVisible(false);
              cancelAppt(itemObj);
            }}
          />
        }
      />
      <BottomSheet
        visible={bsArrivedCodeVisible}
        setVisibility={setBSArrivedCodeVisible}
        canceledOnTouchOutside={true}
        body={
          <ArrivedCodeBS
            apptCode={itemObj.code}
            onCloseClick={() => {
              setBSArrivedCodeVisible(false);
            }}
          />
        }
      />
      <BottomSheet
        visible={bsCodeVisible}
        setVisibility={setBSCodeVisible}
        canceledOnTouchOutside={true}
        body={
          <ApptCodeBS
            apptCode={itemObj.code}
            onCloseClick={() => {
              setBSCodeVisible(false);
            }}
          />
        }
      />
    </Container>
  );
};
const StylistList = ({item}) => {
  return (
    <>
      {item?.appointment_service.length > 0 ? (
        <View style={styles.stylistWrapper}>
          {item?.appointment_service.map((as, index) => {
            console.log('as', as.staff_name);
            // return as.service_personnel.map((index, i) => {
            return (
              <View style={{padding: 2}}>
                <Text
                  key={index.user_id}
                  style={[styles.stylistName, {borderBottomWidth: 0}]}>
                  {as.staff_name}
                </Text>
              </View>
            );
            // })
          })}
        </View>
      ) : null}
    </>
  );
};
const ArrivedCodeBS = ({apptCode, onCloseClick}) => {
  return (
    <TouchableWithoutFeedback>
      <View>
        <View style={{position: 'absolute', top: 20, end: 18}}>
          <TouchableOpacity style={{padding: 4}} onPress={onCloseClick}>
            <Image source={require('../../assets/images/ic_close_black.png')} />
          </TouchableOpacity>
        </View>
        <Text style={styles.bsTitle}>Arrived at salon?</Text>
        <Text style={styles.bsSubTitle}>Please show your appointment code</Text>
        <Text style={styles.bsApptCodeLbl}>Appointment Code</Text>
        <Text style={styles.bsApptCode}>{apptCode}</Text>
        <View style={{marginTop: 40, alignItems: 'center', marginBottom: 44}}>
          <QRCode value={apptCode} size={130} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const ApptCodeBS = ({apptCode, onCloseClick}) => {
  return (
    <TouchableWithoutFeedback>
      <View>
        <View style={{position: 'absolute', top: 20, end: 18}}>
          <TouchableOpacity style={{padding: 4}} onPress={onCloseClick}>
            <Image source={require('../../assets/images/ic_close_black.png')} />
          </TouchableOpacity>
        </View>
        <Text style={styles.bsTitle}>Your Appointment Code</Text>
        <Text style={[styles.bsApptCode, {marginTop: 20}]}>{apptCode}</Text>
        <View style={{marginTop: 40, alignItems: 'center', marginBottom: 44}}>
          <QRCode value={apptCode} size={130} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const CancelBS = ({item, onPositiveClick, onNegativeClick}) => {
  return (
    <TouchableWithoutFeedback>
      <View>
        <Text style={styles.bsTitle}>Are you sure?</Text>
        <Text style={styles.bsSubTitle}>
          You would like to cancel appointment
        </Text>
        <View style={styles.bsCard}>
          <Text style={styles.bsCardTitle}>{item?.booking_id ?? ' '}</Text>
          <View style={styles.bsDateTimeWrapper}>
            <Image source={require('../../assets/images/ic_calendar.png')} />
            <Text
              style={{
                fontSize: 12,
                marginStart: 4,
                color: colors.primary,
                fontWeight: '600',
                fontFamily: 'Poppins-Regular',
              }}>
              {moment(item.appointment_date_from)
                .format('DD MMMM, ')
                .toUpperCase() +
                ' AT ' +
                moment(item.appointment_date_from).format('hh:mm A') +
                ' - ' +
                moment(item.appointment_date_to).format('hh:mm A')}
            </Text>
          </View>
        </View>
        <View style={styles.bsBtnWrapper}>
          <CustomButton
            style={styles.btn}
            primaryLight
            title={NO_KEEP_IT}
            onPress={onNegativeClick}
          />
          <CustomButton
            style={styles.btn}
            primary
            title={YES_CANCEL}
            onPress={onPositiveClick}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const LeftIconText = ({title, i}) => {
  console.log('title', title);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        marginHorizontal: 4,
        marginVertical: 4,
        borderColor: colors.primary,
        textTransform: 'capitalize',
      }}>
      <Image source={require('../../assets/images/right.png')} />
      <Text
        style={{
          marginStart: 6,
          color: colors.white,
          fontSize: 14,
          textTransform: 'capitalize',
          fontWeight: '500',
          fontFamily: 'Poppins-Regular',
        }}>
        {title}
      </Text>
      {/* <Text
        style={{
          marginStart: 4,
          color: colors.white,
          fontSize: 10,
          textTransform: 'capitalize',
          fontWeight: '500',
          fontFamily: 'Poppins-Regular',
        }}>
        (Makeup, Hair Style)
      </Text> */}
    </View>
  );
};

const VariationText = ({title}) => {
  console.log('title', title);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        marginHorizontal: 4,
        marginVertical: 4,
        borderColor: colors.primary,
        textTransform: 'capitalize',
      }}>
      {/* <Image source={require('../../assets/images/right.png')} /> */}
      <Text
        style={{
          // marginStart: 6,
          color: colors.white,
          fontSize: 12,
          textTransform: 'capitalize',
          fontWeight: '500',
          fontFamily: 'Poppins-Regular',
        }}>
        ({title})
      </Text>
      {/* <Text
        style={{
          marginStart: 4,
          color: colors.white,
          fontSize: 10,
          textTransform: 'capitalize',
          fontWeight: '500',
          fontFamily: 'Poppins-Regular',
        }}>
        (Makeup, Hair Style)
      </Text> */}
    </View>
  );
};

export default UpcomingApptDetailComponent;
