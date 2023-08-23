import { useNavigation } from '@react-navigation/native';
import HighlightText from '@sanar/react-native-highlight-text';
import moment from 'moment';
import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import colors from '../../../assets/theme/colors';
import styles from './styles';
import styledd from '../../LoyaltyPointComponent/styles'
const SearchAppointmentCard = ({ item, itemClick, section, query, vouchers }) => {
  const navigation = useNavigation();
  console.log("itemitem", item)
  console.log("itemClick", itemClick)
  console.log("section", section)
  console.log("query", vouchers)
  {
    return item.promotion_id ? <TouchableWithoutFeedback
      onPress={() => {
        itemClick && itemClick(item, section);
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
            uri: 'https://eyebrow.staging.gosolutions.sg/admin/media/images/product/small/500x300/0_default_product_image_1629889703.jpg',
          }}
        />
        <View style={styles.cardDetails}>
        
          {item.discount_type == 'amount' ? <Text style={styles.pacakgeName}>${parseInt(item.discount_value).toFixed(0)} Off</Text> : <Text style={styles.pacakgeName}>{parseInt(item.discount_value).toFixed(0)}% Off</Text>}
          <HighlightText
            numberOfLines={1}
            style={styles.serviceIncluded}
            searchWords={[query]}
            highlightStyle={{ fontWeight: 'bold', color: colors.black ,borderWidth:1}}
            textToHighlight={item.name}
          />
          {
            // item.validity == null ?<View></View>:
         
          <View style={[styles.dateTimeWrapper,{marginTop: 3,}]}>
            {/* <Image source={require('../../../assets/images/ic_calendar.png')} /> */}
            <Text style={[styles.dateTime]}>
              {
                item.validity == 1 ? <Text>Offer Till {item.coupon_expiry_days} Days</Text> :  
                  item.expiration_date == null ? '' : <Text>Expires on {moment(item.expiration_date)
                    .format('DD MMMM, YYYY')}</Text>
                
              }
              {
                item.validity == 2 ? <Text>Offer Till {moment(item.end_date).format('DD MMMM, YYYY')}</Text> :  
                 null
                
              }
              
            </Text>
          </View>
           }
           
        </View>
      </View>
    </TouchableWithoutFeedback> :

      <TouchableWithoutFeedback
        onPress={() => {
          itemClick && itemClick(item, section);
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
            <HighlightText
              numberOfLines={1}
              style={styles.serviceIncluded}
              searchWords={[query]}
              highlightStyle={{ fontWeight: 'bold', color: colors.black }}
              textToHighlight={
                item.appointment_service.map(as => as.product_name).join(', ') ??
                ''
              }
            />
            <View style={styles.dateTimeWrapper}>
              <Image source={require('../../../assets/images/ic_calendar.png')} />
              {console.log(" borderWidth:1",)}
              <Text style={[styles.dateTime,{marginStart:5}]}>
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
        </View>
      </TouchableWithoutFeedback>

  }
};

export default SearchAppointmentCard;
