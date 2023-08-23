import {StyleSheet} from 'react-native';
import colors from '../../../assets/theme/colors';

export default StyleSheet.create({
  card: {
    
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderColor: colors.grey,
    borderWidth: 1,
    borderLeftWidth:0,
    borderRadius: 8,
    margin: 6,
    elevation: 2,
   
  },

  

  cardDetails: {
    marginStart: 14,
    // marginVertical: 4,
    flex: 1,
    // borderWidth:1
  },
  pacakgeName: {
    fontSize: 15,
    // borderWidth:1,
    backgroundColor: '#fff5f5',
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  serviceIncluded: {
    color: colors.grey,
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  dateTimeWrapper: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  dateTime: {
    fontSize: 12,
    marginStart: 4,
    marginEnd:4,
    color: colors.black,
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  appoinmentCardF: {
    width: 8,
    height: '100%',
    backgroundColor: colors.primary,
    borderTopStartRadius: 8,
    borderBottomStartRadius: 8,
  },
  appointmentCardServices: {
    color: colors.black,
    fontSize: 15,
    marginTop:5,
    // borderWidth:1,
    // padding:5,
    // marginLeft:5,
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  appointmentCardTitle: {
    color: colors.primary,
    fontSize: 15,
    backgroundColor: '#fff5f5',
    marginTop:5,

    // borderWidth:1,
    // height:23,
  
    // marginLeft:5,
    // fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
});
