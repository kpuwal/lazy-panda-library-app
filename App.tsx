import { useState, useEffect, useCallback } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import CameraScanner from './components/CameraScanner';
import { Provider } from "react-redux";
import { store } from './redux/store';
import { API_URL, API_URL_LOCAL } from '@env';
// import { RootState, useAppDispatch } from './redux/store';
// import { fetchPicker } from './redux/slices/pickerSlice';
import * as Font from 'expo-font';
import axios from 'axios';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [serverStatus, setServerStatus] = useState('');
  // const dispatch = useAppDispatch();

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

  const getPingMessage = async () => {
    try {
      await axios.get(`${API_URL_LOCAL}`);
    } catch (error: any) {
      // console.error('Error:', error);
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
        // Pre-load fonts, make any API calls you need to do here
        await getPingMessage();
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
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
