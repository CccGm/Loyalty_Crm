import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';

export default StyleSheet.create({
  loginBgImage: {
    alignSelf: 'center',
    marginTop: 32,
  },
  msg: {
    fontSize: 14,
    color: colors.black,
    marginTop: 10,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  inputFiled: {
    paddingHorizontal: 10,
    fontSize: 15,
  },
  inputFiledError: {
    paddingHorizontal: 1,
    color: colors.primary,
  },
  btnDone: {
    marginTop: 72,
    marginBottom: 20,
  },
});
