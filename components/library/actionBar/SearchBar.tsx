import { TextInput, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState, readLibrary, setLibraryActiveListButton, setSearchQuery, toggleAlphabetList, useAppDispatch } from '@reduxStates/index';
import { Colours, Fonts } from '@styles/constants';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useSelector((state: RootState) => state.library);

  const handleSearch = (query: string) => {

    if (query !== searchQuery) {
      dispatch(setLibraryActiveListButton('DEFAULT'));
      dispatch(toggleAlphabetList(false));
      if (query !== '') {
        dispatch(setSearchQuery(query));
      } else {
        dispatch(readLibrary());
        dispatch(setSearchQuery(''));
      }
    }
  };

  return (
    <View style={styles.container}>
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
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colours.tertiary,
    borderRadius: 8,
    marginHorizontal: 10,
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
