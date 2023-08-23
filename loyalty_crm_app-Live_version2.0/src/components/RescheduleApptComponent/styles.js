import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';

export default StyleSheet.create({
  wrapper: {
    paddingHorizontal: 14,
    flex: 1,
    marginTop: 16,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize',
  },
  calendar: {
  //  backgroundColor:'red',
   padding:10
  
   
  },
  card: {
    backgroundColor: colors.cream,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 16,
  },
  slotWrapper: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  slotBtn: {
    width: '46%',
    borderWidth: 1,
    marginHorizontal: 4,
    marginVertical: 4,
    borderColor: colors.primary,
  },
  slot: {
    textAlign: 'center',
    color: colors.grey,
    fontSize: 12,
    backgroundColor: colors.white,
    paddingVertical: 6,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  slotS: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  remarks: {
    fontSize: 11,
    marginTop: 6,
    fontWeight: '500',
    borderWidth: 0.5,
    borderColor: '#A6A6A6',
    paddingVertical: 9,
    paddingHorizontal: 6,
    fontFamily: 'Poppins-Regular',
  },
   btnSubmit: {
    // position: 'absolute',
    // bottom: 10,
    // start: 10,
    // end: 10,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },

  btn: {
    flex: 1,
    marginEnd: 6,
    height: 48,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },

  bsTitle: {
    fontSize: 19,
    alignSelf: 'center',
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  bsSubTitle: {
    fontSize: 12,
    alignSelf: 'center',
    marginTop: 4,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    color: colors.grey,
  },
  bsCard: {
    backgroundColor: colors.cream,
    paddingTop: 24,
    paddingBottom: 38,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 32,
    marginHorizontal: 8,
  },
  bsCardTitle: {fontSize: 19, fontWeight: '600', fontFamily: 'Poppins-Regular'},
  bsDateTimeWrapper: {flexDirection: 'row', alignItems: 'center', marginTop: 6},
  bsBtnWrapper: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'flex-end',
    marginHorizontal: 8,
    marginTop: 16,
    marginBottom: 10,
  },
});
