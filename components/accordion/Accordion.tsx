import React, { ReactNode, useState } from 'react';
import { View } from 'react-native';
import StyledText from '@components/StyledText';
import Title from './Title';
import { Colours } from '@styles/constants';
import { accordionBorderBottom, accordionContainer } from '@styles/accordion';
import Menu from './Menu';

type BookDataType = {
  title: string,
  value?: string,
  status?: boolean,
  image?: string
}

interface AccordionProps {
  children: ReactNode,
  isLastItem: boolean;
  category: BookDataType;
}

type AccordionComponent = React.FC<AccordionProps> & {
  StyledText: typeof StyledText;
  Menu: typeof Menu;
  // Title: typeof Title;
};

const Accordion: AccordionComponent = ({ children, category, isLastItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <View style={[
      { borderColor: isExpanded ? Colours.quinary : Colours.action },
      accordionContainer,
      isLastItem && accordionBorderBottom
    ]}>
      <Title
        title={category.title}
        image={category.image || null}
        isExpanded={isExpanded}
        expandAccordion={handleToggle}
      />
      {
        isExpanded && (
          <>
            { children }
          </>
        )
      }
    </View>
  )
}

Accordion.Menu = Menu;
Accordion.StyledText = StyledText;
// Accordion.GoBack = GoBack;

export default Accordion;
