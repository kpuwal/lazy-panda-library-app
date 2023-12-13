import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colours } from "@styles/constants";
import { deleteLabelItem, deleteTitle, useAppDispatch } from "@reduxStates/index";
import { accordionBorderBottom, accordionContainer, accordionLabelContainerA, accordionTitle } from "@styles/accordion";
import CustomSwitch from "./CustomSwitch";

interface ScanData {
  title: string;
  value: string;
}

interface AccordionProps {
  data: ScanData;
  isLastItem: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ data, isLastItem }) => {
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
        styles.accordionContainer,
        isLastItem && accordionBorderBottom
      ]}
    >
      <Text style={accordionTitle}>
        {data.title}
      </Text>
      <CustomSwitch />
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  accordionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: .5,
  }
})