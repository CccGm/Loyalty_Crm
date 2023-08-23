import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import colors from '../../../assets/theme/colors';
import styles from './styles';

const PointHistoryCard = ({ item, itemClick }) => {


  const navigation = useNavigation();

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <TouchableWithoutFeedback>
        <View style={[styles.card, { backgroundColor: '#f5f5f5' }]}>

          <View style={styles.cardDetails}>
          {item.bonus_point_type_text==null ?<View></View>:<Text style={[styles.pacakgeName,{textTransform:'uppercase', fontSize: 12,color:colors.primary}]}>{item.bonus_point_type_text}</Text>}
            <Text style={styles.pacakgeName}>{item.title}</Text>
          
            {
              <Text numberOfLines={1} style={styles.serviceIncluded}>
                {item.description}
              </Text>
            }
            <View style={styles.dateTimeWrapper}>
              {

                <View style={{ flexDirection: 'row', padding: 5, backgroundColor: '#dfdfdf', borderRadius: 50 }}>
                  {/* <Image source={require('../../../assets/images/ic_calendar.png')} /> */}


                  <Text style={[styles.dateTime, { color: '#262626' }]}>
                    {item.created_date}
                  </Text>


                </View>
              }
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              marginEnd: 10,
            }}>

            <Text
              style={{
                fontSize: 14,
                color: item.type == 2?'green':'red',
                // fontWeight: '500',
                fontFamily: 'Poppins-SemiBold',
              }}>

              {item.type == 2 ? "+" : "-"}
              {item.points}
              {/* {item.remain_session == '∞' ? item.remain_session : item.remain_session == null || "" ? "00" : item.remain_session.toString().length == 1 ? `0${item.remain_session}` : item.remain_session}/{item.total_sessions == '∞' ? item.total_sessions : item.total_sessions == "" ? '00' : item.total_sessions.length == 1 ? `0${item.total_sessions}` : item.total_sessions} */}
            </Text>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default PointHistoryCard;
