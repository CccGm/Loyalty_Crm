import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import colors from '../../assets/theme/colors';
import {
  LOYALTY_POINTS,
  MY_VOUCHERS_TAB,
  MY_VOUCHER_DETAIL,
  VOUCHER_DETAIL,
  VOUCHER_OFFERS_TAB,
  HISTORY_TAB,
  POINT_HISTORY,
} from '../../constants/routeName';

import GetCustomerVoucher from '../../context/actions/dashboardOps/GetCustomerVoucher';
import getMoreMyVouchers from '../../context/actions/dashboardOps/getMoreMyVouchers';
import getMoreVouchers from '../../context/actions/dashboardOps/getMoreVouchers';

import getVoucher from '../../context/actions/dashboardOps/getVoucher';
import getVouchersHistory from '../../context/actions/dashboardOps/getVouchersHistory';
import {GlobalContext} from '../../context/Provider';
import Container from '../common/Container';
import logoutSession from '../../context/actions/auth/logoutSession';
import Toolbar from '../common/Toolbar';
import styles from './styles';
import {
  getabindex,
  getPointndex,
  getServicetabIndex,
} from '../../context/actions/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN} from '../../constants/prefrenceKeys';

const TABBAR_HEIGHT = 48;

const LoyaltyPointComponent = ({
  voucherData,
  myVoucherData,
  VouchersHistoryData,
}) => {
  const layout = useWindowDimensions();
  const [item, setItem] = useState();
  const [index, setIndex] = useState(0);

  const [routes] = React.useState([
    {key: VOUCHER_OFFERS_TAB, title: VOUCHER_OFFERS_TAB},
    {key: MY_VOUCHERS_TAB, title: MY_VOUCHERS_TAB},
    {key: HISTORY_TAB, title: HISTORY_TAB},
  ]);

  let listRefArr = useRef([]);
  let listOffset = useRef({});
  let isListGliding = useRef(false);
  // const scrollY = useRef(new Animated.Value(0)).current;
  const expanded = true;
  const scrollY = useRef(new Animated.Value(expanded ? 1 : 0)).current;
  const [headerHeight, setHeaderHeight] = useState(0);
  const {navigate} = useNavigation();

  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {dashboardState} = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(true);
  const {bsState, bsDispatch} = useContext(GlobalContext);

  // const [colorsdata, setColorsData] = useState(colors.map((index,i)=>{return {colorcode:index.color_code}}));

  useEffect(() => {
    scrollY.addListener(({value}) => {
      const curRoute = routes[index].key;
      listOffset.current[curRoute] = value;
    });

    return () => {
      scrollY.removeAllListeners();
    };
  }, [routes, index]);

  const syncScrollOffset = () => {
    const curRouteKey = routes[index].key;
    listRefArr.current.forEach(item => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < headerHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= headerHeight) {
          if (
            listOffset.current[item.key] < headerHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: headerHeight,
                animated: false,
              });
              listOffset.current[item.key] = headerHeight;
            }
          }
        }
      }
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  const headerY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolateRight: 'clamp',
  });
  const renderScene = ({route}) => {
    switch (route.key) {
      case VOUCHER_OFFERS_TAB:
        return (
          <VoucherListView
            data={voucherData}
            itemClick={item => {
              setItem(item);
              navigate(VOUCHER_DETAIL, {item: item});
            }}
            scrollY={scrollY}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onScrollEndDrag={onScrollEndDrag}
            onMomentumScrollEnd={onMomentumScrollEnd}
            routeKey={route.key}
            onGetRef={ref => {
              if (ref) {
                const found = listRefArr.current.find(e => e.key === route.key);
                if (!found) {
                  listRefArr.current.push({
                    key: route.key,
                    value: ref,
                  });
                }
              }
            }}
            headerHeight={headerHeight}
            windowHeight={layout.height}
          />
        );
      case MY_VOUCHERS_TAB:
        return (
          <MyVoucherListView
            data={myVoucherData}
            itemClick={item => {
              navigate(MY_VOUCHER_DETAIL, {item: item});
            }}
            scrollY={scrollY}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onScrollEndDrag={onScrollEndDrag}
            routeKey={route.key}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onGetRef={ref => {
              if (ref) {
                const found = listRefArr.current.find(e => e.key === route.key);
                if (!found) {
                  listRefArr.current.push({
                    key: route.key,
                    value: ref,
                  });
                }
              }
            }}
            headerHeight={headerHeight}
            windowHeight={layout.height}
          />
        );
      case HISTORY_TAB:
        return (
          <MyVoucherHistoryListView
            data={VouchersHistoryData}
            itemClick={item => {
              navigate(MY_VOUCHER_DETAIL, {item: item, history: 'history'});
            }}
            scrollY={scrollY}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onScrollEndDrag={onScrollEndDrag}
            routeKey={route.key}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onGetRef={ref => {
              if (ref) {
                const found = listRefArr.current.find(e => e.key === route.key);
                if (!found) {
                  listRefArr.current.push({
                    key: route.key,
                    value: ref,
                  });
                }
              }
            }}
            headerHeight={headerHeight}
            windowHeight={layout.height}
          />
        );
      default:
        return null;
    }
  };

  const renderTabBar = props => {
    const y = scrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [headerHeight, 0],
      extrapolateRight: 'clamp',
    });
    return (
      <Animated.View>
        <TabBar
          {...props}
          onTabPress={({route, preventDefault}) => {
            if (isListGliding.current) {
              preventDefault();
            }
          }}
          indicatorStyle={{backgroundColor: colors.white}}
          style={{backgroundColor: colors.primary}}
          renderLabel={({route, focused, color}) => (
            <Text
              style={{
                color: focused ? colors.white : colors.transparentWhite,
                fontWeight: '700',
                fontSize: 13,
                fontFamily: 'Poppins-Regular',
                // borderWidth:2,
                // borderColor:'red'
              }}>
              {route.title}
            </Text>
          )}
        />
      </Animated.View>
    );
  };

  const idex = data => {
    // setIndex(data)
    getPointndex(bsDispatch, data);
    // (data)
  };

  return (
    <Container>
      <Toolbar title={LOYALTY_POINTS} primary hideBackBtn />
      <View style={{flex: 1}}>
        <Animated.View
          style={[styles.headerWrapper]}
          onLayout={({nativeEvent}) => {
            setHeaderHeight(nativeEvent.layout.height);
          }}>
          <Image
            style={{width: '100%'}}
            source={require('../../assets/images/img_lp_bg.png')}
          />
          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerSmallText}>Current Reward Balance</Text>
            <TouchableOpacity
              style={[
                styles.headerPoints,
                {backgroundColor: 'white', borderRadius: 10},
              ]}
              onPress={() => {
                navigate(POINT_HISTORY, {
                  data: 'ViewPoint',
                });
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{width: '20%', backgroundColor: 'white', height: 30}}
                  source={require('../../assets/images/ic_lp_primary.png')}
                  resizeMode={'contain'}
                />

                <Text style={styles.headerPoints1}>
                  {dashboardState.data.loyality_points_rewords}
                </Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: 'blue'}}>View Point History</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <TabView
          navigationState={{index: bsState.lindex, routes}}
          renderScene={renderScene}
          onIndexChange={idex}
          initialLayout={{width: layout.width, height: 0}}
          renderTabBar={renderTabBar}
          lazy={true}
        />
      </View>
    </Container>
  );
};

export default LoyaltyPointComponent;

const VoucherListView = ({
  data,
  itemClick,
  onGetRef,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
  headerHeight,
  windowHeight,
  routeKey,
}) => {
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {voucherDispatch, voucherState} = useContext(GlobalContext);
  const {myVoucherDispatch} = useContext(GlobalContext);
  const {VouchersHistoryDispatch} = useContext(GlobalContext);
  const {authDispatch} = useContext(GlobalContext);
  const {bsDispatch} = useContext(GlobalContext);

  const [isLoading, setLoading] = useState(true);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const navigate = useNavigation();
  var colorss = [
    {color_code: '#FFFCF5'},
    {color_code: '#FFF5F5'},
    {color_code: '#F1FEFF'},
    {color_code: '#FAF9FF'},
    {color_code: '#FFFCF5'},
    {color_code: '#FFF5F5'},
    {color_code: '#F1FEFF'},
    {color_code: '#FAF9FF'},
    {color_code: '#FFFCF5'},
    {color_code: '#FFF5F5'},
    {color_code: '#F1FEFF'},
    {color_code: '#FAF9FF'},
    {color_code: '#FFFCF5'},
    {color_code: '#FFF5F5'},
    {color_code: '#F1FEFF'},
    {color_code: '#FAF9FF'},
    {color_code: '#FFFCF5'},
    {color_code: '#FFF5F5'},
    {color_code: '#F1FEFF'},
    {color_code: '#FAF9FF'},
    {color_code: '#FFFCF5'},
    {color_code: '#FFF5F5'},
    {color_code: '#F1FEFF'},
    {color_code: '#FAF9FF'},
    {color_code: '#FFFCF5'},
    {color_code: '#FFF5F5'},
    {color_code: '#F1FEFF'},
    {color_code: '#FAF9FF'},
    {color_code: '#FFFCF5'},
    {color_code: '#FFF5F5'},
    {color_code: '#F1FEFF'},
    {color_code: '#FAF9FF'},
    {color_code: '#FFFCF5'},
    {color_code: '#FFF5F5'},
    {color_code: '#F1FEFF'},
    {color_code: '#FAF9FF'},
    {color_code: '#FFFCF5'},
    {color_code: '#FFF5F5'},
    {color_code: '#F1FEFF'},
    {color_code: '#FAF9FF'},
  ];
  var darkcolors = [
    {color_code: '#fff1d0'},
    {color_code: '#ffd3d3'},
    {color_code: '#ccfcff'},
    {color_code: '#e0daff'},
    {color_code: '#fff1d0'},
    {color_code: '#ffd3d3'},
    {color_code: '#ccfcff'},
    {color_code: '#e0daff'},
    {color_code: '#fff1d0'},
    {color_code: '#ffd3d3'},
    {color_code: '#ccfcff'},
    {color_code: '#e0daff'},
    {color_code: '#fff1d0'},
    {color_code: '#ffd3d3'},
    {color_code: '#ccfcff'},
    {color_code: '#e0daff'},
    {color_code: '#fff1d0'},
    {color_code: '#ffd3d3'},
    {color_code: '#ccfcff'},
    {color_code: '#e0daff'},
    {color_code: '#fff1d0'},
    {color_code: '#ffd3d3'},
    {color_code: '#ccfcff'},
    {color_code: '#e0daff'},
    {color_code: '#fff1d0'},
    {color_code: '#ffd3d3'},
    {color_code: '#ccfcff'},
    {color_code: '#e0daff'},
    {color_code: '#fff1d0'},
    {color_code: '#ffd3d3'},
    {color_code: '#ccfcff'},
    {color_code: '#e0daff'},
    {color_code: '#fff1d0'},
    {color_code: '#ffd3d3'},
    {color_code: '#ccfcff'},
    {color_code: '#e0daff'},
    {color_code: '#fff1d0'},
    {color_code: '#ffd3d3'},
    {color_code: '#ccfcff'},
    {color_code: '#e0daff'},
  ];

  const logoutbtnClick = async () => {
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

  React.useEffect(() => {
    const unsubscribe = navigate.addListener('focus', () => {
      getabindex(bsDispatch, 0);
      getServicetabIndex(bsDispatch, 0);
      setLoading(true);
      getVoucher(
        loaderDispatch,
        bottomMessageDispatch,
        voucherDispatch,
      )(response => {
        console.log('response', response);
        if (
          response.data.message == 'Something went wrong.' ||
          response.data.message == 'Authentication failure'
        ) {
          logoutbtnClick();
        }
        setLoading(false);
      });
      GetCustomerVoucher(
        loaderDispatch,
        bottomMessageDispatch,
        myVoucherDispatch,
      )(response => {
        console.log('response1', response);
        if (
          response.data.message == 'Something went wrong.' ||
          response.data.message == 'Authentication failure'
        ) {
          logoutbtnClick();
        }
        setLoading(false);
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    getVoucherData();
  }, []);

  const getVoucherData = () => {
    setLoading(true);
    switch (routeKey) {
      case VOUCHER_OFFERS_TAB:
        getVoucher(
          loaderDispatch,
          bottomMessageDispatch,
          voucherDispatch,
        )(() => {
          setLoading(false);
        });
        break;
      default:
        return null;
    }
  };

  const footer = () => {
    return voucherState.data?.hasMore ?? 0 === 1 ? (
      isMoreLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <View></View>
      )
    ) : null;
  };

  const dataload = () => {
    setMoreLoading(true);
    getMoreVouchers(voucherState.data.pageNo)(
      bottomMessageDispatch,
      voucherDispatch,
    )(() => {
      setMoreLoading(false);
    });
  };
  const handleLoadMore = () => {
    return voucherState.data?.hasMore ?? 0 === 1 ? (
      isMoreLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        dataload()
      )
    ) : null;
  };

  if (data.length == 0 && data == '') {
    return (
      <View
        style={{
          paddingVertical: 10,
          paddingTop: '40%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: colors.black,
            fontSize: 15,
            fontWeight: '500',
            // borderWidth:2,
            // borderColor: '#03eff1',
            fontFamily: 'Poppins-Regular',
          }}>
          No Vouchers offers found
        </Text>
      </View>
    );
  } else {
    return (
      <View style={{paddingVertical: 10}}>
        <Animated.FlatList
          ref={onGetRef}
          data={data}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            // marginVertical: 16,
            padding: 10,
            // paddingBottom: 16,
            // paddingTop: 50,
            // borderWidth:2,
            // borderColor:'#8336b3',
            // minHeight: windowHeight + 16,
          }}
          ListFooterComponent={footer}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          renderItem={({item, index}) => (
            <VoucherCard
              key={index}
              item={item}
              itemClick={itemClick}
              colorss={colorss}
              index={index}
              darkcolors={darkcolors}
            />
          )}
          scrollToOverflowEnabled={true}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onScrollEndDrag={onScrollEndDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
        />
      </View>
    );
  }
};

const MyVoucherListView = ({
  data,
  itemClick,
  onGetRef,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
  headerHeight,
  windowHeight,
  routeKey,
}) => {
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {myVoucherDispatch} = useContext(GlobalContext);
  const {VouchersHistoryDispatch} = useContext(GlobalContext);

  const [isMoreLoading, setMoreLoading] = useState(false);
  const {myvoucherState} = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigate.addListener('focus', () => {
      setLoading(true);
      GetCustomerVoucher(
        loaderDispatch,
        bottomMessageDispatch,
        myVoucherDispatch,
      )(() => {
        setLoading(false);
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    GetCustomerVoucherData();
  }, []);
  const GetCustomerVoucherData = () => {
    setLoading(true);
    switch (routeKey) {
      case MY_VOUCHERS_TAB:
        GetCustomerVoucher(
          loaderDispatch,
          bottomMessageDispatch,
          myVoucherDispatch,
        )(() => {
          setLoading(false);
        });

        break;
      default:
        return null;
    }
  };

  const footer = () => {
    return myvoucherState.data?.hasMore ?? 0 === 1 ? (
      isMoreLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <View></View>
      )
    ) : null;
  };

  const dataload = () => {
    setMoreLoading(true);
    getMoreMyVouchers(myvoucherState.data.pageNo)(
      bottomMessageDispatch,
      myVoucherDispatch,
    )(() => {
      setMoreLoading(false);
    });
  };

  const handleLoadMore = () => {
    return myvoucherState.data?.hasMore ?? 0 === 1 ? (
      isMoreLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        dataload()
      )
    ) : null;
  };

  if (data.length == 0 && data == '') {
    return (
      <View
        style={{
          paddingVertical: 10,
          paddingTop: '40%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: colors.black,
            fontSize: 15,
            fontWeight: '500',
            fontFamily: 'Poppins-Regular',
          }}>
          No Vouchers found
        </Text>
      </View>
    );
  } else {
    return (
      <View style={{paddingVertical: 10}}>
        <Animated.FlatList
          ref={onGetRef}
          data={data}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            padding: 10,
            // paddingBottom: 16,
            // paddingTop: headerHeight,
            // minHeight: windowHeight ,
          }}
          ListFooterComponent={footer}
          renderItem={({item, index}) => (
            <MyVoucherCard key={index} item={item} itemClick={itemClick} />
          )}
          scrollToOverflowEnabled={true}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onScrollEndDrag={onScrollEndDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
        />
      </View>
    );
  }
};

const MyVoucherHistoryListView = ({
  data,
  itemClick,
  onGetRef,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
  headerHeight,
  windowHeight,
  routeKey,
}) => {
  const {loaderDispatch} = useContext(GlobalContext);
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {myVoucherDispatch} = useContext(GlobalContext);
  const {VouchersHistoryDispatch} = useContext(GlobalContext);

  const [isMoreLoading, setMoreLoading] = useState(false);
  const {myvoucherState} = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigate.addListener('focus', () => {
      setLoading(true);
      getVouchersHistory(
        loaderDispatch,
        bottomMessageDispatch,
        VouchersHistoryDispatch,
      )(() => {
        setLoading(false);
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    GetCustomerHistoryVoucherData();
  }, []);
  const GetCustomerHistoryVoucherData = () => {
    setLoading(true);
    switch (routeKey) {
      case HISTORY_TAB:
        getVouchersHistory(
          loaderDispatch,
          bottomMessageDispatch,
          VouchersHistoryDispatch,
        )(() => {
          setLoading(false);
        });
        break;
      default:
        return null;
    }
  };

  const footer = () => {
    return myvoucherState.data?.hasMore ?? 0 === 1 ? (
      isMoreLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <View></View>
      )
    ) : null;
  };

  const dataload = () => {
    setMoreLoading(true);
    getMoreMyVouchers(myvoucherState.data.pageNo)(
      bottomMessageDispatch,
      myVoucherDispatch,
    )(() => {
      setMoreLoading(false);
    });
  };

  const handleLoadMore = () => {
    return myvoucherState.data?.hasMore ?? 0 === 1 ? (
      isMoreLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        dataload()
      )
    ) : null;
  };

  if (data.length == 0 && data == '') {
    return (
      <View
        style={{
          paddingVertical: 10,
          paddingTop: '40%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: colors.black,
            fontSize: 15,
            fontWeight: '500',
            fontFamily: 'Poppins-Regular',
          }}>
          No Vouchers found
        </Text>
      </View>
    );
  } else {
    return (
      <View style={{paddingVertical: 10}}>
        <Animated.FlatList
          ref={onGetRef}
          data={data}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            padding: 10,
            // marginVertical: 16,
            // paddingBottom: 16,
            // paddingTop: headerHeight,
            // minHeight: windowHeight + 16,
          }}
          ListFooterComponent={footer}
          renderItem={({item, index}) => (
            <HistoryVoucherCard key={index} item={item} itemClick={itemClick} />
          )}
          scrollToOverflowEnabled={true}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={50}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onScrollEndDrag={onScrollEndDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
        />
      </View>
    );
  }
};

const VoucherCard = ({item, itemClick, colorss, index, darkcolors}) => {
  console.log('index', index);
  console.log(colorss[index].color_code);

  return (
    <TouchableOpacity
      style={[
        styles.vCardWrapervoucher,
        {
          backgroundColor: colorss[index].color_code,
          minHeight: item.buy_end_date ? 125 : 100,
        },
      ]}
      onPress={() => {
        itemClick(item);
      }}>
      <Text style={[styles.vCardOfferMessage]}>{item.name}</Text>
      {/* {item.discount_type == 'amount' ? <Text style={styles.vCardOfferMessage}>${parseInt(item.discount_value).toFixed(0)} Off</Text> : <Text style={styles.vCardOfferMessage}>{parseInt(item.discount_value).toFixed(0)}% Off</Text>} */}

      {/* <Text style={styles.vCardOfferOnMessage}>{item.name}</Text> */}

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

      {/* {
                 item.end_date == null &&item.coupon_expiry_days==null ?  'Unlimited' : ''
      } */}
      {/* </Text> */}
      <View
        style={{
          position: 'absolute',
          bottom: 5,
          padding: 5,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.vCardValidity1}>
          {item.buy_end_date ? (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                }}>
                Valid till {moment(item.buy_end_date).format('DD MMM YYYY')}
              </Text>
            </View>
          ) : (
            <View></View>
          )}
        </Text>
        <View
          style={{
            width: 100,
            padding: 5,
            borderRadius: 5,
            backgroundColor: darkcolors[index].color_code,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: colors.black,
              fontFamily: 'Poppins-SemiBold',
            }}>
            {item.required_reward_point} Points
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MyVoucherCard = ({item, itemClick}) => {
  return (
    <TouchableOpacity
      style={[styles.vCardWraper]}
      onPress={() => {
        itemClick(item);
      }}>
      <Text style={[styles.vCardOfferMessage]}>
        <Text style={styles.vCardOfferMessage}>{item.name}</Text>
        {/* {item.discount_type == 'amount' ? <Text style={styles.vCardOfferMessage}>${parseInt(item.discount_value).toFixed(0)} Off</Text> : <Text style={styles.vCardOfferMessage}>{parseInt(item.discount_value).toFixed(0)}% Off</Text>} */}
      </Text>
      {/* <Text
          style={[
            styles.vCardOfferOnMessage,
          ]}>
          {item.name}
        </Text> */}
      <Text style={styles.vCardValidity}>
        {item.expiration_date == null ? (
          ''
        ) : (
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
            }}>
            {' '}
            Expires on {moment(item.expiration_date).format('DD MMM, YYYY')}
          </Text>
        )}
      </Text>
    </TouchableOpacity>
  );
};

const RenderData = item => {
  if (item.status == '2') {
    return <Text>{`Inactive`}</Text>;
  } else if (item.status == '3') {
    return (
      <Text>{`Used on ${moment(item.used_date).format('DD MMM, YYYY')}`} </Text>
    );
  } else if (item.status == '4') {
    return (
      <Text>
        {`Expired on ${moment(item.expiry_date).format('DD MMM, YYYY')}`}{' '}
      </Text>
    );
  } else if (item.status == '5') {
    return (
      <Text>
        {`Void on ${moment(item.updated_date).format('DD MMM, YYYY')}`}{' '}
      </Text>
    );
  }
};

const HistoryVoucherCard = ({item, itemClick}) => {
  return (
    <View
      style={[
        {flex: 0.5, flexDirection: 'column'},
        item.expire == 1 && {
          borderRadius: 12,
          borderWidth: 1.5,
          borderColor: colors.primary,
          margin: 6,
        },
        item.expire == 1 && {
          borderRadius: 12,
          borderStyle: 'dashed',
          borderColor: '#dcdcdc',
          margin: 6,
          borderWidth: 1.5,
          backgroundColor: '#f5f5f5',
        },
      ]}>
      <TouchableOpacity
        style={[styles.vCardWraper, item.expire == 1 && styles.vCardWrapperD]}
        onPress={() => {
          itemClick(item);
        }}>
        {item.status_text ? (
          <View style={styles.vCardExpireWrapper}>
            <Text style={styles.vcCardEpire}>{item.status_text}</Text>
          </View>
        ) : (
          <View></View>
        )}

        <Text
          style={[
            styles.vCardOfferMessage,
            item.expire == 1 && styles.vCardOfferMessageD,
          ]}>
          <Text
            style={[
              styles.vCardOfferMessage,
              {color: item.expire == 1 ? '#9e9f9e' : colors.primary},
            ]}>
            {item.name}
          </Text>
          {/* {item.discount_type == 'amount' ? <Text style={[styles.vCardOfferMessage,{color:item.expire == 1?'#9e9f9e':colors.primary}]}>${parseInt(item.discount_value).toFixed(0)} Off</Text> : <Text style={[styles.vCardOfferMessage,{color:item.expire == 1?'#9e9f9e':colors.primary}]}>{parseInt(item.discount_value).toFixed(0)}% Off</Text>} */}
        </Text>
        {/* <Text
          style={[styles.vCardOfferOnMessage,{color:item.expire == 1?'#9e9f9e':colors.black}]}>
          {item.name}
        </Text> */}

        <Text style={styles.vCardValidity}>
          {RenderData(item)}
          {/* {item.status == 3 ? (
            <Text>
              {`Used on ${moment(item.used_date).format('DD MMM, YYYY')}`}{' '}
            </Text>
          ) : (
            <View></View>
          )} */}
          {/* {item.is_used == 1 ? (
          
          ) : item.expiration_date == null ? (
            ''
          ) : (
            <Text>
              {' '}
              Expired on {moment(item.expiration_date).format('DD MMM, YYYY')}
            </Text>
          )} */}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
