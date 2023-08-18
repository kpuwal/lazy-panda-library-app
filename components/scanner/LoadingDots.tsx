import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const LoadingDots = () => {
  const [dot1Scale] = useState(new Animated.Value(1));
  const [dot2Scale] = useState(new Animated.Value(1));
  const [dot3Scale] = useState(new Animated.Value(1));

  useEffect(() => {
    const animationSequence = [
      Animated.timing(dot1Scale, {
        toValue: 1.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(dot1Scale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(dot2Scale, {
        toValue: 1.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(dot2Scale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(dot3Scale, {
        toValue: 1.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(dot3Scale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ];

    Animated.loop(Animated.sequence(animationSequence)).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, { transform: [{ scale: dot1Scale }] }]} />
      <Animated.View style={[styles.dot, { transform: [{ scale: dot2Scale }] }]} />
      <Animated.View style={[styles.dot, { transform: [{ scale: dot3Scale }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
});

export default LoadingDots;
