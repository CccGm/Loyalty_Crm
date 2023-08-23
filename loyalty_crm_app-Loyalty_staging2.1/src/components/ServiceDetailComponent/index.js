import moment from 'moment';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import {State} from 'react-native-gesture-handler';
import colors from '../../assets/theme/colors';
import {
  BOOK_APPT,
  MY_SERVICE_DETAIL,
  UPCOMINGS_APPOINTMENT,
  USEDSESSION,
  MY_SERVICE,
} from '../../constants/routeName';
import {BOOK_NOW} from '../../constants/strings';
import {GlobalContext} from '../../context/Provider';
import BottomSheet from '../common/BottomSheet';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import Toolbar from '../common/Toolbar';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';

const ServiceDetailComponent = ({item, bookAppt}) => {
  const layout = useWindowDimensions();
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  let sum = 0;
  const {apptsUpcomingDispatch} = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(false);
  const {navigate} = useNavigation();
  const [itemObj, setItemObj] = useState(item || {});
  const startingHeight = 0;
  const [expanded, setExpanded] = useState({});
  const [fullHeight, setFullHeight] = useState(startingHeight);
  const animatedHeight = useRef(new Animated.Value(startingHeight)).current;
  const [count, setCount] = useState(1);
  const {systemConfigState} = useContext(GlobalContext);
  const [bsTACVisible, setBSTACVisible] = useState(false);
  const [bsVVisible, setBSVVisible] = useState(false);
  const {bookServiescheckState} = useContext(GlobalContext);
  const route = useRoute();

  const {servicesState} = useContext(GlobalContext);
  const {ServieceHistoryState} = useContext(GlobalContext);
  const todaydate = moment(today).format('YYYY-MM-DD').toUpperCase();
  const ExpireDate = moment().format('YYYY-MM-DD').toUpperCase();
  var today = new Date();
  const [dateoff, setdateoff] = useState(false);

  useEffect(() => {
    const Servicesdetails = servicesState.data.list;
    const ServiceHistorydetails = ServieceHistoryState.data.list;
    if (route.params.active == 'active') {
      setItemObj(
        Servicesdetails.find(i => i?.service_id == itemObj?.service_id),
      );
    } else {
      setItemObj(
        ServiceHistorydetails.find(i => i?.service_id == itemObj?.service_id),
      );
    }
  }, [servicesState.data.list, ServieceHistoryState.data.list]);

  useEffect(() => {
    Animated.spring(animatedHeight, {
      friction: 100,
      toValue: expanded ? fullHeight : startingHeight,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const onTextLayout = e => {
    let {x, y, width, height} = e.nativeEvent.layout;
    height = Math.floor(height) + 40;
    if (height > startingHeight) {
      setFullHeight(height);
    }
  };

  // const increment = () => {
  //   if (count == remainSession) {
  //     setCount(remainSession)
  //   } else {
  //     setCount(count + 1)
  //   }
  // }
  // const deincrement = () => {

  //   if (count == 1) {
  //     setCount(1)
  //   } else {
  //     setCount(count - 1)
  //   }
  // }

  const renderColor = colors => {
    if (colors == 'Pending') {
      return '#fea048';
    } else if (colors == 'Confirmed') {
      return '#53a7fe';
    } else if (colors == 'Completed') {
      return '#58c380';
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
  const renderColor1 = colors => {
    if (colors == 'Pending') {
      return '#fff6ed';
    } else if (colors == 'Confirmed') {
      return '#eaf4fe';
    } else if (colors == 'Completed') {
      return '#f0ffea';
    } else if (colors == 'Cancelled') {
      return '#e6e6e6';
    } else if (colors == 'No Show') {
      return '#e6e6e6';
    } else if (colors == 'Rescheduled') {
      return '#f7c5c4';
    }
  };
  console.log('itemObjitemObj', itemObj);
  if (!itemObj?.service_id) {
    navigate(MY_SERVICE);
    return <></>;
  }

  return (
    <Container>
      <Toolbar title={MY_SERVICE_DETAIL} />
      {isLoading ? (
        <View style={{backgroundColor: 'white', flex: 1}} />
      ) : (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View>
            <Image
              style={{
                width: '100%',
                height: 190,
              }}
              source={{uri: itemObj.product_image}}
            />

            <View
              style={[
                styles.card,
                {paddingVertical: 16, flexDirection: 'row'},
              ]}>
              <View style={{flex: 1}}>
                <Text style={[styles.cardTitle]}>{itemObj.product_name}</Text>
                {itemObj.variation_name == '' ? (
                  <View></View>
                ) : (
                  <Text style={[styles.cardSubTitle]}>
                    ({itemObj.variation_name})
                  </Text>
                )}
                {itemObj.category_name == '' ? (
                  <View></View>
                ) : (
                  <Text style={[styles.cardSubTitle]}>
                    {itemObj.category_name}
                  </Text>
                )}

                {itemObj.expiry_date == null ? (
                  <View></View>
                ) : (
                  <Text style={styles.cardSmallText}>
                    (Valid Till {itemObj.expiry_date})
                  </Text>
                )}
              </View>
              <View style={{alignSelf: 'center'}}>
                <View
                  style={{
                    backgroundColor: colors.transparentWhite50,
                    borderRadius: 4,
                    overflow: 'hidden',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      marginHorizontal: 8,
                      // fontWeight: '400',
                      textAlignVertical: 'center',
                      fontFamily: 'Poppins-Regular',
                      fontSize: 10,
                    }}>
                    Total Sessions
                  </Text>
                  <Text
                    style={{
                      borderRadius: 4,
                      color: colors.primary,
                      fontSize: 15,
                      // fontWeight: '600',
                      paddingTop: 8,
                      paddingHorizontal: 8,
                      paddingBottom: 6,
                      textAlignVertical: 'center',
                      fontFamily: 'Poppins-Regular',
                      backgroundColor: colors.white,
                    }}>
                    {itemObj.total_sessions == '∞'
                      ? itemObj.total_sessions
                      : itemObj.total_sessions == ''
                      ? '00'
                      : itemObj.total_sessions.length == 1
                      ? `0${itemObj.total_sessions}`
                      : itemObj.total_sessions}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{marginHorizontal: 22}}>
              <TouchableOpacity
                onPress={() => {
                  setBSTACVisible(true);
                }}>
                <Text style={styles.temsAndCondition}>
                  Terms & Conditions Apply*
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.wrapper}>
            <View elevation={5} style={styles.cardRemainingSession}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.remainingTitle}>
                      Remaining Sessions
                    </Text>

                    {console.log(
                      'iteeteteeweeyetwyetyweyewywee',
                      itemObj.expiry_date,
                    )}
                    {itemObj.expiry_date == null ? (
                      <View></View>
                    ) : (
                      <Text style={styles.remainingSmallText}>
                        (Valid Till {itemObj.expiry_date})
                      </Text>
                    )}
                  </View>

                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <View style={styles.remainingSessionBox}>
                      <Text style={styles.remainingSessionCount}>
                        {itemObj.remain_session == '∞'
                          ? itemObj.remain_session
                          : itemObj.remain_session == null || ''
                          ? '00'
                          : itemObj.remain_session.toString().length == 1
                          ? `0${itemObj.remain_session}`
                          : itemObj.remain_session}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.grey20,
                    marginTop: 5,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: colors.drakGrey,
                      fontWeight: '600',
                      fontFamily: 'Poppins-Regular',
                    }}>
                    Description
                  </Text>
                  {itemObj.time_duration_val == '' &&
                  itemObj.time_duration_unit == '' ? (
                    <View></View>
                  ) : (
                    <>
                      <View
                        style={{
                          width: 1,
                          height: '60%',
                          marginHorizontal: 8,
                          marginVertical: 4,
                          backgroundColor: colors.grey20,
                        }}
                      />
                      <Image
                        source={require('../../assets/images/ic_clock.png')}
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          color: colors.black,
                          // fontWeight: '400',
                          marginStart: 4,
                          includeFontPadding: false,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {itemObj.time_duration_val == 1 ? (
                          <Text>{itemObj.time_duration_val} hour</Text>
                        ) : (
                          <Text>
                            {itemObj.time_duration_val}{' '}
                            {itemObj.time_duration_unit}
                          </Text>
                        )}
                      </Text>
                    </>
                  )}
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.black,
                    // fontWeight: '400',
                    includeFontPadding: false,
                    fontFamily: 'Poppins-Regular',
                    textAlign: 'justify',
                    marginTop: 5,
                  }}>
                  {itemObj.des == ''
                    ? 'Cute, sassy, smart, sharp - the options are unlimited when it comes to the different looks that you can create with ou top-notch makeup brands. From eyes and eyebrows to cheeks,lips.'
                    : itemObj.des}
                </Text>
                {itemObj.remain_session == null ||
                itemObj.remain_session == '' ||
                itemObj.remain_session == 0 ||
                itemObj.history == 1 ? (
                  <View></View>
                ) : moment(itemObj.expiry_date)
                    .format('YYYY-MM-DD')
                    .toUpperCase() < todaydate ? (
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.primary,
                      fontWeight: 'bold',
                      includeFontPadding: false,
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'justify',
                      marginTop: 5,
                    }}>
                    {/* Expired */}
                  </Text>
                ) : (
                  <View>
                    {/* <Text style={[styles.sessionTitle, { marginTop: 10 }]}>
                          Sessions
                        </Text> */}
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {/* <TouchableOpacity style={styles.btnWrapper} onPress={() => { deincrement() }}>
                            <Image
                              source={require('../../assets/images/ic_minus.png')}
                            />
                          </TouchableOpacity> */}
                      {/* <Text
                            style={{
                              marginHorizontal: 13,
                              fontSize: 13,
                              fontWeight: 'bold',
                              fontFamily: 'Poppins-Regular',
                              includeFontPadding: false,
                            }}>
                            {countlength == 1 ? 0 : ''}{count}
                          </Text> */}
                      {/* <TouchableOpacity style={styles.btnWrapper} onPress={() => { increment() }}>
                            <Image
                              source={require('../../assets/images/ic_plus.png')}
                            />
                          </TouchableOpacity> */}
                      <CustomButton
                        style={styles.btnBookNow}
                        primary
                        title={BOOK_NOW}
                        onPress={() => {
                          bookAppt(
                            {
                              item_detail: [
                                {
                                  item_id: itemObj.service_id,
                                },
                              ],
                            },
                            {item: itemObj, count: count},
                          );
                        }}
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>

            {itemObj.services.used_session.length == 0 ? (
              <View></View>
            ) : (
              <View style={[styles.wrapper, {marginTop: 10}]}>
                <View elevation={5} style={styles.cardRemainingSession}>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flexDirection: 'column'}}>
                        <Text style={styles.remainingTitle}>
                          Pending/Confirmed/Completed Session
                        </Text>
                      </View>

                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <View style={styles.remainingSessionBox}>
                          <Text style={styles.remainingSessionCount}>
                            {itemObj.services.used_session.map((index, i) => {
                              if (
                                index.status_text == 'Pending' ||
                                index.status_text == 'Completed' ||
                                index.status_text == 'Confirmed'
                              ) {
                                if (index.used_session == 1) {
                                  sum = sum + 1;
                                }
                              }
                            })}

                            {sum < 10 ? `0${sum}` : sum}
                            {/* {item.services.used_session.length} */}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: colors.grey20,
                        marginTop: 5,
                      }}
                    />
                  </View>

                  {itemObj.services.used_session == null ? (
                    <View></View>
                  ) : itemObj.services.used_session.length == 0 ? (
                    <View></View>
                  ) : (
                    itemObj.services.used_session.map((currentService, i) => {
                      return (
                        <View
                          style={{
                            borderBottomWidth: 1,
                            padding: 5,
                            borderBottomColor: colors.grey20,
                          }}>
                          {
                            <TouchableOpacity
                              onPress={() => {
                                navigate(USEDSESSION, {
                                  item: itemObj,
                                  currentService,
                                });
                              }}>
                              <Animated.View
                                style={{startingHeight, flexDirection: 'row'}}>
                                <View
                                  onLayout={e => {
                                    onTextLayout(e);
                                  }}
                                  style={{
                                    flexDirection: 'column',
                                    width: '70%',

                                    // alignItems: 'center'
                                  }}>
                                  {
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 3,
                                      }}>
                                      <Image
                                        source={require('../../assets/images/ic_small_calendar.png')}
                                        style={{width: 12, height: 12}}
                                      />

                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 12,
                                            color: colors.black,
                                            fontWeight: '400',
                                            marginStart: 10,
                                            includeFontPadding: false,
                                            fontFamily: 'Poppins-Regular',
                                          }}>
                                          {moment(
                                            currentService.appointment_date_from,
                                          )
                                            .format('DD MMMM,')
                                            .toUpperCase() +
                                            ' AT ' +
                                            moment(
                                              currentService.appointment_date_from,
                                            ).format('hh:mm A') +
                                            ' - ' +
                                            moment(
                                              currentService.appointment_date_to,
                                            ).format('hh:mm A')}
                                        </Text>
                                      </View>
                                    </View>
                                  }

                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      paddingTop: 10,
                                      width: '90%',
                                    }}>
                                    <Image
                                      source={require('../../assets/images/ic_small_user.png')}
                                      style={{width: 12, height: 12}}
                                    />
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: colors.black,
                                        // fontWeight: '400',
                                        marginStart: 10,
                                        includeFontPadding: false,
                                        fontFamily: 'Poppins-Regular',
                                        width: '90%',
                                      }}>
                                      {currentService.staff_name == ''
                                        ? '-'
                                        : currentService.staff_name}
                                    </Text>
                                  </View>
                                  {/* <View style={{ borderBottomColor: 'red', width:'170%',borderBottomWidth: 1 }}></View> */}
                                </View>

                                <View style={{width: '30%', marginLeft: 10}}>
                                  <View
                                    style={{
                                      borderWidth: 1,
                                      padding: 3,
                                      borderColor: colors.primary,
                                      borderRadius: 5,
                                      alignItems: 'center',
                                    }}>
                                    {console.log(
                                      'currentService',
                                      currentService.used_session.length,
                                    )}
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: colors.primary,
                                        marginLeft: 3,
                                      }}>
                                      Session -{' '}
                                      {currentService.used_session.length == 1
                                        ? '0'
                                        : currentService.used_session}
                                      {currentService.used_session == ''
                                        ? '00'
                                        : currentService.used_session}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      borderWidth: 1,
                                      borderColor: renderColor(
                                        currentService.status_text,
                                      ),
                                      marginTop: 6,
                                      padding: 3,
                                      backgroundColor: renderColor1(
                                        currentService.status_text,
                                      ),
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderRadius: 5,
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: renderColor(
                                          currentService.status_text,
                                        ),
                                      }}>
                                      {' '}
                                      {currentService.status_text}{' '}
                                    </Text>
                                  </View>
                                </View>

                                <View style={{padding: 10}}></View>
                              </Animated.View>
                            </TouchableOpacity>
                          }
                        </View>
                      );
                    })
                  )}
                </View>
              </View>
            )}
          </View>

          <View style={{padding: 10}}></View>
        </ScrollView>
      )}
      <BottomSheet
        visible={bsTACVisible}
        setVisibility={setBSTACVisible}
        canceledOnTouchOutside={true}
        body={
          <T_AND_CBS
            item={itemObj}
            onCloseClick={() => {
              setBSTACVisible(false);
            }}
          />
        }
      />
    </Container>
  );
};

const T_AND_CBS = ({item, onCloseClick}) => {
  console.log(item);
  return (
    <TouchableWithoutFeedback>
      <View style={{paddingHorizontal: 8, paddingVertical: 8}}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 10,
            end: 16,
            padding: 4,
          }}
          onPress={onCloseClick}>
          <Image
            style={{
              height: 16,
              width: 16,
            }}
            source={require('../../assets/images/ic_close_tac.png')}
          />
        </TouchableOpacity>
        <Text style={styles.bsTitle}>Terms & Conditions</Text>
        <Text style={styles.bsSubTitle}></Text>
        <View
          style={{
            backgroundColor: colors.grey20,
            width: '100%',
            height: 1,
            marginVertical: 6,
          }}
        />
        <Text style={styles.bsSubTitle}>{item.terms_and_conditions}</Text>
        {/* <View
          style={{
            backgroundColor: colors.grey20,
            width: '100%',
            height: 1,
            marginVertical: 6,
          }}
        /> */}
        {/* <Text style={styles.bsSubTitle}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text> */}
      </View>
    </TouchableWithoutFeedback>
  );
};
export default ServiceDetailComponent;
