import { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { View, StyleSheet, ImageBackground, Image, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { fetchPicker, readLibrary, cleanBook, setBookIsLoaded, setCameraPermission, useAppDispatch } from '@reduxStates/index';
import { Colours } from '@styles/constants';
import HomeButton from '@components/main/HomeButton';
import { BACKGROUND } from '@helpers/constants';

const Home = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const randomIndex = Math.floor(Math.random() * BACKGROUND.length);
  const [randomBackground] = useState(BACKGROUND[randomIndex]);
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
      .catch(() => {
        dispatch(setBookIsLoaded(false));
      });
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={randomBackground}
        style={styles.image}
      >
        <Image
          source={require('@assets/logo.png')}
          style={{ width: 185, height: 107, top: 25, left: '21%', justifyContent: 'center', opacity: 1 }}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.pandaContainer}>
            <Pressable
              onPressIn={() => setLove(!isLove)}
              onPressOut={() => setLove(false)}
              style={{position: 'absolute', width: 250, height: 120, justifyContent: 'flex-end', alignItems: 'center'}}
            >
              <Image
                source={
                  isLove ?
                  require('@assets/panda_button_love.png') :
                  require('@assets/panda_button.png')}
                style={{
                  width: 150, height: 100 
                }}
              />
            </Pressable>
          </View>
          <View style={styles.homeButtonsContainer}>
            <HomeButton
              onPress={() => navigation.navigate('Scanner')}
              title="Scan a book"
              imgSource={require('@assets/scan.png')}
              imgColourSource={require('@assets/scan-col.png')}
            />
            <HomeButton
              onPress={() => navigation.navigate('Library')}
              title="When in doubt, go to the Library"
              imgSource={require('@assets/library-books.png')}
              imgColourSource={require('@assets/library-books-col.png')}
            />
          </View>
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
    borderColor: '#0d0d0d',
    justifyContent: 'space-around'
  },
  image: {
    flex: 1,
    resizeMode: 'cover'
  },
  buttonContainer: {
    flex: 2,
    alignItems: 'center'
  },
  pandaContainer: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'flex-end',
    alignItems: 'center',
    bottom: -5
  },
  homeButtonsContainer: {
    flex: 2
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
