import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import colors from '../../assets/theme/colors';
import {RESCHEDULE_APPOINTMENT} from '../../constants/routeName';
import {
  CANCEL,
  NO_KEEP_IT,
  RESCHEDULE,
  YES_CANCEL,
} from '../../constants/strings';
import BottomSheet from '../common/BottomSheet';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import Toolbar from '../common/Toolbar';
import styles from './styles';

const UpcomingApptMixDetailComponent = ({item, cancelAppt}) => {
  const [bsVisible, setBSVisible] = useState(false);
  const {navigate} = useNavigation();

  const dataList = [
    {
      title: 'Hair Cutting',
      si: '',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown",
    },
    {
      title: 'Hair Colour - Session 01',
      si: '',
      description:
        'Cute, sassy, smart, sharp - the options are unlimited when it comes to the different looks that you can create with our top-notch makeup brands. From eyes and eyebrows to cheeks, lips.',
    },
    {
      title: 'Bridal Pack',
      si: '(Makeup, Hair Style)',
      description:
        'Nobody is born with a perfect face but everyone is blessed with attractive features, waiting to be revealed. At Myntra we bring you the best of makeup online, featuring a wide range of personal care products of high quality.',
    },
  ];

  return (
    <Container>
      <Toolbar title={item?.booking_id ?? ' '} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View>
          <Image
            style={{
              width: '100%',
              height: 190,
            }}
            source={{uri: item.appointment_service[0]?.product_image ?? ' '}}
          />
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Service Included:</Text>
            <View style={styles.cardDetail}>
              {item.appointment_service.length > 0 ? (
                item.appointment_service.map((as, index) => {
                  return <LeftIconText key={index} title={as.product_name} />;
                })
              ) : (
                <Text>No data</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.title}>Date & Time</Text>
          <View style={styles.apptDateTimeWrapper}>
            <Image
              style={styles.apptDateTimeIcon}
              source={require('../../assets/images/ic_calendar.png')}
            />
            <TextInput
              style={styles.apptDateTimeValue}
              editable={false}
              blurOnSubmit={false}
              value={
                moment(item.appointment_date_from)
                  .format('DD MMMM, ')
                  .toUpperCase() +
                ' AT ' +
                moment(item.appointment_date_from).format('hh:mm A') +
                ' - ' +
                moment(item.appointment_date_to).format('hh:mm A')
              }
            />
          </View>
          <Text style={styles.title}>Appointment Code</Text>
          <Text style={styles.cutomerCode}>{item?.code ?? ' '}</Text>
          {dataList.length > 0 &&
            dataList.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    backgroundColor: colors.cream,
                    borderRadius: 10,
                    marginBottom: 13,
                    marginTop: 16,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {item.title}
                    {item.si.length > 0 && (
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '400',
                          fontFamily: 'Poppins-Regular',
                          color: colors.black,
                        }}>
                        {item.si}
                      </Text>
                    )}
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      height: 0.8,
                      backgroundColor: colors.grey20,
                    }}
                  />
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              );
            })}

          <View style={styles.btnWrapper}>
            <CustomButton
              style={styles.btn}
              primaryLight
              title={CANCEL}
              onPress={() => {
                setBSVisible(true);
              }}
            />
            <CustomButton
              style={styles.btn}
              primary
              title={RESCHEDULE}
              onPress={() => {
                navigate(RESCHEDULE_APPOINTMENT, {item: item});
              }}
            />
          </View>
        </View>
      </ScrollView>
      <BottomSheet
        visible={bsVisible}
        setVisibility={setBSVisible}
        canceledOnTouchOutside={true}
        body={
          <CancelBS
            item={item}
            onNegativeClick={() => {
              setBSVisible(false);
            }}
            onPositiveClick={() => {
              setBSVisible(false);
              cancelAppt(item);
            }}
          />
        }
      />
    </Container>
  );
};

const CancelBS = ({item, onPositiveClick, onNegativeClick}) => {
  return (
    <TouchableWithoutFeedback>
      <View>
        <Text style={styles.bsTitle}>Are you sure?</Text>
        <Text style={styles.bsSubTitle}>
          You would like to cancel appointment
        </Text>
        <View style={styles.bsCard}>
          <Text style={styles.bsCardTitle}>{item?.booking_id ?? ' '}</Text>
          <Text style={styles.bsCardTitle}>Appointment Date & Time</Text>
          <View style={styles.bsDateTimeWrapper}>
            <Image source={require('../../assets/images/ic_calendar.png')} />
            <Text
              style={{
                fontSize: 12,
                marginStart: 4,
                color: colors.primary,
                fontWeight: '600',
                fontFamily: 'Poppins-Regular',
              }}>
              {moment(item.appointment_date_from)
                .format('DD MMMM, ')
                .toUpperCase() +
                ' AT ' +
                moment(item.appointment_date_from).format('hh:mm A') +
                ' - ' +
                moment(item.appointment_date_to).format('hh:mm A')}
            </Text>
          </View>
        </View>
        <View style={styles.bsBtnWrapper}>
          <CustomButton
            style={styles.btn}
            primaryLight
            title={NO_KEEP_IT}
            onPress={onNegativeClick}
          />
          <CustomButton
            style={styles.btn}
            primary
            title={YES_CANCEL}
            onPress={onPositiveClick}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const LeftIconText = ({title}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        marginHorizontal: 4,
        marginVertical: 4,
        borderColor: colors.primary,
        textTransform: 'capitalize',
      }}>
      <Image source={require('../../assets/images/right.png')} />
      <Text
        style={{
          marginStart: 6,
          color: colors.white,
          fontSize: 14,
          textTransform: 'capitalize',
          fontWeight: '500',
          fontFamily: 'Poppins-Regular',
        }}>
        {title}
      </Text>
      <Text
        style={{
          marginStart: 4,
          color: colors.white,
          fontSize: 10,
          textTransform: 'capitalize',
          fontWeight: '500',
          fontFamily: 'Poppins-Regular',
        }}>
        (Makeup, Hair Style)
      </Text>
    </View>
  );
};

export default UpcomingApptMixDetailComponent;
