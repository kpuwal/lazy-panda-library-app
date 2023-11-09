import { useNavigation } from '@react-navigation/native';
import { RootState, BookType, readLibrary, useAppDispatch, setLibraryActiveListButton } from '@reduxStates/index';
import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import BookItem from './BookItem';
import ItemSeparator from './ItemSeparator';

const DefaultList = () => {
  const { library } = useSelector((state: RootState) => state.library);
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const renderItem = useCallback(({ item }: any) => (
    <BookItem item={item} navigation={navigation} />
  ), []);

  const keyExtractor = useCallback((_item: any, index: number) => index.toString(), []);

  // const getItemLayout = useCallback(((data: any, index: number) => ({
  //   length: ITEM_HEIGHT,
  //   offset: (SECTION_ITEM_HEIGHT + ITEM_HEIGHT + (index * SPACING)),
  //   index,
  // })), []);

  const handleManualRefresh = () => {
    setIsManualRefreshing(true);
    dispatch(readLibrary())
      .then(() => {
        setIsManualRefreshing(false);
        dispatch(setLibraryActiveListButton('DEFAULT'));
        // setActiveList(false);
        // setShowSectionList(false);
      })
      .catch((error) => {
        console.error('Error refreshing library data:', error);
        setIsManualRefreshing(false);
      });
  };
  
 return (
  <FlatList
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
 )
}

export default DefaultList;
