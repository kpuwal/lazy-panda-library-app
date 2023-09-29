import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Colours } from '../../../styles/constants';

type ItemProps = {
  element: string,
  select: Function,
  active?: string,
}

const Item = ({ element, select, active}: ItemProps) => {
  const handleSelect = (item: string) => {
    active === item ? select('') : select(item);
  }

  return (
    <TouchableOpacity
      onPress={() => handleSelect(element)}
      style={[
        styles.itemContainer,
        element === active ? styles.active : styles.inactive
      ]}
    >
      <Text style={
        element === active ? styles.active : styles.inactive
        }>
          {element}
      </Text>
    </TouchableOpacity>
  )
}

export default Item;

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: .5,
    borderColor: Colours.primary,
    borderRadius: 5,
    padding: 5,
    margin: 3
  },
  active: {
    color: Colours.primary,
    backgroundColor: Colours.secondary,
    fontFamily: 'Courier Prime',
    fontSize: 18
  },
  inactive: {
    color: Colours.secondary,
    backgroundColor: Colours.quinary,
    fontFamily: 'Courier Prime',
    fontSize: 18,
  },
  title: {
    color: Colours.secondary,
    padding: 5,
    fontFamily: 'Courier Prime Bold',
    fontWeight: 'bold',
    fontSize: 18,
  }
})