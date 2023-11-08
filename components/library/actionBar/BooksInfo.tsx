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
    <View style={styles.container}>
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
    </View>
  );
};

export default BooksInfo;

const styles = StyleSheet.create({
  container: {
    height: 60
  },
  sortButtonText: {
    fontSize: Fonts.small,
    fontFamily:  'Courier Prime',
  },
  filterDisplay: {
    alignItems: 'flex-start',
    paddingHorizontal: 15
  },
  booksNumber: {
    paddingHorizontal: 15,
  },
  black: {
    color: Colours.secondary
  },
})