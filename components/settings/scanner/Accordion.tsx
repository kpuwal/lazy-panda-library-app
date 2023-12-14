import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colours } from "@styles/constants";
import { deleteLabelItem, deleteTitle, updateBookDataStatus, useAppDispatch } from "@reduxStates/index";
import { accordionBorderBottom, accordionContainer, accordionLabelContainerA, accordionTitle } from "@styles/accordion";
import CustomSwitch from "./CustomSwitch";

interface AccordionProps {
  data: {
    title: string;
    value?: string;
    status: boolean;
  };
  isLastItem: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ data, isLastItem }) => {
  const dispatch = useAppDispatch();

  // const handleToggle = () => {
  //   setIsExpanded(!isExpanded);
  // };

  const handleSwitchToggle = () => {
// console.log('switch ', data)

    dispatch(updateBookDataStatus({title: data.title, status: !data.status}))
    // data.status = !data.status;
  }

  return (
    <View 
      style={[
        styles.accordionContainer,
        isLastItem && accordionBorderBottom
      ]}
    >
      <Text style={accordionTitle}>
        {data.title}
      </Text>
      <CustomSwitch status={data.status} onToggle={handleSwitchToggle} />
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