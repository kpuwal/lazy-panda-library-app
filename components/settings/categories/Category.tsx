import Header from "@components/header/Header";
import { Colours } from "@styles/constants";
import { buttonSml, headerInfoContainer, headerText } from "@styles/styles";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Text } from "react-native"
import ImageSelector from "../tags/ImageSelector";
import { useEffect, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import { RootState } from "@reduxStates/index";
import Accordion from "./Accordion";
import OverlayModal from "@components/modal/OverlayModal";
import PrimaryButton from "@components/button/PrimaryButton";
import { buttonText } from "@styles/button";

const Category = () => {
  const [newTitle, setNewTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isInfoVisible, setInfoVisible] = useState(false);
  const { categories, bookData } = useSelector((state: RootState) => state.settings);

  const bookCategories = bookData.filter(item => item.status === true);

  const handleAddTitle = () => {
    console.log('add category title')
    // dispatch(addTitle({ newTitle, image: selectedImage }));
    // setNewTitle('');
    // setSelectedImage('');
  };

  const handlePress = () => {
    setInfoVisible(true);
  };

  const handleClose = () => {
    setInfoVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colours.primary }}>
      <StatusBar style="dark" />
      <Header>
        <Header.GoBack />
        <View style={headerInfoContainer}>
          <Header.Icon uri={require('@assets/category.gif')} />
          <Header.StyledText customStyle={headerText}>
            Categories
          </Header.StyledText>

          <TouchableOpacity onPress={handlePress}>
            <Ionicons style={{paddingLeft: 50}} name="information-circle-outline" size={24} color="black" />
          </TouchableOpacity>

          <OverlayModal isVisible={isInfoVisible}>
            <OverlayModal.StyledText customStyle={styles.infoTextStyle}>
              Add user categories which are headers for columns in spreadsheet file
            </OverlayModal.StyledText>
            <View style={{alignItems: 'center'}}>
              <PrimaryButton action={handleClose} customStyle={buttonSml}>
                <Ionicons name="ios-close" size={20} color="white" />
                <PrimaryButton.StyledText customStyle={buttonText}>
                  Close
                </PrimaryButton.StyledText>
              </PrimaryButton>
            </View>
          </OverlayModal>
        </View>
      </Header>
      
      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Additional Book Scanner Categories:</Text>
        <View style={styles.accordionContainer}>
          {bookCategories.map((category, index) => (
            <Accordion
              key={index}
              category={category}
              isLastItem={index === bookCategories.length - 1}
            />
          ))}
        </View>

        <Text style={styles.title}>User Input Categories:</Text>
<View style={styles.categoryContainer}>

        <View style={styles.accordionContainer}>
          {categories.userInputCategories.map((category, index) => (
            <Accordion
              key={index}
              category={category}
              isLastItem={index === categories.userInputCategories.length - 1}
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
  // categoryContainer: {
  //   marginBottom: 16,
  // },
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
  title: {
    fontFamily: 'Courier Prime Bold',
    fontSize: 16,
    paddingBottom: 10,
    paddingTop: 10
  },
  categoryContainer: {
    padding: 10
  },
  infoTextStyle: {
    fontFamily: 'Courier Prime',
    fontSize: 16,
    maxWidth: '90%'
  }
})
