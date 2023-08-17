import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, StyleProp, ViewStyle } from 'react-native';

interface AnimatedScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const AnimatedScreen: React.FC<AnimatedScreenProps> = ({ children, style }) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, []);

  const animatedStyle = {
    opacity: opacity,
  };

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#89b09b',
  },
});

export default AnimatedScreen;
