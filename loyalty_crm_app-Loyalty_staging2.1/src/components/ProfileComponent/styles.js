import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';

export default StyleSheet.create({
  topWrapper: {
    flex: 1,
  },
  proflieWrapper: {
    backgroundColor: colors.cream,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  profileName: {
    color: colors.primary,
    fontSize: 15,
    marginTop: 10,
    // textTransform: 'capitalize',
    // fontWeight: '600',
    fontFamily: 'Poppins-Bold',
  },
  detailWrapper: {
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 16,
  },
  lable: {
    marginTop: 8,
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
    paddingVertical: 4,
    // fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  changePassword: {
    fontSize: 12,
    borderBottomWidth: 0.5,

    // borderWidth:1,
    borderColor: colors.grey,
    paddingStart: 0,
    color: colors.primary,
    paddingVertical: 15,
    fontFamily: 'Poppins-Bold',
  },
  changePassword1: {
    fontSize: 12,
    borderBottomWidth: 0.5,

    // borderWidth:1,
    borderColor: colors.grey,
    paddingStart: 0,
    color: 'red',
    paddingVertical: 15,
    fontWeight: 'bold',
  },
  logout: {
    fontSize: 12,
    paddingStart: 0,
    color: colors.primary,
    paddingVertical: 10,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
  bsTitle: {
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    width: '80%',
    // borderWidth:1,
    // fontWeight: '500',
    fontFamily: 'Poppins-SemiBold',
  },
  bsTitlerfrel: {
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    width: '80%',
    height: 30,
    // borderWidth:1,
    // fontWeight: '500',
    fontFamily: 'Poppins-SemiBold',
  },
  bsTitle1: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 10,
    color: colors.drakGrey,
    // width:'80%',
    // height:60,
    // borderWidth:1,
    // textAlign:'center',
    // width:'80%',
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  bsSubTitle: {
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 4,
    color: 'red',
    // height:30,
    // borderWidth:1,
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  bsCard: {
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.primary,
    marginTop: 8,
    overflow: 'hidden',
    paddingTop: 20,
    alignItems: 'center',
    marginHorizontal: 16,
    flex: 1,
  },
  bsCardPoints: {
    fontSize: 17,
    color: colors.primary,
    // fontWeight: '600',
    marginTop: 16,
    backgroundColor: colors.cream,
    textAlign: 'center',
    width: '100%',
    height: 30,
    fontFamily: 'Poppins-SemiBold',
    textAlignVertical: 'center',
  },
  bsRemainingPointLbl: {
    fontSize: 10,
    // fontWeight: '500',
    color: colors.black,
    marginTop: 20,
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  bsRemainingPoint: {
    fontSize: 20,
    // fontWeight: '600',
    color: colors.primary,
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  bsBtnWrapper: {
    flexDirection: 'row',
    // flex: 2,
    alignItems: 'flex-end',
    marginHorizontal: 8,
    // marginTop: 16,
    marginBottom: 10,
  },
  bsBtn: {
    flex: 1,
    marginEnd: 6,
    height: 48,
    fontSize: 16,
    // fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
});
