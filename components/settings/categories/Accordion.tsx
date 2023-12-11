import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colours } from "@styles/constants";
import { deleteLabelItem, deleteTitle, useAppDispatch } from "@reduxStates/index";
import Title from "../tags/accordion/Title";
import Menu from "../tags/accordion/Menu";
import Content from "../tags/accordion/Content";
import AddTag from "../tags/accordion/AddTag";
import { accordionBorderBottom, accordionContainer, accordionLabelContainerA } from "@styles/accordion";

interface AccordionProps {
  category: string;
  isLastItem: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ category, isLastItem }) => {
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
      <Title title={category} image={'img1'} isExpanded expandAccordion={handleToggle} />

      {isExpanded && (
        <>
          <Menu title={category} removeCategory={handleRemoveCategory} />
          {/* <AddTag title={tags.title} /> */}
        </>
      )}
    </View>
  );
};

export default Accordion;
