import { accordionLabelText } from "@styles/accordion";
import { ReactNode, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Delete from "./Delete";
import { Colours } from "../../../styles/constants";

interface LabelProps {
  customStyle: any;
  label: string;
  onSelect?: () => void; // Callback for selection
  children?: ReactNode;
  selected?: boolean; // Indicate if the label is selected
}

type LabelComponents = React.FC<LabelProps> & {
  Delete: typeof Delete;
};

const Label: LabelComponents = ({ customStyle, label, onSelect, children, selected = false }) => {
  const handleSelect = () => {
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <TouchableOpacity onPress={handleSelect}>
      <View style={[customStyle, selected && styles.selected]}>
        <Text style={accordionLabelText}>{label}</Text>
        {children}
      </View>
    </TouchableOpacity>
  );
};

Label.Delete = Delete;
export default Label;

const styles = StyleSheet.create({
  selected: {
    color: Colours.primary,
    backgroundColor: Colours.secondary,
    fontFamily: 'Courier Prime',
    fontSize: 18
  },
});
