import { LoadingDots } from '@scanner/index';
import { View, ActivityIndicator, StyleSheet, Text, Image } from 'react-native';

type LibraryOverlayTypes = {
  isVisible: boolean,
  message: string
}

const LibraryOverlay = ({ isVisible, message }: LibraryOverlayTypes) => {
  return isVisible ? (
    <View style={styles.overlay}
    >
      <Image 
        source={require('@assets/bookshelf.gif')}
        style={{paddingTop: 10, width: 60, height: 60}}
      />
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10}}
      >
        <Text style={{
          marginBottom: 5,
          color: '#3B3E43',
          fontFamily: 'Courier Prime Bold',
          fontSize: 32}}
        >
          {message}
        </Text>
        <LoadingDots colour={'#3B3E43'} />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LibraryOverlay;
