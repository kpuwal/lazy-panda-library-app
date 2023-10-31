import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colours } from '@styles/constants';

const ItemSeparator = () => <View style={styles.separator} />;

export default ItemSeparator;

const styles = StyleSheet.create({
  separator: {
    height: .5,
    backgroundColor: Colours.tertiary // separator colour
  }
})