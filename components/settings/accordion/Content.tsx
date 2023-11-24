import { accordionLabelsContainer } from "@styles/accordion";
import { ReactNode } from "react";
import { View } from "react-native";
import Label from "./Label";
import LabelDelete from "./Delete";

interface ContentProps {
  children: ReactNode;
}

type ContentComponent = React.FC<ContentProps> & {
  Label: typeof Label;
  // LabelDelete: typeof LabelDelete;
  // LabelInput: typeof LabelInput;
};

const Content: ContentComponent = ({ children }) => {
  return (
    <View style={accordionLabelsContainer}>
      { children }
    </View>
  )
}

Content.Label = Label;

export default Content;