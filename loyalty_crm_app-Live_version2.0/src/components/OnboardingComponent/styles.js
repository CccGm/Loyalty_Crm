import { StyleSheet } from 'react-native';
import colors from '../../assets/theme/colors';

export default StyleSheet.create({
  wrapper: {
    alignItems: 'flex-end',
    paddingHorizontal: 15,
  },

  bottomSection: {
    alignItems: 'center', paddingVertical: 20
  },
  nextButton: {
    // marginTop: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: 40,
    // height: 40,
    // borderRadius: 30,
    // borderWidth: 1,
    // borderColor: '#b548a1'
  },
  getStartBtn:{
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 30,
    backgroundColor: 'white',                 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
    borderWidth:1,
    borderColor:'#b548a1'
  },
  getStartText:{
    color: '#b548a1',
    fontWeight:'bold',
    fontSize: 18,
  },
});
