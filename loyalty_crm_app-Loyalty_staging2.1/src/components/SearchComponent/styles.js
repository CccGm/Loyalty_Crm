import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems:'center'
  },
  searchIcon: {
    position: 'absolute',
    start: 0,
    alignSelf: 'center',
    padding: 6,
  },
  inputFiled: {
    borderBottomWidth: 1,
    borderColor: colors.primary,
    paddingTop: 4,
    paddingBottom: 4,
    paddingHorizontal: 22,
    width: '100%',
    
  },
  searchCloseIcon: {
    position: 'absolute',
    alignSelf: 'center',
    end: 0,
    padding: 6,
  },
});
