import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SIZE = 6;
// const COLOUR = 'white';

type LoadingDotsTypes = {
  colour: string
}

const LoadingDots = ({ colour }: LoadingDotsTypes) => {
  const [dot1Scale] = useState(new Animated.Value(1));
  const [dot2Scale] = useState(new Animated.Value(1));
  const [dot3Scale] = useState(new Animated.Value(1));
  const COLOUR = colour;

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
      <Animated.View style={[
        styles.dot,
        {
          transform: [{ scale: dot1Scale }], 
          backgroundColor: COLOUR 
        }]} 
      />
      <Animated.View style={[
        styles.dot,
        {
          transform: [{ scale: dot2Scale }], 
          backgroundColor: COLOUR 
        }]} 
      />
      <Animated.View style={[
        styles.dot,
        {
          transform: [{ scale: dot3Scale }], 
          backgroundColor: COLOUR 
        }]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dot: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE/2,
    marginHorizontal: 4,
  },
});

export default LoadingDots;
