import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useContext, useState, useEffect} from 'react';
import {Image, ScrollView, Text, TextInput, View} from 'react-native';
import colors from '../../assets/theme/colors';
import {APPOINTMENT} from '../../constants/routeName';
import {GlobalContext} from '../../context/Provider';
import Container from '../common/Container';
import Toolbar from '../common/Toolbar';
import styles from './styles';

const HistoryApptDetailComponent = ({item}) => {
  console.log('itemdadadadadadadadda', item);
  const {
    apptsHistoryState: {data: historyData},
  } = useContext(GlobalContext);

  const [itemObj, setItemObj] = useState(item || {});
  const {navigate} = useNavigation();
  useEffect(() => {
    const historyAppointments = historyData.history_appointment;
    if (historyAppointments.length == 0) {
      setItemObj(item);
    } else {
      setItemObj(historyAppointments.find(i => i?.id == itemObj?.id));
    }
  }, [historyData.history_appointment]);

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
      return colors.black;
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
    } else if (colors == 'Rescheduled') {
      return 'red';
    } else if (colors == 'No Show') {
      return 'grey';
    }
  };

  console.log('itemObj', itemObj);
  if (!itemObj) {
    navigate(APPOINTMENT);
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
                  return as.variation_name == null ? (
                    <View></View>
                  ) : (
                    <VariationText key={index} title={as.variation_name} />
                  );
                })
              ) : (
                <Text>No data</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.title}>Appointment Date & Time</Text>
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
                itemObj.appointment_date_from == null
                  ? ''
                  : moment(itemObj.appointment_date_from)
                      .format('DD MMMM, ')
                      .toUpperCase() +
                    ' AT ' +
                    moment(itemObj.appointment_date_from).format('hh:mm A') +
                    ' - ' +
                    moment(itemObj.appointment_date_to).format('hh:mm A')
              }
            />
          </View>
          {itemObj.appointment_service[0].service_personnel.length ? (
            <View>
              <Text style={styles.title}>Staff Name</Text>
              <StylistList item={itemObj} />
            </View>
          ) : (
            <View></View>
          )}
          {/* <Text style={styles.title}>Internal Remarks</Text>
          <Text style={styles.description}>
            {itemObj.staff_remark == "" || itemObj.staff_remark == null ? "-" : itemObj.staff_remark}
          </Text> */}
          <Text style={styles.title}>Customer Remarks</Text>
          <Text style={styles.description}>
            {itemObj.customer_remark == '' || itemObj.customer_remark == null
              ? '-'
              : itemObj.customer_remark}
          </Text>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.description}>
            {itemObj.appointment_service[0].description == null
              ? 'Hair spa consists of oil massage, hot towel treatment, Shampooing and hair mask. Hair spa helps in restoring the shine and moisture inthe hair, which was previously lost due to dryness and pollution'
              : itemObj.appointment_service[0].description}
          </Text>
          <Text style={styles.title}>Status </Text>
          <Text
            style={{
              fontSize: 15,
              color: renderColor(itemObj.status_text),
              // fontWeight: '500',
              fontFamily: 'Poppins-Regular',
              flexDirection: 'row',
              marginTop: 5,
            }}>
            {itemObj.status_text}
          </Text>
        </View>
        <View style={{padding: 20}}></View>
      </ScrollView>
    </Container>
  );
};

const StylistList = ({item}) => {
  return (
    <>
      {item?.appointment_service.length > 0 ? (
        <View style={styles.stylistWrapper}>
          {item?.appointment_service.map((as, index) => {
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

const LeftIconText = ({title}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        // width: '46%',
        borderWidth: 0.5,
        marginHorizontal: 4,
        marginVertical: 4,
        borderColor: colors.primary,
      }}>
      <Image source={require('../../assets/images/right.png')} />
      <Text
        style={{
          marginStart: 6,
          color: colors.white,
          fontSize: 14,
          textTransform: 'capitalize',
          // fontWeight: '500',
          fontFamily: 'Poppins-Regular',
        }}>
        {title}
      </Text>
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

export default HistoryApptDetailComponent;

const stylists = [
  {
    id: '1',
    name: 'Veronica Jhonson',
    work: 'Hair Colour',
  },
  {
    id: '2',
    name: 'Richard Thompson',
    work: 'Hair wash',
  },
  {
    id: '3',
    name: 'Richard Thompson',
    work: 'Blow Dry',
  },
  {
    id: '4',
    name: 'Victoria James',
    work: 'Hair Spa',
  },
];
