import { TouchableOpacity, Text } from 'react-native';
import { accordionMenuButton, accordionMenuButtonTitle } from '@styles/accordion';
import { MaterialIcons } from '@expo/vector-icons';
import { Colours } from '@styles/constants';
import { ReactNode } from 'react';

type CustomButtonProps = {
  children: ReactNode;
  title: string;
  buttonName: string;
  actionOnCategory: (title: string) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, children, actionOnCategory, buttonName }) => {
  return (
    <TouchableOpacity
        onPress={() => actionOnCategory(title)}
        style={accordionMenuButton}
      >
        { children }
        <Text style={accordionMenuButtonTitle}>{buttonName}</Text>
      </TouchableOpacity>
  )
}

export default CustomButton;
