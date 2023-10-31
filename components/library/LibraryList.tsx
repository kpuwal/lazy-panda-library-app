import { useNavigation } from '@react-navigation/native';
import { BookType, RootState, librarySectionType, readLibrary, setLibraryActiveButton, useAppDispatch } from '@reduxStates/index';
import { useCallback, useEffect, useState } from 'react';
import { SectionList, View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import BookItem from './list/BookItem';
import { HEADER_HEIGHT, ITEM_HEIGHT, SECTION_ITEM_HEIGHT, SPACING } from '@helpers/constants';
import { Colours } from '@styles/constants';
import React from 'react';

type SectionListTypes = {
  listType: string,
}

// const LibraryView = {
//   TITLE: TitleList,
//   AUTHOR: AuthorList 
// }

const LibraryList = React.memo(({ listType }: SectionListTypes) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  
  // const List = LibraryView[listType] ?? DefaultView;

  const { library, librarySortedByAuthor, librarySortedByTitle } = useSelector((state: RootState) => state.library);
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  useEffect(() => console.log('render list item'))

  const renderItem = useCallback(({ item }: any) => (
    <BookItem item={item} navigation={navigation} />
  ), []);

  const keyExtractor = useCallback((_item: any, index: number) => index.toString(), []);

  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  const getItemLayout = useCallback(((data: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: (SECTION_ITEM_HEIGHT + ITEM_HEIGHT + (index * SPACING)),
    index,
  })), []);

  const renderSectionHeader = ({ section }: any) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  const handleManualRefresh = () => {
    setIsManualRefreshing(true);
    dispatch(readLibrary())
      .then(() => {
        setIsManualRefreshing(false);
        // dispatch(setLibraryActiveButton('default'));
      })
      // .catch((error) => {
      //   console.error('Error refreshing library data:', error);
      //   setIsManualRefreshing(false);
      // });
  };

  const List = ({ type }: {type: string}) => {
    switch(type) {
      case 'default':
        return  <FlatList
        style={{ flex: 1 }}
        data={library as BookType[]}
        keyExtractor={keyExtractor}
        // contentContainerStyle={styles.flatList}
        showsVerticalScrollIndicator={true}
        // getItemLayout={getItemLayout}
        initialNumToRender={10}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        refreshing={isManualRefreshing}
        onRefresh={handleManualRefresh}
      />
      case 'title':
        return <SectionList
        style={{ flex: 1 }}
        // ref={sectionListRef}
        // initialScrollIndex={index}
        sections={librarySortedByTitle as librarySectionType[]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        showsVerticalScrollIndicator={false}
        // getItemLayout={getItemLayout}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={{ paddingBottom: HEADER_HEIGHT * 2 }}
        // onScroll={handleScroll}
        refreshing={isManualRefreshing}
        onRefresh={handleManualRefresh}

        windowSize={10}
        maxToRenderPerBatch={15}
        // removeClippedSubviews={true}
      />
      case 'author':
        return <SectionList
        // style={{ flex: 1 }}
        // ref={sectionListRef}
        // initialScrollIndex={index}
        sections={librarySortedByAuthor as librarySectionType[]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        showsVerticalScrollIndicator={false}
        // getItemLayout={getItemLayout}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={{ paddingBottom: HEADER_HEIGHT * 2 }}
        // onScroll={handleScroll}
        refreshing={isManualRefreshing}
        onRefresh={handleManualRefresh}
        // removeClippedSubviews={true}
      />
      default:
        return <View><Text>no books yet</Text></View>
    }
  }
  
  return (
    <List type={listType} />
  )
})

export default LibraryList;

const styles = StyleSheet.create({
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
})
