import React, { ReactNode } from 'react';
import { Modal, Platform, View } from 'react-native';
import { alertAndroidBackdrop, alertBackdrop, alertCenteredView, alertModal, alertiOSBackdrop } from '@styles/alert';
import StyledText from '@components/StyledText';


type AlertModalProps = {
  children: ReactNode,
  isVisible: boolean
}

type AlertModalComponent = React.FC<AlertModalProps> & {
  StyledText: typeof StyledText;
};

const AlertModal: AlertModalComponent = ({ children, isVisible }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View style={[Platform.OS === "ios" ? alertiOSBackdrop : alertAndroidBackdrop, alertBackdrop, alertCenteredView ]} />
        <View style={alertCenteredView}>
          <View style={alertModal}>
            { children }
          </View>
        </View>
    </Modal>
  )
}

AlertModal.StyledText = StyledText;
export default AlertModal;
