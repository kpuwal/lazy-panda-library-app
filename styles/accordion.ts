import { StyleSheet } from 'react-native';
import { Colours } from './constants';

const accordionStyle = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: .5,
  },
  borderBottom: {
    borderBottomWidth: 0,
  }
})

const accordionTitleStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontFamily: 'Courier Prime Bold',
    color: Colours.secondary,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 10
  },
})

const accordionMenuStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10
  },
  buttonTitle: {
    paddingLeft: 10,
    fontFamily: 'Courier Prime',
  }
})

const accordionLabelsStyle = StyleSheet.create({
  container: {
    marginLeft: 16,
    // backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  }
})

const accordionLabelStyle = StyleSheet.create({
  containerInSettings: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    alignText: 'center'
  },
  containerInLibrary: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  text: {
    fontSize: 16,
    fontFamily: 'Courier Prime',
    paddingHorizontal: 5,
  },
  deleteButton: {
    padding: 3,
    justifyContent: 'center',
  },
})

const accordionNewTagStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colours.secondary,
    paddingHorizontal: 10,
    marginLeft: 15
  },
  button: {
    marginLeft: 10
  }
})

// Accordion
export const accordionContainer = accordionStyle.container;
export const accordionBorderBottom = accordionStyle.borderBottom;
// Title
export const accordionTitleContainer = accordionTitleStyle.container;
export const accordionTitle = accordionTitleStyle.titleText;
export const accordionTitleImageContainer = accordionTitleStyle.imageContainer;
export const accordionTitleImage = accordionTitleStyle.image;
// Menu
export const accordionMenuContainer = accordionMenuStyle.container;
export const accordionMenuButton = accordionMenuStyle.button;
export const accordionMenuButtonTitle = accordionMenuStyle.buttonTitle;
// Labels
export const accordionLabelsContainer = accordionLabelsStyle.container;
// Label
export const accordionLabelContainerA = accordionLabelStyle.containerInSettings;
export const accordionLabelContainerB = accordionLabelStyle.containerInLibrary;
export const accordionLabelText = accordionLabelStyle.text;
export const accordionLabelDeleteButton = accordionLabelStyle.deleteButton;
// New Tag
export const accordionNewTagContainer = accordionNewTagStyle.container;
export const accordionNewTagInput = accordionNewTagStyle.input;
export const accordionNewTagButton = accordionNewTagStyle.button;
