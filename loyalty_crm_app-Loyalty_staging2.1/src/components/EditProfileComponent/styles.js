import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';

export default StyleSheet.create({
  wrapper: {
    paddingHorizontal: 14,
    flex: 1,
  },
  proflieWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  camera: {
    padding: 10,
    borderColor: colors.white,
    borderWidth: 1,
    position: 'absolute',
    backgroundColor: colors.primary,
    borderRadius: 50,
    top: -10,
    end: -10,
  },
  lable: {
    marginTop: 12,
    color: colors.grey,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
  },
  value: {
    color: colors.black,
    fontSize: 12,
    borderBottomWidth: 0.5,
    borderColor: colors.grey,
    paddingStart: 0,
    paddingTop: 0,
    paddingBottom: 6,
    // borderWidth:1,
    // fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  inputFiledError: {
    paddingHorizontal: 1,
  },

  btnWrapper: {
    flexDirection: 'row',
    flex: 2,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginHorizontal: 8,
    marginTop: 16,
    marginBottom: 10,
  },
  btn: {
    flex: 1,
    height: 46,
    // fontWeight: '600',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },

  bsTitle: {
    paddingHorizontal: 6,
    marginBottom: 16,
    fontSize: 19,
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
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
  bsIconTitle: {
    marginTop: 10,
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  bsIconDivider: {height: '100%', width: 0.8, backgroundColor: colors.grey20},
});
