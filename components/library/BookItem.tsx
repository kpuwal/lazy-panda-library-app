import React from 'react';
import { RootState, useAppDispatch } from '../../redux/store';
import { navigate, setNavigationSource } from '../../redux/slices/navigationSlice';
import { displayBookData, sortLibrary } from '../../redux/slices/bookSlice';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Pressable } from 'react-native';
import { savingBookIsDisabled } from '../../redux/slices/appSlice';
import { Colours } from '../../styles/constants';
const SPACING = 15;

const BookItem = React.memo(({ item }: any) => {
  const dispatch = useAppDispatch();
  const MAX_TITLE_LENGTH = 40;

  // const titleLength = item.title.length;
  // let titleFontSize = 22; 

  // if (titleLength > 40) {
  //   titleFontSize = 18;
  // } else if (titleLength > 10) {
  //   titleFontSize = 20;
  // }

  const truncatedTitle = item.title.length > MAX_TITLE_LENGTH
    ? item.title.substring(0, MAX_TITLE_LENGTH - 3) + ' ...'
    : item.title;

  const handleBookPress = () => {
    dispatch(setNavigationSource('Library'));
    dispatch(displayBookData(item));
    dispatch(savingBookIsDisabled(false));
    dispatch(navigate('bookInfo'));
  };

  return (
    <Pressable
      onPress={handleBookPress}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? Colours.action : Colours.primary
        }
      ]}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text
            numberOfLines={2}
            lineBreakMode="tail" 
            style={styles.textTitle}
          >
              {item.title}
          </Text>
          <Text
            style={styles.textAuthor}
            numberOfLines={1}
            lineBreakMode="tail" 
          >
            {item.author}
          </Text>
        </View>
      </View>
    </Pressable>
  );
});

export default BookItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: SPACING,
    // marginBottom: SPACING,
    // height: 95,
    height: 80,
    width: '100%',
    // paddingHorizontal: 20,
    // borderRadius: 12,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 10
    // },
    // shadowOpacity: .1,
    // shadowRadius: 10,
    // backgroundColor: Colours.primary
  },
  textContainer: {
    // padding: SPACING,
    // textAlign: 'auto',
    // backgroundColor: 'yellow',
    maxWidth: '100%',
  },
  textTitle: {
    color: Colours.secondary,
    fontFamily:  'Courier Prime',
    fontWeight: 'bold',
    fontSize: 22,
  },
  textAuthor: {
    color: '#808080',
    fontFamily:  'Courier Prime',
    fontWeight: 'bold',
    fontSize: 16,
    // maxWidth: '96%', // Ensure the text doesn't exceed the view's width
    // maxHeight: '100%'
  },
})
