import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';

export default StyleSheet.create({
  wrapper: {
    paddingHorizontal: 18,
  },
  card: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 4,
    marginHorizontal: 16,
    position: 'relative',
    top: -40,
    marginBottom: -35,
  },
  cardTitle: {
    fontSize: 14,
    color: '#FFFFFFCC',
  },
  cardDetail: {flexDirection: 'row', justifyContent: 'space-between'},
  cardDetailDivider: {width: 0.5, backgroundColor: colors.white},

  title: {
    fontSize: 16,
    marginTop: 10,
  },

  description: {
    fontSize: 12,
    color: colors.grey,
    marginTop: 4,
    textAlign: 'justify',
  },
  inputFiled: {
    fontSize: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grey,
    paddingTop: 0,
    paddingBottom: 4,
    paddingStart: 0,
    color: colors.primary,
    fontWeight: 'bold',
  },
  bsTitle: {
    paddingHorizontal: 6,
    marginBottom: 16,
    fontSize: 17,
    fontWeight: 'bold',
    borderWidth: 1,
  },
  bsSelectionWrapper: {
    flexDirection: 'row',
    paddingBottom: 10,
    marginTop: 10,
    // flex: 2,
    // borderWidth: 1,
  },
  bsSelection: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    // borderWidth: 1,
  },
  bsIcon: {height: 42, width: 42},
  bsIconTitle: {marginTop: 10, color: 'black'},
  bsIconDivider: {height: '100%', width: 0.8, backgroundColor: colors.grey20},
});
