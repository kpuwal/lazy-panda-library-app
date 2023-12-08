import Header from "@components/header/Header";
import { RootState, addTitle, deleteLabelItem, deleteTitle, updateTags, useAppDispatch } from "@reduxStates/index";
import { Colours } from "@styles/constants";
import { buttonLong, buttonMid, headerInfoContainer, headerText } from "@styles/styles";
import { StatusBar } from "expo-status-bar";
import { View, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, Platform } from "react-native"
import { useSelector } from "react-redux";
import Accordion from "./Accordion";
import PrimaryButton from "@components/button/PrimaryButton";
import { buttonText } from "@styles/button";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import ImageSelector from "./ImageSelector";
import Accordion2 from "./Accordion2";
import { accordionLabelContainerA } from "@styles/accordion";

const Tags = () => {
  const { tags } = useSelector((state: RootState) => state.tags);
  const [newTitle, setNewTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const handleToggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddTitle = () => {
    dispatch(addTitle({ newTitle, image: selectedImage }));
    setNewTitle('');
    setSelectedImage('');
  };

  const handleRemoveCategory = (titleToDelete: string) => {
    dispatch(deleteTitle({ titleToDelete }));
  }

  const handleRemoveTag = (title: string, label: string) => {
    dispatch(deleteLabelItem({ title, labelToDelete: label }));
  }

  return (
<View style={{ flex: 1, backgroundColor: Colours.primary }}>
  <StatusBar style="dark" />
  <Header>
    <Header.GoBack />
    <View style={headerInfoContainer}>
      <Header.Icon uri={require('@assets/tag.gif')} />
      <Header.StyledText customStyle={headerText}>Tags</Header.StyledText>
    </View>
  </Header>

  
  <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.accordionContainer}>
          {tags.map((category, index) => (
            <Accordion
              key={category.title}
              category={category}
              isLastItem={index === tags.length - 1}
            />
          ))}
        </View>
        <ImageSelector
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
        />
        <View style={styles.newTitleContainer}>
          <TextInput
            style={styles.newTitleInput}
            placeholder="new tag category title"
            value={newTitle}
            onChangeText={(text) => setNewTitle(text.toUpperCase())}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTitle}>
            <MaterialIcons name="add-circle" size={30} color={Colours.secondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
  </KeyboardAvoidingView>

  <View style={{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10}}
  >
    <PrimaryButton
      action={() => dispatch(updateTags(tags))}
      customStyle={buttonMid}
    >
      <PrimaryButton.StyledText customStyle={buttonText}>
        Save Tags
      </PrimaryButton.StyledText>
      <MaterialCommunityIcons name="tag-plus" size={24} color="white" />
    </PrimaryButton>
  </View>
</View>

  )
}

export default Tags;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 10
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  accordionContainer: {
    backgroundColor: Colours.quinary,
    padding: 10,
    borderRadius: 15
  },
  newTitleContainer: {
    flexDirection: 'row',
    marginTop: 0,
    alignItems: 'center',
  },
  newTitleInput: {
    flex: 1,
    // width: '90%',
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
})
