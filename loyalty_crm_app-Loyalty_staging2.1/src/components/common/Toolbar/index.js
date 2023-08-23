import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../assets/theme/colors';
import styles from './styles';

const Toolbar = ({title, hideBackBtn, primary, rightOptionMenu}) => {
  const navigation = useNavigation();
  const route = useRoute();


  const getBackArrow = () => {
    return primary
      ? require('../../../assets/images/ic_arrow.png')
      : require('../../../assets/images/ic_arrow_primary.png');
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: primary ? colors.primary : colors.white,
        },
      ]}>
      {title && (
        <Text
          style={[
            styles.title,
            {color: primary ? colors.white : colors.black},
          ]}>
          {title}
        </Text>
      )}
      {
        !hideBackBtn && (
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(StackActions.pop(1));
            }}
            style={styles.backBtn}>
            <Image source={getBackArrow()} />
          </TouchableOpacity>
        )
      }
    
      {rightOptionMenu && (
        <View style={styles.rightOptions}>{rightOptionMenu}</View>
      )}
    </View>
  );
};

export default Toolbar;
