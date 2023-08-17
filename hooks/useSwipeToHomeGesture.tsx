import { useCallback } from 'react';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { navigate } from '../redux/slices/navigationSlice';
import { useAppDispatch } from '../redux/store';

export default function useSwipeToHomeGesture() {
  const dispatch = useAppDispatch();

  const handleSwipe = useCallback((gestureEvent: PanGestureHandlerGestureEvent) => {
    if (gestureEvent.nativeEvent.velocityX > 800) {
      dispatch(navigate('home'));
    }
  }, [dispatch]);

  return handleSwipe;
}
