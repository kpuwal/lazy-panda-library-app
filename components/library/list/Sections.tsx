import { useNavigation } from '@react-navigation/native';
import { RootState, librarySectionType, readLibrary, setLibraryActiveListButton, useAppDispatch } from '@reduxStates/index';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SectionList } from 'react-native';
import BookItem from './BookItem';
import { HEADER_HEIGHT, ITEM_HEIGHT, SECTION_ITEM_HEIGHT, SPACING } from '@helpers/constants';
import ItemSeparator from './ItemSeparator';
import SectionHeader from './SectionHeader';
import { useSelector } from 'react-redux';


type SectionListTypes = {
  data: librarySectionType[],
}

const Sections = ({ data }: SectionListTypes) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { activeAlphabetLetter } = useSelector((state: RootState) => state.app);
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const sectionListRef = useRef<SectionList>(null);

  const renderItem = useCallback(({ item }: any) => (
    <BookItem item={item} navigation={navigation} />
  ), []);

  const keyExtractor = useCallback((_item: any, index: number) => index.toString(), []);

  const getItemLayout = useCallback(((data: any, index: number) => {
    const totalHeight = ITEM_HEIGHT + SPACING;
    const offset = (SECTION_ITEM_HEIGHT + totalHeight * index);

    return {
      length: ITEM_HEIGHT,
      offset,
      index
    }
  }), []);  

  const renderSectionHeader = useCallback(({ section }: any) => (
    <SectionHeader title={section.title} />
  ), []);

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

  useEffect(() => {
    const sectionIndex = data.findIndex((section: any) => section.title === activeAlphabetLetter);

    if (sectionIndex !== -1 && sectionListRef.current) {
      const viewOffset = sectionIndex === 0 ? 0 : HEADER_HEIGHT;
  
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        viewOffset,
        viewPosition: 0,
        animated: true,
      });
    }
  }, [activeAlphabetLetter]);

  const handleScroll = () => {
    const sectionIndex = data.findIndex((section: any) => section.title === activeAlphabetLetter);
  
    if (sectionIndex !== -1 && sectionListRef.current) {
      const totalHeight = data.reduce((height, section) => {
        return height + SECTION_ITEM_HEIGHT + ITEM_HEIGHT * section.data.length;
      }, 0);
  
      // Calculate the viewOffset to align the last item with the bottom of the screen
      const viewOffset = totalHeight - SECTION_ITEM_HEIGHT - ITEM_HEIGHT;
  
      // Scroll to the section with the specified letter while aligning the last item to the bottom
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        viewOffset,
        viewPosition: 0,
        animated: true,
      });
    }
  };

  // const handleScroll = () => {
  //   const sectionIndex = data.findIndex((section: any) => section.title === activeAlphabetLetter);
  //   sectionListRef.current?.scrollToLocation({
  //     sectionIndex,
  //     itemIndex: 0,
  //     animated: true,
  //     viewOffset: 150,
  //     viewPosition: 0
  //   })
  // };
  
  return (
    <SectionList
      style={{ flex: 1 }}
      ref={sectionListRef}
      // initialScrollIndex={index}
      sections={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      showsVerticalScrollIndicator={false}
      getItemLayout={getItemLayout}
      ItemSeparatorComponent={ItemSeparator}
      // contentContainerStyle={{ paddingBottom: HEADER_HEIGHT * 2 }}
      // onScroll={handleScroll}
      refreshing={isManualRefreshing}
      onRefresh={handleManualRefresh}
      // onScroll={(event) => {
      //   setScrollPosition(event.nativeEvent.contentOffset.y);
      // }}
      // removeClippedSubviews={true}
    />
  )
}

export default Sections;
