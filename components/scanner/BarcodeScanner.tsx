import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchBook, cleanBook } from '../../redux/slices/bookSlice';
import { isDisabled, isScanned, setCameraPermission } from '../../redux/slices/appSlice';
import { navigate } from '../../redux/slices/navigationSlice';

const Scanner = () => {
  // const cameraPermission = useSelector((state: RootState) => state.app.cameraPermission);
  const scanned = useSelector((state: RootState) => state.app.scanned);
  const isLoaded = useSelector((state: RootState) => state.book.isLoaded)
  const dispatch = useAppDispatch();
  const cameraRef = useRef(null);

  const handleBarcodeScan = ({ data }: BarCodeScannerResult) => {
    dispatch(isScanned(true));
    dispatch(cleanBook());
    dispatch(fetchBook(data)).then(() => {
      dispatch(isDisabled(false));
      dispatch(navigate('bookInfo'));
    });
  }

  // if (!cameraPermission) { return <Text>No access to camera</Text> }; 

  return (
    <BarCodeScanner
      ref={cameraRef}
      style={[styles.camera, StyleSheet.absoluteFillObject]}
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
