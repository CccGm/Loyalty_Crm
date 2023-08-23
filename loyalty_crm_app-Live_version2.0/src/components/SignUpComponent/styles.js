import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';

export default StyleSheet.create({
  profileImage: {
    alignSelf: 'center',
    height: 75,
    width: 75,
    borderRadius: 16,
  },
  profileImageP: {
    alignSelf: 'center',
  },
  imageBackground: {
    marginTop: 20,
  },
  imageBackgroundP: {
    backgroundColor: colors.cream,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 26,
    marginTop: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    color: colors.primary,
    justifyContent: 'center',
    letterSpacing: 1,
    // fontWeight: '600',
    fontFamily: 'Poppins-Bold',
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 10,
  },
  addImageText: {
    alignSelf: 'center',
    marginTop: 4,
    color: colors.primary,
    fontSize: 12,
  },
  inputFiled: {
    paddingHorizontal: 5,
    fontSize: 15,
    // marginTop: 9,
    // borderWidth:1,
    // fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    color:'black'
  },
  inputFiledError: {
    paddingHorizontal: 1,
    color: colors.primary,
  },
  forgotPassContainer: {
    marginVertical: 16,
    flexDirection: 'row-reverse',
  },
  forgotPass: {
    color: colors.white,
  },
  btnLogin: {
    marginTop: 24,
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
  bsTitle: {
    paddingHorizontal: 6,
    marginBottom: 16,
    fontSize: 17,
    fontWeight: 'bold',
  },
  bsSelectionWrapper: {
    flexDirection: 'row',
    paddingBottom: 10,
    flex: 2,
  },
  bsSelection: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  bsIcon: {height: 42, width: 42},
  bsIconTitle: {marginTop: 10},
  bsIconDivider: {height: '100%', width: 0.8, backgroundColor: colors.grey20},
});
