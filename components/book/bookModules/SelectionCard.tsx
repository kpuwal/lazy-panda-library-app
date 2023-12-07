import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Colours } from '../../../styles/constants';
import { CATEGORY_IMAGES } from '@helpers/constants';
import { accordionTitle, accordionTitleImage, accordionTitleImageContainer } from '@styles/accordion';

type SelectionCardTypes = {
  data: string[],
  active?: string,
  select?: any,
  title: string,
  icon?: any,
}

type ItemTypes = {
  el: string,
  select: Function,
  active?: string,
}

const SelectionCard = ({data, select, active, title, icon}: SelectionCardTypes) => {

  const getImageSource = (categoryId: string) => {
    const selectedImage = CATEGORY_IMAGES.find((image) => image.id === categoryId);
    return selectedImage ? selectedImage.source : null;
  };

  return (
    <>
      <View style={styles.titleContainer}>
        {/* <View>{getImageSource(icon)}</View> */}
        <View style={accordionTitleImageContainer}>
        <Image
          source={getImageSource(icon)}
          style={accordionTitleImage}
        />
      </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.container}>
        {data.map((item: any, idx: any) => <Item key={idx} el={item} {...{select, active}} />)}
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
    marginTop: 30
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
    fontSize: 18

  },
  title: {
    color: Colours.secondary,
    padding: 5,
    fontFamily: 'Courier Prime Bold',
    fontSize: 18
  }
})
