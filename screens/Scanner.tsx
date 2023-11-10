import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { fetchPicker, isScanned, resetBookMessages, resetLibraryMessages, RootState, setBookIsLoaded, useAppDispatch } from '@reduxStates/index';
import { BarcodeScanner, ScannerOverlay } from '@scanner/index';
import { randomBookNotFoundMessage } from '@helpers/constants';
import AlertModal from '@components/alert/AlertModal';
import PrimaryButton from '@components/button/PrimaryButton';
import { alertMessage, alertTitle } from '@styles/alert';
import { buttonText } from '@styles/button';

const Scanner = ({navigation}: any) => {
  const cameraPermission = useSelector(
    (state: RootState) => state.app.cameraPermission);
  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddBookButton = () => {
    setIsAlertModalVisible(!isAlertModalVisible);
    navigation.navigate('Book');
  }

  const handleScanAgainButton = () => {
    dispatch(isScanned(false));
    dispatch(setBookIsLoaded(false));
    setIsAlertModalVisible(!isAlertModalVisible);
    dispatch(resetLibraryMessages());
    dispatch(resetBookMessages());
  }

  const handleAlertModalVisibility = () => {
    setIsAlertModalVisible(!isAlertModalVisible);
  }

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
      <BarcodeScanner 
        navigation={navigation}
        openModalAlert={handleAlertModalVisibility}
      />

      <ScannerOverlay />

      <AlertModal isVisible={isAlertModalVisible}>
        <AlertModal.StyledText customStyle={alertTitle}>
          🐼 Error!
        </AlertModal.StyledText>
        <AlertModal.StyledText customStyle={alertMessage}>
          {randomBookNotFoundMessage}
        </AlertModal.StyledText>
        <PrimaryButton action={handleScanAgainButton}>
          <PrimaryButton.StyledText customStyle={buttonText}>
            Scan Again
          </PrimaryButton.StyledText>
        </PrimaryButton>
        <PrimaryButton action={handleAddBookButton}>
          <PrimaryButton.StyledText customStyle={buttonText}>
            Add Book Manually
          </PrimaryButton.StyledText>
        </PrimaryButton>
      </AlertModal>
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
