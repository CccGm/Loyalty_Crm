import {default as React} from 'react';
import {ActivityIndicator, Alert, BackHandler, View} from 'react-native';
import colors from '../../../assets/theme/colors';
import {CANCEL, OK} from '../../../constants/strings';
import {useBackBtn} from '../../../utils/UseBackBtn';
import styles from './styles';

const Loader = ({isVisible, nullBackground, addZindex}) => {
  useBackBtn(handelBackButton);
  return (
    <>
      {isVisible <= 0 ? null : (
        <View
          style={[
            styles.wrapper,
            {
              backgroundColor: nullBackground ? null : 'rgba(0, 0, 0, 0.7)',
              zIndex: addZindex ? 2 : null,
            },
          ]}>
          <ActivityIndicator size={30} color={colors.primary} />
        </View>
      )}
    </>
  );
};

export default Loader;

const handelBackButton = () => {
  Alert.alert(
    'Exit App',
    'Exiting the application?',
    [
      {
        text: CANCEL,
        style: 'cancel',
      },
      {
        text: OK,
        onPress: () => BackHandler.exitApp(),
      },
    ],
    {
      cancelable: false,
    },
  );
  return true;
};
