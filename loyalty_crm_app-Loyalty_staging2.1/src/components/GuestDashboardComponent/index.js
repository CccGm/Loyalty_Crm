import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import colors from '../../assets/theme/colors';
import { USER_FIRST_NAME } from '../../constants/prefrenceKeys';
import {
  APPOINTMENT,
  SEARCH,
  UPCOMINGS_APPOINTMENT,
  VOUCHER_DETAIL,
} from '../../constants/routeName';
import { GlobalContext } from '../../context/Provider';
import Container from '../common/Container';
import ListDotIndicator from '../common/ListDotIndicator';
import styles from './styles';

const GuestDashboardComponent = ({ isLoading, dashboardData, profiledata, ApptItemClick }) => {
  const { navigate } = useNavigation();
  const { loaderDispatch } = useContext(GlobalContext);
  const { bottomMessageDispatch } = useContext(GlobalContext);
  const { authDispatch } = useContext(GlobalContext);
  const layout = useWindowDimensions();

  const [userName, setUserName] = useState('');
  const { getItem } = useAsyncStorage(USER_FIRST_NAME);

  const scrollX = new Animated.Value(0);

  useEffect(async () => {


    let isCancelled = false;
    const un = await getItem();
    if (!isCancelled) {
      setUserName(un);
    }
    return () => {
      isCancelled = true;
    };
  });

  return isLoading ? (
    <View style={{ backgroundColor: 'white', flex: 1 }} />
  ) : (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.wrapper}>
          <View>
            <View
              style={{
                backgroundColor: colors.cream,
                // height: '50%',
                position: 'absolute',
                bottom: 0,
                start: 0,
                end: 0,
              }}
            />
            <View style={styles.proflieWrapper}>
              <Text style={styles.userName}>
                Hello, <Text style={styles.userNameBold}>Guest</Text>
              </Text>
              <View style={styles.infoWrapper}>
                <Text style={styles.infoText}>
                  What Are You Looking For Today?
                </Text>
                {/* <TouchableOpacity
                  style={styles.searchIcon}
                  onPress={() => {
                    navigate(SEARCH);
                  }}>
                  <Image
                    source={require('../../assets/images/ic_search.png')}
                  />
                </TouchableOpacity> */}
              </View>
            </View>

            <FlatList
              horizontal
              data={dashboardData?.banner ?? []}
              renderItem={({ item }) => <OfferListItem item={item} />}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                marginStart: 10,
                paddingEnd: 16,
              }}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                {
                  useNativeDriver: false,
                },
              )}
              scrollEventThrottle={16}
            />
            <ListDotIndicator
              data={dashboardData?.banner ?? []}
              scrollX={scrollX}
            />

            <View style={styles.appointmentTitleWrapper}>
              <Text style={styles.appointmentTitle}>Voucher offers</Text>

            </View>
            {console.log("dashboardData", dashboardData.vouchers ?? [])}
            <FlatList
              horizontal={false}
              numColumns={2}
              data={dashboardData?.vouchers ?? []}
              renderItem={({ item, index }) => (
                <AppointmentListItem
                  key={item.promotion_id}
                  item={item}
                  index={index}
                  ApptItemClick={ApptItemClick}
                  appointmentSelected={item => {
                    navigate(VOUCHER_DETAIL, { item: item, dashboard: "dashboad" });
                  }}
                />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                {
                  // marginStart: 15,
                  // paddingEnd: 22,
                  padding: 12,
                  marginBottom: 18,
                },
                dashboardData?.vouchers ?? [].length > 0
                  ? {}
                  : {
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',

                  },
              ]}

              ListEmptyComponent={

                <View style={{ width: layout.width }}>
                  <View style={{ alignItems: 'center', marginVertical: 10, justifyContent: 'center', }}>
                    <Image
                      style={{
                        width: layout.width * (110 / 360),
                        height: layout.height * (83 / 640),

                      }}
                      resizeMode="contain"
                      source={require('../../assets/images/calander.png')}
                    />
                    <Text
                      style={{
                        color: colors.grey,
                        fontWeight: '500',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      You Dont Have Any Vouchers!
                    </Text>
                  </View>
                </View>
              }
            />
          </View>
          {/* <ImageBackground
            source={require('../../assets/images/img_dashboard_lp_bg.png')}
            resizeMode="repeat"
            resizeMethod="resize"
            style={styles.loyaltyPoinntBGImage}>
            <Text style={styles.loyaltyPoinntTitle}>
              Loyalty Points Rewards
            </Text>
            <Text style={styles.loyaltyPoinnt}>
              {dashboardData.loyality_points_rewords}
            </Text>
          </ImageBackground> */}
        </View>
      </ScrollView>
    </Container>
  );
};

const OfferListItem = ({ item }) => {
  const layout = useWindowDimensions();
  return (
    <View style={[styles.offerCard, { width: layout.width * (332 / 360) }]}>
      <Image source={{ uri: item.path }} style={styles.offerImage} />
    </View>
  );
};

const AppointmentListItem = ({ appointmentSelected, item, index, ApptItemClick }) => {
  var colorss = [{ "color_code": "#FFFCF5" }, { "color_code": "#FFF5F5" }, { "color_code": "#F1FEFF" }, { "color_code": "#FAF9FF" }, { "color_code": "#FFFCF5" }, { "color_code": "#FFF5F5" }, { "color_code": "#F1FEFF" }, { "color_code": "#FAF9FF" }, { "color_code": "#FFFCF5" }, { "color_code": "#FFF5F5" }, { "color_code": "#F1FEFF" }, { "color_code": "#FAF9FF" }, { "color_code": "#FFFCF5" }, { "color_code": "#FFF5F5" }, { "color_code": "#F1FEFF" }, { "color_code": "#FAF9FF" }, { "color_code": "#FFFCF5" }, { "color_code": "#FFF5F5" }, { "color_code": "#F1FEFF" }, { "color_code": "#FAF9FF" }, { "color_code": "#FFFCF5" }, { "color_code": "#FFF5F5" }, { "color_code": "#F1FEFF" }, { "color_code": "#FAF9FF" }, { "color_code": "#FFFCF5" }, { "color_code": "#FFF5F5" }, { "color_code": "#F1FEFF" }, { "color_code": "#FAF9FF" }, { "color_code": "#FFFCF5" }, { "color_code": "#FFF5F5" }, { "color_code": "#F1FEFF" }, { "color_code": "#FAF9FF" }, { "color_code": "#FFFCF5" }, { "color_code": "#FFF5F5" }, { "color_code": "#F1FEFF" }, { "color_code": "#FAF9FF" }, { "color_code": "#FFFCF5" }, { "color_code": "#FFF5F5" }, { "color_code": "#F1FEFF" }, { "color_code": "#FAF9FF" }]
  console.log("gvvgvgvgvg", item)
  var darkcolors = [{ "color_code": "#fff1d0" }, { "color_code": "#ffd3d3" }, { "color_code": "#ccfcff" }, { "color_code": "#e0daff" }, { "color_code": "#fff1d0" }, { "color_code": "#ffd3d3" }, { "color_code": "#ccfcff" }, { "color_code": "#e0daff" }, { "color_code": "#fff1d0" }, { "color_code": "#ffd3d3" }, { "color_code": "#ccfcff" }, { "color_code": "#e0daff" }, { "color_code": "#fff1d0" }, { "color_code": "#ffd3d3" }, { "color_code": "#ccfcff" }, { "color_code": "#e0daff" }, { "color_code": "#fff1d0" }, { "color_code": "#ffd3d3" }, { "color_code": "#ccfcff" }, { "color_code": "#e0daff" }, { "color_code": "#fff1d0" }, { "color_code": "#ffd3d3" }, { "color_code": "#ccfcff" }, { "color_code": "#e0daff" }, { "color_code": "#fff1d0" }, { "color_code": "#ffd3d3" }, { "color_code": "#ccfcff" }, { "color_code": "#e0daff" }, { "color_code": "#fff1d0" }, { "color_code": "#ffd3d3" }, { "color_code": "#ccfcff" }, { "color_code": "#e0daff" }, { "color_code": "#fff1d0" }, { "color_code": "#ffd3d3" }, { "color_code": "#ccfcff" }, { "color_code": "#e0daff" }, { "color_code": "#fff1d0" }, { "color_code": "#ffd3d3" }, { "color_code": "#ccfcff" }, { "color_code": "#e0daff" }]

  const layout = useWindowDimensions();
  const rescheduleRequire =
    moment(item.appointment_date_from).diff(Date(), 'days') < 0;
  return (
    <TouchableOpacity
      style={[{
        borderRadius: 12,
        borderStyle: 'dashed',
        borderWidth: 1.4,
        // borderColor: 'orange',
        borderColor: '#e1c3de',
        overflow: 'hidden',
        flex: 0.5,
        flexDirection: 'column',
        margin: 3,
        paddingVertical: 10,
        minHeight: item.buy_end_date ? 125 : 100,
        position: 'relative',
        alignItems: 'center', backgroundColor: colorss[index].color_code
      }]}
      onPress={() => {
        ApptItemClick(item);
      }}>
      <Text style={{
        fontSize: 18,
        color: colors.primary,
        textAlign: 'center',
        // fontWeight: '600',
        fontFamily: 'Poppins-Bold',
      }}>{item.name}</Text>
      {/* {item.discount_type == 'amount' ? <Text style={styles.vCardOfferMessage}>${parseInt(item.discount_value).toFixed(0)} Off</Text> : <Text style={styles.vCardOfferMessage}>{parseInt(item.discount_value).toFixed(0)}% Off</Text>} */}

      {/* <Text style={styles.vCardOfferOnMessage}>{item.name}</Text> */}
      {/* <Text style={{
        fontSize: 12,
        color: '#9e9f9e',
        textAlign: 'center',
        padding: 3,
        // fontWeight: '500',
        marginTop: 10,
        fontFamily: 'Poppins-Regular',
      }}>
        {

          item.buy_start_date && item.buy_end_date ? <Text style={{ textAlign: 'center' }}>Offer from {moment(item.buy_start_date).format('DD MMMM YYYY')} to {moment(item.buy_end_date).format('DD MMMM YYYY')}
          </Text> : item.buy_start_date && !item.buy_end_date ? <Text>Offer from {moment(item.buy_start_date).format('DD MMMM YYYY')} </Text> : !item.buy_start_date && item.buy_end_date ? <Text>Offer till {moment(item.buy_end_date).format('DD MMMM YYYY')}</Text> : <View></View>
          //  item.validity == "1" ? <Text>Offer Till {item.coupon_expiry_days} Days</Text> : item.validity == "2" ? <Text>{item.end_date == null ? '' : `Offer Till ${moment(item.end_date)
          //     .format('DD MMMM, YYYY')}`}</Text> : <View></View>


        } */}

      {/* {
        item.end_date == null ? '' : 
      } */}
      {/* </Text> */}

      {/* {item.buy_end_date ? <View style={{ alignItems: 'center', justifyContent: 'center' }}><Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular',fontSize:12 }}>Valid till {moment(item.buy_end_date).format('DD MMM YYYY')}</Text></View> : <View><Text></Text></View>} */}

      {/* {

item.buy_start_date && item.buy_end_date ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
 <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: 12 }}>Offer from </Text>
 <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: 12 }}>{moment(item.buy_start_date).format('DD MMMM YYYY')}</Text>
 <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: 12 }}>To {moment(item.buy_end_date).format('DD MMMM YYYY')}</Text>
</View> : item.buy_start_date && !item.buy_end_date ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
 <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: 12 }}>Offer from </Text>
 <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: 12 }}>{moment(item.buy_start_date)}</Text>
</View> : !item.buy_start_date && item.buy_end_date ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
 <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: 12 }}>Offer till </Text>
 <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: 12 }}>{moment(item.buy_end_date)}</Text>
</View> : <View></View>



} */}

      <View style={{ position: 'absolute', bottom: 5, padding: 5, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.vCardValidity1}>

          {item.buy_end_date ? <View style={{ alignItems: 'center', justifyContent: 'center', }}>
            <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: 12 }}>Valid till {moment(item.buy_end_date).format('DD MMM YYYY')}</Text></View> : <View></View>}
        </Text>
        <View style={{ width: 100, padding: 5, borderRadius: 5, backgroundColor: darkcolors[index].color_code, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 14, color: colors.black, fontFamily: 'Poppins-SemiBold' }}>{item.required_reward_point} Points</Text>
        </View>
      </View>
      {/* <View style={{ width: 100, padding: 5, marginTop: 10, borderRadius: 5, backgroundColor: darkcolors[index].color_code, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 14, color: colors.black, fontFamily: 'Poppins-SemiBold' }}>{item.required_reward_point} Points</Text>
      </View> */}
    </TouchableOpacity>
  );
};

export default GuestDashboardComponent;
