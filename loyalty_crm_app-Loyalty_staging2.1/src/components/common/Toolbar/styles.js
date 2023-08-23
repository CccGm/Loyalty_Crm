import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wrapper: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  backBtn: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    position: 'absolute',
    start: 0,
    end: 0,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  rightOptions: {
    marginStart: 'auto',
    marginEnd: 10,
    flexDirection: 'row',
  },
});
