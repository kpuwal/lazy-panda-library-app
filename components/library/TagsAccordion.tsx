import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colours } from "@styles/constants";
import { deleteLabelItem, deleteTitle, useAppDispatch } from "@reduxStates/index";
import Title from "@components/settings/accordion/Title";
import Content from "@components/settings/accordion/Content";
import { accordionBorderBottom, accordionContainer, accordionLabelContainerA, accordionLabelContainerB } from "@styles/accordion";

interface Category {
  title: string;
  image: string;
  labels: string[];
}

interface AccordionProps {
  category: Category;
  isLastItem: boolean;
}

const TagsAccordion: React.FC<AccordionProps> = ({ category, isLastItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLabelSelect = (label: string) => {
    setSelectedLabel(label);
    // You can perform additional actions here if needed
  };

  return (
    <View 
      style={[
        { borderColor: isExpanded ? Colours.quinary : Colours.action },
        accordionContainer,
        isLastItem && accordionBorderBottom
      ]}
    >
      <Title title={category.title} image={category.image} isExpanded={isExpanded} expandAccordion={handleToggle} />

      {isExpanded && (
        <>
          <Content customStyle={{backgroundColor: category.labels.length === 0 ? 'transparent' : 'white'}}>
            {category.labels.map((label) => (
              <Content.Label
                customStyle={accordionLabelContainerB}
                label={label}
                key={label}
                onSelect={() => handleLabelSelect(label)}
                selected={selectedLabel === label}
              />
            ))}
          </Content>
        </>
      )}
    </View>
  );
};

export default TagsAccordion;
