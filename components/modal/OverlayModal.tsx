import React, { ReactNode, useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { headerContainer } from '@styles/styles';
import StyledText from '@components/StyledText';

type OverlayModalProps = {
  children: ReactNode,
  customStyle?: any,
  isVisible: boolean;
}

type ModalComponent = React.FC<OverlayModalProps> & {
  StyledText: typeof StyledText;
};

const OverlayModal: ModalComponent = ({ isVisible, customStyle, children }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  
  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [isVisible]);

  return (
    <>
      <Animated.View
        style={[styles.overlayContainer, { opacity: fadeAnim }]}
        pointerEvents={isVisible ? 'auto' : 'none'} />
      <Modal transparent visible={isVisible}  >
        <View style={styles.overlayContainer}>
          <View style={[styles.infoContainer, customStyle]}>
            { children }
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    // justifyContent: 'center',
    // paddingTop: 100,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 80
  },
});

OverlayModal.StyledText = StyledText;

export default OverlayModal;
