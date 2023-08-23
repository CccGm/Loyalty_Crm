import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';

export default StyleSheet.create({
  loginBgImage: {
    alignSelf: 'center',
    marginTop: 32,
  },
  msg: {
    fontSize: 12,
    color: 'black',
    marginTop: 10,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  inputFiled: {
    paddingHorizontal: 1,
    marginTop: 20,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
  inputFiledError: {
    paddingHorizontal: 1,
    color: colors.primary,
  },
  btnDone: {
    marginTop: 72,
    marginBottom: 20,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
});
