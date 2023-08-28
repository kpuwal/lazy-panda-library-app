import React, { useState, useEffect } from 'react';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { View, StyleSheet, ImageBackground, Image, Text, Animated } from 'react-native';
import { useSelector } from 'react-redux'; 
import { RootState, useAppDispatch } from '../redux/store';
import { setCameraPermission } from '../redux/slices/appSlice';
import { navigate } from '../redux/slices/navigationSlice';
import ButtonTmp from '../components/main/ButtonTmp';
import { fetchPicker } from '../redux/slices/pickerSlice';


const Home = () => {
  const imageHi = require('./../assets/icon.png');
  const dispatch = useAppDispatch();
  const cameraPermission = useSelector((state: RootState) => state.app.cameraPermission);
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
  }, [dispatch]);

  return (
    <Animated.View 
      style={[styles.container, { opacity: isAnimating ? opacity : 1 }]}
    >
      <ImageBackground
        source={require('./../assets/image_bg.png')}
        style={styles.image}
      >
        <View style={styles.buttonContainer}>
          <Image
            source={imageHi}
            style={{ width: 150, height: 150, marginBottom: '10%' }}
          />
          <ButtonTmp 
            onPress={() => dispatch(navigate('scanBook'))}
            title="Scan a book"
            imgSource={require('./../assets/scan.png')}
            imgCol={require('./../assets/scan-col.png')} />
          {/* <ButtonTmp
            onPress={() => dispatch(navigate('addBook'))}
            title="Add a book"
            imgSource={require('./../assets/add-book.png')}
            imgCol={require('./../assets/add-book-col.png')} /> */}
          <ButtonTmp
            onPress={() => dispatch(navigate('library'))}
            title="Library"
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
    backgroundColor: '#89b09b',
  },
  image: {
    flex: 1,
    resizeMode: 'cover'
  },
  buttonContainer: {
    flex: 1,
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
