import Header from "@components/header/Header";
import { Colours } from "@styles/constants";
import { headerInfoContainer, headerText } from "@styles/styles";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Text } from "react-native";
import { CONSTANT_BOOK_DATA, ADDITIONAL_BOOK_DATA } from '@helpers/constants';
import Accordion from "./Accordion";
import ImageSelector from "../tags/ImageSelector";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@reduxStates/index";

const ScannerDataScreen = () => {
  const { bookData } = useSelector((state: RootState) => state.settings);

  const DATA = CONSTANT_BOOK_DATA.concat(ADDITIONAL_BOOK_DATA);
  const [selectedImage, setSelectedImage] = useState<string>('');

  return (
    <View style={{ flex: 1, backgroundColor: Colours.primary }}>
      <StatusBar style="dark" />
      <Header>
        <Header.GoBack />
        <View style={headerInfoContainer}>
          <Header.Icon uri={require('@assets/scanner-data.gif')} />
          <Header.StyledText customStyle={headerText}>Book Data</Header.StyledText>
        </View>
      </Header>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.accordionContainer}>
            {bookData.map((item, index) => (
              <Accordion
                key={index}
                data={item}
                isLastItem={index === ADDITIONAL_BOOK_DATA.length - 1}
              />
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default ScannerDataScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 10
  },
  accordionContainer: {
    backgroundColor: Colours.quinary,
    padding: 10,
    borderRadius: 15
  },
});
