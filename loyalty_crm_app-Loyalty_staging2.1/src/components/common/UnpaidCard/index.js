import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext } from 'react';
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import colors from '../../../assets/theme/colors';
import { GlobalContext } from '../../../context/Provider';

import styles from './styles';

const UnpaidCard = ({ item, itemClick }) => {

  const { systemConfigState } = useContext(GlobalContext);
console.log("systemConfigState",systemConfigState)
  const navigation = useNavigation();

  return (


    <View>
      <View style={[styles.card]}>
        <View style={styles.appoinmentCardF} />

        <View style={styles.cardDetails}>


          <View style={{ marginTop: 10, width: '55%', justifyContent: 'center' }}>
            <Text style={styles.appointmentCardTitle}>
              {item.ref_increment_id}
            </Text>
          </View>

          <View style={{ width: '83%', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <Text numberOfLines={2} style={styles.appointmentCardServices}>
            {item.product_name}
            </Text>
          </View>
          <View style={{borderColor:colors.grey,width: '96%', borderBottomWidth: 1,marginTop:14, }}></View>
          {/* <View style={{borderBottomWidth:1,}}></View> */}
          <View style={{ padding: 5}}>
            <View style={{ flexDirection: 'row',}}>
              <View style={{ flexDirection: 'column'}}>
                <Text style={{ fontSize: 13, color: colors.grey, fontFamily: 'Poppins-Regular', }}>Purchase Date</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../../assets/images/ic_calendar.png')} />
                  <Text style={{ marginLeft: 5, fontFamily: 'Poppins-Regular', fontSize: 12 }}>{item.created_date}</Text>
                </View>

              </View>
              <View style={{flexDirection: 'column', marginLeft: 20 }}>
                <Text style={{ fontSize: 13, color: colors.grey, fontFamily: 'Poppins-Regular', }}>Last Paid</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../../assets/images/ic_calendar.png')} />
                  <Text style={{ marginLeft: 5, fontFamily: 'Poppins-Regular', fontSize: 12 }}>{item.updated_date}</Text>
                </View>

              </View>
            </View>
          </View>

        </View>
        <View style={{
            // height:30,
            position:'absolute',
            right:0,
            top:40,
            // borderWidth:1,
          // alignItems: 'center',
          // alignSelf: 'center',
          // borderWidth:1,
        
          // marginBottom:0,
          marginEnd: 10,
          // borderBottomWidth:1,
          // height: 12,
          // borderColor: colors.grey
        }}>
          
            <Text
              style={{
                fontSize: 15,
                color: colors.black,
                fontWeight: '500',
                fontFamily: 'Poppins-Regular',

              }}>


              {systemConfigState.data.currency_info_currency_symbol}{parseInt(item.total_remaining).toFixed(2)}
             
            </Text>

            {/* <View style={{borderBottomWidth:1,marginTop:20,borderColor:colors.grey}}></View> */}
        
        </View>


      </View>

      <View>

      </View>
    </View>

  );
};

export default UnpaidCard;
