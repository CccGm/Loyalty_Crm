import Clipboard from '@react-native-community/clipboard';
import {useRoute} from '@react-navigation/core';
import moment from 'moment';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import colors from '../../assets/theme/colors';
import {MY_VOUCHER_DETAIL} from '../../constants/routeName';
import BottomSheet from '../common/BottomSheet';
import Container from '../common/Container';
import Toolbar from '../common/Toolbar';
import styles from './styles';

const MyVoucherDetailComponent = ({item, history}) => {
  console.log('itemitem', item);
  const [bsVVisible, setBSVVisible] = useState(false);
  const [bsTACVisible, setBSTACVisible] = useState(false);
  const route = useRoute();
  console.log(route.params.history);

  const RenderData = item => {
    if (item.status == '2') {
      return <Text>{`Inactive`}</Text>;
    } else if (item.status == '3') {
      return (
        <Text>
          {`Used on ${moment(item.used_date).format('DD MMM, YYYY')}`}{' '}
        </Text>
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

  return (
    <Container>
      <Toolbar title={MY_VOUCHER_DETAIL} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View>
          {item.image == null || item.image == '' ? (
            <Image
              style={{width: '100%', height: 190}}
              source={require('../../assets/images/appointment_bg.png')}
            />
          ) : (
            <Image
              style={{width: '100%', height: 190}}
              source={{uri: item.image}}
            />
          )}
          <View
            style={[
              styles.card,
              {
                backgroundColor:
                  item.expire == 1 || item.is_used == 1
                    ? item.is_used == 1
                      ? '#f5f5f5'
                      : item.expire == 1
                      ? '#f5f5f5'
                      : colors.cream
                    : colors.cream,
                borderColor:
                  item.expire == 1 || item.is_used == 1
                    ? item.is_used == 1
                      ? '#949494'
                      : item.expire == 1
                      ? '#949494'
                      : '#e5bad8'
                    : '#e5bad8',
              },
            ]}>
            <Text
              style={[
                styles.vCardOfferMessage,
                {
                  textAlign: 'center',
                  color:
                    item.expire == 1 || item.is_used == 1
                      ? item.is_used == 1
                        ? '#949494'
                        : item.expire == 1
                        ? '#949494'
                        : colors.primary
                      : colors.primary,
                },
              ]}>
              {item.name}
            </Text>
            {/* {item.discount_type == 'amount' ? <Text style={[styles.vCardOfferMessage, { color: item.expire == 1 || item.is_used == 1 ? item.is_used == 1 ? "#949494" : item.expire == 1 ? "#949494" : colors.primary : colors.primary }]}>${parseInt(item.discount_value).toFixed(0)} Off</Text> : <Text style={styles.vCardOfferMessage}>{parseInt(item.discount_value).toFixed(0)}% Off</Text>} */}
            {/* <Text style={[styles.vCardOfferOnMessage, { color: item.expire == 1 || item.is_used == 1 ? item.is_used == 1 ? "#a7a7a7" : item.expire == 1 ? "#a7a7a7" : colors.black : colors.black }]}>{item.name}</Text> */}
            <Text style={styles.vCardValidity}>
              {route.params.history == 'history' ? (
                RenderData(item)
              ) : item.expiration_date == null ? (
                ''
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 13,
                  }}>
                  Expires on{' '}
                  {moment(item.expiration_date).format('DD MMM, YYYY')}
                </Text>
              )}
            </Text>
          </View>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.offerDetail}>
            <Text style={styles.title}>Offer Details</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-end',
              }}>
              <Image
                source={require('../../assets/images/ic_lp_primary.png')}
              />
              <Text style={styles.points}>
                {item.required_reward_point} Points
              </Text>
            </View>
          </View>
          <Text style={styles.description}>{item.description}</Text>
          <TouchableOpacity
            onPress={() => {
              setBSTACVisible(true);
            }}>
            <Text style={styles.temsAndCondition}>
              Terms & Conditions Apply*
            </Text>
          </TouchableOpacity>

          <View style={styles.codeCopyWrapper}>
            <View
              style={{
                borderWidth: 1.5,
                borderStyle: 'dashed',
                borderColor:
                  item.expire == 1 || item.is_used == 1
                    ? item.is_used == 1
                      ? '#d7dbe0'
                      : item.expire == 1
                      ? '#d7dbe0'
                      : '#e1b0d4'
                    : '#e1b0d4',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.code,
                  item.expire == 1 || item.is_used == 1
                    ? item.is_used == 1
                      ? styles.codeD
                      : item.expire == 1
                      ? styles.codeD
                      : null
                    : null,
                ]}>
                REDEMPTION CODE:{' '}
                <Text
                  style={[
                    styles.codeText,
                    item.expire == 1 || item.is_used == 1
                      ? item.is_used == 1
                        ? styles.codeTextD
                        : item.expire == 1
                        ? styles.codeTextD
                        : null
                      : null,
                  ]}>
                  {item.coupon_code}
                </Text>
              </Text>
            </View>
            {/* <TouchableOpacity
              disabled={item.expire_voucher == 0}
              style={[styles.copy, item.expire_voucher == 0 && styles.copyD]}
              onPress={() => {
                Clipboard.setString(item.coupon_code);
              }}>
              <Image source={require('../../assets/images/ic_copy.png')} />
            </TouchableOpacity> */}
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <QRCode
              value={item.coupon_code}
              size={130}
              color={item.expire == 1 ? '#E2E2E2' : 'black'}></QRCode>
            {route.params.history == 'history' ? (
              <View
                style={{
                  width: 80,
                  position: 'absolute',
                  height: 40,
                  alignItems: 'center',
                  backgroundColor: '#f5f5f5',
                  justifyContent: 'center',
                }}>
                <Text>
                  {item.status_text}
                  {/* {item.expire == 1 || item.is_used == 1 ? <View style={{ alignItems: 'center', justifyContent: 'center', }}><Text style={{ fontFamily: 'Poppins-SemiBold', color: '#5a5a5a', marginTop: 4 }}>{item.is_used == 1 ? "Used" : item.expire == 1 ? "Expired" : null}</Text></View> : <View></View>} */}
                </Text>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </View>
        <View style={{padding: 20}}></View>
      </ScrollView>

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
    </Container>
  );
};

const T_AND_CBS = ({item, onCloseClick}) => {
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
        <Text style={styles.bsSubTitle}>{item.terms_and_conditions}</Text>
        {/* <View
          style={{
            backgroundColor: colors.grey20,
            width: '100%',
            height: 1,
            marginVertical: 6,
          }}
        />
        <Text style={styles.bsSubTitle}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </Text>
        <View
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

export default MyVoucherDetailComponent;
