import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { readLibrary } from '../redux/slices/bookSlice';
const SPACING = 15;
const ITEM_HEIGHT = 40

// Memoized BookItem component using React.memo
const BookItem = React.memo(({ item }: any) => (
  <View style={styles.container}>
    <View style={styles.textContainer}>
      <Text style={styles.textTitle}>{item.title}</Text>
      <Text style={styles.textAuthor}>{item.author}</Text>
    </View>
  </View>
));
interface AlphabetListProps {
  onLetterPress: (letter: string) => void;
}

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
  const { library } = useSelector((state: RootState) => state.book);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const flatListRef = useRef<FlatList | null>(null);
  const keyExtractor = useCallback((_item: any, index: number) => index.toString(), []);
  const renderItem = useCallback((({ item }: any) => <BookItem item={item} />), []);

  const getItemLayout = useCallback(((_: any, index: number) => ({
    length: ITEM_HEIGHT, // Replace with the actual height of your items
    offset: ITEM_HEIGHT * index,
    index,
  })), []);

  const scrollToLetter = (letter: string) => {
    const index = library.findIndex((item) => item.author.charAt(0).toUpperCase() === letter);
    
    if (index !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index });
    }
  };

  useEffect(() => {
    // Fetch the library data when the component mounts
    dispatch(readLibrary())
      .then(() => setIsLoading(false))
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching library:", error);
      });
  }, [dispatch]);

  // useEffect(() => {
  //   if (!isLoading) {
  //     // console.log('Loaded library:', library);
  //   }
  // }, [isLoading, library]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{backgroundColor: '#89b09b', paddingTop: 40}}>
      <StatusBar />
      <Image source={require('./../assets/image_bg.png')} style={StyleSheet.absoluteFillObject} />
      <View style={styles.headerContainer}>
        <Text>Library</Text>
        <AlphabetList onLetterPress={scrollToLetter} />
      </View>
      
      
      <FlatList
        ref={flatListRef}
        data={library}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.flatList}
        getItemLayout={getItemLayout}

        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={30}
        removeClippedSubviews={false}
        onEndReachedThreshold={0.1}

        // onScrollToIndexFailed={(info) => {
        //   console.warn("Scroll to index failed:", info);
        //   // Handle the failed scrolling gracefully here
        // }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Library;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SPACING,
    marginBottom: SPACING,
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
    flexDirection: 'row', // Set to 'column' if needed
    flexWrap: 'wrap',
    paddingTop: 50,
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
    fontSize: 18,
    // maxWidth: '96%',
    // maxHeight: '100%',
    // backgroundColor: 'pink'
  },
  textAuthor: {
    color: '#808080',
    fontFamily:  'Courier Prime',
    fontWeight: 'bold',
    fontSize: 14,
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
    opacity: .7,
    borderRadius: 3
  },
  alphabetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
