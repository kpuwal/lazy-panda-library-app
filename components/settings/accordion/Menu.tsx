import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { accordionMenuButton, accordionMenuButtonTitle, accordionMenuContainer } from "@styles/accordion";
import { Colours } from "@styles/constants";
import { TouchableOpacity, View, Text } from "react-native";

interface MenuTypes {
  title: string;
  removeCategory: (title: string) => void;
}

const Menu: React.FC<MenuTypes> = ({ title, removeCategory }) => {
  return (
    <View style={accordionMenuContainer}>
      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  )
}

export default Menu;