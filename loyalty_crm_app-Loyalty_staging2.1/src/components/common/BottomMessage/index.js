import {default as React, useContext, useRef} from 'react';
import {Animated, Text} from 'react-native';
import colors from '../../../assets/theme/colors';
import {
  MESSAGE_FAUILER,
  MESSAGE_INFO,
  MESSAGE_SUCCESS,
  MESSAGE_WARNING,
} from '../../../constants/actionTypes';
import {clearMessage} from '../../../context/actions/common';
import {GlobalContext} from '../../../context/Provider';
import styles from './styles';

const BottomMessage = ({message, type, long}) => {
  const {bottomMessageDispatch} = useContext(GlobalContext);
  const getBgColor = () => {
    switch (type) {
      case MESSAGE_SUCCESS:
        return colors.success;
      case MESSAGE_WARNING:
        return colors.warning;
      case MESSAGE_FAUILER:
        return colors.danger;
      case MESSAGE_INFO:
        return colors.info;
    }
  };
  const expanded = true;
  const slideAnim = useRef(new Animated.Value(expanded ? 1 : 0)).current;
  // const slideAnim = useRef(new Animated.Value(0)).current;

  const slideInAnim = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(
        function () {
          slideOutAnim();
        },
        long ? 4500 : 2000,
      );
    });
  };

  const slideOutAnim = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      clearMessage(bottomMessageDispatch, message);
    });
  };

  message && slideInAnim();

  return (
    <>
      {message == null ? null : (
        <Animated.View
          style={[
            styles.wrapper,
            {
              backgroundColor: getBgColor(),
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}>
          <Text style={styles.message}>{message}</Text>
        </Animated.View>
      )}
    </>
  );
};

export default BottomMessage;
