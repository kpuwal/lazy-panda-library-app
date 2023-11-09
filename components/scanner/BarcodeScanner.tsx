import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Alert, Dimensions, Platform, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { fetchBook, cleanBook, setBookIsLoaded, resetBookMessages, isScanned, setNavigationSource, RootState, useAppDispatch, setAlertModal } from '@reduxStates/index';
import { randomBookNotFoundMessage } from '@helpers/constants';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import AlertModal from '@components/alert/AlertModal';

const Scanner = ({ navigation, openModalAlert }: any) => {
  const { scanned } = useSelector((state: RootState) => state.app);
  const { bookIsLoaded } = useSelector((state: RootState) => state.book);
  const { height, width } = Dimensions.get('window');
  
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
          // handleBookNotFound();
          // dispatch(setAlertModal(true));
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
