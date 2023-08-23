import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DefaultTheme, HelperText, TextInput } from 'react-native-paper';
import colors from '../../assets/theme/colors';
import { DONE, FORGOT_PASS_MSG, Verify, OTPMESSAGE } from '../../constants/strings';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import Toolbar from '../common/Toolbar';
import styles from './styles';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import moment from 'moment';
import { GlobalContext } from '../../context/Provider';

const CELL_COUNT = 4;
const OtpVerifyComponent = ({ errors, form, onChange, onSubmit, number, ResendOtp }) => {
  const { navigate } = useNavigation();
  const [value, setValue] = useState('');
  const { systemConfigState } = useContext(GlobalContext);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  let timer = () => { };

  const [timeLeft, setTimeLeft] = useState(systemConfigState.data.setting_info_time_for_resend_OTP);


  const textInputTheme = {
    ...DefaultTheme,
    colors: {
      text: colors.black,
      primary: colors.primary,
      placeholder: colors.grey,
      background: colors.transparent,
    },
  };


  const startTimer = () => {
    timer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timer);
        
        return false;
      }
      setTimeLeft(timeLeft - 1);
    }, 1000)
  }



  useEffect(() => {
  
      startTimer();
      return () => clearInterval(timer);
  }, [timer]);

  const start = () => {
    ResendOtp();
    setTimeLeft(systemConfigState.data.setting_info_time_for_resend_OTP);

    clearInterval(timer);
    startTimer();
  }



  return (
    <Container>
      <ScrollView>
        <Toolbar title="OTP  Verification" />
        <View style={styles.container}>
          <Text style={styles.msg}>{OTPMESSAGE} {number}</Text>

          <CodeField
            ref={ref}
            {...props}
            value={form.otp}
            onChangeText={value => {
              onChange({ name: 'otp', value });

            }}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                onLayout={(() => getCellOnLayoutHandler(index))}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}>
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
          <View style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
            {errors.otp && (
              <HelperText
                type="error"
                style={styles.inputFiledError}
                visible={errors.otp}>
                {errors.otp}
              </HelperText>
            )}
          </View>
          {
            timeLeft == 0 ? <View style={{ marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                activeOpacity={0.9}
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10, }}
                onPress={() => start()}
              >
                <Text style={[{ color: colors.primary, fontSize: 16, marginBottom: 0, }]}> Resend OTP</Text>
              </TouchableOpacity>
            </View> :
              <View style={{ marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: colors.primary }}>Resend OTP in {moment.utc(timeLeft * 1000).format('mm:ss')}</Text>
              </View>
          }





          <CustomButton
            style={styles.btnDone}
            onPress={onSubmit}
            title={Verify}
            primary
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default OtpVerifyComponent;
