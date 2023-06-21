import { useState, useEffect, useCallback } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import CameraScanner from './components/CameraScanner';
import { Provider } from "react-redux";
import { store } from './redux/store';
import * as Font from 'expo-font';

// Keep the splash screen visible while we fetch resources
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

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await loadFonts();
        
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        // setAppIsReady(true);
        
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
