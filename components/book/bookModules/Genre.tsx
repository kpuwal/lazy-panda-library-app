import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colours } from '../../../styles/constants';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../../reduxStates/store';
import { updateBook } from '../../../reduxStates/slices/bookSlice';

type SelectionCardTypes = {
  data: {label: string, value: string}[],
  active?: string,
  select: any,
  title: string,
  icon?: any,
}

type ItemTypes = {
  el: string,
  select: Function,
  active?: string,
}

const SelectionCard = ({data, select, active, title, icon}: SelectionCardTypes) => {
  const picker = useSelector((state: RootState) => state.pickers);
  const { book } = useSelector((state: RootState) => state.book);
  const dispatch = useAppDispatch();

  return (
    <>
      <View style={styles.titleContainer}>
        <View>{icon}</View>
        <Text style={styles.title}>Genre:</Text>
      </View>
      <View style={styles.container}>
        {data.map((item, idx) => <Item key={idx} el={item.value} {...{select, active}} />)}
      </View>
    </>
  )
}

const Item = ({el, select, active}: ItemTypes) => {
  const handleSelect = (item: string) => {
    active === item ? select('') : select(item);
  }

  return (
    <TouchableOpacity
      style={[styles.itemContainer, el === active ? styles.active : styles.inactive]}
      onPress={() => handleSelect(el)}
    >
      <Text style={el === active ? styles.active : styles.inactive}>{el}</Text>
    </TouchableOpacity>
  )
}

export default SelectionCard;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 30,
    // borderTopColor: Colours.seco,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15
  },
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
    // borderWidth: .5,
    // border: Colours.secondary,
    // borderRadius: 5,
    // padding: 3,

  },
  title: {
    color: Colours.secondary,
    padding: 5,
    fontFamily: 'Courier Prime Bold',
    fontSize: 18,
  }
})
