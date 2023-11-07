import { useNavigation } from '@react-navigation/native';
import { BookType, RootState, librarySectionType, readLibrary, setLibraryActiveListButton, toggleAlphabetList, useAppDispatch } from '@reduxStates/index';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, SectionList } from 'react-native';
import BookItem from './BookItem';
import { HEADER_HEIGHT, ITEM_HEIGHT, SECTION_ITEM_HEIGHT, SPACING } from '@helpers/constants';
import ItemSeparator from './ItemSeparator';
import SectionHeader from './SectionHeader';
import { useSelector } from 'react-redux';


type SectionListTypes = {
  data: librarySectionType[],
}

const Sections = ({ data }: SectionListTypes) => {
  const screenHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { activeAlphabetLetter } = useSelector((state: RootState) => state.app);
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const lastItemHeight = data[data.length - 1].data.length * (ITEM_HEIGHT + SPACING);
  const bottomPadding = screenHeight - HEADER_HEIGHT - lastItemHeight - (data.length * SPACING / 2);
  const sectionListRef = useRef<SectionList>(null);

  const renderItem = useCallback(({ item }: any) => (
    <BookItem item={item} navigation={navigation} />
  ), []);

  const keyExtractor = useCallback((_item: any, index: number) => index.toString(), []);

  const getItemLayout = ((data: any, index: number) => {
    const length = ITEM_HEIGHT;
    // const offset = (SECTION_ITEM_HEIGHT + totalHeight * index);
 
    // const length = ITEM_HEIGHT;
    // const offset = ITEM_HEIGHT * (index-2) - SECTION_ITEM_HEIGHT
// console.log('offset ', offset)
// console.log('index ', ITEM_HEIGHT)
// console.log( 'offset: ', offset, ' index: ', index)
    return {
      length,
      offset: ITEM_HEIGHT * (index - 1),
      index
    }
  });


  const renderSectionHeader = useCallback(({ section }: any) => (
    <SectionHeader title={section.title} />
  ), []);

  const handleManualRefresh = () => {
    setIsManualRefreshing(true);
    dispatch(readLibrary())
      .then(() => {
        setIsManualRefreshing(false);
        dispatch(setLibraryActiveListButton('DEFAULT'));
        dispatch(toggleAlphabetList(false));
      })
      .catch((error) => {
        console.error('Error refreshing library data:', error);
        setIsManualRefreshing(false);
      });
  };

  useEffect(() => {
    const sectionIndex = data.findIndex((section: any) => section.title === activeAlphabetLetter);

    if (sectionIndex !== -1 && sectionListRef.current) {
      const viewOffset = sectionIndex === 0 ? 0 : SECTION_ITEM_HEIGHT;

      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        viewOffset: 0,
        viewPosition: 0,
        animated: true,
      });
    }
  }, [activeAlphabetLetter]);
  
  return (
    <SectionList
      // style={{ flex: 1 }}
      ref={sectionListRef}
      initialScrollIndex={0}
      sections={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      showsVerticalScrollIndicator={false}
      getItemLayout={getItemLayout}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={{ paddingBottom: bottomPadding }}
      refreshing={isManualRefreshing}
      onRefresh={handleManualRefresh}
    />
  )
}

export default Sections;
