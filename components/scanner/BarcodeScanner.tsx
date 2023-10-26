import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Alert, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { fetchBook, cleanBook, setBookIsLoaded, resetBookMessages, isScanned, setNavigationSource, RootState, useAppDispatch } from '@reduxStates/index';
import { randomBookNotFoundMessage } from '@helpers/constants';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';


const Scanner = ({ navigation }: any) => {
  const { scanned } = useSelector((state: RootState) => state.app);
  const { bookIsLoaded } = useSelector((state: RootState) => state.book);

  const dispatch = useAppDispatch();

  const resetStates = () => {
    dispatch(isScanned(false));
    dispatch(setBookIsLoaded(false));
    dispatch(resetBookMessages());
  };

  const handleBookNotFound = () => {
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
            text: 'Add book manually',
            onPress: () => {
              navigation.navigate('Book');
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
        const result = await dispatch(fetchBook(data));
        if (result.payload.isFound) {
          dispatch(setNavigationSource('Scanner'));
          navigation.navigate('Book');
        } else {
          handleBookNotFound();
        }
      } catch (error) {
        console.error('Error during book fetching:', error);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      resetStates();
    }, [])
  );

  return (
    <BarCodeScanner
      style={StyleSheet.absoluteFillObject}
      onBarCodeScanned={scanned ? undefined : handleBarcodeScan}
    />
  );
};

export default Scanner;

