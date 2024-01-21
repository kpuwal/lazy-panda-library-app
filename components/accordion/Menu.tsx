import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { accordionMenuButton, accordionMenuButtonTitle, accordionMenuContainer } from "@styles/accordion";
import { Colours } from "@styles/constants";
import { ReactNode } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import CustomButton from './CustomButton';

interface MenuProps {
  children: ReactNode;
  // title: string;
  // removeCategory: (title: string) => void;
}

type MenuComponent = React.FC<MenuProps> & {
  Button: typeof CustomButton;
  // Title: typeof Title;
};

const Menu: MenuComponent = ({ children }) => {
  return (
    <View style={accordionMenuContainer}>
      { children }
      {/* <TouchableOpacity
        onPress={() => removeCategory(title)}
        style={accordionMenuButton}
      >
        <MaterialIcons
          name="delete-forever" 
          size={20} 
          color={Colours.secondary}
        />
        <Text style={accordionMenuButtonTitle}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => console.log('edit category')}
        style={accordionMenuButton}
      >
        <FontAwesome
          name="edit"
          size={18}
          color={Colours.secondary}
        />
        <Text style={accordionMenuButtonTitle}>Edit Title</Text>
      </TouchableOpacity> */}
    </View>
  )
}

Menu.Button = CustomButton;

export default Menu;