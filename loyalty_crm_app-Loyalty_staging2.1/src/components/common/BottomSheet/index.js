import {default as React, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useBackBtn} from '../../../utils/UseBackBtn';
import styles from './styles';

const BottomSheet = ({
  body,
  visible,
  setVisibility,
  canceledOnTouchOutside = true,
  containerStyle,
  sheetStyle,
  borderhide,
}) => {
  const expanded = true;
  const slideAnim = useRef(new Animated.Value(expanded ? 1 : 0)).current;
  // const slideAnim = useRef(new Animated.Value(0)).current;

  const [internalVisibility, setInternalVisibility] = useState(false);
  const [height, setHeight] = useState(0);

  useBackBtn(() => {
    if (visible) {
      setVisibility(false);
      return true;
    } else {
      return false;
    }
  });

  const slideInAnim = () => {
    !internalVisibility && setInternalVisibility(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const slideOutAnim = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      internalVisibility && setInternalVisibility(false);
    });
  };

  visible ? slideInAnim() : slideOutAnim();

  return (
    <>
      {body == false ? (
        <View></View>
      ) : internalVisibility ? (
        <TouchableWithoutFeedback
          style={containerStyle}
          onPress={() => {
            canceledOnTouchOutside && setVisibility(false);
          }}>
          <Animated.View
            style={[
              styles.backgroundWrapper,
              {
                opacity: slideAnim,
              },
            ]}
            onLayout={event => {
              var {height} = event.nativeEvent.layout;
              setHeight(height);
            }}>
            <Animated.View
              style={[
                styles.wrapper,
                {
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height, 0],
                      }),
                    },
                  ],

                  borderTopStartRadius: borderhide ? 0 : 12,
                  borderTopEndRadius: borderhide ? 0 : 12,
                },
              ]}>
              {body}
            </Animated.View>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : null}
    </>
  );
};

export default BottomSheet;
