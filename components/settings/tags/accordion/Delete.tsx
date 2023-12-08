import { MaterialIcons } from "@expo/vector-icons";
import { accordionLabelDeleteButton } from "@styles/accordion";
import { Colours } from "@styles/constants";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";

interface LabelDeleteProps {
  categoryTitle: string;
  label: string;
  removeTag: (categoryTitle: string, label: string) => void;
}

const Delete: React.FC<LabelDeleteProps> = ({ categoryTitle, label, removeTag }) => {
  return (
    <TouchableOpacity
      style={accordionLabelDeleteButton}
      onPress={() => removeTag(categoryTitle, label)}>
      <MaterialIcons name="remove-circle" size={15} color={Colours.secondary} />
    </TouchableOpacity>
  )
}

export default Delete;