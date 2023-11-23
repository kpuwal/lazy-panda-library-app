import { StyleSheet } from 'react-native';
import { Colours } from './constants';

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

export const accordionTitleContainer = accordionTitleStyle.container;
export const accordionTitle = accordionTitleStyle.titleText;
export const accordionTitleImageContainer = accordionTitleStyle.imageContainer;
export const accordionTitleImage = accordionTitleStyle.image;


