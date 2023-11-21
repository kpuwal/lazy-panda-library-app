import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Colours } from "@styles/constants";

interface Category {
  title: string;
  labels: string[];
}

interface AccordionProps {
  category: Category;
  isLastItem: boolean
}

const Accordion: React.FC<AccordionProps> = ({ category, isLastItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={[{borderColor: isExpanded ? Colours.quinary : Colours.action}, styles.container, isLastItem && styles.borderBottom]}>
      <TouchableOpacity onPress={handleToggle} style={styles.titleContainer}>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <FontAwesome name={isExpanded ? "caret-up" : "caret-down"} size={18} color={Colours.secondary} />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.labelsContainer}>
          {category.labels.map((label) => (
            <Text key={label} style={styles.label}>
              {label}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingBottom: 5,
    borderBottomWidth: .5,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'Courier Prime Bold',
    marginBottom: 8,
    color: Colours.secondary
    // textDecorationLine: "underline",
  },
  borderBottom: {
    borderBottomWidth: 0, // Set to 0 for the last item
  },
  labelsContainer: {
    marginLeft: 16,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'Courier Prime',
  },
});

export default Accordion;
