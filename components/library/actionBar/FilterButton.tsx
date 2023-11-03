import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colours, Fonts } from '@styles/constants';

type FilterButtonProps = {
  onPress: () => void;
};

const FilterButton: React.FC<FilterButtonProps> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.subheaderFilter}>
      {({ pressed }) => (
        <>
          <MaterialCommunityIcons
            name="filter-menu"
            size={28}
            color={pressed ? Colours.filter : Colours.secondary}
          />
          <Text
            style={[
              styles.sortButtonText,
              {
                color: pressed ? Colours.filter : Colours.secondary,
              },
            ]}
          >
            Filter
          </Text>
        </>
      )}
    </Pressable>
  );
};

export default FilterButton;

const styles = StyleSheet.create({
  subheaderFilter: {
    flex: 3,
    flexDirection: 'row',
    borderRightWidth: 1,
    paddingRight: 10,
    marginRight: 10,
    borderColor: Colours.tertiary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sortButtonText: {
    fontSize: Fonts.small,
    fontFamily:  'Courier Prime',
  },
})
