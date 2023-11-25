import { accordionLabelText } from "@styles/accordion";
import { ReactNode } from "react";
import { View, Text } from "react-native";
import Delete from "./Delete";

interface LabelProps {
  customStyle: any;
  label: string;
  children?: ReactNode;
}

type LabelComponents = React.FC<LabelProps> & {
  Delete: typeof Delete;
}

const Label: LabelComponents = ({ customStyle, label, children }) => {
 return (
 <View style={customStyle}>
    <Text style={accordionLabelText}>{label}</Text>
    { children }
 </View>
 )
}

Label.Delete = Delete;
export default Label;