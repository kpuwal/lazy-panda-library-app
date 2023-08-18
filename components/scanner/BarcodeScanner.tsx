import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchBook, cleanBook } from '../../redux/slices/bookSlice';
import { isDisabled, isScanned, setCameraPermission } from '../../redux/slices/appSlice';

const Scanner = () => {
  // const cameraPermission = useSelector((state: RootState) => state.app.cameraPermission);
  const scanned = useSelector((state: RootState) => state.app.scanned);
  const dispatch = useAppDispatch();
  const cameraRef = useRef(null);

  const handleBarcodeScan = ({ data }: BarCodeScannerResult) => {
    dispatch(isScanned(true));
    dispatch(cleanBook());
    dispatch(fetchBook(data));
    dispatch(isDisabled(false));
  }

  // if (!cameraPermission) { return <Text>No access to camera</Text> }; 

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
