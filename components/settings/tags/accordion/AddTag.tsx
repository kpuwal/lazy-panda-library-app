import { MaterialIcons } from "@expo/vector-icons";
import { addTagUnderTitle, useAppDispatch } from "@reduxStates/index";
import { accordionNewTagButton, accordionNewTagContainer, accordionNewTagInput } from "@styles/accordion";
import { Colours } from "@styles/constants";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface AddTagProps {
  title: string;
}

const AddTag: React.FC<AddTagProps> = ({ title }) => {
  const [newTag, setNewTag] = useState('');
  const dispatch = useAppDispatch();

  const handleAddTag = () => {
    dispatch(addTagUnderTitle({ title, newTag }));
    setNewTag('');
  };
  
  return (
    <View style={accordionNewTagContainer}>
      <TextInput
        style={accordionNewTagInput}
        placeholder="add new tag"
        value={newTag}
        onChangeText={(text) => setNewTag(text)}
      />
      <TouchableOpacity style={accordionNewTagButton} onPress={handleAddTag}>
        <MaterialIcons name="add-circle" size={24} color={Colours.secondary} />
      </TouchableOpacity>
    </View>
  )
}

export default AddTag;