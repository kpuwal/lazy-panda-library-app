import { StyleProp, Text, TextStyle } from 'react-native';

type StyledTextProps = {
  children: React.ReactNode;
  customStyle?: any
};

const StyledText: React.FC<StyledTextProps> = ({ children, customStyle }) => {
  return <Text style={customStyle}>{children}</Text>;
};

export default StyledText;
