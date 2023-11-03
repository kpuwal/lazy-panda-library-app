import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colours, Fonts } from '@styles/constants';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxStates/index';

const BooksInfo = () => {
  const { booksNumber, selectedFilterHeader, libraryIsFiltered } = useSelector((state: RootState) => state.library);
  
  const toUpperCase = () => {
    return selectedFilterHeader.type.charAt(0).toUpperCase() + selectedFilterHeader.type.slice(1);
  };

  return (
    <>
      <View style={styles.booksNumber}>
        <Text style={[styles.sortButtonText, { paddingTop: 10 }]}>{booksNumber} books</Text>
      </View>

      {libraryIsFiltered ? (
        <View style={styles.filterDisplay}>
          <Text style={[styles.sortButtonText, styles.black]}>
            {toUpperCase()}: {selectedFilterHeader.item}
          </Text>
        </View>
      ) : (
        <View style={styles.filterDisplay} />
      )}
    </>
  );
};

export default BooksInfo;

const styles = StyleSheet.create({
  sortButton: {
    paddingVertical: 2.5,
    paddingHorizontal: 2.5,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 60,
  },
  sortButtonText: {
    fontSize: Fonts.small,
    fontFamily:  'Courier Prime',
  },
  filterDisplay: {
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    // paddingTop: 15,
    // backgroundColor: Colours.secondary,
    // paddingTop: 10,
  },
  booksNumber: {
    paddingHorizontal: 15,
  },
  black: {
    color: Colours.secondary
  },
})