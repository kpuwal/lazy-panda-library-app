import { RootStackParamList } from '@components/NavigationStack';
import MainButton from '@components/button/MainButton';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { resetBookMessages, resetLibraryMessages, setAlertModal } from '@reduxStates/index';
import { RootState, useAppDispatch } from '@reduxStates/index';
import { Modal, Platform, Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

type AlertModalTypes = {
  title: string;
  message: string;
  buttonOneTxt: string;
  buttonOneAction?: () => void | undefined;
  buttonTwoTxt?: string,
  buttonTwoAction?: () => void | undefined;
  isVisible: boolean
}

const AlertModal = ({title, message, buttonOneTxt, buttonOneAction, buttonTwoTxt, buttonTwoAction, isVisible}: AlertModalTypes) => {
  const { isAlertModalActive } = useSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();

  const buttonOneAct = () => {
    // dispatch(setAlertModal(false));
    dispatch(resetLibraryMessages());
    dispatch(resetBookMessages());
    if (buttonOneAction) {
      buttonOneAction();
    }
  };

  const buttonTwoAct = () => {
    // dispatch(setAlertModal(false));
    if (buttonTwoAction) {
      buttonTwoAction();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      // visible={isAlertModalActive}
      visible={isVisible}
    >
      <View style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop, styles.centeredView ]} />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.alertTitle}>{title}</Text>
            <Text style={styles.alertMessage}>{message}</Text>
            <MainButton action={buttonOneAct}>
              <MainButton.Title>{buttonOneTxt}</MainButton.Title>
            </MainButton>
            {buttonTwoTxt && (
              <MainButton action={buttonTwoAct}>
                <MainButton.Title>{buttonTwoTxt}</MainButton.Title>
              </MainButton>
            )}
          </View>
        </View>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 20,
    width: '70%'
  },
  iOSBackdrop: {
    backgroundColor: "#000000",
    opacity: 0.3,
  },
  androidBackdrop: {
    backgroundColor: "#232f34",
    opacity: 0.32,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  alertTitle: {
    fontFamily: 'Courier Prime Bold',
    fontSize: 25,
  },
  alertMessage: {
    textAlign: 'center',
    fontFamily: 'Courier Prime',
    fontSize: 20,
  }
  // pandaBubble: {
  //   borderRadius: 30,
  //   backgroundColor: 'white',
  //   padding: 10,
  //   left: 0,
  //   transform: [{ translateY: 15 }, { translateX: -80 }]
  // },
  // pandaText: {
  //   fontSize: 24,
  // },
});

