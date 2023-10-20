import { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { View, StyleSheet, ImageBackground, Image, Text, Animated, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAppDispatch } from '../redux/store';
import { setCameraPermission } from '../redux/slices/appSlice';
import { fetchPicker } from '../redux/slices/pickerSlice';
import { readLibrary } from '../redux/slices/librarySlice';
import { cleanBook, setBookIsLoaded } from '../redux/slices/bookSlice';
import { Colours } from '../styles/constants';
import HomeButton from '../components/main/HomeButton';

const Home = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [isLove, setLove] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status === 'granted') {
        dispatch(setCameraPermission(true))
      }
    };

    getBarCodeScannerPermissions();
    dispatch(fetchPicker());
    dispatch(cleanBook());
    dispatch(readLibrary())
      .then(() => dispatch(setBookIsLoaded(false)))
      .catch(error => {
        dispatch(setBookIsLoaded(false));
        console.error("Error fetching library:", error);
      });
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require('./../assets/bg58.jpeg')}
        style={styles.image}
      >
        <Image
          source={require('./../assets/logo.png')}
          style={{ width: 185, height: 107, top: 25, left: '22%', justifyContent: 'center', opacity: 1 }}
        />
        <View style={styles.buttonContainer}>
          <Pressable
            onPressIn={() => setLove(!isLove)}
            onPressOut={() => setLove(false)}
            style={{ bottom: '65%', right: 55, position: 'absolute', zIndex: 2 }}
          >
            <Image
              source={
                isLove ?
                require('./../assets/love-panda-over2.png') :
                require('./../assets/love-panda.png')}
              style={{
                width: 150, height: 120,
              }}
            />
          </Pressable>
          <HomeButton
            onPress={() => navigation.navigate('Scanner')}
            title="Scan a book"
            imgSource={require('./../assets/scan.png')}
            imgColourSource={require('./../assets/scan-col.png')}
          />
          <HomeButton
            onPress={() => navigation.navigate('Library')}
            title="When in doubt, go to the Library"
            imgSource={require('./../assets/library-books.png')}
            imgColourSource={require('./../assets/library-books-col.png')}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Colours.secondary,
    borderWidth: 5,  // Default thickness for sides (bottom, left, right)
    borderTopWidth: 30,  // Thickness for the top
    borderColor: 'black',
    justifyContent: 'space-around'
  },
  image: {
    flex: 1,
    resizeMode: 'cover'
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
  }
});
