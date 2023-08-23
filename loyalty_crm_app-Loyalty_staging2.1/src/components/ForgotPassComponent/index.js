import {useNavigation} from '@react-navigation/native';
import React, { useState } from 'react';
import {ScrollView, Text, View} from 'react-native';
import {DefaultTheme, HelperText, TextInput} from 'react-native-paper';
import colors from '../../assets/theme/colors';
import {DONE, FORGOT_PASS_MSG,SENDOTP} from '../../constants/strings';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import Toolbar from '../common/Toolbar';
import styles from './styles';
import ContryPicker, { DARK_THEME } from 'react-native-country-picker-modal';
const ForgotPassComponent = ({errors, form, onChange, onSubmit,onChangeCallingcode}) => {
  const {navigate} = useNavigation();
  const [countryCode, setCountryCode] = useState("SG");
  const [callingCodes, setcallingCode ]= useState("65");

  const textInputTheme = {
    ...DefaultTheme,
    colors: {
      text: colors.black,
      primary: colors.primary,
      placeholder: colors.grey,
      background: colors.transparent,
    },
  };


  const dynamicwidth= () =>{
    if(callingCodes ==undefined){
      return '89%'
    }else if(callingCodes.length ==2){
      return '78%'
    }else if(callingCodes.length ==3){
      return '75%'
    }else if(callingCodes.length ==4){
      return '73%'
    }
  }

  return (
    <Container>
      <ScrollView>
        <Toolbar title="Set New Password" />
        <View style={styles.container}>
          <Text style={styles.msg}>{FORGOT_PASS_MSG}</Text>
          <View style={{ flexDirection: 'row', width: '100%', height: 45, marginTop: 10, alignItems: 'center', height: 50 }}>
          <View style={{flexDirection:'row'}}>
                  <ContryPicker
                    withFilter
                    countryCode={countryCode}
                    countryCodes
                    withAlphaFilter={false}
                    withCurrencyButton={false}
                    withCallingCode={true}
                    onSelect={(value) => {
                      const { cca2, callingCode } = value
                      const abc = value.cca2
                      onChangeCallingcode(value.callingCode[0])
                      // console.log("abc",abc)
                      // console.log("cca2",cca2)
                      // onChange({ name:'countryCode',value});
                      // onChange({ name: 'callingCode', abc});
                      setCountryCode(value.cca2)
                      setcallingCode(value.callingCode[0])
                    }}
                    containerButtonStyle={{
                      // borderWidth:1,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottomWidth:1.8,
                      borderColor: textInputTheme ? colors.primary : colors.grey,
                      // marginBottom:5
                      // borderWidth:1,
                      // width:30

                      // width:35,
                      // alignItems:'center',
                      // justifyContent:'center',
                      // borderWidth:1,
                      // width:40,
                      // height:'110%',
                      // alignItems:'center',
                      // marginLeft:10
                    }}
                  >

                  </ContryPicker>
                  {/* <View style={{height:47.5,width:40,borderBottomWidth: 2,borderColor: textInputTheme ? colors.primary : colors.grey,}}>
                  <Text style={{ fontFamily: 'Poppins-Bold',fontSize:13,marginTop:13}}>+{callingCodes}</Text>
                  </View> */}
                 
                </View>
          <View style={{ width:dynamicwidth() }}>
          <TextInput
            placeholder="Phone Number"
            theme={textInputTheme}
            underlineColor={colors.grey}
            keyboardType="numeric"
            style={styles.inputFiled}
            dense={true}
            value={form.phone_number || null}
            onChangeText={value => {
              onChange({name: 'phone_number', value});
            }}
            onSubmitEditing={() => {
              onSubmit();
            }}
          />
          </View>
          </View>
          {errors.phone_number && (
            <HelperText
              type="error"
              style={styles.inputFiledError}
              visible={errors.phone_number}>
              {errors.phone_number}
            </HelperText>
          )}

          <CustomButton
            style={styles.btnDone}
            onPress={onSubmit}
            title={SENDOTP}
            primary
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default ForgotPassComponent;
