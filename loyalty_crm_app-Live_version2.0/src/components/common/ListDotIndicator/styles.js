import {StyleSheet} from 'react-native';
import colors from '../../../assets/theme/colors';

export default StyleSheet.create({
  listDotWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  listDot: {
    height: 6,
    width: 6,
    backgroundColor: colors.white,
    marginHorizontal: 2,
    borderRadius: 5,
  },
});
