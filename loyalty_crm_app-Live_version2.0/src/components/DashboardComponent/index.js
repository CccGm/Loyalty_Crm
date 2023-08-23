import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useContext, useEffect, useState} from 'react';
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
import {USER_FIRST_NAME} from '../../constants/prefrenceKeys';
import {
  APPOINTMENT,
  SEARCH,
  UPCOMINGS_APPOINTMENT,
} from '../../constants/routeName';
import {GlobalContext} from '../../context/Provider';
import Container from '../common/Container';
import ListDotIndicator from '../common/ListDotIndicator';
import styles from './styles';

const DashboardComponent = ({
  isLoading,
  dashboardData,
  profiledata,
  ApptItemClick,
}) => {
  const {navigate} = useNavigation();
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {authDispatch} = useContext(GlobalContext);
  const layout = useWindowDimensions();

  const [userName, setUserName] = useState('');
  const {getItem} = useAsyncStorage(USER_FIRST_NAME);

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
    <View style={{backgroundColor: 'white', flex: 1}} />
  ) : (
    <Container>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.wrapper}>
          <View>
            <View
              style={{
                backgroundColor: colors.cream,
                height: '50%',
                position: 'absolute',
                bottom: 0,
                start: 0,
                end: 0,
              }}
            />
            <View style={styles.proflieWrapper}>
              <Text style={styles.userName}>
                Hello,{' '}
                <Text style={styles.userNameBold}>
                  {profiledata.data.first_name}
                </Text>
              </Text>
              <View style={styles.infoWrapper}>
                <Text style={styles.infoText}>
                  What Are You Looking For Today?
                </Text>
                <TouchableOpacity
                  style={styles.searchIcon}
                  onPress={() => {
                    navigate(SEARCH);
                  }}>
                  <Image
                    source={require('../../assets/images/ic_search.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <FlatList
              horizontal
              data={dashboardData?.banner ?? []}
              renderItem={({item}) => <OfferListItem item={item} />}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                marginStart: 10,
                paddingEnd: 16,
              }}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
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
              <Text style={styles.appointmentTitle}>Appointments</Text>
              {dashboardData?.upcoming?.list ?? [].length > 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    ApptItemClick();
                  }}>
                  <Text
                    style={{
                      padding: 4,
                      fontWeight: '500',
                      fontFamily: 'Poppins-Regular',
                      color: colors.primary,
                      fontSize: 16,
                    }}>
                    View All
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            {console.log()}
            <FlatList
              horizontal={
                dashboardData?.upcoming?.list.length == 0 ? false : true
              }
              data={dashboardData?.upcoming?.list ?? []}
              renderItem={({item}) => (
                <AppointmentListItem
                  key={item.id}
                  item={item}
                  appointmentSelected={item => {
                    navigate(UPCOMINGS_APPOINTMENT, {
                      item: item,
                      dashboard: 'dashboad',
                    });
                  }}
                />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                {
                  marginStart: 10,
                  paddingEnd: 22,
                  marginBottom: 18,
                },
                dashboardData?.upcoming?.list ?? [].length > 0
                  ? {}
                  : {
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                    },
              ]}
              ListEmptyComponent={
                <View style={{width: layout.width}}>
                  <View
                    style={{
                      alignItems: 'center',
                      marginVertical: 10,
                      justifyContent: 'center',
                    }}>
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
                      You Dont Have Any Appointment!
                    </Text>
                  </View>
                </View>
              }
            />
          </View>
          <ImageBackground
            source={require('../../assets/images/img_dashboard_lp_bg.png')}
            resizeMode="repeat"
            resizeMethod="resize"
            style={styles.loyaltyPoinntBGImage}>
            <Text style={styles.loyaltyPoinntTitle}>Points</Text>
            <Text style={styles.loyaltyPoinnt}>
              {dashboardData.loyality_points_rewords}
            </Text>
          </ImageBackground>
        </View>
      </ScrollView>
    </Container>
  );
};

const OfferListItem = ({item}) => {
  const layout = useWindowDimensions();
  return (
    <View style={[styles.offerCard, {width: layout.width * (332 / 360)}]}>
      <Image source={{uri: item.path}} style={styles.offerImage} />
    </View>
  );
};

const AppointmentListItem = ({appointmentSelected, item}) => {
  const layout = useWindowDimensions();
  const rescheduleRequire =
    moment(item.appointment_date_from).diff(Date(), 'days') < 0;
  return (
    <TouchableOpacity onPress={() => appointmentSelected(item)}>
      <View
        style={[styles.appoinmentCard, {width: layout.width * (210 / 360)}]}>
        <View style={styles.appoinmentCardF} />
        <View
          style={{
            paddingTop: 20,
            paddingBottom: rescheduleRequire ? 2 : 20,
            paddingHorizontal: 10,
          }}>
          <Text style={styles.appointmentCardTitle}>
            {item?.booking_id ?? ' '}
          </Text>
          <Text numberOfLines={1} style={styles.appointmentCardServices}>
            {item.appointment_service.map(as => as.product_name).join(', ') ??
              ' '}
          </Text>

          {item.appointment_service.map((index, i) => {
            return index.variation_name == null ? (
              <Text numberOfLines={1} style={styles.appointmentCardServices1}>
                {/* {index.variation_name} */} -
              </Text>
            ) : (
              <Text numberOfLines={1} style={styles.appointmentCardServices}>
                ({index.variation_name})
              </Text>
            );
          })}

          <View style={styles.appointmentCardDateTimeWrapper}>
            <Image source={require('../../assets/images/ic_calendar.png')} />
            <Text style={styles.appointmentCardDateTime}>
              {moment(item.appointment_date_from)
                .format('DD MMM, ')
                .toUpperCase() +
                ' AT ' +
                moment(item.appointment_date_from).format('hh:mm') +
                ' - ' +
                moment(item.appointment_date_to).format('hh:mm A')}
            </Text>
          </View>
          {/* {rescheduleRequire ? (
            <View style={{alignItems:'center'}}>
            <View style={styles.appointmentCardResheduleWrapper}>
              <Image source={require('../../assets/images/ic_info.png')} />
              <Text style={styles.appointmentCardReshedule}>
                Reschedule Appointment
              </Text>
              </View>
            </View>
      
          ) : null} */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DashboardComponent;
