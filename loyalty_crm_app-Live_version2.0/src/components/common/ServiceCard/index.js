import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {Image, Text, TouchableWithoutFeedback, View} from 'react-native';
import colors from '../../../assets/theme/colors';
import styles from './styles';

const ServiceCard = ({item, itemClick}) => {
  console.log(item.history);

  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        itemClick && itemClick(item);
      }}>
      <View
        style={[
          styles.card,
          {backgroundColor: item.history == 1 ? '#f5f5f5' : colors.cream},
        ]}>
        <Image
          style={{
            alignSelf: 'center',
            height: 60,
            width: 60,
            borderRadius: 100,
          }}
          source={{
            uri: item.product_image,
          }}
        />
        <View style={styles.cardDetails}>
          <Text style={styles.pacakgeName}>{item.product_name}</Text>
          {item.variation_name == '' ? (
            <View></View>
          ) : (
            <Text numberOfLines={1} style={styles.serviceIncluded}>
              ({item.variation_name})
            </Text>
          )}
          {item.category_name == '' ? (
            <View></View>
          ) : (
            <Text numberOfLines={1} style={styles.serviceIncluded}>
              {item.category_name}
            </Text>
          )}

          <View style={styles.dateTimeWrapper}>
            {item.expiry_date == null ? (
              <View></View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  backgroundColor: item.history == 1 ? '#dfdfdf' : '#f4dae7',
                  borderRadius: 50,
                }}>
                {/* <Image source={require('../../../assets/images/ic_calendar.png')} /> */}
                {item.history == 1 ? (
                  <Text
                    style={[
                      styles.dateTime,
                      {color: item.history == 1 ? '#262626' : colors.primary},
                    ]}>
                    Expired On {item.expiry_date}
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.dateTime,
                      {color: item.history == 1 ? '#262626' : colors.primary},
                    ]}>
                    Expires On {item.expiry_date}
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
        {item.history == 1 ? (
          <View></View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              marginEnd: 10,
            }}>
            <Text
              style={{
                fontSize: 11,
                color: colors.grey,
                fontWeight: '500',
                fontFamily: 'Poppins-Regular',
              }}>
              Sessions
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.primary,
                fontWeight: '500',
                fontFamily: 'Poppins-Regular',
              }}>
              {item.remain_session == '∞'
                ? item.remain_session
                : item.remain_session == null || ''
                ? '00'
                : item.remain_session.toString().length == 1
                ? `0${item.remain_session}`
                : item.remain_session}
              /
              {item.total_sessions == '∞'
                ? item.total_sessions
                : item.total_sessions == ''
                ? '00'
                : item.total_sessions.length == 1
                ? `0${item.total_sessions}`
                : item.total_sessions}
            </Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ServiceCard;
