import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SECTION_ITEM_HEIGHT } from '@helpers/constants';

type SectionHeaderTypes = {
  title: string,
}

const SectionHeader = ({ title }: SectionHeaderTypes) => (
  <View style={styles.container}>
    <Text style={styles.sectionHeader}>{ title }</Text>
  </View>
);

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    height: SECTION_ITEM_HEIGHT,
    justifyContent: 'center'
  },
  sectionHeader: {
    backgroundColor: 'lightgray',
    height: SECTION_ITEM_HEIGHT,
    paddingHorizontal: 5,
    fontSize: 24,
    fontFamily: 'Courier Prime Bold',
  },
})