import React, { ReactNode } from 'react';
import { View, Pressable, GestureResponderEvent, ViewStyle, Platform } from 'react-native';
import { buttonContainer } from '../../styles/button';
import Icon from './Icon';
import Title from './Title';
import { Colours } from '../../styles/constants';

type MainButtonProps = {
  children: ReactNode,
  style?: any,
  action?: (event: GestureResponderEvent) => void
}

type MainButtonComponent = React.FC<MainButtonProps> & {
  Icon: typeof Icon;
  Title: typeof Title;
};

const MainButton: MainButtonComponent = ({ children, action, style }) => {
  return (
    <Pressable
      style={({pressed}) =>[
        buttonContainer,
        style,
        Platform.OS === 'android'
          ? { elevation: 5 } // Add elevation for Android
          : { shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 },
        {
          backgroundColor: pressed ? Colours.action : Colours.secondary,
        }
      ]} 
      onPress={action}>
      { children }
    </Pressable>
  )
}

MainButton.Icon = Icon;
MainButton.Title = Title;

export default MainButton;
