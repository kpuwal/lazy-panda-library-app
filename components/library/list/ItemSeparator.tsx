import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colours } from '@styles/constants';
import { SPACING } from '@helpers/constants';

const ItemSeparator = () => <View style={styles.separator} />;

export default ItemSeparator;

const styles = StyleSheet.create({
  separator: {
    height: SPACING / 2,
    backgroundColor: Colours.tertiary // separator colour
  }
})