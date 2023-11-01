import { RootState, setLibraryActiveListButton, toggleAlphabetList, useAppDispatch } from "@reduxStates/index";
import { Colours, Fonts } from "@styles/constants";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import SortButton from "./SortButton";

const LibraryListSorter = () => {
  const dispatch = useAppDispatch();
  const { libraryListActiveButton } = useSelector((state: RootState) => state.app);

  const handleSortByAuthor = () => {
    dispatch(setLibraryActiveListButton('AUTHOR'));
    dispatch(toggleAlphabetList(true));
    // setActiveList(true);
  };

  const handleSortByTitle = () => {
    dispatch(setLibraryActiveListButton('TITLE'));
    dispatch(toggleAlphabetList(true));
  }

  const handleSortByDefault = () => {
    dispatch(setLibraryActiveListButton('DEFAULT'));
    dispatch(toggleAlphabetList(false));
  };
  return (
    <View style={[styles.subheaderSort, {flexDirection: 'column', alignItems: 'flex-start'}]}>
      <Text style={styles.sortButtonText}>
        Sort by:
      </Text>
      <View style={{flexDirection: 'row'}}>
      <SortButton
          label="all"
          active={libraryListActiveButton === "DEFAULT"}
          onPress={handleSortByDefault}
        />
        <SortButton
          label="title"
          active={libraryListActiveButton === "TITLE"}
          onPress={handleSortByTitle}
        />
        <SortButton
          label="author"
          active={libraryListActiveButton === "AUTHOR"}
          onPress={handleSortByAuthor}
        />
      </View>
    </View>
  )
}

export default LibraryListSorter;

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
    color: 'black',
    marginBottom: 10,
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
