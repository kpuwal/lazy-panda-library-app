import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, SectionList, Pressable, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { librarySectionType, readLibrary, resetSelectedFilters, sortLibraryByAuthor, sortLibraryByTitle, resetLibraryMessages, BookType, resetBookMessages, RootState, useAppDispatch, toggleAlphabetList, toggleFilterModal, setLibraryActiveListButton } from '@reduxStates/index';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colours, Fonts } from '@styles/constants';
import { headerInfoContainer } from '@styles/styles';
import Header from '@components/header/Header';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FilterModal, AlphabetList, LibraryLoader, LibraryOverlay, TitleList, AuthorList, DefaultList, LibraryListSorter, FilterButton, BooksInfo } from '@library/index';
import { HEADER_HEIGHT, ITEM_HEIGHT, SECTION_ITEM_HEIGHT, SPACING } from '@helpers/constants';

type LibraryViewType = {
  TITLE: React.ComponentType;
  AUTHOR: React.ComponentType;
};

const SortedLibraryBooks: LibraryViewType = {
  TITLE: TitleList,
  AUTHOR: AuthorList
}

const Library = forwardRef((_props, ref) => {
  const dispatch = useAppDispatch();
  
  const { height } = Dimensions.get('window');
  const { librarySortedByAuthor, libraryIsLoaded, booksNumber, selectedFilterHeader } = useSelector((state: RootState) => state.library);
const { libraryListActiveButton, isAlphabetListActive } = useSelector((state: RootState) => state.app);

  const [modalVisible, setModalVisible] = useState(false);
  const [scrollToTop, setScrollToTop] = useState(false);

  const sectionListRef = useRef<SectionList>(null);

  const { selectedFilters, libraryIsFiltered } = useSelector((state: RootState) => state.library);
  const [activeButton, setActiveButton] = useState('DEFAULT');
  const [activeList, setActiveList] = useState(false);
  const [currentScrollOffset, setCurrentScrollOffset] = useState(0);
  
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const [headerHeight, setHeaderHeight] = useState(0);

  const handleScroll = (event: { nativeEvent: { contentOffset: { y: React.SetStateAction<number>; }; }; }) => {
    setCurrentScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const LibraryBooksList = (SortedLibraryBooks as Record<string, React.ComponentType>)[libraryListActiveButton] || DefaultList;

  // useImperativeHandle(ref, () => ({
  //   scrollToLocation: (params: any) => {
  //     if (sectionListRef.current) {
  //       sectionListRef.current.scrollToLocation(params);
  //     }
  //   },
  // }));

  // Effect to scroll to the top when sorting changes
  // useEffect(() => {
  //   if (scrollToTop && sortedLibrary.length > 0) { // Check if data exists
  //     sectionListRef.current?.scrollToLocation({
  //       sectionIndex: 0,
  //       itemIndex: 0,
  //       viewOffset: 0,
  //       viewPosition: 0,
  //       animated: true,
  //     });
  //     setScrollToTop(false);
  //   }
  // }, [scrollToTop, sortedLibrary]);

  const toggleModal = () => {
    dispatch(toggleFilterModal(true));
  };

  useFocusEffect(
    React.useCallback(() => {
      handleInitialLoad();
    }, [])
  );

  // const scrollToLetter = (letter: string) => {
  //   const index = library.findIndex((item) => item.author.charAt(0).toUpperCase() === letter);
    
  //   if (index !== -1 && flatListRef.current) {
  //     flatListRef.current.scrollToIndex({ animated: true, index });
  //   }
  // };

  // const handleSortByAuthor = () => {
  //   // setActiveButton('author');
  //   setActiveButton('AUTHOR');
  //   setActiveList(true);
  // };

  // const handleSortByTitle = () => {
  //   setActiveButton('TITLE');
  //   // setActiveButton('title');
  //   setActiveList(true);
  // }

  // const handleSortByDefault = () => {
  //   setActiveButton('DEFAULT');
  //   // setActiveButton('default');
  //   setActiveList(false);
  // };

  const handleCloseModal = () => {
    // setActiveButton('DEFAULT');
    // setActiveList(false);
    dispatch(setLibraryActiveListButton('DEFAULT'));
    dispatch(toggleAlphabetList(false));
    // setModalVisible(false);
    dispatch(toggleFilterModal(false));
  }

  const handleInitialLoad = () => {
    setIsInitialLoading(true);
    dispatch(readLibrary())
      .then(() => {
        setIsInitialLoading(false);
        setActiveButton('DEFAULT');
        // setActiveList(false);
      })
      .catch((error) => {
        console.error('Error loading library data:', error);
        setIsInitialLoading(false);
      });
  };

  // useEffect(() => {
  //   // Set an initial section when the component mounts
  //   scrollToSection('1'); // Replace 'A' with your initial section letter.
  // }, []);

  const scrollToSection = (letter: string) => {
    // Find the section index based on the letter
    const sectionIndex = librarySortedByAuthor.findIndex((section: any) => section.title === letter);
    // // setIndex(sectionIndex);

    if (sectionIndex !== -1 && sectionListRef.current) {
      const viewOffset = sectionIndex === 0 ? 0 : HEADER_HEIGHT;
  
      console.log('Scrolling to section with letter:', letter);
      console.log('Requested section index: ', sectionIndex);
  
      // Scroll to the section with the specified letter
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        viewOffset,
        viewPosition: 0,
        animated: true, // Set to true if you want an animation
      });
    }
  };
  

  // useEffect(() => {
  //   sectionListRef.current?.scrollToLocation({
  //     sectionIndex: index,
  //     itemIndex: 0,
  //     animated: true,
  //     viewOffset: 150,
  //     viewPosition: 0
  //   })
  // }, [index]);

  if (!libraryIsLoaded) {
    return (
      <LibraryLoader />
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: Colours.tertiary}}>
      <StatusBar style="dark" />
      <View style={styles.headerContainer} ref={(headerView) => headerView && headerView.measure((x, y, width, height) => setHeaderHeight(height))}>
        <Header>
          <Header.GoBack />
          <View style={headerInfoContainer}>
            <Header.Icon uri={require('../assets/books.gif')} />
            <Header.Title>Our Library</Header.Title>
          </View>
        </Header>

        <View style={styles.subheader}>
          <FilterButton onPress={toggleModal} />
          <LibraryListSorter />
        </View>
        <BooksInfo />
      </View>
      <LibraryBooksList />
      <AlphabetList
        onLetterPress={scrollToSection}
        floatStyles={{top: 60, right: 0}}
      />
      <FilterModal
        onClose={handleCloseModal}
      />
      <LibraryOverlay message={'Loading'} isVisible={isInitialLoading} />
    </View>
  );
});

export default Library;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    backgroundColor: Colours.primary,
    // paddingTop: 30,
    paddingBottom: 10,
    // paddingHorizontal: 15,
    height: 185,
    // backgroundColor: 'pink'
  },
  editContainer: {
    height: '100%',
    width: '20%',
    paddingRight: 5
  },
  editTxt: {
    color: 'red'
  },
  flatList: {
    // padding: SPACING,
    // paddingTop: 200,
    // paddingBottom: 142,
  },
  image: {
    width: 20,
    height: 20,
    // borderRadius: 20,
    marginRight: SPACING / 2
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
    fontFamily:  'Courier Prime',
  },
  // filterButton: {
  //   paddingVertical: 2.5,
  //   paddingHorizontal: 2.5,
  //   marginTop: 15,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 5,
  //   height: 20,

  //   // width: 160,
  // },
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
  alphabetButton2: {
    paddingVertical: 5,
    paddingHorizontal: 2,
    margin: 3,
  },
  separator: {
    height: .5,
    backgroundColor: Colours.tertiary, // Adjust the color of the separator as needed
  },
  sectionHeader: {
    backgroundColor: 'lightgray',
    height: SECTION_ITEM_HEIGHT,
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // subheader
  subheader: {
    flexDirection: 'row',
    height: 50,
    marginHorizontal: 15
  },
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
  subheaderSort: {
    flex: 7
  },
  filterDisplay: {
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    // paddingTop: 15,
    // backgroundColor: Colours.secondary,
    // paddingTop: 10,
  },
  booksNumber: {
    paddingHorizontal: 15,
  },


  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'center',
    // marginBottom: 15,
    height: 50,
    // backgroundColor: 'green'
  },
  backButton: {
    flex: 1, // Take up 10% of the available space
    alignItems: 'flex-start',
    marginRight: 10
  },
  headerIcons: {
    flex: 9, // Take up 90% of the available space
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  infoLabel: {
    left: 8,
    fontSize: 28,
    fontFamily: 'Courier Prime',
    textAlign: 'center',
  },
});
