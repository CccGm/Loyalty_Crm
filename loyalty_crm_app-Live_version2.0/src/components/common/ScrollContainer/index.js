import React from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../../assets/theme/colors';
import styles from './styles';

const ScrollContainer = ({contentContainerStyle, style, children}) => {
  return (
    <SafeAreaView style={{flexGrow: 1, backgroundColor: colors.white}}>
      <ScrollView contentContainerStyle={[contentContainerStyle, {}]}>
        <View style={[styles.wrapper, style]}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScrollContainer;
