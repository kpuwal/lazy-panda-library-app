import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { useState, useRef, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ScannerBG from '../components/scanner/ScannerBG';
import { navigate } from '../redux/slices/navigationSlice';

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../redux/store';
import { fetchPicker } from '../redux/slices/pickerSlice';
import { Animated } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import ScannerOverlay from '../components/scanner/ScannerOverlay';
import BarcodeScanner from '../components/scanner/BarcodeScanner';

const Scanner = ({navigation}: any) => {
  const [hasPermission, setHasPermission] = useState(false);
  const scanned = useSelector((state: RootState) => state.app.scanned);
  const dispatch = useAppDispatch();
  const cameraRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const opacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
    dispatch(fetchPicker());
    
    // Animated.timing(opacity, {
    //   toValue: 1,
    //   duration: 800,
    //   useNativeDriver: false,
    // }).start(() => {
    //   setIsAnimating(false);
    // });

  }, []);

  // Define gesture handler 
  const onSwipeRight = ({ nativeEvent }: any) => {
    if (nativeEvent.velocityX > 800) {
      dispatch(navigate('home'));
    }
  };

  // const handleBarcodeScan = ({ data, type }: BarCodeScannerResult) => {
  //   dispatch(isScanned(true));
  //   dispatch(cleanBook());
  //   dispatch(fetchBook(data));
  //   dispatch(isDisabled(false));
  // }

  // if (hasPermission === null) { return <View /> };
  // if (hasPermission === false) { return <Text>No access to camera</Text> };  


  return (
    // <GestureHandlerRootView style={{flex: 1}}>
    //   <PanGestureHandler
    //     onGestureEvent={onSwipeRight}
    //     onHandlerStateChange={({ nativeEvent }) => {
    //       if (nativeEvent.state === State.END) {
    //         onSwipeRight({ nativeEvent });
    //       }
    //     }}
    //   >
        <View style={[styles.container]}>
          <BarcodeScanner navigation={navigation} />
          <ScannerOverlay />
        </View>
  )
}

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },

});
