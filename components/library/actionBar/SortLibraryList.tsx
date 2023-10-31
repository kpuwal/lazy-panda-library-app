import { RootState, setLibraryActiveListButton, useAppDispatch } from "@reduxStates/index";
import { Colours, Fonts } from "@styles/constants";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useSelector } from "react-redux";

const SortLibraryList = () => {
  const dispatch = useAppDispatch();
  const { libraryListActiveButton } = useSelector((state: RootState) => state.app);

  const handleSortByAuthor = () => {
    dispatch(setLibraryActiveListButton('AUTHOR'));
    // setActiveList(true);
  };

  const handleSortByTitle = () => {
    dispatch(setLibraryActiveListButton('TITLE'));
    // setActiveList(true);
  }

  const handleSortByDefault = () => {
    dispatch(setLibraryActiveListButton('DEFAULT'));
    // setActiveList(false);
  };
  return (
    <View style={[styles.subheaderSort, {flexDirection: 'column', alignItems: 'flex-start'}]}>
      <Text style={[styles.sortButtonText, {color: 'black', marginBottom: 10,}]}>Sort by:</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => handleSortByDefault()}
          style={[styles.sortButton, libraryListActiveButton === 'DEFAULT' ? styles.bgBlack : styles.bgWhite]}>
            <Text style={[libraryListActiveButton === 'DEFAULT' ? styles.white : styles.black, styles.sortButtonText]}>all</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSortByTitle()}
          style={[
            styles.sortButton, libraryListActiveButton === 'TITLE' ? 
              styles.bgBlack :
              styles.bgWhite
          ]}
        >
          <Text style={[libraryListActiveButton === 'TITLE' ? styles.white : styles.black, styles.sortButtonText]}>title</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSortByAuthor()}
          style={[styles.sortButton, libraryListActiveButton === 'AUTHOR' ? styles.bgBlack : styles.bgWhite]}>
          <Text style={[libraryListActiveButton === 'AUTHOR' ? styles.white : styles.black, styles.sortButtonText]}>author</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SortLibraryList;

const styles = StyleSheet.create({
  subheaderSort: {
    flex: 7
  },
  sortButton: {
    paddingVertical: 2.5,
    paddingHorizontal: 2.5,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 60,
  },
  sortButtonText: {
    fontSize: Fonts.small,
    fontWeight: 'bold',
    fontFamily:  'Courier Prime',
  },
  white: {
    color: 'white'
  },
  bgWhite: {
    backgroundColor: 'white',
    borderColor: Colours.secondary,
    borderWidth: .5
  },
  black: {
    color: Colours.secondary
  },
  bgBlack: {
    backgroundColor: Colours.secondary
  },
})
