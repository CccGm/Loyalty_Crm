import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  Platform,
  stylesheet
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import colors from '../../assets/theme/colors';
import {RESCHEDULE_APPOINTMENT} from '../../constants/routeName';
import {NO_KEEP_IT, SUBMIT, YES_RESCHEDULE} from '../../constants/strings';
import {warningMessage} from '../../context/actions/common';
import getSlots from '../../context/actions/dashboardOps/getSlots';
import {GlobalContext} from '../../context/Provider';
import BottomSheet from '../common/BottomSheet';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import Toolbar from '../common/Toolbar';
import styles from './styles';
const RescheduleApptComponent = ({item, updateAppt}) => {
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const {loaderDispatch} = useContext(GlobalContext);
  const { systemConfigState } = useContext(GlobalContext);

  var today = new Date();
  var number_of_days_before = parseInt(systemConfigState.data.appointment_info_booking_x_days_before)
  var Beforedate = new Date();
  Beforedate.setDate(today.getDate()+number_of_days_before);
  var date = new Date(Beforedate),
  mnth = ("0" + (date.getMonth() + 1)).slice(-2),
  day = ("0" + date.getDate()).slice(-2);
  const Before_Date = [date.getFullYear(), mnth, day].join("-");
  const ExpireDate = moment(item.appointment_service[0].session_expiry).format('YYYY-MM-DD').toUpperCase() 
  

  const WEEK_DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  var WORK_DAYS = [];

  const [bsVisible, setBSVisible] = useState(false);
  const [markedDate, setMarkedDate] = useState({});
  const [offDays, setOffDays] = useState([]);
  const calendarRef = useRef();
  const [currentMonth, setCurrentMonth] = useState(Before_Date);
  const [dayWiseSlot, setDayWiseSlot] = useState({});
  const [dateWiseSlot, setDateWiseSlot] = useState([]);
  const [slotSelection, setSlotSelection] = useState('');
  const [dateSelection, setDateSelection] = useState('');
  const [dateTime, setDateTime] = useState({});
  const [arrowLeft, setArrowLeft] = useState(false);
  const [arrowRight, setArrowRight] = useState(false);
  const [remarks, onChangeRemarks] = useState('');
  

  useEffect(() => {
    getSlots(
      loaderDispatch,
      bottomMessageDispatch,
    )(ds => {
      WORK_DAYS = Object.keys(ds).map(key => key);
      setOffDays(WEEK_DAYS.filter(res => !WORK_DAYS.includes(res)));
      setDayWiseSlot(ds);
    });
  }, []);

  useEffect(() => {
 
    var d = item.appointment_date_from;
    
    let diff = Math.round(
      moment(moment(Before_Date)).diff(
        currentMonth,
        'months',
        true,
      ),
    );
    if (ExpireDate < Before_Date) {
      return false
    } else {
    if (diff >= 0 && diff <= 1) {
      calendarRef.current.addMonth(diff);
      setSelectionDate(moment(item.appointment_date_from).format('YYYY-MM-DD'));
    } else {
      setSelectionDate(moment(item.appointment_date_from).format('YYYY-MM-DD'));
    }}
  }, [dayWiseSlot]);

  const setSelectionDate = date => {
    let markedDates = {};
    markedDates = {
      ...getDaysInMonth(
        moment(currentMonth).month(),
        moment(currentMonth).year(),
        offDays,
      ),
    };
    markedDates[date] = {
      selected: true,
      customStyles: {
        container: {
          borderRadius: 4,
        },
      },
    };
    setMarkedDate(markedDates);
    setDateSelection(date);
    setDateWiseSlot(dayWiseSlot[moment(date).format('dddd')] ?? []);
    setSlotSelection('');
  };

  const timeSep = s => {
    const sa = s.split(' - ');
    return (
      moment(sa[0], 'hh:mm:ss').format('hh:mm A') +
      ' - ' +
      moment(sa[1], 'hh:mm:ss').format('hh:mm A')
    );
  };

  const checkBoxList = [
    {id: 1, title: 'Hait Cutting'},
    {id: 2, title: 'Hair Colour Session 01'},
    {id: 3, title: 'Bridal Pack'},
  ];
  const [checked, setChecked] = useState([]);

  const data = ()=>{
    console.log("dddd",calendarRef.current)
    calendarRef.current.addMonth(1)
  }

  return (
    <Container>
      <Toolbar title={RESCHEDULE_APPOINTMENT} />
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1}}
    >
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>
            Reschedule for {item?.appointment_service[0]?.product_name ?? '-'}
          </Text>
          {false && (
            <View>
              <Text style={styles.title}>
                please Select services from below:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                }}>
                {checkBoxList.map((cb, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        if (checked.includes(cb.id)) {
                          setChecked(checked.filter(el => el != cb.id));
                        } else {
                          setChecked([...checked, cb.id]);
                        }
                      }}
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '46%',
                      }}>
                      <CheckBox
                        disabled={false}
                        tintColor={colors.primary}
                        tintColors={{
                          true: colors.primary,
                          false: colors.primary,
                        }}
                        value={checked.includes(cb.id)}
                      />
                      <Text
                        style={{
                          color: colors.primary,
                          fontSize: 11,
                          fontWeight: '400',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {cb.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
          <View
            style={{
              borderColor: colors.primary,
              borderRadius: 16,
              borderWidth:1,
              marginTop: 16,
              overflow: 'hidden',
            }}>
            <Calendar
             current={item.appointment_date_from}
              style={[styles.calendar,]}
              ref={calendarRef}
              minDate={Beforedate}
              maxDate={ExpireDate}
              onDayPress={day => {
                setSelectionDate(day.dateString);
              }}
              monthFormat={'MMMM, yyyy'}
              onMonthChange={month => {
                setCurrentMonth(month.dateString);
                let diff = Math.round(
                  moment(moment(month)).diff(Before_Date, 'months', false),
                );
                  
              
               
              }}
              hideArrows={false}
              disableMonthChange={true}
             
              
              // disableArrowLeft={arrowLeft}
              // disableArrowRight={arrowRight}
              // renderArrow={direction => {
              //   if (direction == 'left') {
              //     return (
              //       <Image
              //         source={require('../../assets/images/ic_arrow_left.png')}
              //         style={
              //           arrowLeft
              //             ? {tintColor: 'grey'}
              //             :{tintColor:'#ffffff'}
              //         }
              //       />
              //     );
              //   } else {
              //     return (
              //       <Image
              //         source={require('../../assets/images/ic_arrow_right.png')}
              //         style={
              //           arrowRight
              //             ? {tintColor: 'grey'}
              //             : {tintColor:'#ffffff'}
              //         }
              //       />
              //     );
              //   }
              // }}
              hideExtraDays={true}
              firstDay={1}
              disableAllTouchEventsForDisabledDays={true}
              enableSwipeMonths={false}
              markedDates={markedDate}
              markingType={'custom'}
              theme={{
                backgroundColor: colors.white,
                'stylesheet.calendar.header': {
                  header: {
                    // override the default header style react-native-calendars/src/calendar/header/style.js
                    backgroundColor: '#B73E96', // set the backgroundColor for header
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  },
                  week: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#ffff',
                    padding: 10
                  }
                },
                arrowColor: 'white',
                calendarBackground: colors.white,
                textSectionTitleColor: colors.black,
                todayTextColor: colors.primary,
                selectedDayBackgroundColor: colors.primary,
                selectedDayTextColor: colors.white,
                monthTextColor: '#ffffff',
                textDayFontSize: 14,
                textDayStyle: {
                  paddingTop: 2,
                },
                textDayFontWeight: 'bold',
              }}
            />
          </View>
          <View style={styles.card}>
            <Text
              style={{
                marginHorizontal: 4,
                fontWeight: '500',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
              }}>
              Available Slots
            </Text>
            <View style={styles.slotWrapper}>
              {dateWiseSlot.length > 0 ? (
                dateWiseSlot.map((s, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={1}
                      style={styles.slotBtn}
                      onPress={() => {
                        setSlotSelection(index);
                      }}>
                      <Text
                        style={[
                          styles.slot,
                          slotSelection === index && styles.slotS,
                        ]}>
                        {timeSep(s)}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text>No slots available</Text>
              )}
            </View>
          </View>
          <Text style={[styles.title, {marginTop: 10}]}>Add Remarks</Text>
          <TextInput
            style={styles.remarks}
            onChangeText={onChangeRemarks}
            value={remarks}
            returnKeyType="done"
            placeholder={"Remarks"}
            multiline={true}
            onSubmitEditing={() => {}}
          />
          <CustomButton
            style={styles.btnSubmit}
            primary
            title={SUBMIT}
            onPress={() => {
              const selectedSlot = dateWiseSlot[slotSelection];
              if (dateSelection && selectedSlot) {
                let td = {};
                td['appointment_date_from'] = moment(
                  dateSelection + ' ' + selectedSlot.split(' - ')[0],
                  'YYYY-MM-DD HH:mm A',
                ).format('YYYY-MM-DD HH:mm:ss');
                td['appointment_date_to'] = moment(
                  dateSelection + ' ' + selectedSlot.split(' - ')[1],
                  'YYYY-MM-DD HH:mm A',
                ).format('YYYY-MM-DD HH:mm:ss');
                setDateTime(td);
                setBSVisible(true);
              } else {
                warningMessage(
                  bottomMessageDispatch,
                  'Please select time slot',
                );
              }
            }}
          />
        </View>
        <View style={{padding:10}}></View>
      </ScrollView>
      </KeyboardAvoidingView>
      <BottomSheet
        visible={bsVisible}
        setVisibility={setBSVisible}
        canceledOnTouchOutside={true}
        body={
          <RescheduleBS
            item={item}
            dateTime={dateTime}
            remarks={remarks}
            onNegativeClick={() => {
              setBSVisible(false);
            }}
            onPositiveClick={updateObj => {
              setBSVisible(false);
              updateAppt(updateObj);
            }}
          />
        }
      />
    </Container>
  );
};

const RescheduleBS = ({item, dateTime, onPositiveClick, onNegativeClick,remarks}) => {
  
  return (
    <TouchableWithoutFeedback>
      <View>
        <Text style={styles.bsTitle}>Are you sure?</Text>
        <Text style={styles.bsSubTitle}>
          You would like to reschedule your appointment
        </Text>
        <View style={styles.bsCard}>
          <Text style={styles.bsCardTitle}>{item?.booking_id ?? ' '}</Text>
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
              {moment(dateTime.appointment_date_from)
                .format('DD MMMM, ')
                .toUpperCase() +
                ' AT ' +
                moment(dateTime.appointment_date_from).format('hh:mm A') +
                ' - ' +
                moment(dateTime.appointment_date_to).format('hh:mm A')}
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
            title={YES_RESCHEDULE}
            onPress={() => {
              onPositiveClick({
                appointment_id: item.id,
                from_date: dateTime.appointment_date_from,
                to_date: dateTime.appointment_date_to,
                remarks:remarks,
              });
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const getDaysInMonth = (month, year, days) => {
  let pivot = moment()
    .month(month - 1)
    .year(year)
    .startOf('month');
  const end = moment()
    .month(month + 1)
    .year(year)
    .endOf('month');

  let dates = {};
  const disabled = {disabled: true};
  while (pivot.isBefore(end)) {
    days.forEach(day => {
      dates[pivot.day(day).format('YYYY-MM-DD')] = disabled;
    });
    pivot.add(7, 'days');
  }
  return dates;
};

export default RescheduleApptComponent;
