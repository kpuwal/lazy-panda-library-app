import { ReactNode } from "react";
import { View } from "react-native"
import Title from "./accordion/Title";
import { accordionBorderBottom, accordionContainer, accordionMainContainer } from "@styles/accordion";
import { Colours } from "@styles/constants";
import Menu from "./accordion/Menu";
import Content from "./accordion/Content";
import AddTag from "./accordion/AddTag";

interface AccordionProps {
  children: ReactNode;
  isExpanded: boolean;
  isLastItem: boolean;
}

type AccordionComponent = React.FC<AccordionProps> & {
  Title: typeof Title;
  Menu: typeof Menu;
  Content: typeof Content;
  AddTag: typeof AddTag;
}

const Accordion2: AccordionComponent = ({ children, isExpanded, isLastItem }) => {
  return (
    <View  style={[
      { borderColor: isExpanded ? Colours.quinary : Colours.action },
      accordionContainer,
      isLastItem && accordionBorderBottom
    ]}>
      { children }
    </View>
  )
}

Accordion2.Title = Title;
Accordion2.Menu = Menu;
Accordion2.Content = Content;
Accordion2.AddTag = AddTag;

export default Accordion2;
