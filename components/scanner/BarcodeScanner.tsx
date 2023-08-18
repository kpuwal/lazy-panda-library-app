import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchPicker } from '../../redux/slices/pickerSlice';
import { fetchBook, cleanBook } from '../../redux/slices/bookSlice';
import { isDisabled, isScanned } from '../../redux/slices/appSlice';

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

  const handleBarcodeScan = ({ data }: BarCodeScannerResult) => {
    dispatch(isScanned(true));
    dispatch(cleanBook());
    dispatch(fetchBook(data));
    dispatch(isDisabled(false));
  }

  if (hasPermission === null) { return <View /> };
  if (hasPermission === false) { return <Text>No access to camera</Text> };  


  return (
    <BarCodeScanner
      ref={cameraRef}
      style={styles.camera}
      onBarCodeScanned={scanned ? undefined : handleBarcodeScan}
    />   
  )
}

export default Scanner;

const styles = StyleSheet.create({
  camera: {
    flex: 1
  },
});
