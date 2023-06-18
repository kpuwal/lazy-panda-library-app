import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScannerBackground from './scanner/ScannerBackground';
import BookInfo from './book/BookInfo';

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../redux/store';
import { fetchPicker } from '../redux/slices/pickerSlice';
import { fetchBook, cleanBook } from '../redux/slices/bookSlice';
import { isDisabled, isScanned } from '../redux/slices/appSlice';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
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

  const handleBarcodeScan = ({ data, type }: BarCodeScannerResult) => {
    dispatch(isScanned(true));
    dispatch(cleanBook());
    dispatch(fetchBook(data));
    dispatch(isDisabled(false));
  }

  if (hasPermission === null) { return <View /> };
  if (hasPermission === false) { return <Text>No access to camera</Text> };  


  return (
    <View style={styles.container}>
      <BarCodeScanner
        ref={cameraRef}
        style={styles.camera}
        onBarCodeScanned={scanned ? undefined : handleBarcodeScan}
      />
      <ScannerBackground />
      <BookInfo />
    </View>
  )
}

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
