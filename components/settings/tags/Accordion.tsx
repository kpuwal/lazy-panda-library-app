import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colours } from "@styles/constants";
import { deleteLabelItem, deleteTitle, useAppDispatch } from "@reduxStates/index";
import Title from "./accordion/Title";
import Menu from "./accordion/Menu";
import Content from "./accordion/Content";
import AddTag from "./accordion/AddTag";
import { accordionBorderBottom, accordionContainer, accordionLabelContainerA } from "@styles/accordion";

interface Tags {
  title: string;
  image: string;
  labels: string[];
}

interface AccordionProps {
  tags: Tags;
  isLastItem: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ tags, isLastItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRemoveTag = (title: string, label: string) => {
    dispatch(deleteLabelItem({ title, labelToDelete: label }));
  }

  const handleRemoveCategory = (titleToDelete: string) => {
    dispatch(deleteTitle({ titleToDelete }));
  }

  return (
    <View 
      style={[
        { borderColor: isExpanded ? Colours.quinary : Colours.action },
        accordionContainer,
        isLastItem && accordionBorderBottom
      ]}
    >
      <Title title={tags.title} image={tags.image} isExpanded expandAccordion={handleToggle} />

      {isExpanded && (
        <>
          <Menu title={tags.title} removeCategory={handleRemoveCategory} />
          <Content customStyle={{backgroundColor: tags.labels.length === 0 ? 'transparent' : 'white'}}>
            {tags.labels.map((label) => (
              <Content.Label
                customStyle={accordionLabelContainerA}
                label={label}
                key={label}
              >
                <Content.Label.Delete
                  categoryTitle={tags.title}
                  label={label}
                  removeTag={handleRemoveTag}
                />
              </Content.Label>
            ))}
          </Content>
          <AddTag title={tags.title} />
        </>
      )}
    </View>
  );
};

export default Accordion;
