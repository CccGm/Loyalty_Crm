import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';

export default StyleSheet.create({
  wrapper: {flexGrow: 1},
  proflieWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 10,
  },
  userName: {
    fontSize: 20,
    color: colors.primary,
    // fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
  userNameBold: {
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoText: {
    color: colors.grey,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  searchIcon: {padding: 6},
  offerCard: {
    marginHorizontal: 7,
    marginVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  offerImage: {
    aspectRatio: 450 / 203,
    width: '100%',
    height: undefined,
  },
  offerDetailContainer: {
    position: 'absolute',
    top: 0,
    start: 0,
    marginStart: 16,
    marginTop: 34,
  },
  offerDetailContainerBottom: {
    position: 'absolute',
    bottom: 0,
    end: 0,
    marginEnd: 16,
    marginBottom: 34,
  },
  offerDiscountText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 22,
  },
  offerDiscountOnText: {
    color: colors.white,
    fontSize: 17,
  },
  appointmentTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginHorizontal: 16,
  },
  appointmentTitle: {
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.4,
    fontSize: 16,
    marginTop:10,
    marginBottom:10
  },

  appoinmentCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 0.5,
    borderRadius: 8,
    margin: 6,
    elevation: 2,
  },
  appoinmentCardF: {
    width: 8,
    height: '100%',
    backgroundColor: colors.primary,
    borderTopStartRadius: 8,
    borderBottomStartRadius: 8,
  },
  appointmentCardTitle: {
    color: colors.black,
    fontSize: 16,
    // fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  appointmentCardServices: {
    color: colors.grey,
    fontSize: 12,
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  appointmentCardDateTimeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width:'100%',
    
  },
  appointmentCardDateTime: {
    color: colors.black,
    fontSize: 11,
    marginStart: 4,
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  appointmentCardResheduleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cream,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 6,
    borderRadius: 6,
  },
  appointmentCardReshedule: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    marginStart: 4,
  },
  loyaltyPoinntBGImage: {
    paddingVertical: 24,
    flex: 1,
    justifyContent: 'center',
  },
  loyaltyPoinntTitle: {
    alignSelf: 'center',
    color: colors.black,
    fontSize: 16,
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  loyaltyPoinnt: {
    alignSelf: 'center',
    color: colors.primary,
    fontSize: 32,
    // fontWeight: '600',
    fontFamily: 'Poppins-Bold',
  },
});
