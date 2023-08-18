import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import useSwipeToHomeGesture from '../hooks/useSwipeToHomeGesture';
import ZigZagAnimation from '../components/scanner/ZigZagAnimation';

const AddBookScreen: React.FC = () => {
  const handleSwipe = useSwipeToHomeGesture();
  const [isAnimating, setIsAnimating] = useState(true);
  const opacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start(() => {
      setIsAnimating(false);
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={handleSwipe}>
        <Animated.View
          style={[styles.container, { opacity: isAnimating ? opacity : 1 }]}
        >
          <ZigZagAnimation />
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

export default AddBookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink'
  }
});
