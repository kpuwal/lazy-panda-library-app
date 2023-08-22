import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { readLibrary } from '../redux/slices/bookSlice';
const SPACING = 15;

// Memoized BookItem component using React.memo
const BookItem = React.memo(({ item }: any) => (
  <View style={styles.textContainer}>
    <Text style={styles.textTitle}>{item.title}</Text>
    <Text style={styles.textAuthor}>{item.author}</Text>
  </View>
));

const Library = () => {
  const { library } = useSelector((state: RootState) => state.book);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

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
    <View>
      <StatusBar />
      <Text>Library</Text>
      <FlatList
        data={library}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: 42,
          backgroundColor: 'white'
        }}
        renderItem={({ item }) => <BookItem item={item} />}
      />
    </View>
  );
};

export default Library;

const styles = StyleSheet.create({
  textContainer: {
    padding: SPACING,
    marginBottom: SPACING,
    borderRadius: 12,
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: .1,
    shadowRadius: 10,
    backgroundColor: 'white'
  },
  textTitle: {
    color: '#000000',
    fontFamily:  'Courier Prime',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textAuthor: {
    color: '#808080',
    fontFamily:  'Courier Prime',
    fontWeight: 'bold',
    fontSize: 14,
  }
});
