import React from 'react';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Home';
import LibraryScreen from '../screens/Library';
import ScannerScreen from '../screens/Scanner';
import SettingsScreen from '../screens/Settings';
import BookScreen from '@components/book/Book';
import TagsScreen from '@components/settings/tags/Tags';
import CategoryScreen from './settings/categories/Category';
import { useNavigation } from '@react-navigation/native';
import { Text, Pressable, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colours } from '@styles/constants';

export type RootStackParamList = {
  Home: undefined,
  Library: undefined,
  Scanner: undefined,
  Book: undefined,
  Settings: undefined,
  Tags: undefined,
  Category: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Library" 
        component={LibraryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Scanner" 
        component={ScannerScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerLeft: () => <CustomBackButton />
        }}
      />
      <Stack.Screen 
        name="Book" 
        component={BookScreen}
        options={{ 
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Tags" 
        component={TagsScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Category" 
        component={CategoryScreen} 
        options={{ headerShown: false }} 
      />
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

const CustomBackButton = () => {
  const navigation = useNavigation<
  NativeStackNavigationProp<RootStackParamList, keyof RootStackParamList>
>();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{marginTop: 0, justifyContent: 'flex-start'}}>
      {({pressed}) => 
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color={pressed ? Colours.filter : Colours.primary }
          />
          <Text style={{color: pressed ? Colours.filter : Colours.primary, fontFamily: 'Courier Prime', fontSize: 22, paddingVertical: 2}}>Home</Text>
        </View>
      }
    </Pressable>
  );
};
