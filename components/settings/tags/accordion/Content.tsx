import { accordionLabelsContainer } from "@styles/accordion";
import { ReactNode } from "react";
import { View } from "react-native";
import Label from "./Label";

interface ContentProps {
  children: ReactNode;
  customStyle: any;
}

type ContentComponent = React.FC<ContentProps> & {
  Label: typeof Label;
};

const Content: ContentComponent = ({ children, customStyle }) => {
  return (
    <View style={[accordionLabelsContainer, customStyle]}>
      { children }
    </View>
  )
}

Content.Label = Label;

export default Content;