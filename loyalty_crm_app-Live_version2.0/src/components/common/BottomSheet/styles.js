import {StyleSheet} from 'react-native';
import colors from '../../../assets/theme/colors';

export default StyleSheet.create({
  backgroundWrapper: {
    backgroundColor: colors.transparentBlack,
    elevation: 5,
    height: '100%',
    position: 'absolute',
    bottom: 0,
    start: 0,
    end: 0,
   
  },
  wrapper: {
    backgroundColor: 'white',
    // paddingHorizontal: 5,
    // paddingVertical:8,
    paddingTop: 16,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    position: 'absolute',
    bottom: 0,
    start: 0,
    end: 0,
  },
});
