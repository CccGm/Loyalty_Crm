import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {Image, Text, TouchableWithoutFeedback, View} from 'react-native';
import colors from '../../../assets/theme/colors';
import styles from './styles';

const AppointmentCard = ({item, itemClick}) => {
  const navigation = useNavigation();

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

  const renderDate = () => {
    if (item.appointment_date_from == null) {
      return <Text></Text>;
    } else {
      return (
        <View style={styles.dateTimeWrapper}>
          <Image source={require('../../../assets/images/ic_calendar.png')} />
          <Text style={[styles.dateTime]}>
            {moment(item.appointment_date_from)
              .format('DD MMMM, ')
              .toUpperCase() +
              ' AT ' +
              moment(item.appointment_date_from).format('hh:mm A') +
              ' - ' +
              moment(item.appointment_date_to).format('hh:mm A')}
          </Text>
        </View>
      );
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

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        itemClick && itemClick(item);
      }}>
      <View style={[styles.card]}>
        <Image
          style={{
            alignSelf: 'center',
            height: 60,
            width: 60,
            borderRadius: 100,
          }}
          source={{
            uri: item.appointment_service[0]?.product_image ?? ' ',
          }}
        />
        <View style={styles.cardDetails}>
          <Text style={styles.pacakgeName}>{item?.booking_id ?? ' '}</Text>
          <Text numberOfLines={1} style={styles.serviceIncluded}>
            {item.appointment_service.map(as => as.product_name).join(', ') ??
              ''}
          </Text>
          {item.appointment_service.map((as, i) => {
            console.log('ssjndsdjdnsjn', as.variation_name);
            return as.variation_name == null ? (
              <View></View>
            ) : (
              <Text numberOfLines={1} style={styles.serviceIncluded}>
                {as.variation_name}
              </Text>
            );
          })}
          {/* <Text numberOfLines={1} style={styles.serviceIncluded}>
            {item.appointment_service.map(as => as.variation_name).join(', ') ??
              ''}
          </Text> */}

          {renderDate()}
        </View>

        <View
          style={{
            marginTop: 4,
            width: '30%',
            height: 22,
            // borderWidth:1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: renderColor(item.status_text),
              // fontWeight: '500',
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
            }}>
            {item.status_text}
            {/* {item.remain_session.toString().length == 1 ? 0 : item.remain_session == '' ? '00' : ''}{item.remain_session}/{item.total_sessions == "" ? '00' : item.total_sessions.length == 1 ? 0 : ''}{item.total_sessions} */}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppointmentCard;
