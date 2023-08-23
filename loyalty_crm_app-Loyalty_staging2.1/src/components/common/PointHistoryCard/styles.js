import {StyleSheet} from 'react-native';
import colors from '../../../assets/theme/colors';

export default StyleSheet.create({
  card: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width:'95%',
    borderRadius: 20,
    flexDirection: 'row',
    // borderWidth:1,
    elevation: 0.5,
    marginBottom: 14,
    // borderWidth:1
  },

  cardDetails: {
    marginStart: 16,
    marginVertical: 4,
    flex: 1,
  
  },
  pacakgeName: {
    fontSize: 16,
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
  dateTimeWrapper: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
  dateTime: {
    fontSize: 12,
    marginStart: 4,
    marginEnd:4,
    color: colors.black,
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
});
