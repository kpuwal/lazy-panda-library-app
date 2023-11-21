import { SelectionCard } from "@components/book";
import Header from "@components/header/Header";
import { RootState } from "@reduxStates/index";
import { Colours } from "@styles/constants";
import { buttonLong, headerInfoContainer, headerText } from "@styles/styles";
import { StatusBar } from "expo-status-bar";
import { View, ScrollView, StyleSheet } from "react-native"
import { useSelector } from "react-redux";
import Accordion from "./Accordion";
import PrimaryButton from "@components/button/PrimaryButton";
import { buttonText } from "@styles/button";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tags = () => {
  const { tags } = useSelector((state: RootState) => state.tags);

  return (
    <View style={{flex: 1, backgroundColor: Colours.primary}}>
      <StatusBar style="dark" />
      <Header>
        <Header.GoBack />
        <View style={headerInfoContainer}>
          <Header.Icon uri={require('@assets/tag.gif')} />
          <Header.StyledText customStyle={headerText}>Tags</Header.StyledText>
        </View>
      </Header>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.accordionContainer}>
          {tags.map((category, index) => (
              <Accordion key={category.title} category={category} isLastItem={index === tags.length - 1} />
            ))}
        </View>
        <PrimaryButton action={() => console.log('click')} customStyle={buttonLong}>
          <PrimaryButton.StyledText customStyle={buttonText}>
            Add Tag Title
          </PrimaryButton.StyledText>
          <MaterialCommunityIcons name="tag-plus" size={24} color="white" />
        </PrimaryButton>
      </ScrollView>
    </View>
  )
}

export default Tags;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
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
  }
})
