import { StyleSheet } from 'react-native';
import { Colours } from './constants';

const buttonStyle = StyleSheet.create({
  container: {
    width: '40%',
    // height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // paddingHorizontal: 10,
    paddingVertical: 3,
    // marginVertical: 5,
    borderRadius: 10,
    backgroundColor: Colours.secondary,
  },
  text: {
    left: 8,
    right: 8,
    fontSize: 16,
    fontFamily: 'Courier Prime',
    color: Colours.primary,
  },
  // goBackButton: {
  //   flex: 1, // Take up 10% of the available space
  //   alignItems: 'flex-start',
  //   justifyContent: 'center',
  //   marginRight: 10,
  //   height: 30,
  // },
  // headerInfo: {
  //   flex: 9, // Take up 90% of the available space
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // }
})

export const buttonContainer = buttonStyle.container;
export const buttonText = buttonStyle.text;
