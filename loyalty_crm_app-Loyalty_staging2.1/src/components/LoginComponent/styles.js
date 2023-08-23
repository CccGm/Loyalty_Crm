import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';

export default StyleSheet.create({
  loginBgImage: {
    alignSelf: 'center',
    marginVertical: 46,
  },

  title: {
    fontSize: 22,
    color: colors.primary,
    marginTop: 12,
    marginBottom: 16,
    justifyContent: 'center',
    letterSpacing: 1,
    // fontWeight: '600',
    fontFamily: 'Poppins-Bold',
  },

  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 10,
    flex: 1,
  
  },

  inputFiled: {
    paddingHorizontal: 10,
    fontSize: 15,
    // borderWidth:1,
    // marginTop:8,
    // textAlign:'left',
    // marginLeft:5,
    // borderWidth:1,
    // fontWeight: '600',
    // fontFamily: 'Poppins-Semi-Bold',
  },
  inputFiledError: {
    paddingHorizontal: 1,
    color: colors.primary,
  },
  forgotPassContainer: {
    marginTop: 8,
    marginBottom: 18,
    flexDirection: 'row-reverse',
    fontFamily: 'Poppins-Regular',
    // alignItems:'center',
    // justifyContent:'center'
  },
  forgotPassContainer1: {
    marginTop: 8,
    marginBottom: 18,
    flexDirection: 'row-reverse',
    fontFamily: 'Poppins-Regular',
    alignItems:'center',
    justifyContent:'center'
  },

  forgotPass: {
    color: colors.primary,
  },
  btnLogin: {
    marginVertical: 16,
  },
  signupTextWrapper: {
    alignSelf: 'center',
    paddingVertical: 20,
    flexDirection: 'row',
  },
  signupText: {
    color: colors.primary,
    fontFamily: 'Poppins-Regular',
  },
  signupLink: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});
