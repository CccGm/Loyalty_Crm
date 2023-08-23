import moment from 'moment';
import React, { useState, useContext, useEffect } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform
} from 'react-native';
import colors from '../../assets/theme/colors';
import { DASHBOARD, LOGIN, VOUCHER_DETAIL } from '../../constants/routeName';
import { CANCEL, CONFIRM } from '../../constants/strings';
import { GlobalContext } from '../../context/Provider';
import BottomSheet from '../common/BottomSheet';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import Toolbar from '../common/Toolbar';
import styles from './styles';
import { warningMessage } from '../../context/actions/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN } from '../../constants/prefrenceKeys';
import AlertComponent from '../common/AlertComponent';
import { useNavigation, useRoute } from '@react-navigation/native';

const VoucherDetailComponent = ({ item, buyVoucher }) => {
  // console.log("dddddryfbbf",item)
  const [bsVVisible, setBSVVisible] = useState(false);
  const { dashboardState } = useContext(GlobalContext);
  const { bottomMessageDispatch } = useContext(GlobalContext);
  const [bsTACVisible, setBSTACVisible] = useState(false);
  const [token, setToken] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const route = useRoute();
  const { navigate } = useNavigation();
  console.log("route", route.params.guest)
  useEffect(() => {
    tokenget()
  }, [])

  const tokenget = async () => {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
  }
  const hideDialog = () => {
    setVisible(false)
    // navigate(DASHBOARD)
  };
  const loginRedirect = () => {
    setVisible(false)
    navigate(LOGIN)
  }

  return (
    <Container>
      <Toolbar title={VOUCHER_DETAIL} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          {item.image == null || item.image == "" ? <Image style={{ width: '100%', height: 190 }} source={require('../../assets/images/appointment_bg.png')} /> : <Image style={{ width: '100%', height: 190 }} source={{ uri: item.image }} />}
          <View style={styles.card}>
            <Text style={styles.vCardOfferMessage}>{item.name}</Text>
            {/* {item.discount_type == 'amount' ? <Text style={styles.vCardOfferMessage}>${parseInt(item.discount_value).toFixed(0)} Off</Text> : <Text style={styles.vCardOfferMessage}>{parseInt(item.discount_value).toFixed(0)}% Off</Text>} */}

            {/* <Text style={styles.vCardOfferOnMessage}>{item.name}</Text> */}
            <Text style={styles.vCardValidity}>

              {item.buy_end_date ? <View style={{ alignItems: 'center', justifyContent: 'center' }}><Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular',fontSize:13 }}>Valid till {moment(item.buy_end_date).format('DD MMM YYYY')}</Text></View> : <View><Text></Text></View>}


              {/* {

item.buy_start_date && item.buy_end_date ?<Text style={{textAlign:'center'}}>offer from {moment(item.buy_start_date).format('DD MMMM YYYY')} to {moment(item.buy_end_date).format('DD MMMM YYYY')}
</Text>:item.buy_start_date && !item.buy_end_date ? <Text>offer from {moment(item.buy_start_date).format('DD MMMM YYYY')} </Text>: !item.buy_start_date && item.buy_end_date ?<Text>offer till {moment(item.buy_end_date).format('DD MMMM YYYY')}</Text>:<View></View>
//  item.validity == "1" ? <Text>Offer Till {item.coupon_expiry_days} Days</Text> : item.validity == "2" ? <Text>{item.end_date == null ? '' : `Offer Till ${moment(item.end_date)
//     .format('DD MMMM, YYYY')}`}</Text> : <View></View>


} */}
              {/* {
                item.validity == "1" ? <Text>Offer Till {item.coupon_expiry_days} Days</Text> : item.validity == "2" ? <Text>{item.end_date == null ? '' : `Offer Till ${moment(item.end_date)
                  .format('DD MMMM, YYYY')}`}</Text> : <View></View>


              } */}
            </Text>
          </View>
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.title}>Offer Details</Text>
          <Text style={styles.description}>
            {item.description}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setBSTACVisible(true);
            }}>
            <Text style={styles.temsAndCondition}>
              Terms & Conditions Apply*
            </Text>
          </TouchableOpacity>
          {
            route.params.guest ? <CustomButton
              style={styles.btn}
              primary
              title={`Redeem with ${item.required_reward_point} Points`}
              startIcon={
                <Image
                  source={require('../../assets/images/ic_loyalty_points.png')}
                />
              }
              onPress={() => {
                setVisible(true)
              }}
            /> : parseInt(dashboardState.data.loyality_points_rewords) < parseInt(item.required_reward_point) ? <CustomButton
              style={styles.btn}
              disabled
              grey
              title={`Redeem with ${item.required_reward_point} Points`}
              startIcon={
                <Image
                  source={require('../../assets/images/ic_loyalty_points.png')}
                />
              }
              onPress={() => {
                // if (parseInt(dashboardState.data.loyality_points_rewords) < parseInt(item.required_reward_point)) {
                //   warningMessage(bottomMessageDispatch, "Required sufficient reward point for purchase voucher ")
                // } else {
                //   setBSVVisible(true);
                // }
              }}
            /> : <CustomButton
              style={styles.btn}

              primary
              title={`Redeem with ${item.required_reward_point} Points`}
              startIcon={
                <Image
                  source={require('../../assets/images/ic_loyalty_points.png')}
                />
              }
              onPress={() => {
                if (parseInt(dashboardState.data.loyality_points_rewords) < parseInt(item.required_reward_point)) {
                  warningMessage(bottomMessageDispatch, "Required sufficient reward point for purchase voucher ")
                } else {
                  setBSVVisible(true);
                }
              }}
            />
          }

        </View>
      </ScrollView>

      {/* {bsVVisible == true ? AlertComponent:fa} */}
      {/* {console.log("dashboardState",item)} */}
      <BottomSheet
        visible={bsVVisible}
        setVisibility={setBSVVisible}
        canceledOnTouchOutside={true}
        body={
          <RedeemVoucherBS
            item={item}
            onNegativeClick={() => {
              setBSVVisible(false);
            }}

            onPositiveClick={(updateObj) => {
              setBSVVisible(false);
              buyVoucher(updateObj);
            }}
          />
        }
      />
      <BottomSheet
        visible={bsTACVisible}
        setVisibility={setBSTACVisible}
        canceledOnTouchOutside={true}
        body={
          <T_AND_CBS
            item={item}
            onCloseClick={() => {
              setBSTACVisible(false);
            }}
          />
        }
      />
      <View style={{
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}

        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 60, }}>
            <View style={{ width: '100%', height: Platform.OS == "ios" ? '14%' : '14%', borderRadius: 10, backgroundColor: '#FFFFFF', shadowColor: '#171717', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 0.2, elevation: 2, shadowRadius: 10, }}>
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Text style={{ fontSize: 17, fontFamily: 'Poppins-Regular', color: colors.primary }}>Please Login</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', padding: 10, }}>
                <TouchableOpacity style={{ width: 100, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#aaaaaa', borderRadius: 5 }}><Text style={{ color: '#fbfbfb', fontFamily: 'Poppins-Regular', fontSize: 15 }} onPress={() => hideDialog()}>CANCEL</Text></TouchableOpacity>
                <TouchableOpacity style={{ width: 100, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, borderRadius: 5 }}><Text style={{ color: '#fbfbfb', fontFamily: 'Poppins-Regular', fontSize: 15 }} onPress={() => loginRedirect()}>LOG IN</Text></TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>
      </View>
    </Container>
  );
};
const RedeemVoucherBS = ({ item, onPositiveClick, onNegativeClick }) => {
  const { dashboardState } = useContext(GlobalContext);
  return (
    <TouchableWithoutFeedback>
      <View>
        <Text style={styles.bsTitle}>Are you sure?</Text>
        <Text style={styles.bsSubTitle}>You want to Purchase this offer now</Text>
        <View style={styles.bsCard}>
          {item.discount_type == 'amount' ? <Text style={styles.vCardOfferMessage}>${parseInt(item.discount_value).toFixed(0)} off</Text> : <Text style={styles.vCardOfferMessage}>{parseInt(item.discount_value).toFixed(0)}% off</Text>}
          <View style={{ margin: 10 }}>
            <Text style={styles.vCardOfferOnMessage}>{item.name}</Text>
          </View>
          <Text style={styles.bsCardPoints}>{parseInt(item.required_reward_point)} Points</Text>
        </View>
        <Text style={styles.bsRemainingPointLbl}>Remaining Rewards Points</Text>
        <Text style={styles.bsRemainingPoint}>{parseInt(dashboardState.data.loyality_points_rewords) - parseInt(item.required_reward_point)}</Text>
        <View style={styles.bsBtnWrapper}>
          <CustomButton
            style={styles.bsBtn}
            primaryLight
            title={CANCEL}
            onPress={onNegativeClick}
          />
          <CustomButton
            style={styles.bsBtn}
            primary
            title={CONFIRM}
            onPress={() => {
              onPositiveClick({
                voucher_id: item.promotion_id,
              });
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const T_AND_CBS = ({ item, onCloseClick }) => {
  return (
    <TouchableWithoutFeedback>
      <View style={{ paddingHorizontal: 8, paddingVertical: 8 }}>
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
        <Text style={styles.bsSubTitle}>
          {item.terms_and_conditions}
        </Text>
        <View
          style={{
            backgroundColor: colors.grey20,
            width: '100%',
            height: 1,
            marginVertical: 6,
          }}
        />
        {/* <Text style={styles.bsSubTitle}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </Text> */}
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

export default VoucherDetailComponent;
