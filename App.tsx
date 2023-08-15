import { useState, useEffect, useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import CameraScanner from './components/CameraScanner';
import { Provider } from "react-redux";
import { store } from './redux/store';
import { mainUrl } from './server-location';
import * as Font from 'expo-font';
import axios from 'axios';

const URL = mainUrl();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Courier Prime': {
        uri: require('./assets/Courier_Prime/CourierPrime-Regular.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
      'Courier Prime Bold': {
        uri: require('./assets/Courier_Prime/CourierPrime-Bold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
    });
  }

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
        // await getPingMessage();
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <CameraScanner />
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
