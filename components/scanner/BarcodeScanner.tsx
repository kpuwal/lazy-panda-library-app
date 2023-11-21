import React from 'react';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { fetchBook, cleanBook, setBookIsLoaded, resetBookMessages, isScanned, setNavigationSource, RootState, useAppDispatch } from '@reduxStates/index';
import { useFocusEffect } from '@react-navigation/native';

const Scanner = ({ navigation, openModalAlert }: any) => {
  const { scanned } = useSelector((state: RootState) => state.app);
  const { height, width } = Dimensions.get('window');
  
  const dispatch = useAppDispatch();

  const resetStates = () => {
    dispatch(isScanned(false));
    dispatch(setBookIsLoaded(false));
    dispatch(resetBookMessages());
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
          openModalAlert();
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
      style={Platform.OS === "android"
      ? {
          position: "absolute",
          top: 0,
          transform: [{ translateX: width / 2 }],
          right: 0,
          bottom: 0,
          width: width * 2.5,
          height: height * 1.5,
        }
      : StyleSheet.absoluteFillObject}
      onBarCodeScanned={scanned ? undefined : handleBarcodeScan}
    />
  );
};

export default Scanner;
