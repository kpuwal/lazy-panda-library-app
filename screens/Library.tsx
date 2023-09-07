import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Animated, Dimensions, SectionList, SectionListScrollParams } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { sortLibrary, BookType, LibrarySectionType } from '../redux/slices/bookSlice';
import { filter, sortAZ } from '../components/book/infoModules/Icons';
import FilterModal from '../components/library/FilterModal';
import BookItem from '../components/library/BookItem';
import AlphabetList from '../components/library/AlphabetList';

const SPACING = 15;
const ITEM_HEIGHT = 80;
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

  const [scrollToTop, setScrollToTop] = useState(false);
  const sectionListRef = useRef<SectionList | null>(null);

  useImperativeHandle(ref, () => ({
    scrollToLocation: (params: any) => {
      if (sectionListRef.current) {
        sectionListRef.current.scrollToLocation(params);
      }
    },
  }));

  // Effect to scroll to the top when sorting changes
  useEffect(() => {
    if (scrollToTop) {
      sectionListRef.current?.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
        viewOffset: 0,
        viewPosition: 0,
        animated: true,
      });
      setScrollToTop(false);
    }
  }, [scrollToTop]);

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
  
    const sections: LibrarySectionType[] = [];
    let currentLetter = '';
    let currentSection: LibrarySectionType = { title: '', data: [] };
  
    sortedLibrary.forEach((item: BookType) => {
      const firstLetter = field === 'title' ? item.title.charAt(0).toUpperCase() : item.author.charAt(0).toUpperCase();
      if (firstLetter !== currentLetter) {
        currentLetter = firstLetter;
        currentSection = { title: currentLetter, data: [] };
        sections.push(currentSection);
      }
  
      const uniqueKey = keyCounter++;
      currentSection.data.push({ ...item, key: uniqueKey });
    });
    setShowSectionList(true);
    dispatch(sortLibrary(sections));
    setScrollToTop(true);
  };

  const handleSortByDefault = () => {
    console.log('click')
  };

  const renderSectionHeader = ({ section }: any) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  const sectionKeyExtractor = (section: any) => section.key.toString();

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
        
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={handleSortByDefault}
            style={styles.alphabetButtonBlk}>
            <Text style={{color: 'white'}}>default</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSort('title')}
            style={styles.alphabetButton}>
            <Text>by title</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleSort('author')}
            style={styles.alphabetButton}>
            <Text>by author</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={toggleModal}
            style={styles.alphabetButton2}>
              {filter}
          </TouchableOpacity>
          <TouchableOpacity style={styles.alphabetButton2}>{sortAZ}</TouchableOpacity>
        </View>
        {/* <AlphabetList onLetterPress={scrollToLetter} /> */}
      </View>
      {showSectionList ? (
          <SectionList
            ref={sectionListRef}
            sections={sortedLibrary as unknown as LibrarySectionType[]}
            keyExtractor={sectionKeyExtractor}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
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
    flexDirection: 'row',

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
