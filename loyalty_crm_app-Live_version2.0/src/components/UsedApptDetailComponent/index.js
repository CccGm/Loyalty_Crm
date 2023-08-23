import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useContext, useState, useEffect} from 'react';
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
import {RESCHEDULE_APPOINTMENT} from '../../constants/routeName';
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

const UsedApptDetailComponent = ({item, currentService, cancelAppt}) => {
  console.log('item', item);
  console.log('item', currentService);
  const [currentserviceObj, setCurserviceObj] = useState(currentService || {});

  // item.services.find(s=>s.id== currentService.id
  const [bsVisible, setBSVisible] = useState(false);
  const [bsCodeVisible, setBSCodeVisible] = useState(false);
  const [bsArrivedCodeVisible, setBSArrivedCodeVisible] = useState(false);
  const {navigate} = useNavigation();

  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);

  // console.log("itemitem",item)

  useEffect(() => {
    // const services = item.services.used_session;
    // setCurserviceObj(services.find(s=>s.appointment_id== currentService.appointment_id))
  }, []);

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

  const renderColor = colors => {
    if (colors == 'Pending') {
      return 'orange';
    } else if (colors == 'Confirmed') {
      return '#53a7fe';
    } else if (colors == 'Completed') {
      return 'green';
    } else if (colors == 'Cancelled') {
      return 'grey';
    } else if (colors == 'Expired') {
      return 'red';
    } else if (colors == 'No Show') {
      return 'grey';
    } else if (colors == 'Rescheduled') {
      return 'red';
    }
  };
  const {apptsUpcomingDispatch} = useContext(GlobalContext);

  return (
    <Container>
      <Toolbar title={currentserviceObj?.booking_id ?? ' '} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View>
          <Image
            style={{
              width: '100%',
              height: 190,
            }}
            source={{uri: item.product_image ?? ' '}}
          />
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Service Included:</Text>
            <View style={styles.cardDetail}>
              {item.product_name == '' ? (
                <View></View>
              ) : (
                <LeftIconText title={item.product_name} />
              )}
              {item.variation_name == '' ? (
                <View></View>
              ) : (
                <VariationText title={item.variation_name} />
              )}

              {/* {item.appointment_service.length > 0 ? (
                item.appointment_service.map((as, index) => {
                  return <LeftIconText key={index} title={as.product_name} />;
                })
              ) : (
                <Text>No data</Text>
              )} */}
            </View>
          </View>
        </View>

        <View style={styles.wrapper}>
          {false && <Text style={styles.sessionTitle}>Session 01</Text>}
          <Text style={styles.title}>Date & Time</Text>
          <View style={styles.apptDateTimeWrapper}>
            <Image
              style={styles.apptDateTimeIcon}
              source={require('../../assets/images/ic_calendar.png')}
            />
            {console.log(
              'ddijfjifjfijfjfj',
              currentserviceObj.appointment_date_from,
            )}
            <TextInput
              style={[
                styles.apptDateTimeValue,
                {color: renderColors(currentserviceObj), marginStart: 5},
              ]}
              editable={false}
              blurOnSubmit={false}
              value={
                moment(currentserviceObj.appointment_date_from)
                  .format('DD MMMM, ')
                  .toUpperCase() +
                ' AT ' +
                moment(currentserviceObj.appointment_date_from).format(
                  'hh:mm A',
                ) +
                ' - ' +
                moment(currentserviceObj.appointment_date_to).format('hh:mm A')
              }
            />
          </View>
          {!currentserviceObj.code && (
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
            
            {currentserviceObj.staff_comment == null || currentserviceObj.staff_comment == null  ? '-' : currentserviceObj.staff_comment}
          </Text> */}
          <Text style={styles.title}>Customer Remarks</Text>
          <Text style={styles.description}>
            {currentserviceObj.customer_remark == null ||
            currentserviceObj.customer_remark == ''
              ? '-'
              : currentserviceObj.customer_remark}
          </Text>
          <Text style={styles.title}>Staff Name </Text>
          <Text style={styles.description}>
            {currentserviceObj.staff_name == null ||
            currentserviceObj.staff_name == ''
              ? '-'
              : currentserviceObj.staff_name}
          </Text>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.description}>
            {item.des == '' || item.des == null ? '-' : item.des}
          </Text>
          {currentserviceObj.location_number == null ? (
            <View></View>
          ) : (
            <View>
              <Text style={styles.title}>Note </Text>
              <Text style={styles.description}>
                {`Kindly send a message via WhatsApp or call ${currentserviceObj.location_number} if you wish to reschedule or cancel your appointment `}
              </Text>
            </View>
          )}
          <Text style={styles.title}>Status </Text>
          <Text
            style={{
              fontSize: 15,
              color: renderColor(currentserviceObj.status_text),
              // fontWeight: '500',
              fontFamily: 'Poppins-Regular',
              marginTop: 5,
            }}>
            {currentserviceObj.status_text}
          </Text>
        </View>
        <View style={{padding: 40}}></View>
        {
          currentserviceObj.status_text == 'Pending' ||
          currentserviceObj.status_text == 'Completed' ||
          currentserviceObj.status_text == 'Rescheduled' ||
          currentserviceObj.status_text == 'Cancelled' ||
          currentserviceObj.status_text == 'No Show' ||
          currentserviceObj.code == '' ? (
            <View></View>
          ) : (
            <CustomButton
              style={styles.btnArrived}
              primaryLight
              title={I_HAVE_ARRIVED}
              onPress={() => {
                setBSCodeVisible(true);
              }}
            />
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
            item={currentserviceObj}
            onNegativeClick={() => {
              setBSVisible(false);
            }}
            onPositiveClick={() => {
              setBSVisible(false);
              cancelAppt(currentserviceObj);
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
            apptCode={currentserviceObj.code}
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
            apptCode={currentserviceObj.code}
            onCloseClick={() => {
              setBSCodeVisible(false);
            }}
          />
        }
      />
    </Container>
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
            <Image source={require('../../assets/images/calander.png')} />
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

const LeftIconText = ({title}) => {
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

const VariationText1 = ({title}) => {
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
          fontSize: 13,
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

export default UsedApptDetailComponent;
