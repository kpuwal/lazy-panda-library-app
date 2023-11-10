import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { headerContainer } from '@styles/styles';
import Icon from './Icon';
import StyledText from '@components/StyledText';
import GoBack from './GoBack';

type HeaderProps = {
  children: ReactNode,
}

type HeaderComponent = React.FC<HeaderProps> & {
  Icon: typeof Icon;
  StyledText: typeof StyledText;
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
Header.StyledText = StyledText;
Header.GoBack = GoBack;

export default Header;
