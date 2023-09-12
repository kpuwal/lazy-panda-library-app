import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Animated, Dimensions, SectionList, SectionListScrollParams } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { sortLibrary, BookType, LibrarySectionType, readLibrary } from '../redux/slices/bookSlice';
import { filter, sortAZ } from '../components/book/infoModules/Icons';
import FilterModal from '../components/library/FilterModal';
import BookItem from '../components/library/BookItem';
import AlphabetList from '../components/library/AlphabetList';

const SPACING = 15;
const ITEM_HEIGHT = 65;
// const MAX_TITLE_LENGTH = 30;

const Library = forwardRef((props, ref) => {
  let keyCounter = 0;
  const { height } = Dimensions.get('window');
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const { library, libraryIsLoaded, sortedLibrary } = useSelector((state: RootState) => state.book);
  // const [truncatedTitles, setTruncatedTitles] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const flatListRef = useRef<FlatList | null>(null);
  const keyExtractor = useCallback((_item: any, index: number) => index.toString(), []);
  const renderItem = useCallback(({ item, index }: any) => (
    <BookItem item={item} />
  ), []);
  const [modalVisible, setModalVisible] = useState(false);
  const [showSectionList, setShowSectionList] = useState(false);
  const [sectionLetters, setSectionLetters] = useState<string[]>([]);
  const [scrollToTop, setScrollToTop] = useState(false);
  const sectionListRef = useRef<SectionList | null>(null);
  const { selectedFilters, libraryIsFiltered } = useSelector((state: RootState) => state.book);

  useImperativeHandle(ref, () => ({
    scrollToLocation: (params: any) => {
      if (sectionListRef.current) {
        sectionListRef.current.scrollToLocation(params);
      }
    },
  }));

  // Effect to scroll to the top when sorting changes
  useEffect(() => {
    if (scrollToTop && sortedLibrary.length > 0) { // Check if data exists
      sectionListRef.current?.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
        viewOffset: 0,
        viewPosition: 0,
        animated: true,
      });
      setScrollToTop(false);
    }
  }, [scrollToTop, sortedLibrary]);

  const toggleModal = () => {
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

  // FIX TYPES
  const sortByField = (array: any, fieldName: string) => {
    return [...array].sort((a, b) => {
      const fieldA = a[fieldName].toLowerCase();
      const fieldB = b[fieldName].toLowerCase();

      if (fieldA < fieldB) {
        return -1;
      } else if (fieldA > fieldB) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  const handleSort = (field: string) => {
    const sortedLibrary = sortByField(library, field);
    const sortSectionLetters: string[] = [];
    const sections: LibrarySectionType[] = [];
    let currentLetter = '';
    let currentSection: LibrarySectionType = { title: '', data: [] };
  
    sortedLibrary.forEach((item: BookType) => {
      const firstLetter = field === 'title' ? item.title.charAt(0).toUpperCase() : item.author.charAt(0).toUpperCase();
      if (firstLetter !== currentLetter) {
        currentLetter = firstLetter;
        currentSection = { title: currentLetter, data: [] };
        sections.push(currentSection);
        sortSectionLetters.push(currentLetter);
      }
  
      const uniqueKey = keyCounter++;
      currentSection.data.push({ ...item, key: uniqueKey });
    });
    setShowSectionList(true);
    setSectionLetters(sortSectionLetters);
    dispatch(sortLibrary(sections));
    setScrollToTop(true);
  };

  const handleSortByAuthor = () => {
    let sortedLibrary = sortByField(library, 'author');
  
    const sections: LibrarySectionType[] = [];
    const sortSectionLetters: string[] = [];
  
    sortedLibrary.forEach((item: BookType) => {
      // Split the author's list into individual authors
      const authorsList = item.author.split(',').map((author) => author.trim());
      // Extract the first author's surname
      const firstAuthor = authorsList[0].split(' ');
      let surname = '';
  
      for (let i = 0; i < firstAuthor.length; i++) {
        if (firstAuthor[i].startsWith('(')) {
          // If a word starts with '(', use the previous word as the surname
          if (i > 0) {
            surname = firstAuthor[i - 1];
          }
          break;
        }
      }
  
      // If no word before '(', use the default behavior
      if (!surname) {
        surname = firstAuthor[firstAuthor.length - 1];
      }
  
      const firstLetter = surname.charAt(0).toUpperCase();
  
      // Find the section corresponding to the first letter or create a new one
      const sectionIndex = sections.findIndex((section) => section.title === firstLetter);
      if (sectionIndex === -1) {
        sections.push({ title: firstLetter, data: [item] });
        sortSectionLetters.push(firstLetter);

      } else {
        sections[sectionIndex].data.push(item);
      }
    });

  
    setShowSectionList(true);
  
    // Sort sections alphabetically based on the section title
    sections.sort((a, b) => a.title.localeCompare(b.title));
    sortSectionLetters.sort((a, b) => a.localeCompare(b));
    // console.log('sections ', sections)
    setSectionLetters(sortSectionLetters);
  
    dispatch(sortLibrary(sections));
    setScrollToTop(true);
  };
  
  const scrollToLetter = (letter: string) => {
    // Find the section index based on the letter
    const sectionIndex = sortedLibrary.findIndex((section) => section.title === letter);

    if (sectionIndex !== -1 && sectionListRef.current) {
      // Scroll to the section with the specified letter
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        viewOffset: 0,
        viewPosition: 0,
        animated: true,
      });
    }
  };

  const scrollToSection = (letter: string) => {
    const sectionIndex = sectionLetters.indexOf(letter);
    if (sectionIndex !== -1 && sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0, // Scroll to the first item in the section
        animated: true,
      });
    }
  };

  const handleSortByDefault = () => {
    setShowSectionList(false);
    dispatch(readLibrary());
  };

  const renderSectionHeader = ({ section }: any) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  // const sectionKeyExtractor = (section: any) => section.key.toString();
  const sectionKeyExtractor = (section: any) => {
    if (section && section.title) {
      return section.title.toString(); // Convert title to string if it's not undefined
    }
    // Handle empty or undefined titles by returning a default value (e.g., 'Unknown')
    return 'Unknown';
  };
  if (!libraryIsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
// 71B460
  return (
    <>
    <View style={{flex: 1, backgroundColor: '#89b09b'}}>
      <StatusBar style="dark" />
      <View style={styles.headerContainer}>
        
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>Sort by:</Text>
          <TouchableOpacity
            onPress={handleSortByDefault}
            style={styles.alphabetButtonBlk}>
            <Text style={{color: 'white'}}>default</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSort('title')}
            style={styles.alphabetButton}>
            <Text>title</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleSortByAuthor()}
            style={styles.alphabetButton}>
            <Text>author</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
          <TouchableOpacity
            onPress={toggleModal}
            style={styles.alphabetButton2}>
              {filter}
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.alphabetButton2}>{sortAZ}</TouchableOpacity> */}
          <Text>Filter</Text>{libraryIsFiltered ? (
          <View>
            <Text>: {selectedFilters.type.charAt(0).toUpperCase() + selectedFilters.type.slice(1)} - {selectedFilters.item}</Text>
          </View>
        ) : null}
        </View>
        <View><Text>({library.length} items)</Text></View>
        {/* {libraryIsFiltered ? (
          <View>
            <Text>Selected {selectedFilters.type.charAt(0).toUpperCase() + selectedFilters.type.slice(1)}: {selectedFilters.item}</Text>
          </View>
        ) : null} */}
      </View>
      {showSectionList ? (
          <SectionList
            ref={sectionListRef}
            sections={sortedLibrary as unknown as LibrarySectionType[]}
            keyExtractor={sectionKeyExtractor}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            getItemLayout={getItemLayout}
          />
        ) : (
          <FlatList
            data={library as BookType[]}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.flatList}
            getItemLayout={getItemLayout}
            initialNumToRender={10}
            windowSize={10}
            maxToRenderPerBatch={15}
            updateCellsBatchingPeriod={30}
            removeClippedSubviews={false}
            onEndReachedThreshold={0.1}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparator}
          />
        )}
      <AlphabetList
        onLetterPress={scrollToSection}
        floatStyles={{top: 60, right: 0}}
        alphabet={sectionLetters} />
      <FilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>

    </>
  );
});

export default Library;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',

    backgroundColor: '#ffffff',
    paddingTop: 30,
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingBottom: 10
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
    paddingBottom: 142,
  },
  image: {
    width: 20,
    height: 20,
    // borderRadius: 20,
    marginRight: SPACING / 2
  },
  alphabetButton: {
    paddingVertical: 2.5,
    paddingHorizontal: 5,
    margin: 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: .7,
    borderRadius: 10,
    width: 65
  },
  alphabetButtonBlk: {
    paddingVertical: 2.5,
    paddingHorizontal: 5,
    margin: 3,
    backgroundColor: 'black',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // opacity: .7,
    borderRadius: 10,
    width: 65
  },
  alphabetButton2: {
    paddingVertical: 5,
    paddingHorizontal: 2,
    margin: 3,
  },
  alphabetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    height: 1, // Adjust the height of the separator as needed
    backgroundColor: 'gray', // Adjust the color of the separator as needed
  },
  sectionHeader: {
    backgroundColor: 'lightgray',
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
