import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Alert, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchBook, cleanBook, setBookIsLoaded, resetBookMessages } from '../../redux/slices/bookSlice';
import { isScanned, setNavigationSource } from '../../redux/slices/appSlice';
import { randomBookNotFoundMessage } from '../../helpers/constants';


const Scanner = ({ navigation }: any) => {
  const scanned = useSelector((state: RootState) => state.app.scanned);
  const { bookIsLoaded } = useSelector((state: RootState) => state.book);
  const dispatch = useAppDispatch();

  const resetStates = () => {
    dispatch(isScanned(false));
    dispatch(setBookIsLoaded(false));
    dispatch(resetBookMessages());
  };

  const scannerAlert = () => {
      Alert.alert(
        'Error',
        randomBookNotFoundMessage,
        [
          {
            text: 'Scan again',
            onPress: () => {
              resetStates();
            },
          },
          {
            text: 'Add this book to our collection and be the hero panda.',
            onPress: () => {
              navigation.navigate('Book');
              resetStates();
            },
          },
        ]
      );
  };

  const handleBarcodeScan = async ({ data }: BarCodeScannerResult) => {
    if (!scanned) {
      dispatch(isScanned(true));
      dispatch(cleanBook());
      try {
        await dispatch(fetchBook(data));
        if (bookIsLoaded) {
          dispatch(setNavigationSource('Scanner'));
          resetStates();
          navigation.navigate('Book');
        } else {
          scannerAlert();
        }
      } catch (error) {
        console.error('Error during book fetching:', error);
      }
    }
  };

  return (
    <BarCodeScanner
      style={StyleSheet.absoluteFillObject}
      onBarCodeScanned={scanned ? undefined : handleBarcodeScan}
    />
  );
};

export default Scanner;

