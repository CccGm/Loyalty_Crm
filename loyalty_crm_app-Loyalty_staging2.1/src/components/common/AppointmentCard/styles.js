import {StyleSheet} from 'react-native';
import colors from '../../../assets/theme/colors';

export default StyleSheet.create({
  card: {
    backgroundColor: colors.cream,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    elevation: 0.5,
    marginBottom: 14,
  },

  cardDetails: {
    marginStart: 16,
    marginVertical: 4,
    flex: 1,
  },
  pacakgeName: {
    fontSize: 14,
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    textAlign: 'auto',
    // borderWidth:1
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
    fontSize: 10,
    marginStart: 4,
    width: 200,
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
});
