import {StyleSheet} from 'react-native';
import colors from '../../../assets/theme/colors';

export default StyleSheet.create({
  wrapper: {
    paddingHorizontal: 5,
    paddingVertical: 13,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    start: 0,
    end: 0,
  },
  message: {
    flex: 1,
    flexWrap: 'wrap',
    color: colors.white,
  },
});
