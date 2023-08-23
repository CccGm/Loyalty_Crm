import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';



export default StyleSheet.create({
  headerWrapper: {
    justifyContent: 'center',
    // borderWidth:2,
    // borderColor:'green'
  },
  headerTextWrapper: {
    position: 'absolute',
    alignSelf: 'center',
    // borderWidth:2,
    // borderColor:'yellow'
  },
  headerSmallText: {
    fontSize: 13,
    color: colors.white,
    paddingHorizontal: 12,
    // fontWeight: '500',
    marginBottom:10,
    fontFamily: 'Poppins-Regular',
    // borderWidth:2,
    // borderColor:'black'
  },
  headerPoints: {
    backgroundColor:'white',
   
    // color: colors.primary,

    fontSize: 25,
    // borderRadius: ,
    paddingVertical: 4,
    // marginTop: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    // borderWidth:2,
    // borderColor:'grey'
  },
  headerPoints1: {
    backgroundColor: colors.white,
    color: colors.primary,
    fontSize: 25,
    borderRadius: 4,
    paddingVertical: 6,
    marginTop: 4,
    marginStart:10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    // borderWidth:2,
    // borderColor:'grey'
  },
  vCardWrapervoucher: {
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 1.4,
    // borderColor: 'orange',
    borderColor: '#e1c3de',
    overflow: 'hidden',
    flex: 0.5,
    
    flexDirection: 'column',
    margin: 5,
    paddingVertical: 10,
    // height:150,
    alignItems: 'center',
    position:'relative',
    // justifyContent:'center'
   
  },
  vCardWraper: {
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 1.4,
    // borderColor: 'orange',
    borderColor: '#e1c3de',
    overflow: 'hidden',
    flex: 0.5,
    flexDirection: 'column',
    margin: 3,
    height:130,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent:'center'
   
  },
  vCardWrapperD: {
    backgroundColor: '#F5F5F5',
    borderWidth: 0,
    margin: 0,
    // borderWidth: 2,
    // borderColor: '#5e90ad',
  },
  vCardExpireWrapper: {
    backgroundColor: '#E2E2E2',
    position: 'absolute',
    end: 0,
    top: 0,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderTopRightRadius:10
    // borderWidth: 2,
    // borderColor: 'yellow',
  },
  vcCardEpire: {
    color: '#747474',
    fontSize: 10,
    // fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    // borderWidth: 2,
    // borderColor: 'yellow',
  },
  vCardOfferMessage: {
    fontSize: 16,
    color: colors.primary,
    textAlign:'center',
    // fontWeight: '600',
    fontFamily: 'Poppins-Bold',
    // borderWidth: 2,
    // borderColor: '#1b2d48',
  },
  vCardOfferOnMessage: {
    fontSize: 14,
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    // fontWeight:'500',
    // borderWidth: 2,
    textAlign:'center'
    // borderColor: 'pink',
  },
  vCardValidity: {
    fontSize: 11,
    color: '#9e9f9e',
    // fontWeight: '500',
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
    // textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    // position:'absolute',
    // bottom:50
    // width: '80%'
    // borderWidth: 2,
    // borderColor: '#7a0178',
  },
  vCardValidity1: {
    fontSize: 11,
    color: '#9e9f9e',
    // fontWeight: '500',
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
    // textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    // position:'absolute',
    // bottom:62
    // width: '80%'
    // borderWidth: 2,
    // borderColor: '#7a0178',
  },
});
