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
});
