import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Dimensions, SectionList, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { BookType, resetBookMessages } from '../redux/slices/bookSlice';
import { librarySectionType, readLibrary, resetSelectedFilters, sortLibraryByAuthor, sortLibraryByTitle } from '../redux/slices/librarySlice';
import FilterModal from '../components/library/FilterModal';
import BookItem from '../components/library/BookItem';
import AlphabetList from '../components/library/AlphabetList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colours, Fonts } from '../styles/constants';
import { headerInfoContainer } from '../styles/styles';
import Header from '../components/header/Header';
import { useNavigation } from '@react-navigation/native';
import { resetLibraryMessages } from '../redux/slices/librarySlice';


const SPACING = 0.5;
const ITEM_HEIGHT = 80;
const HEADER_HEIGHT = 150;

const Library = forwardRef((_props, ref) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  
  const { height } = Dimensions.get('window');
  const { library, sortedLibrary, libraryIsLoaded, booksNumber, selectedFilterHeader } = useSelector((state: RootState) => state.library);

  const [modalVisible, setModalVisible] = useState(false);
  const [showSectionList, setShowSectionList] = useState(false);
  const [scrollToTop, setScrollToTop] = useState(false);

  const sectionListRef = useRef<SectionList | null>(null);

  const { selectedFilters, libraryIsFiltered } = useSelector((state: RootState) => state.library);
  const [activeButton, setActiveButton] = useState('default');
  const [activeList, setActiveList] = useState(false);
  const [currentScrollOffset, setCurrentScrollOffset] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // const [defaultLibrary, setDefaultLibrary] = useState<BookType[] | librarySectionType[]>(library);
  // const [booksNumber, setBooksNumber] = useState(library.length);

  const keyExtractor = useCallback((_item: any, index: number) => index.toString(), []);
  const renderItem = useCallback(({ item, index }: any) => (
    <BookItem item={item} navigation={navigation} />
  ), []);
  
  const handleScroll = (event: { nativeEvent: { contentOffset: { y: React.SetStateAction<number>; }; }; }) => {
    setCurrentScrollOffset(event.nativeEvent.contentOffset.y);
  };

  useImperativeHandle(ref, () => ({
    scrollToLocation: (params: any) => {
      if (sectionListRef.current) {
        sectionListRef.current.scrollToLocation(params);
      }
    },
  }));

  useEffect(() => {
    dispatch(resetLibraryMessages());
    dispatch(resetBookMessages());
  });

  // useEffect(() => {
  //   dispatch(resetSelectedFilters());
  // }, [])

  // useEffect(() => {
  //   // You can now access the current scroll offset in currentScrollOffset state variable.
  //   console.log('Current Scroll Offset:', currentScrollOffset);
  // }, [currentScrollOffset]);

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
    dispatch(resetSelectedFilters());
    setModalVisible(!modalVisible);
  };

  const getItemLayout = useCallback(((_: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })), []);

  // const scrollToLetter = (letter: string) => {
  //   const index = library.findIndex((item) => item.author.charAt(0).toUpperCase() === letter);
    
  //   if (index !== -1 && flatListRef.current) {
  //     flatListRef.current.scrollToIndex({ animated: true, index });
  //   }
  // };

  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  const handleSortByAuthor = () => {
    setActiveButton('author');
    setActiveList(true);
    setShowSectionList(true);
    dispatch(sortLibraryByAuthor(library));
    setScrollToTop(true);
  };

  const handleSortByTitle = () => {
    setActiveButton('title');
    setActiveList(true);
    setShowSectionList(true);
    dispatch(sortLibraryByTitle(library));
    setScrollToTop(true);
  }

  const handleSortByDefault = () => {
    setActiveButton('default');
    setActiveList(false);
    setShowSectionList(false);
  };

  const handleCloseModal = () => {
    setShowSectionList(false);
    setActiveButton('default');
    setActiveList(false);
    setModalVisible(false);
  }

  const handleRefresh = () => {
    setIsRefreshing(true); 
    dispatch(readLibrary())
    .then(() => {
      setIsRefreshing(false);
      setActiveButton('default');
      setActiveList(false);
      setShowSectionList(false);
    })
    .catch((error) => {
      console.error('Error refreshing library data:', error);
      setIsRefreshing(false);
    });

  }

  const scrollToSection = (letter: string) => {
    // Find the section index based on the letter
    const sectionIndex = sortedLibrary.findIndex((section: any) => section.title === letter);
  
    if (sectionIndex !== -1 && sectionListRef.current) {
      const viewOffset = sectionIndex === 0 ? 0 : HEADER_HEIGHT;
      // Scroll to the section with the specified letter
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        viewOffset,
        viewPosition: 0,
        animated: true,
      });
      console.log('Requested viewOffset:', viewOffset);
    }
    
  };

  const renderSectionHeader = ({ section }: any) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  const toUpperCase = () => {
    return selectedFilterHeader.type.charAt(0).toUpperCase() + selectedFilterHeader.type.slice(1);
  }

  // const sectionKeyExtractor = (section: any) => section.key.toString();
  const sectionKeyExtractor = (section: any) => {
    if (section && section.title) {
      return section.title.toString(); // Convert title to string if it's not undefined
    }
    return 'Unknown';
  };

  if (!libraryIsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: Colours.tertiary}}>
      <StatusBar style="dark" />
      <View style={styles.headerContainer}>
        <Header>
          <Header.GoBack />
          <View style={headerInfoContainer}>
            <Header.Icon uri={require('../assets/books.gif')} />
            <Header.Title>Our Library</Header.Title>
          </View>
        </Header>

        <View style={styles.subheader}>
          <Pressable
            onPress={toggleModal}
            style={styles.subheaderFilter}
          >
              {({pressed}) => 
              <>
                <MaterialCommunityIcons
                  name="filter-menu"
                  size={28} 
                  color={pressed ? Colours.filter : Colours.secondary}
                />
                <Text style={[
                styles.sortButtonText, 
                {
                  color: pressed ? Colours.filter : Colours.secondary
                }]}>
                  Filter
                </Text>
              </>
              }
          </Pressable>

          <View style={[styles.subheaderSort, {flexDirection: 'column', alignItems: 'flex-start'}]}>
            <Text style={[styles.sortButtonText, {color: 'black', marginBottom: 10,}]}>Sort by:</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={handleSortByDefault}
                style={[styles.sortButton, activeButton === 'default' ? styles.bgBlack : styles.bgWhite]}>
                  <Text style={[activeButton === 'default' ? styles.white : styles.black, styles.sortButtonText]}>all</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSortByTitle()}
                style={[
                  styles.sortButton, activeButton === 'title' ? 
                    styles.bgBlack :
                    styles.bgWhite
                ]}
              >
                <Text style={[activeButton === 'title' ? styles.white : styles.black, styles.sortButtonText]}>title</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSortByAuthor()}
                style={[styles.sortButton, activeButton === 'author' ? styles.bgBlack : styles.bgWhite]}>
                <Text style={[activeButton === 'author' ? styles.white : styles.black, styles.sortButtonText]}>author</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.booksNumber}> 
          <Text style={[styles.sortButtonText, {paddingTop: 10}]}>
            {booksNumber} books
          </Text>
        </View>
        
        {libraryIsFiltered ? (
          <View style={[ styles.filterDisplay]}>
            <Text style={[styles.sortButtonText, styles.black]}>
              {toUpperCase()}: {selectedFilterHeader.item}
            </Text>
          </View>) : <View style={styles.filterDisplay} />}
      </View>

      {showSectionList ? (
          <SectionList
            ref={sectionListRef}
            sections={sortedLibrary as unknown as librarySectionType[]}
            // keyExtractor={sectionKeyExtractor}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            showsVerticalScrollIndicator={false}
            getItemLayout={getItemLayout}
            onScroll={handleScroll}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        ) : (
          <FlatList
            data={library as BookType[]}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.flatList}
            showsVerticalScrollIndicator={false}
            getItemLayout={getItemLayout}
            initialNumToRender={10}
            windowSize={10}
            maxToRenderPerBatch={15}
            updateCellsBatchingPeriod={30}
            removeClippedSubviews={false}
            onEndReachedThreshold={0.1}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparator}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        )}
      <AlphabetList
        onLetterPress={scrollToSection}
        floatStyles={{top: 60, right: 0}}
        isActive={activeList}
      />
      <FilterModal
        visible={modalVisible}
        onClose={handleCloseModal}
      />
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
    height: 180,
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
    // paddingTop: 42,
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
    fontWeight: 'bold',
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
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // subheader
  subheader: {
    flexDirection: 'row',
    height: 50,
    marginHorizontal: 15,
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
