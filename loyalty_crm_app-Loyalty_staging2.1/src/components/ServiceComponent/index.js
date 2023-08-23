import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Linking,
} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import colors from '../../assets/theme/colors';
import {
  APPOINTMENT,
  HISTORY_TAB,
  ACTIVE_TAB,
  MY_SERVICE,
  MY_SERVICE_DETAIL,
  UNPAID_TAB,
} from '../../constants/routeName';
import Father from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import getHistoryAppts from '../../context/actions/dashboardOps/getHistoryAppts';
import getMoreHistoryAppts from '../../context/actions/dashboardOps/getMoreHistoryAppts';
import getmoreUpcommingAppts from '../../context/actions/dashboardOps/getmoreUpcommingAppts';
import getUpcomingAppts from '../../context/actions/dashboardOps/getUpcomingAppts';
import getServices from '../../context/actions/dashboardOps/getServices';
import {GlobalContext, GlobalProvider} from '../../context/Provider';
import AppointmentCard from '../common/AppointmentCard';
import Container from '../common/Container';
import Toolbar from '../common/Toolbar';
import ServiceCard from '../common/ServiceCard';

import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import getServiceHistory from '../../context/actions/dashboardOps/getServiceHistory';
import ServiceHistoryCard from '../common/ServiceHistoryCard';
import getMoreServices from '../../context/actions/dashboardOps/getMoreServices';
import getMoreHistoryServices from '../../context/actions/dashboardOps/getMoreHistoryServices';
import logoutSession from '../../context/actions/auth/logoutSession';
import {
  getabindex,
  getPointndex,
  getServicetabIndex,
} from '../../context/actions/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN} from '../../constants/prefrenceKeys';
import UnpaidCard from '../common/UnpaidCard';
import getUnpaiddata from '../../context/actions/dashboardOps/getUnpaiddata';
import getMoreUnpaidData from '../../context/actions/dashboardOps/getMoreUnpaidData';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from './styles';
import getsytemconfig from '../../context/actions/auth/getsytemconfig';
const ServiceComponent = ({ActiveItemClick, historyItemClick}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: ACTIVE_TAB, title: ACTIVE_TAB},
    {key: HISTORY_TAB, title: HISTORY_TAB},
    // { key: UNPAID_TAB, title: UNPAID_TAB },
  ]);
  const {loaderDispatch} = useContext(GlobalContext);
  const {systemConfigState} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {servicesDispatch} = useContext(GlobalContext);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const {servicesState} = useContext(GlobalContext);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const navigate = useNavigation();
  const {bsState, bsDispatch} = useContext(GlobalContext);
  const {ServieceHistoryDispatch} = useContext(GlobalContext);
  const {ServieceHistoryState} = useContext(GlobalContext);
  const {UnpaidDispatch} = useContext(GlobalContext);
  const {systemConfigDispatch} = useContext(GlobalContext);
  const {profileState} = useContext(GlobalContext);

  var fullName = `${profileState.data.first_name} ${profileState.data.last_name}`;
  const Sheet = useRef(null);
  React.useEffect(() => {
    const unsubscribe = navigate.addListener('focus', () => {
      getsytemconfig(
        loaderDispatch,
        bottomMessageDispatch,
        systemConfigDispatch,
      )(() => {});
      getabindex(bsDispatch, 0);
      getPointndex(bsDispatch, 0);
      getServices(
        loaderDispatch,
        bottomMessageDispatch,
        servicesDispatch,
      )(() => {
        setLoading(false);
      });

      getServiceHistory(
        loaderDispatch,
        bottomMessageDispatch,
        ServieceHistoryDispatch,
      )(() => {
        setLoading(false);
      });
      // console.log("3 APIS Called")
      getUnpaiddata(
        loaderDispatch,
        bottomMessageDispatch,
        UnpaidDispatch,
      )(() => {
        setLoading(false);
      });
    });
    return unsubscribe;
  }, [index]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case ACTIVE_TAB:
        return (
          <AppoinmentsListView
            routeKey={route.key}
            data={servicesState.data.list}
            itemClick={ActiveItemClick}
          />
        );
      case HISTORY_TAB:
        return (
          <AppoinmentsListView
            routeKey={route.key}
            data={ServieceHistoryState.data.list}
            itemClick={historyItemClick}
          />
        );
      // case UNPAID_TAB:
      //   return (
      //     <UnpaidList
      //       routeKey={route.key}
      //       data={UnpaidState.data.list}
      //       itemClick={historyItemClick}
      //     />
      //   );
      default:
        return null;
    }
  };

  const idex = data => {
    getServicetabIndex(bsDispatch, data);
  };

  const ChooseBS = ({}) => {
    return (
      <View>
        {/* <Text style={styles.bsTitle}>Choose an action</Text> */}
        <View style={styles.bsSelectionWrapper}>
          <TouchableOpacity
            style={styles.bsSelection}
            onPress={() => {
              Linking.openURL(
                `tel:${systemConfigState.data.company_info_whatsapp_contact_no}`,
              );
              Sheet.current.close();
            }}>
            <View style={{}}>
              <Father name="phone-call" size={50} color={colors.primary} />
            </View>
            {/* <Image
              style={styles.bsIcon}
              source={require('../../assets/images/ic_camera_big.png')}
            /> */}
            <Text style={styles.bsIconTitle}>Phone</Text>
          </TouchableOpacity>
          <View style={styles.bsIconDivider} />

          <TouchableOpacity
            style={styles.bsSelection}
            onPress={() => {
              Linking.openURL(
                `whatsapp://send?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20under%20${fullName} ${profileState.data.membership_code}&phone=${systemConfigState.data.company_info_whatsapp_contact_no}`,
              ).catch(() => {
                const url = `https://wa.me/${systemConfigState.data.company_info_whatsapp_contact_no}`;
                // console.log('Make sure Whatsapp installed on your device', url);
                Linking.openURL(url);
                Sheet.current.close();
                // `https://wa.me/${}`,
                // `whatsapp://send?text=hello&phone=${systemConfigState.data.company_info_whatsapp_contact_no}`,
              });
            }}>
            <View style={{}}>
              <FontAwesome name="whatsapp" size={50} color={colors.primary} />
            </View>
            <Text style={styles.bsIconTitle}>Whatsapp</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderContactPage = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80%',
        }}>
        <View style={{padding: 10}}>
          <Father name="phone-call" size={50} color={colors.primary} />
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              // paddingHorizontal: 40,
              fontSize: 18,
              fontFamily: 'Poppins-Regular',
            }}>
            For booking of appointment
          </Text>
          <Text
            style={{
              textAlign: 'center',
              // paddingHorizontal: 40,
              fontSize: 18,
              fontFamily: 'Poppins-Regular',
            }}>
            please contact
          </Text>
          <TouchableOpacity
            onPress={() => {
              Sheet.current.open();
            }}>
            <Text
              style={{
                textAlign: 'center',
                // paddingHorizontal: 40,
                fontSize: 18,
                fontFamily: 'Poppins-SemiBold',
              }}>
              {systemConfigState.data.company_info_whatsapp_contact_no}
            </Text>
          </TouchableOpacity>
          <RBSheet
            ref={Sheet}
            height={120}
            // duration={250}
            customStyles={{
              wrapper: {
                // borderWidth: 1,
                // backgroundColor: 'transparent',
              },
              container: {
                // borderWidth: 1,
                backgroundColor: '#fff',
                borderTopStartRadius: 12,
                borderTopEndRadius: 12,
              },
              draggableIcon: {
                backgroundColor: '#FA9A5B',
              },
            }}>
            <ChooseBS />
          </RBSheet>
        </View>
        {/* <Text
          style={{
            textAlign: 'center',
            paddingHorizontal: 40,
            fontSize: 18,
            fontFamily: 'Poppins-Regular',
          }}
          numberOfLines={2}>
          For booking of appointment, please contact +65 91507796
        </Text> */}
      </View>
    );
  };

  return (
    <Container>
      <Toolbar title={MY_SERVICE} hideBackBtn />
      {/* {console.log(
        'ssdsddd',
        systemConfigState.data.appointment_info_show_service_list_page,
      )} */}

      {systemConfigState.data.appointment_info_show_service_list_page == 1 ? (
        <TabView
          navigationState={{index: bsState.sindex, routes}}
          renderScene={renderScene}
          onIndexChange={idex}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
          lazy={true}
        />
      ) : (
        renderContactPage()
      )}
    </Container>
  );
};

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: colors.primary}}
    style={{backgroundColor: colors.white}}
    renderLabel={({route, focused, color}) => (
      <Text
        style={{
          color: focused ? colors.black : colors.grey,
          fontWeight: '600',
          fontFamily: 'Poppins-Regular',
        }}>
        {route.title}
      </Text>
    )}
  />
);

const AppoinmentsListView = ({routeKey, data, itemClick}) => {
  const layout = useWindowDimensions();
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {apptsUpcomingDispatch} = useContext(GlobalContext);
  const {apptsHistoryDispatch} = useContext(GlobalContext);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const {navigate} = useNavigation();
  const {servicesDispatch} = useContext(GlobalContext);
  const {servicesState} = useContext(GlobalContext);
  const {ServieceHistoryDispatch} = useContext(GlobalContext);
  const {ServieceHistoryState} = useContext(GlobalContext);
  const {authDispatch} = useContext(GlobalContext);
  const {UnpaidDispatch} = useContext(GlobalContext);
  const {UnpaidState} = useContext(GlobalContext);
  const logoutClick = async () => {
    const userToken = await AsyncStorage.getItem(ACCESS_TOKEN);
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    logoutSession()(
      loaderDispatch,
      bottomMessageDispatch,
      authDispatch,
      userToken,
      fcmToken,
    );
  };

  useEffect(() => {
    onRefresh();
  }, []);
  const onRefresh = () => {
    setLoading(true);
    switch (routeKey) {
      case ACTIVE_TAB:
        getServices(
          loaderDispatch,
          bottomMessageDispatch,
          servicesDispatch,
        )(response => {
          if (
            response.data.message == 'Something went wrong.' ||
            response.data.message == 'Authentication failure'
          ) {
            logoutClick();
          }
          setLoading(false);
        });
        break;
      case HISTORY_TAB:
        getServiceHistory(
          loaderDispatch,
          bottomMessageDispatch,
          ServieceHistoryDispatch,
        )(response => {
          if (
            response.data.message == 'Something went wrong.' ||
            response.data.message == 'Authentication failure'
          ) {
            logoutClick();
          }
          setLoading(false);
        });
        break;
      default:
        return null;
    }
  };

  const GetmoreServicesData = () => {
    setMoreLoading(true);
    // console.log("servicesState",servicesState.data.pageNo)
    getMoreServices(servicesState.data.pageNo)(
      bottomMessageDispatch,
      servicesDispatch,
    )(() => {
      setMoreLoading(false);
    });
  };

  const GetmoreServiceHistoryData = () => {
    setMoreLoading(true);
    // console.log("ServieceHistoryState",ServieceHistoryState.data.pageNo)
    getMoreHistoryServices(ServieceHistoryState.data.pageNo)(
      bottomMessageDispatch,
      ServieceHistoryDispatch,
    )(() => {
      setMoreLoading(false);
    });
  };

  const handleLoadMore = () => {
    return routeKey == HISTORY_TAB ? (
      ServieceHistoryState.data?.hasMore ?? 0 === 1 ? (
        isMoreLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          GetmoreServiceHistoryData()
        )
      ) : null
    ) : servicesState.data?.hasMore ?? 0 === 1 ? (
      isMoreLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        GetmoreServicesData()
      )
    ) : null;
  };

  const footer = () => {
    return routeKey == HISTORY_TAB ? (
      ServieceHistoryState.data?.hasMore ?? 0 === 1 ? (
        isMoreLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <View></View>
        )
      ) : null
    ) : servicesState.data?.hasMore ?? 0 === 1 ? (
      isMoreLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <View></View>
      )
    ) : null;
  };

  const dataList =
    routeKey === ACTIVE_TAB
      ? servicesState.data.list ?? []
      : ServieceHistoryState.data.list ?? [];
  return isLoading ? (
    <View style={{backgroundColor: 'white', flex: 1}} />
  ) : (
    <View style={{paddingHorizontal: 10, flex: 1}}>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        data={dataList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ServiceCard key={item.id} item={item} itemClick={itemClick} />
        )}
        contentContainerStyle={[
          {
            marginVertical: 16,
            paddingVertical: 14,
          },
          dataList.length > 0
            ? {}
            : {justifyContent: 'center', alignItems: 'center', height: '100%'},
        ]}
        ListEmptyComponent={
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <Image
              style={{
                width: layout.width * (153 / 360),
                height: layout.height * (114 / 640),
              }}
              resizeMode="contain"
              source={require('../../assets/images/calander.png')}
            />
            <Text
              style={{
                color: colors.black,
                fontSize: 15,
                fontWeight: '500',
                fontFamily: 'Poppins-Regular',
              }}>
              You Dont Have Any Services!
            </Text>
          </View>
        }
        onEndReached={() => {
          handleLoadMore();
        }}
        // onEndReachedThreshold={5}
        initialNumToRender={10}
        ListFooterComponent={footer}
      />
    </View>
  );
};

const UnpaidList = ({routeKey, data, itemClick}) => {
  const layout = useWindowDimensions();
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {apptsUpcomingDispatch} = useContext(GlobalContext);
  const {apptsHistoryDispatch} = useContext(GlobalContext);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const {navigate} = useNavigation();
  const {servicesDispatch} = useContext(GlobalContext);
  const {servicesState} = useContext(GlobalContext);
  const {ServieceHistoryDispatch} = useContext(GlobalContext);
  const {ServieceHistoryState} = useContext(GlobalContext);
  const {authDispatch} = useContext(GlobalContext);
  const {UnpaidDispatch} = useContext(GlobalContext);
  const {UnpaidState} = useContext(GlobalContext);

  // const unpaidData =[{order_id:"EB-106-118-2300100032",service_name:"Eybrow Emboidery",purchase_Date: "09 Dec 2022",last_paid:"09 Dec 2022",amount:"$25.00" },{order_id:"EB-106-118-2300100032",service_name:"Eybrow Emboidery",purchase_Date: "09 Dec 2022",last_paid:"09 Dec 2022",amount:"$25.00" }]

  const logoutClick = async () => {
    const userToken = await AsyncStorage.getItem(ACCESS_TOKEN);
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    logoutSession()(
      loaderDispatch,
      bottomMessageDispatch,
      authDispatch,
      userToken,
      fcmToken,
    );
  };

  useEffect(() => {
    onRefresh();
  }, []);
  const onRefresh = () => {
    setLoading(true);
    switch (routeKey) {
      case ACTIVE_TAB:
        getServices(
          loaderDispatch,
          bottomMessageDispatch,
          servicesDispatch,
        )(response => {
          if (
            response.data.message == 'Something went wrong.' ||
            response.data.message == 'Authentication failure'
          ) {
            logoutClick();
          }
          setLoading(false);
        });
        break;
      case HISTORY_TAB:
        getServiceHistory(
          loaderDispatch,
          bottomMessageDispatch,
          ServieceHistoryDispatch,
        )(response => {
          if (
            response.data.message == 'Something went wrong.' ||
            response.data.message == 'Authentication failure'
          ) {
            logoutClick();
          }
          setLoading(false);
        });
        break;
      case UNPAID_TAB:
        getUnpaiddata(
          loaderDispatch,
          bottomMessageDispatch,
          UnpaidDispatch,
        )(response => {
          if (
            response.data.message == 'Something went wrong.' ||
            response.data.message == 'Authentication failure'
          ) {
            logoutClick();
          }
          setLoading(false);
        });
        break;
      default:
        return null;
    }
  };

  const GetmoreServicesData = () => {
    setMoreLoading(true);
    // console.log("servicesState",servicesState.data.pageNo)
    getMoreServices(servicesState.data.pageNo)(
      bottomMessageDispatch,
      servicesDispatch,
    )(() => {
      setMoreLoading(false);
    });
  };

  const GetmoreUnpaidData = () => {
    // console.log("unpaidpage",UnpaidState)
    setMoreLoading(true);
    getMoreUnpaidData(UnpaidState.data.pageNo)(
      bottomMessageDispatch,
      UnpaidDispatch,
    )(() => {
      setMoreLoading(false);
    });
  };

  const handleLoadMore = () => {
    // console.log("routeKey",routeKey)
    // console.log("routeKey",UnpaidState.data?.hasMore)
    return routeKey == UNPAID_TAB ? (
      UnpaidState.data?.hasMore ?? 0 === 1 ? (
        isMoreLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          GetmoreUnpaidData()
        )
      ) : null
    ) : UnpaidState.data?.hasMore ?? 0 === 1 ? (
      isMoreLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        GetmoreUnpaidData()
      )
    ) : null;
  };

  // const handleLoadMore = () => {

  //   return routeKey == UNPAID_TAB ? (
  //     UnpaidState.data?.hasMore ?? 0 === 1 ? (
  //       isMoreLoading ? (
  //         <ActivityIndicator size="large" color={colors.primary} />
  //       ) : (

  //         GetmoreUnpaidData()
  //       )
  //     ) : null
  //   ): null
  // }

  const footer = () => {
    return routeKey == UNPAID_TAB ? (
      UnpaidState.data?.hasMore ?? 0 === 1 ? (
        isMoreLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <View></View>
        )
      ) : null
    ) : null;
  };

  // console.log("UnpaidState",UnpaidState)
  const dataList =
    routeKey === UNPAID_TAB
      ? UnpaidState.data.list ?? []
      : UnpaidState.data.list;
  return isLoading ? (
    <View style={{backgroundColor: 'white', flex: 1}} />
  ) : (
    <View style={{paddingHorizontal: 10, flex: 1}}>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        data={dataList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <UnpaidCard key={item.id} item={item} itemClick={itemClick} />
        )}
        contentContainerStyle={[
          {
            marginVertical: 16,
            paddingVertical: 14,
          },
          dataList.length > 0
            ? {}
            : {justifyContent: 'center', alignItems: 'center', height: '100%'},
        ]}
        ListEmptyComponent={
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <Image
              style={{
                width: layout.width * (153 / 360),
                height: layout.height * (114 / 640),
              }}
              resizeMode="contain"
              source={require('../../assets/images/calander.png')}
            />
            <Text
              style={{
                color: colors.black,
                fontSize: 15,
                fontWeight: '500',
                fontFamily: 'Poppins-Regular',
              }}>
              You Dont Have Any Unpaid Records!
            </Text>
          </View>
        }
        onEndReached={() => {
          handleLoadMore();
        }}
        // onEndReachedThreshold={5}
        initialNumToRender={10}
        ListFooterComponent={footer}
      />
    </View>
  );
};

export default ServiceComponent;
