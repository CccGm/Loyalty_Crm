import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {DefaultTheme, HelperText, TextInput} from 'react-native-paper';
import colors from '../../assets/theme/colors';
import {CHANGE_PASSWORD, SET_NEW_PASSWORD} from '../../constants/routeName';
import {CHANGE_PASS_MSG, DONE} from '../../constants/strings';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import Toolbar from '../common/Toolbar';
import styles from './styles';

const ResetPasswordComponent = ({errors, form, onChange, onSubmit}) => {
  const {navigate} = useNavigation();
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntry1, setIsSecureEntry1] = useState(true);
  const inputFiledRef = useRef(new Array());

  const textInputTheme = {
    ...DefaultTheme,
    colors: {
      text: colors.black,
      primary: colors.primary,
      placeholder: colors.grey,
      background: colors.transparent,
    },
  };

  return (
    <Container>
      <ScrollView>
        <Toolbar title={SET_NEW_PASSWORD} />
        <View style={styles.container}>
          <Text style={styles.msg}>{CHANGE_PASS_MSG}</Text>
          

          <TextInput
            label="Password"
            theme={textInputTheme}
            underlineColor={colors.grey}
            style={styles.inputFiled}
            dense={true}
            value={form.new_password || null}
            secureTextEntry={isSecureEntry}
            onChangeText={value => {
              onChange({name: 'new_password', value});
            }}
            returnKeyType="next"
            ref={element => (inputFiledRef.current['new_password'] = element)}
            onSubmitEditing={() => {
              inputFiledRef?.current['confirm_password']?.focus();
            }}
            right={
              <TextInput.Icon icon={isSecureEntry ? "eye-off" : "eye"} onPress={() => { isSecureEntry ? setIsSecureEntry(false) : setIsSecureEntry(true) }} />
            }
          />
          {errors.new_password && (
            <HelperText type="error" style={styles.inputFiledError}>
              {errors.new_password}
            </HelperText>
          )}

          <TextInput
            label="Confirm Password"
            theme={textInputTheme}
            underlineColor={colors.grey}
            style={styles.inputFiled}
            dense={true}
            
            value={form.confirm_password || null}
            secureTextEntry={isSecureEntry1}
            right={
              <TextInput.Icon icon={isSecureEntry1 ? "eye-off" : "eye"} onPress={() => { isSecureEntry1 ? setIsSecureEntry1(false) : setIsSecureEntry1(true) }} />
            }
            onChangeText={value => {
              onChange({name: 'confirm_password', value});
            }}
            ref={element =>
              (inputFiledRef.current['confirm_password'] = element)
            }
            onSubmitEditing={() => {
              onSubmit();
            }}
          />
          {errors.confirm_password && (
            <HelperText type="error" style={styles.inputFiledError}>
              {errors.confirm_password}
            </HelperText>
          )}

          <CustomButton
            style={styles.btnDone}
            onPress={onSubmit}
            title={DONE}
            primary
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default ResetPasswordComponent;
