import React, { ReactNode } from 'react';
import { Pressable, GestureResponderEvent, Platform, StyleProp, TextStyle } from 'react-native';
import { buttonContainer } from '@styles/button';
import Icon from './Icon';
import StyledText from '@components/StyledText';
import { Colours } from '@styles/constants';

type PrimaryButtonProps = {
  children: ReactNode,
  customStyle?: any,
  action?: () => void
}

type PrimaryButtonComponent = React.FC<PrimaryButtonProps> & {
  Icon: typeof Icon;
  StyledText: typeof StyledText;
};

const PrimaryButton: PrimaryButtonComponent = ({ children, action, customStyle }) => {
  return (
    <Pressable
      onPress={action}
      style={({pressed}) =>[
        buttonContainer,
        customStyle,
        Platform.OS === 'android'
          ? { elevation: 5 } // Add elevation for Android
          : { shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 },
        {
          backgroundColor: pressed ? Colours.action : Colours.secondary,
        }
      ]} 
    >
      { children }
    </Pressable>
  )
}

PrimaryButton.Icon = Icon;
PrimaryButton.StyledText = StyledText;
export default PrimaryButton;
