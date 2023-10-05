import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Home';
import LibraryScreen from '../screens/Library';
import ScannerScreen from '../screens/Scanner';
import BookScreen from './book/Book';

type RootStackParamList = {
  Home: undefined,
  Library: undefined,
  Scanner: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Library" component={LibraryScreen} />
      <Stack.Screen name="Scanner" component={ScannerScreen} />
      {/* <Stack.Screen name="Book" component={BookScreen} /> */}
    </Stack.Navigator>
  );
};

// Wrap the navigator in NavigationContainer
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
};

export default AppNavigator;
