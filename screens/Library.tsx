import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { displayBookData, sortLibrary } from '../redux/slices/bookSlice';
import { navigate, setNavigationSource } from '../redux/slices/navigationSlice';
import { savingBookIsDisabled } from '../redux/slices/appSlice';
import { filter, sortAZ } from '../components/book/infoModules/Icons';
import FilterModal from '../components/library/FilterModal';

const SPACING = 15;
const ITEM_HEIGHT = 80;
// const MAX_TITLE_LENGTH = 30;

interface AlphabetListProps {
  onLetterPress: (letter: string) => void;
}

const BookItem = React.memo(({ item }: any) => {
  const dispatch = useAppDispatch();
  const MAX_TITLE_LENGTH = 40;

  // const titleLength = item.title.length;
  // let titleFontSize = 22; 

  // if (titleLength > 40) {
  //   titleFontSize = 18;
  // } else if (titleLength > 10) {
  //   titleFontSize = 20;
  // }

  const truncatedTitle = item.title.length > MAX_TITLE_LENGTH
    ? item.title.substring(0, MAX_TITLE_LENGTH - 3) + ' ...'
    : item.title;

  const handleBookPress = () => {
    dispatch(setNavigationSource('Library'));
    dispatch(displayBookData(item));
    dispatch(savingBookIsDisabled(false));
    dispatch(navigate('bookInfo'));
  };

  return (
    <TouchableOpacity onPress={handleBookPress}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>{truncatedTitle}</Text>
          <Text style={styles.textAuthor}>{item.author}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});


const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const AlphabetList: React.FC<AlphabetListProps> = ({ onLetterPress }) => {
  return (
    <View style={styles.alphabetContainer}>
      {ALPHABET.split('').map((letter) => (
        <TouchableOpacity
          key={letter}
          onPress={() => onLetterPress(letter)}
          style={styles.alphabetButton}
        >
          <Text style={styles.alphabetButtonText}>{letter}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Library = () => {
  const { library, libraryIsLoaded } = useSelector((state: RootState) => state.book);
  // const [truncatedTitles, setTruncatedTitles] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const flatListRef = useRef<FlatList | null>(null);
  const keyExtractor = useCallback((_item: any, index: number) => index.toString(), []);
  const renderItem = useCallback(({ item, index }: any) => (
    <BookItem item={item} />
  ), []);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const getItemLayout = useCallback(((_: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })), []);

  const scrollToLetter = (letter: string) => {
    const index = library.findIndex((item) => item.author.charAt(0).toUpperCase() === letter);
    
    if (index !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index });
    }
  };

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

  useEffect(() => {
    console.log('is loaded? ', libraryIsLoaded)
  })


  const handleSortByTitle = () => {
    const sortedLibrary = sortByField(library, 'title');
    dispatch(sortLibrary(sortedLibrary));
  };

  const handleSortByAuthor = () => {
    const sortedLibrary = sortByField(library, 'author');
    dispatch(sortLibrary(sortedLibrary));
  };

  if (!libraryIsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
    <View style={{flex: 1, backgroundColor: '#89b09b'}}>
      <StatusBar style="dark" />
      {/* <Text>Library</Text> */}
      {/* <Image 
        source={require('./../assets/image_bg.png')}
        style={StyleSheet.absoluteFillObject} /> */}
      <View style={styles.headerContainer}>
        
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={handleSortByTitle}
            style={styles.alphabetButtonBlk}>
            <Text style={{color: 'white'}}>default</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSortByTitle}
            style={styles.alphabetButton}>
            <Text>by title</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleSortByAuthor}
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
          <Text>|</Text>
          <TouchableOpacity style={styles.alphabetButton2}>{sortAZ}</TouchableOpacity>
        </View>
        {/* <AlphabetList onLetterPress={scrollToLetter} /> */}
      </View>
      
      
      <FlatList
        // ref={flatListRef}
        data={library}
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
      />
      <FilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>

    </>
  );
};

export default Library;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SPACING,
    marginBottom: SPACING,
    height: 95,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: .1,
    shadowRadius: 10,
    backgroundColor: 'white',
  },
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
    padding: SPACING,
    paddingTop: 42,
    paddingBottom: 142,
  },
  alphabetContainer: {
    flex: 1,
    flexWrap: 'wrap',
    // paddingLeft: 20,
    // maxWidth: '100%', // Add this line to limit the widt
    flexDirection: 'row', // Arrange children horizontally
    // justifyContent: 'center', // Center children horizontally
    // alignItems: 'center', // Center children vertically
    // paddingVertical: 5,

  },
  textContainer: {
    // padding: SPACING,
    textAlign: 'auto',
    // backgroundColor: 'yellow',
    maxWidth: '100%',
  },
  textTitle: {
    color: '#000000',
    fontFamily:  'Courier Prime',
    fontWeight: 'bold',
    fontSize: 25,
  },
  textAuthor: {
    color: '#808080',
    fontFamily:  'Courier Prime',
    fontWeight: 'bold',
    fontSize: 16,
    // maxWidth: '96%', // Ensure the text doesn't exceed the view's width
    // maxHeight: '100%'
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
});
