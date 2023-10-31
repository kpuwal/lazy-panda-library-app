import { useNavigation } from '@react-navigation/native';
import { librarySectionType, readLibrary, setLibraryActiveButton, useAppDispatch } from '@reduxStates/index';
import { useCallback, useState } from 'react';
import { SectionList } from 'react-native';
import BookItem from './BookItem';
import { HEADER_HEIGHT } from '@helpers/constants';
import ItemSeparator from './ItemSeparator';
import SectionHeader from './SectionHeader';


type SectionListTypes = {
  data: librarySectionType[],
}

const Sections = ({ data }: SectionListTypes) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const renderItem = useCallback(({ item }: any) => (
    <BookItem item={item} navigation={navigation} />
  ), []);

  const keyExtractor = useCallback((_item: any, index: number) => index.toString(), []);

  // const getItemLayout = useCallback(((data: any, index: number) => ({
  //   length: ITEM_HEIGHT,
  //   offset: (SECTION_ITEM_HEIGHT + ITEM_HEIGHT + (index * SPACING)),
  //   index,
  // })), []);

  const renderSectionHeader = useCallback(({ section }: any) => (
    <SectionHeader title={section.title} />
  ), []);

  const handleManualRefresh = () => {
    setIsManualRefreshing(true);
    dispatch(readLibrary())
      .then(() => {
        setIsManualRefreshing(false);
        dispatch(setLibraryActiveButton('default'));
        // setActiveList(false);
        // setShowSectionList(false);
      })
      .catch((error) => {
        console.error('Error refreshing library data:', error);
        setIsManualRefreshing(false);
      });
  };
  
  return (
    <SectionList
      // style={{ flex: 1 }}
      // ref={sectionListRef}
      // initialScrollIndex={index}
      sections={data}
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
  )
}

export default Sections;
