import { StyleSheet } from 'react-native';

const alertStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 20,
    width: '70%'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 20,
    width: '70%'
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
});

export const alertContainer = alertStyle.container;
export const alertCenteredView = alertStyle.centeredView;
export const alertiOSBackdrop = alertStyle.iOSBackdrop;
export const alertAndroidBackdrop = alertStyle.androidBackdrop;
export const alertBackdrop = alertStyle.backdrop;
export const alertModal = alertStyle.modalView;
export const alertTitle = alertStyle.alertTitle;
export const alertMessage = alertStyle.alertMessage;

