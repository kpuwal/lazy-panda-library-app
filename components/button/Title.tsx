import { Text } from 'react-native';
import { buttonText } from '@styles/button';

type TitleProps = {
  children: React.ReactNode;
};

const Title: React.FC<TitleProps> = ({ children }) => {
  return <Text style={buttonText}>{children}</Text>;
};

export default Title;
