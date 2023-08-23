import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';

export default StyleSheet.create({
  wrapper: {
    paddingHorizontal: 18,
    flex: 1,
  },
  offerDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.cream,
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    
    overflow: 'hidden',
    flexDirection: 'column',
    margin: 6,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
    marginHorizontal: 16,
    top: -50,
    marginBottom: -45,
  },
  vCardOfferMessage: {
    fontSize: 25,
   
    // fontWeight: '600',
    fontFamily: 'Poppins-Bold',
  },
  vCardOfferOnMessage: {
    fontSize: 14,
    // color: colors.black,
    fontFamily: 'Poppins-Regular',
  },
  vCardValidity: {
    fontSize: 10,
    marginTop: 20,
    color: colors.grey,
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  title: {
    fontSize: 13,
    marginTop: 12,
    fontFamily: 'Poppins-Regular',
  },
  points: {
    color: colors.transparentBlack,
    fontSize: 13,
    // fontWeight: '500',
    marginStart: 6,
    fontFamily: 'Poppins-SemiBold',
  },
  description: {
    fontSize: 13,
    color: colors.grey,
    marginTop: 6,
    textAlign: 'justify',
    // fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  temsAndCondition: {
    fontSize: 9,
    marginTop: 6,
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  codeCopyWrapper: {flexDirection: 'row', alignItems: 'center', marginTop: 16,justifyContent:'center'},
  code: {
    padding: 8,
    
   
  },
  codeD: {
    borderColor: colors.grey,
    // borderWidth:1, 
    color: '#747474',
    backgroundColor: '#F5F5F5',
  },
  codeText: {color: colors.primary},
  codeTextD: {color: '#747474'},
  copy: {
    backgroundColor: colors.primary,
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  copyD: {
    backgroundColor: '#E2E2E2',
  },

  bsTitle: {
    fontSize: 19,
    alignSelf: 'center',
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  bsSubTitle: {
    fontSize: 12,
    alignSelf: 'center',
    marginTop: 4,
    color: colors.grey,
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
});
