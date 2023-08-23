import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import colors from '../../assets/theme/colors';
import {
  APPOINTMENT,
  HISTORY_TAB,
  UPCOMINGS_TAB,
  POINT_RECEIVED,
  POINT_USED,
  POINT_HISTORY
} from '../../constants/routeName';
import getHistoryAppts from '../../context/actions/dashboardOps/getHistoryAppts';
import getMoreHistoryAppts from '../../context/actions/dashboardOps/getMoreHistoryAppts';
import getmoreUpcommingAppts from '../../context/actions/dashboardOps/getmoreUpcommingAppts';
import getUpcomingAppts from '../../context/actions/dashboardOps/getUpcomingAppts';
import { GlobalContext } from '../../context/Provider';
import AppointmentCard from '../common/AppointmentCard';
import Container from '../common/Container';
import Toolbar from '../common/Toolbar';
import { StackActions, useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import logoutSession from '../../context/actions/auth/logoutSession';
import { getabindex, getPointndex, getServicetabIndex } from '../../context/actions/common';
import PointHistoryCard from '../common/PointHistoryCard';
import GetPointsHistory from '../../context/actions/dashboardOps/GetPointsHistory';
import getPointUsed from '../../context/actions/dashboardOps/getPointUsed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN } from '../../constants/prefrenceKeys';
const PointHistoryComponent = ({
  upcomingApptData,
  historyApptData,
  upcomingItemClick,
  historyItemClick,
}) => {
  const layout = useWindowDimensions()
  console.log(upcomingApptData)
  const [routes] = React.useState([
    { key: POINT_RECEIVED, title: POINT_RECEIVED },
    { key: POINT_USED, title: POINT_USED },
  ]);
  const { loaderDispatch } = useContext(GlobalContext);
  const { bottomMessageDispatch } = useContext(GlobalContext);
  const { PointHistoryDispatch } = useContext(GlobalContext);
  const { PointUsedDispatch } = useContext(GlobalContext);
  const { apptsHistoryDispatch } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(true);
  const route = useRoute();


  const {
    bsState, bsDispatch,
  } = useContext(GlobalContext);
  const [index, setIndex] = useState(bsState.index);
  const navigate = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const unsubscribe = navigate.addListener('focus', () => {
      // getabindex(bsDispatch,0)
      //   getPointndex(bsDispatch,0)
      onRefresh()
    });
    const onRefresh = () =>{
      GetPointsHistory(
        loaderDispatch,
        bottomMessageDispatch,
        PointHistoryDispatch,
      )(() => {
        setLoading(false);
      });
      getPointUsed(
        loaderDispatch,
        bottomMessageDispatch,
        PointUsedDispatch,
      )(() => {
        setLoading(false);
      });

    }

    return unsubscribe;
  }, []);

  const renderScene = ({ route }) => {

    switch (route.key) {
      case POINT_RECEIVED:
        return (
          <AppoinmentsListView
            routeKey={route.key}
            data={upcomingApptData}
            itemClick={upcomingItemClick}
          />
        );
      case POINT_USED:
        return (
          <AppoinmentsListView
            routeKey={route.key}
            data={historyApptData}
            itemClick={historyItemClick}
          />
        );
      default:
        return null;
    }
  };

  const idex = (data) => {
    // setIndex(data)
    getabindex(bsDispatch, data)
    // (data)

  }

  return (
    <Container>
      <Toolbar title={POINT_HISTORY} showBackBtn />
      <TabView
        navigationState={{ index: bsState.index, routes }}
        renderScene={renderScene}
        onIndexChange={idex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        lazy={true}
      />
    </Container>
  );
};

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.primary, }}
    style={{ backgroundColor: colors.white }}
    renderLabel={({ route, focused, color }) => (
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

const AppoinmentsListView = ({ routeKey, data, itemClick }) => {
  const layout = useWindowDimensions();
  const { loaderDispatch } = useContext(GlobalContext);
  const { bottomMessageDispatch } = useContext(GlobalContext);
  const { PointHistoryDispatch } = useContext(GlobalContext);
  const { apptsHistoryDispatch } = useContext(GlobalContext);
  const { authDispatch } = useContext(GlobalContext);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigation();
  const { PointUsedDispatch } = useContext(GlobalContext);


  const logoutClick = async() => {
    const userToken = await AsyncStorage.getItem(ACCESS_TOKEN);
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    logoutSession()(loaderDispatch, bottomMessageDispatch, authDispatch,userToken,fcmToken);
  };


  useEffect(() => {
    onRefresh();
  }, []);
  const onRefresh = () => {
    console.log("called")
    setLoading(true);
    switch (routeKey) {
      case POINT_RECEIVED:
        GetPointsHistory(
          loaderDispatch,
          bottomMessageDispatch,
          PointHistoryDispatch,
        )((response) => {
          if (response.data.message == "Something went wrong." || response.data.message == "Authentication failure") {
            logoutClick()
          }
          // Historyapicall()
          setLoading(false);
        });
        break;
      case POINT_USED:
        getPointUsed(
          loaderDispatch,
          bottomMessageDispatch,
          PointUsedDispatch,
        )((response) => {
          if (response.data.message == "Something went wrong." || response.data.message == "Authentication failure") {
            logoutClick()
          }
          setLoading(false);
          // Upcommingapicall()
        });
        break;
      default:
        return null;
    }



  };

  // const Historyapicall = () => {
  //   getUpcomingAppts(
  //     loaderDispatch,
  //     bottomMessageDispatch,
  //     apptsUpcomingDispatch,
  //   )(() => {
  //     setLoading(false);
  //   });
  // }

  // const Upcommingapicall = () => {
  //   getHistoryAppts(
  //     loaderDispatch,
  //     bottomMessageDispatch,
  //     apptsHistoryDispatch,
  //   )(() => {
  //     setLoading(false);
  //   });
  // }

  const UpcommingData = () => {
    setMoreLoading(true);
    getmoreUpcommingAppts(data.pageNo)(
      bottomMessageDispatch,
      apptsUpcomingDispatch,
    )(() => {
      setMoreLoading(false);
    });
  }

  const HistoryData = () => {
    setMoreLoading(true);
    getMoreHistoryAppts(data.pageNo)(
      bottomMessageDispatch,
      apptsHistoryDispatch,
    )(() => {
      setMoreLoading(false);
    });
  }

  const handleLoadMore = () => {
    return routeKey == POINT_USED ? (
      data?.hasMore ?? 0 === 1 ? (
        isMoreLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (

          HistoryData()
        )
      ) : null
    ) : data?.hasMore ?? 0 === 1 ? (
      isMoreLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : UpcommingData()) : null
  }




  const footer = () => {
    return routeKey == POINT_USED ? (
      data?.hasMore ?? 0 === 1 ? (
        isMoreLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <View></View>
        )
      ) : null
    ) : data?.hasMore ?? 0 === 1 ? (
      isMoreLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (<View></View>
      )) : null
  };


  const dataList =
    routeKey === POINT_RECEIVED
      ? data ?? []
      : data ?? [];

     
  return isLoading ? (
    <View style={{ backgroundColor: 'white', flex: 1 }} />
  ) : (
    <View style={{flex:1 }}>
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
        renderItem={({ item }) => (
          <PointHistoryCard key={item.id} item={item} itemClick={itemClick} />
        )}
        contentContainerStyle={[
          {
            // marginVertical: 16,
            paddingVertical: 14

          },
          dataList.length > 0
            ? {}
            : { justifyContent: 'center', alignItems: 'center', height: '100%' },
        ]}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginVertical: 10 }}>
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
                // fontWeight: '500',
                fontFamily: 'Poppins-Regular',
              }}>
              You Dont Have Any Points!
            </Text>
          </View>
        }
        bounces={false}
        onEndReached={() => { handleLoadMore() }}
        onEndReachedThreshold={5}
        initialNumToRender={10}
        ListFooterComponent={footer}
      />
    </View>
  );
};

export default PointHistoryComponent;
