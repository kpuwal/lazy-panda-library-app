import React, { useEffect, useState } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

const ZigZagAnimation = () => {
  const [positionY] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(positionY, {
          toValue: 100,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(positionY, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]),
      { iterations: -1 }
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.zigzag, { transform: [{ translateY: positionY }] }]}>Zz</Animated.Text>
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
