import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SECTION_ITEM_HEIGHT } from '@helpers/constants';

type SectionHeaderTypes = {
  title: string,
}

const SectionHeader = ({ title }: SectionHeaderTypes) => (
  <Text style={styles.sectionHeader}>{ title }</Text>
);

export default SectionHeader;

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: 'lightgray',
    height: SECTION_ITEM_HEIGHT,
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
})