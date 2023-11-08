import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { headerContainer } from '@styles/styles';
import Icon from './Icon';
import Title from './Title';
import GoBack from './GoBack';

type HeaderProps = {
  children: ReactNode,
}

type HeaderComponent = React.FC<HeaderProps> & {
  Icon: typeof Icon;
  Title: typeof Title;
  GoBack: typeof GoBack;
};

const Header: HeaderComponent = ({ children }) => {
  return (
    <View style={headerContainer}>
      { children }
    </View>
  )
}

Header.Icon = Icon;
Header.Title = Title;
Header.GoBack = GoBack;

export default Header;
