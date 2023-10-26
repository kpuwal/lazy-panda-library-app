import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { fetchPicker, RootState, useAppDispatch } from '@reduxStates/index';
import ScannerOverlay from '@components/scanner/scannerModules/ScannerOverlay';
import BarcodeScanner from '@components/scanner/BarcodeScanner';

const Scanner = ({navigation}: any) => {
  const cameraPermission = useSelector(
    (state: RootState) => state.app.cameraPermission);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPicker());
  }, []);

  if (cameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (cameraPermission === false) {
    return <NoCamera />;
  }

  return (
    <>
      <BarcodeScanner navigation={navigation} />
      <ScannerOverlay />
    </>
  )
}

export default Scanner;

const NoCamera = () => {
  return (
    <View 
      style={{
        flex: 1, 
        width: '100%', 
        height: '100%',
        backgroundColor: 'red',
        position: 'absolute',
        zIndex: 99,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Feather name="camera-off" size={24} color="black" />
      <Text>No access to camera</Text>
    </View>
  )
}
