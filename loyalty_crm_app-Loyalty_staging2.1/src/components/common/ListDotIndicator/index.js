import React from 'react';
import {Animated, Dimensions, View} from 'react-native';
import styles from './styles';

const ListDotIndicator = ({style, dotStyle, data, scrollX}) => {
  const {width} = Dimensions.get('window');
  const position = Animated.divide(scrollX, width);
  return (
    <View style={[styles.listDotWrapper, style]}>
      {data.map((_, i) => {
        let opacity = position.interpolate({
          inputRange: [i - 1, i, i + 1],
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={i}
            style={[
              styles.listDot,
              dotStyle,
              {
                opacity,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default ListDotIndicator;
