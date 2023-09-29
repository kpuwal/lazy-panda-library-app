import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
// import TextCard from './TextCard';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../../redux/store';
import { updateBook } from '../../../redux/slices/bookSlice';
import { Colours } from '../../../styles/constants';

const NumbersCard = () => {
  const { book } = useSelector((state: RootState) => state.book);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <View style={styles.inputContainer}>
          <Text style={styles.header}>Language</Text>
          <TextInput
            style={[styles.input, {fontSize: 20}]}
            onChangeText={(el: string) => dispatch(updateBook({language: el}))}
            value={book.language}
            editable
            multiline
            selectionColor='pink'
            numberOfLines={4}
            keyboardType={'default'}
          />
        </View>
      </View>
      <View style={styles.box2}>
      <View style={styles.inputContainer}>
        <Text style={styles.header}>Page Count</Text>
          <TextInput
            style={[styles.input, {fontSize: 20}]}
            onChangeText={(el: string) => dispatch(updateBook({pageCount: el}))}
            value={book.pageCount.toString()}
            editable
            multiline
            selectionColor='pink'
            numberOfLines={4}
            keyboardType={'numeric'}
          />
        </View>
      </View>
      <View style={styles.box3}>
        <View style={styles.inputContainer}>
          <Text style={styles.header}>Published Date</Text>
          <TextInput
            style={[styles.input, {fontSize: 20}]}
            onChangeText={(el: string) => dispatch(updateBook({publishedDate: el}))}
            value={book.publishedDate}
            editable
            multiline
            selectionColor='pink'
            numberOfLines={4}
            keyboardType={'default'}
          />
        </View>
      </View>
    </View>
  )
}

export default NumbersCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 12,
    color: Colours.secondary,
    fontFamily: 'Courier Prime',
  },
  value: {
    fontSize: 20,
    fontFamily: 'Courier Prime',
  },
  box1:{},
  box2: {
    // borderLeftWidth: .5,
    // borderRightWidth: .5,
    // borderColor: Colours.tertiary,
    paddingHorizontal: 18,
  },
  box3: {},
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
})
