import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colours } from '../../../styles/constants';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../../redux/store';
import { updateBook } from '../../../redux/slices/bookSlice';

const Author = () => {
  const { book } = useSelector((state: RootState) => state.book);
  const dispatch = useAppDispatch();

  return (   
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, {fontSize: 20}]}
        onChangeText={(el: string) => dispatch(updateBook({author: el}))}
        value={book.author}
        editable
        multiline
        selectionColor='pink'
        numberOfLines={4}
        keyboardType={'default'}
      />
    </View>
  )
}

export default Author;

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Colours.quinary,
    marginBottom: '3%',
    marginHorizontal: 15,
    // height: 40,
    padding: 5
  },
  input: {
    lineHeight: 35,
    alignItems: 'center',
    // fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Courier Prime Bold',
    fontWeight: 'bold',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    right: 5,
    bottom: '9%'
  },
  info: {
    fontSize: 10,
    fontFamily: 'Courier Prime',
    color: '#9d9d9d'
  },
  img: {
    width: 200,
    height: 200
  }
});
