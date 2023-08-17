import { View, StyleSheet, ImageBackground, Image, Animated } from "react-native";
import ButtonTmp from "../components/main/ButtonTmp";

import { useDispatch } from 'react-redux';  
import { navigate } from '../redux/slices/navigationSlice';
import { useEffect } from "react";

const Home = () => {
  const imageHi = require('./../assets/icon.png');
  const dispatch = useDispatch();
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, []);

  const animatedStyle = {
    opacity: opacity,
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
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
            title="Scann a book"
            imgSource={require('./../assets/scan.png')}
            imgCol={require('./../assets/scan-col.png')} />
          <ButtonTmp
            onPress={() => dispatch(navigate('addBook'))}
            title="Add a book"
            imgSource={require('./../assets/add-book.png')}
            imgCol={require('./../assets/add-book-col.png')} />
          <ButtonTmp
            onPress={() => console.log('pressed library')}
            title="Library"
            imgSource={require('./../assets/library-books.png')}
            imgCol={require('./../assets/library-books-col.png')} />
        </View>
      </ImageBackground>
    </Animated.View>
  )
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
  }
});