import {StyleSheet} from 'react-native';
import colors from '../../../assets/theme/colors';

export default StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
  },

  modalView: {
    backgroundColor: colors.white,
    marginHorizontal: 12,
    marginVertical: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
  },

  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  body: {
    minHeight: 80,
    paddingHorizontal: 2,
    paddingVertical: 12,
  },
});
