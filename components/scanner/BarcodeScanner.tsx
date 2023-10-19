import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchBook, cleanBook, setBookIsLoaded, resetBookMessages } from '../../redux/slices/bookSlice';
import { isScanned, setNavigationSource } from '../../redux/slices/appSlice';
import { useEffect, useState } from 'react';


const Scanner = ({navigation}: any) => {
  const scanned = useSelector((state: RootState) => state.app.scanned);
  const { bookError, book } = useSelector((state: RootState) => state.book);
  const [alertShown, setAlertShown] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => scannerAlert(), [bookError, alertShown]);

  const resetStates = () => {
    dispatch(isScanned(false));
    dispatch(setBookIsLoaded(false));
    dispatch(resetBookMessages());
    setAlertShown(false);
  }

  const scannerAlert = () => {
    if (bookError !== null && !alertShown) {
      Alert.alert(
        '', 
        bookError,
        [{
          text: 'Scan again',
          onPress: () => {
            resetStates();
          }
          ,
          style: 'cancel',
        }, {
          text: 'Add book manually', onPress: () => {
          navigation.navigate('Book');
          resetStates();
        }}]
      );
      setAlertShown(true);
    }
  };

  const handleBarcodeScan = async ({ data }: BarCodeScannerResult) => {
      dispatch(isScanned(true));
      dispatch(cleanBook());
      await dispatch(fetchBook(data)).then(() => {
        dispatch(setNavigationSource('Scanner'));
        resetStates();
        if (book.isFound) {
          navigation.navigate('Book');
        };
      });
  };

  return (
     <BarCodeScanner
      style={StyleSheet.absoluteFillObject}
      onBarCodeScanned={scanned ? undefined : handleBarcodeScan}
    />
  )
}

export default Scanner;
