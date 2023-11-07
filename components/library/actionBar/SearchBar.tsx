import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setSearchQuery, useAppDispatch } from '@reduxStates/index';
import { Colours, Fonts } from '@styles/constants';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useSelector((state: RootState) => state.library);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
    // Implement search functionality here
  };

  return (
    <View style={styles.container}>
      {/* <MaterialCommunityIcons name="book-search" size={24} color={Colours.secondary} /> */}
      <Ionicons name="search-circle-sharp" size={28} color={Colours.secondary} style={styles.icon} />
      <TextInput
        placeholder="Search..."
        value={searchQuery.toString()}
        onChangeText={handleSearch}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '94%',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colours.tertiary,
    borderRadius: 8,
    marginHorizontal: '3%',
    marginVertical: '2%',
    paddingHorizontal: 5
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: Fonts.small,
    fontFamily:  'Courier Prime',
  },
});

export default SearchBar;
