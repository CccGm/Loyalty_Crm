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
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  inputFiled: {
    paddingHorizontal: 1,
    marginTop: 20,
    // fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
  inputFiledError: {
    paddingHorizontal: 1,
    color: colors.primary,
  },
  btnDone: {
    marginTop: 72,
    marginBottom: 20,
  },
  root: {padding: 20, minHeight: 300},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },
});
