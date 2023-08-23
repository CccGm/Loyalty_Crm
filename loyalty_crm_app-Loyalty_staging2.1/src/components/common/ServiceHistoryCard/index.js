import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import colors from '../../../assets/theme/colors';
import styles from './styles';

const ServiceHistoryCard = ({ item, itemClick }) => {

  const navigation = useNavigation();

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
            uri: item.product_image,
          }}
        />
        <View style={styles.cardDetails}>
          <Text style={styles.pacakgeName}>{item.product_name}</Text>
          {item.category_name == "" ? <View></View> :
            <Text numberOfLines={1} style={styles.serviceIncluded}>
              {item.category_name}
            </Text>
          }
          <View style={styles.dateTimeWrapper}>
            {
              item.expiry_date == null ? <View></View> :
                <View style={{ flexDirection: 'row',padding:5,backgroundColor:'#dfdfdf',borderRadius:50 }}>
                  {/* <Image source={require('../../../assets/images/ic_calendar.png')} /> */}
                  <Text style={[styles.dateTime,{color:'#262626'}]}>
                  Expired On {item.expiry_date}
                  </Text>
                </View>
            }
          </View>
        </View>
       
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ServiceHistoryCard;
