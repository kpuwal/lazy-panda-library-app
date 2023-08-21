import React, { useEffect, useState } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions } from 'react-native';

const ZigZagAnimation = () => {
  const [position] = useState(new Animated.Value(0));
  const zigzagHeight = Dimensions.get('window').height; // Adjust as needed
  const zigzagWidth = Dimensions.get('window').width;

  useEffect(() => {
    Animated.loop(
      Animated.timing(position, {
        toValue: 1,
        duration: 4000, // Total duration for each zig-zag cycle
        useNativeDriver: false,
      }),
      { iterations: -1 }
    ).start();
  }, []);

  const zigzagY = position.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -0.1 * zigzagHeight, 0, -0.1 * zigzagHeight, 0],
  });

  const zigzagX = position.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, 0.1 * zigzagWidth, 0, -0.1 * zigzagWidth, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.zigzag,
          {
            transform: [
              { translateY: zigzagY },
              { translateX: zigzagX },
              { rotate: '10deg' }, // Adjust the rotation angle as needed
            ],
          },
        ]}
      >
        Z
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zigzag: {
    fontSize: 30,
  },
});

export default ZigZagAnimation;
