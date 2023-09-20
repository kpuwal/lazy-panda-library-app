import React, { ReactNode } from 'react';
import { View, Pressable } from 'react-native';
import Icon from './Icon';
import { buttonContainer } from '../../styles/button';
import Title from './Title';

type MainButtonProps = {
  children: ReactNode,
}

type MainButtonComponent = React.FC<MainButtonProps> & {
  Icon: typeof Icon;
  Title: typeof Title;
  // GoBack: typeof GoBack;
};

const MainButton: MainButtonComponent = ({ children }) => {
  return (
    <Pressable style={buttonContainer}>
      { children }
    </Pressable>
  )
}

MainButton.Icon = Icon;
MainButton.Title = Title;
// Header.GoBack = GoBack;

export default MainButton;
