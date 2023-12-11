import Header from "@components/header/Header";
import { Colours } from "@styles/constants";
import { headerInfoContainer, headerText } from "@styles/styles";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity } from "react-native"
import ImageSelector from "../tags/ImageSelector";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import { RootState } from "@reduxStates/index";
import Accordion from "./Accordion";

const Category = () => {
  const [newTitle, setNewTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { categories } = useSelector((state: RootState) => state.categories);

  const handleAddTitle = () => {
    console.log('add category title')
    // dispatch(addTitle({ newTitle, image: selectedImage }));
    // setNewTitle('');
    // setSelectedImage('');
  };

  useEffect(() => {
    console.log('cats ', categories)
  })

  return (
    <View style={{ flex: 1, backgroundColor: Colours.primary }}>
      <StatusBar style="dark" />
      <Header>
        <Header.GoBack />
        <View style={headerInfoContainer}>
          <Header.Icon uri={require('@assets/category.gif')} />
          <Header.StyledText customStyle={headerText}>Categories</Header.StyledText>
        </View>
      </Header>
      
      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.accordionContainer}>
        {categories.map((category, index) => (
            <Accordion
              key={category}
              category={category}
              isLastItem={index === categories.length - 1}
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
            placeholder="new library category title"
            value={newTitle}
            onChangeText={(text) => setNewTitle(text.toUpperCase())}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTitle}>
            <MaterialIcons name="add-circle" size={30} color={Colours.secondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
  </KeyboardAvoidingView>
    </View>
  )
}

export default Category;

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
