import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Alert, StyleSheet, Text } from 'react-native';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchBook, cleanBook, setBookIsLoaded, resetBookMessages } from '../../redux/slices/bookSlice';
import { isScanned, setNavigationSource } from '../../redux/slices/appSlice';
import { useEffect, useState } from 'react';


const Scanner = ({navigation}: any) => {
  const cameraPermission = useSelector((state: RootState) => state.app.cameraPermission);
  const scanned = useSelector((state: RootState) => state.app.scanned);
  const { bookError } = useSelector((state: RootState) => state.book);
  const [alertShown, setAlertShown] = useState(false);

  const dispatch = useAppDispatch();

  const scannerAlert = () => {
    if (bookError !== null && !alertShown) {
      Alert.alert(
        '', 
        bookError,
        [{
          text: 'Scan again',
          onPress: () => dispatch(isScanned(false))
          ,
          style: 'cancel',
        }, {
          text: 'Add book manually', onPress: () => {
          navigation.navigate('Book');
        }}]
      );
      setAlertShown(true);
    }
  }

  useEffect(() => {
    scannerAlert();
  }, [bookError, alertShown]);

  const handleBarcodeScan = async ({ data }: BarCodeScannerResult) => {
      dispatch(isScanned(true));
      dispatch(cleanBook());
      
      try {
        await dispatch(fetchBook(data)).then(() => {
          dispatch(setNavigationSource('Scanner'));
          dispatch(isScanned(false));
          dispatch(setBookIsLoaded(false));
          dispatch(resetBookMessages());
        });
      } catch (error: string | any) {
        Alert.alert('', error);
      }
  };
  

  if (cameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (cameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
     <BarCodeScanner
      style={StyleSheet.absoluteFillObject}
      onBarCodeScanned={scanned ? undefined : handleBarcodeScan}
    />
  )
}

export default Scanner;
