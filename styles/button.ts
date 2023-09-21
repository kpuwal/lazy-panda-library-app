import { StyleSheet } from 'react-native';
import { Colours } from './constants';

const buttonStyle = StyleSheet.create({
  container: {
    // width: '40%',
    // height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 10,
    borderRadius: 5,
    // backgroundColor: Colours.secondary,

  },
  text: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontFamily: 'Courier Prime',
    // color:  '#33CCCC',

    color: Colours.primary,
    textAlign: 'center',
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
