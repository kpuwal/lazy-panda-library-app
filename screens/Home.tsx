import React, { useState, useEffect } from 'react';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { View, StyleSheet, ImageBackground, Image, Text, Animated, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux'; 
import { RootState, useAppDispatch } from '../redux/store';
import { setCameraPermission } from '../redux/slices/appSlice';
import { navigate } from '../redux/slices/navigationSlice';
import ButtonTmp from '../components/main/ButtonTmp';
import { fetchPicker } from '../redux/slices/pickerSlice';
import { readLibrary } from '../redux/slices/librarySlice';
import { setBookIsLoaded } from '../redux/slices/bookSlice';
import { Colours } from '../styles/constants';


const Home = () => {
  const imageHi = require('./../assets/icon.png');
  const dispatch = useAppDispatch();
  const cameraPermission = useSelector((state: RootState) => state.app.cameraPermission);
  const [isLove, setLove] = useState(false);

  const [isAnimating, setIsAnimating] = useState(true);
  const opacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status === 'granted') {
        dispatch(setCameraPermission(true))
      }
    };
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start(() => {
      setIsAnimating(false);
    });

    getBarCodeScannerPermissions();
    dispatch(fetchPicker());
    dispatch(readLibrary())
      .then(() => dispatch(setBookIsLoaded(false)))
      .catch(error => {
        dispatch(setBookIsLoaded(false));
        console.error("Error fetching library:", error);
      });
  }, [dispatch]);

  return (
    <Animated.View 
      style={[styles.container, { opacity: isAnimating ? opacity : 1 }]}
    >
      <StatusBar style="light" />
      <ImageBackground
        source={require('./../assets/bg3.jpeg')}
        style={[styles.image]}
      >
        <Image
            source={require('./../assets/logo.png')}
            style={{width: 185, height: 107, top: 25, left: '22%', justifyContent: 'center', opacity: 1}}
          />
        <View style={styles.buttonContainer}>
        
          {/* <Text numberOfLines={3} style={{ color: 'black', fontSize: 42, width: 150, textAlign: 'center', fontFamily: 'Courier Prime' }}>Lazy Panda Library </Text> */}
          {/* <Image 
            source={require('./../assets/libr.png')}
            style={{
               height: 190, width: 190, marginBottom: 90
            }}
          /> */}
          <ButtonTmp 
            onPress={() => dispatch(navigate('scanBook'))}
            title="Scan a book"
            imgSource={require('./../assets/scan.png')}
            imgCol={require('./../assets/scan-col.png')}
          />
          <Pressable
            onPressIn={() => setLove(!isLove)} 
            onPressOut={() => setLove(false)} 
            style={{bottom: 280, right: 55, position: 'absolute'}}
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
          <ButtonTmp
            onPress={() => dispatch(navigate('library'))}
            title="When in doubt, go to the Library"
            imgSource={require('./../assets/library-books.png')}
            imgCol={require('./../assets/library-books-col.png')} />
        </View>
      </ImageBackground>
    </Animated.View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Colours.tertiary,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: '40%'
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
