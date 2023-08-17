import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScannerBackground from '../components/scanner/ScannerBackground';
import BookInfo from '../components/book/BookInfo';
import ScannerBG from '../components/scanner/ScannerBG';
import { navigate } from '../redux/slices/navigationSlice';

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../redux/store';
import { fetchPicker } from '../redux/slices/pickerSlice';
import { fetchBook, cleanBook } from '../redux/slices/bookSlice';
import { isDisabled, isScanned } from '../redux/slices/appSlice';

import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const scanned = useSelector((state: RootState) => state.app.scanned);
  const dispatch = useAppDispatch();
  const cameraRef = useRef(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
    dispatch(fetchPicker());
  }, []);

  // Define gesture handler 
  const onSwipeRight = ({ nativeEvent }: any) => {
    if (nativeEvent.velocityX > 800) {
      dispatch(navigate('home'));
    }
  };

  const handleBarcodeScan = ({ data, type }: BarCodeScannerResult) => {
    dispatch(isScanned(true));
    dispatch(cleanBook());
    dispatch(fetchBook(data));
    dispatch(isDisabled(false));
  }

  if (hasPermission === null) { return <View /> };
  if (hasPermission === false) { return <Text>No access to camera</Text> };  


  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PanGestureHandler
        onGestureEvent={onSwipeRight}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            onSwipeRight({ nativeEvent });
          }
        }}
      >
        <View style={styles.container}>
          <BarCodeScanner
            ref={cameraRef}
            style={styles.camera}
            onBarCodeScanned={scanned ? undefined : handleBarcodeScan}
          />
          <ScannerBackground />
          {/* <ScannerBG /> */}
          <BookInfo />
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
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
  camera: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
});
