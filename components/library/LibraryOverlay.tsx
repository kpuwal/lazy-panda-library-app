import { View, ActivityIndicator, StyleSheet } from 'react-native';

type LibraryOverlayTypes = {
  isVisible: boolean,
}

const LibraryOverlay = ({ isVisible }: LibraryOverlayTypes) => {
  return isVisible ? (
    <View style={styles.overlay}>
      <ActivityIndicator size="small" color="white" />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LibraryOverlay;
