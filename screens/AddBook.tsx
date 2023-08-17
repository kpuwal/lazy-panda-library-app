// import React from 'react';
// import { Text, View, Pressable } from 'react-native';
// import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
// import useSwipeToHomeGesture from '../hooks/useSwipeToHomeGesture';
// import { useDispatch } from 'react-redux';  
// import { navigate } from '../redux/slices/navigationSlice';
// import { Animated } from 'react-native';

// const AddBookScreen: React.FC = () => {
//   const dispatch = useDispatch();
//   const handleSwipe = useSwipeToHomeGesture();
//   const opacity = new Animated.Value(1);

//   // const handleAnimatedSwipe = (gestureEvent: PanGestureHandlerGestureEvent) => {
//   //   Animated.timing(opacity, {
//   //     toValue: 0,
//   //     duration: 300,
//   //     useNativeDriver: true,
//   //   }).start(() => {
//   //     // Call the handleSwipe function directly and pass the gesture event
//   //     handleSwipe(gestureEvent);
//   //   });
//   // };
  

//   const animatedStyle = {
//     opacity: opacity
//   };

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <PanGestureHandler onGestureEvent={handleSwipe}>
//         <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
//           <Text>hello from the add book screen</Text>
//           <Pressable onPress={() => dispatch(navigate('home'))}>
//             <Text>Go Back</Text>
//           </Pressable>
//         </View>
//       </PanGestureHandler>
//     </GestureHandlerRootView>
//   );
// }

// export default AddBookScreen;

import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';  
import { navigate } from '../redux/slices/navigationSlice';
import { Animated } from 'react-native';

const AddBookScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [isAnimating, setIsAnimating] = useState(false);
  const opacity = new Animated.Value(1);

  const handleSwipe = async ({ nativeEvent }: any) => {
    await Animated.timing(opacity, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      dispatch(navigate('home'));
    });
  };

  const animatedStyle = {
    opacity: isAnimating ? opacity : 1,
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={handleSwipe}>
        <Animated.View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, animatedStyle]}>
          <Text>hello from the add book screen</Text>
          <Pressable onPress={() => dispatch(navigate('home'))}>
            <Text>Go Back</Text>
          </Pressable>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

export default AddBookScreen;

