import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../../assets/theme/colors';
import FocusAwareStatusBar from '../FocusAwareStatusBar';
import styles from './styles';

const Container = ({style, children, statusBarPrimary, backgroundPrimary}) => {
  return (
    <SafeAreaView>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor={statusBarPrimary ? colors.primary : colors.white}
        barStyle={statusBarPrimary ? 'light-content' : 'dark-content'}
        showHideTransition="slide"
      />
      <View
        style={[
          styles.wrapper,
          {backgroundColor: backgroundPrimary ? colors.primary : colors.white},
          style,
        ]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Container;
