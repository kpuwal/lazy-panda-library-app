import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { fetchPicker, isScanned, RootState, setBookIsLoaded, useAppDispatch } from '@reduxStates/index';
import { BarcodeScanner, ScannerOverlay } from '@scanner/index';
import { randomBookNotFoundMessage } from '@helpers/constants';
import AlertModal from '@components/alert/AlertModal';

const Scanner = ({navigation}: any) => {
  const cameraPermission = useSelector(
    (state: RootState) => state.app.cameraPermission);
  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleButtonTwoAction = () => {
    setIsAlertModalVisible(!isAlertModalVisible);
    navigation.navigate('Book');
  }

  const handleButtonOneAction = () => {
    dispatch(isScanned(false));
    dispatch(setBookIsLoaded(false));
    setIsAlertModalVisible(!isAlertModalVisible);
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
      <BarcodeScanner navigation={navigation} openModalAlert={handleAlertModalVisibility} />
      <ScannerOverlay />
      <AlertModal
        title="🐼 Error!"
        message={randomBookNotFoundMessage}
        buttonOneTxt="Scan Again"
        buttonOneAction={handleButtonOneAction}
        buttonTwoTxt="Add Book Manually"
        buttonTwoAction={handleButtonTwoAction}
        isVisible={isAlertModalVisible}
      />
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
