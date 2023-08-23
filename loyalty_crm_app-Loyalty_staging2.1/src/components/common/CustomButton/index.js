import * as React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import colors from '../../../assets/theme/colors';
import styles from './styles';

const CustomButton = ({
  title,
  titleStyle,
  disabled,
  onPress,
  borderWidth,
  borderColor,
  primary,
  primaryLight,
  grey,
  startIcon,
  style,
}) => {
  const getBorder = () => {
    if (borderWidth) {
      return borderWidth;
    } else {
      return 1;
    }
  };

  const getBorderColor = () => {
    if (borderColor) {
      return borderColor;
    } else {
      if (primary) {
        return colors.white;
      }
      if (primaryLight) {
        return colors.primaryLight;
      }
      if (grey) {
        return colors.grey;
      }
      return colors.primary;
    }
  };

  const getBgColor = () => {
    if (disabled) {
      return colors.grey;
    }
    if (primary) {
      return colors.primary;
    }
    if (primaryLight) {
      return colors.primaryLight;
    }
    if (grey) {
      return colors.grey;
    }
    return colors.white;
  };

  const getTextColor = () => {
    if (disabled) {
      return colors.black;
    }
    if (primary) {
      return colors.white;
    }
    if (primaryLight) {
      return colors.white;
    }
    if (grey) {
      return colors.white;
    }
    return colors.primary;
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.wrapper,
        {
          borderColor: getBorderColor(),
          borderWidth: getBorder(),
          backgroundColor: getBgColor(),
        },
        style,
      ]}>
      {startIcon && startIcon}
      {title && (
        <Text
          style={[titleStyle, {marginHorizontal: 6, color: getTextColor(),fontWeight:'bold'}]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
