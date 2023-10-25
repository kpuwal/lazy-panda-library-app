import { useState, useEffect, useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from "react-redux";
import { store } from './redux/store';
import { mainUrl } from './server-location';
import * as Font from 'expo-font';
import axios from 'axios';
import AppNavigator from './components/NavigationStack';
import { useFonts } from 'expo-font';

const URL = mainUrl();
SplashScreen.preventAutoHideAsync();

export default function App() {

// get ping message from the server to see if it's working
  const getPingMessage = async () => {
    try {
      await axios.get(`${URL}`);
    } catch (error: any) {
      if (error.response && (error.response.status === 500 || error.response.status === 503)) {
        Alert.alert('Server is not working');
      } else {
        Alert.alert('Network Error');
      }
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        await getPingMessage();
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  const [fontsLoaded] = useFonts({
    'Courier Prime': require('./assets/Courier_Prime/CourierPrime-Regular.ttf'),
    'Courier Prime Bold': require('./assets/Courier_Prime/CourierPrime-Bold.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <AppNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
