import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colours } from "@styles/constants";
import { addTagUnderTitle, deleteLabelItem, deleteTitle, useAppDispatch } from "@reduxStates/index";

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
  const [newTag, setNewTag] = useState('');
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddTag = () => {
    dispatch(addTagUnderTitle({ title: category.title, newTag }));
    setNewTag('');
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
        styles.container,
        isLastItem && styles.borderBottom
      ]}
    >
      <TouchableOpacity onPress={handleToggle} style={styles.titleContainer}>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <FontAwesome name={isExpanded ? "caret-up" : "caret-down"} size={18} color={Colours.secondary} />
      </TouchableOpacity>
      {isExpanded && (
        <>
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => handleRemoveCategory(category.title)} style={styles.menuButton}>
              <MaterialIcons name="delete-forever" size={20} color={Colours.secondary} />
              <Text style={styles.menuButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('edit category')} style={styles.menuButton}>
              <FontAwesome name="edit" size={18} color={Colours.secondary} />
              <Text style={styles.menuButtonText}>Edit Title</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.labelsContainer}>
            {category.labels.map((label) => (
              <View style={styles.labelContainer} key={label}>
                <Text style={styles.label}>
                  {label}
                </Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleRemoveTag(category.title, label)}>
                  <MaterialIcons name="remove-circle" size={15} color={Colours.secondary} />
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.newTagContainer}>
              <TextInput
                style={styles.newTagInput}
                placeholder="add new tag"
                value={newTag}
                onChangeText={(text) => setNewTag(text)}
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddTag}>
                <MaterialIcons name="add-circle" size={24} color={Colours.secondary} />
              </TouchableOpacity>
            </View>
          </View>


        </>
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
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5
    // justifyContent: 'space-around',
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    padding: 5,
    // backgroundColor: Colours.primary,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10
  },
  menuButtonText: {
    paddingLeft: 10,
    fontFamily: 'Courier Prime',
  },
  labelsContainer: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    marginLeft: 16,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  labelContainer: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    alignText: 'center'
  },
  deleteButton: {
    padding: 3,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    // marginBottom: 4,
    fontFamily: 'Courier Prime',
    paddingHorizontal: 5,
    // paddingVertical: 5,
  },

  newTagContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  newTagInput: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colours.secondary,
    paddingHorizontal: 10,
  },
  addButton: {
    marginLeft: 10,
    // backgroundColor: Colours.secondary,
    // padding: 10,
    // borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
  },
});

export default Accordion;
