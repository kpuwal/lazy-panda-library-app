import { Text } from 'react-native';
import { headerText } from '../../styles/styles';

type TitleProps = {
  children: React.ReactNode;
};

const Title: React.FC<TitleProps> = ({ children }) => {
  return <Text style={headerText}>{children}</Text>;
};

export default Title;
