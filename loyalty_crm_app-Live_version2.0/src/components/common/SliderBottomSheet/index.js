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

const SliderBottomSheet = ({
  body,
  visible,
  setVisibility,
  canceledOnTouchOutside = true,
  containerStyle,
  sheetStyle,
  borderhide,
}) => {
  console.log(borderhide);
  // const slideAnim = useRef(new Animated.Value(0)).current;
  const expanded = true;
  const slideAnim = useRef(new Animated.Value(expanded ? 1 : 0)).current;
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

  // visible ? slideInAnim() : slideOutAnim();

  return (
    <>
      {visible ? (
        <View style={[styles.backgroundWrapper]}>{body}</View>
      ) : (
        <View></View>
      )}
    </>
  );
};

export default SliderBottomSheet;
