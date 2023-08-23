import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const CustomDatepicker = props => {
  console.log(props.data);
  const {textStyle, defaultDate} = props;
  const [date, setDate] = useState(moment(defaultDate));
  const majorVersionIOS = parseInt(Platform.Version, 10);
  const [dates, setCurrentDate] = useState('');
  const [show, setShow] = useState(false);

  const onChange = (e, selectedDate) => {
    setDate(moment(selectedDate));
    setCurrentDate(moment(selectedDate));
  };
  const onPressCancel = () => {
    setDate(moment(defaultDate));
    setShow(false);
  };
  const onPressDone = () => {
    props.onDateChange(moment(date._i).format('YYYY-MM-DD'));
    setShow(false);
  };

  const onAndroidChange = (e, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(moment(selectedDate));
      props.onDateChange(moment(selectedDate).format('YYYY-MM-DD'));
      setCurrentDate(moment(selectedDate));
    }
  };
  console.log(majorVersionIOS);
  const renderDatePicker = () => {
    return (
      <View style={{justifyContent: 'center'}}>
        <DateTimePicker
          timeZoneOffsetInMinutes={0}
          value={new Date(date)}
          mode="date"
          minimumDate={
            new Date(moment().subtract(120, 'years').format('YYYY-MM-DD'))
          }
          maximumDate={new Date(moment().format('YYYY-MM-DD'))}
          onChange={Platform.OS === 'ios' ? onChange : onAndroidChange}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          // style={{width:'100%',marginLeft:majorVersionIOS<14?0:'35%'}}
        />
      </View>
    );
  };
  console.log(show);

  return (
    <TouchableHighlight
      activeOpacity={0.2}
      underlayColor="#FFFFFF"
      onPress={() => setShow(true)}>
      <View>
        {props.Edit ? (
          <Text
            style={{
              marginTop: 5,
              fontWeight: '600',
              fontFamily: 'Poppins-SemiBold',
              color: 'black',
              fontSize: 12,
            }}>
            {props.data == null || props.data == '0000-00-00'
              ? 'DD-MM-YYYY'
              : moment(props.data).format('DD-MM-YYYY')}
          </Text>
        ) : (
          <Text
            style={{
              marginTop: 5,
              fontWeight: '600',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 12,
              color: dates == '' ? 'grey' : 'black',
            }}>
            {dates == '' ? 'DD-MM-YYYY' : date.format('DD-MM-YYYY')}
          </Text>
        )}

        {Platform.OS !== 'ios' && show && renderDatePicker()}
        {Platform.OS === 'ios' && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={show}
            supportedOrientations={['portrait']}
            onRequestClose={() => setShow(false)}>
            <View style={{flex: 1}}>
              <TouchableHighlight
                style={{flex: 1, alignItems: 'flex-end', flexDirection: 'row'}}
                activeOpacity={0.5}
                visible={show}
                onPress={() => setShow(false)}>
                <TouchableHighlight
                  underlayColor={'#FFFFFF'}
                  style={{flex: 1, borderTopColor: 'grey', borderTopWidth: 1}}
                  onPress={() => {
                    console.log('datepicker clicked');
                  }}>
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      //   height: 356,
                      overflow: 'hidden',
                    }}>
                    <View style={{marginTop: 40}}>{renderDatePicker()}</View>
                    <TouchableHighlight
                      activeOpacity={0.5}
                      underlayColor={'transparent'}
                      onPress={onPressCancel}
                      style={[styles.btnText, styles.btnCancel]}>
                      <Text>Cancel</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      activeOpacity={0.5}
                      underlayColor={'transparent'}
                      onPress={onPressDone}
                      style={[styles.btnText, styles.btnDone]}>
                      <Text>Done</Text>
                    </TouchableHighlight>
                  </View>
                </TouchableHighlight>
              </TouchableHighlight>
            </View>
          </Modal>
        )}
      </View>
    </TouchableHighlight>
  );
};

CustomDatepicker.defaultProps = {
  textStyle: {},
  defaultDate: {},
  onDateChange: () => {},
};

const styles = StyleSheet.create({
  btnText: {
    position: 'absolute',
    top: 0,
    height: 42,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCancel: {
    left: 0,
  },
  btnDone: {
    right: 0,
  },
});
export default CustomDatepicker;
