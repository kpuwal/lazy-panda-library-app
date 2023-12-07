import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, ScrollView, Dimensions, Animated } from 'react-native';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch, filterLibrary, setSelectedFilters } from '@reduxStates/index';
import { genreIcon, seriesIcon, worldIcon, languagesIcon, SelectionCard } from '@book/index';
import  Header from '@components//header/Header';
import { buttonSml } from '@styles/styles';
import { Ionicons } from '@expo/vector-icons';
import { Colours } from '@styles/constants';
import PrimaryButton from '@components/button/PrimaryButton';
import { LANGUAGES } from '@helpers/constants';
import { buttonText } from '@styles/button';
import Accordion from '@components/settings/Accordion';
import TagsAccordion from './TagsAccordion';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const modalWidth = windowWidth * 0.90;
const modalHeight = windowHeight * 0.75;

const FilterModal = ({ onClose }: any) => {
  const picker = useSelector((state: RootState) => state.pickers);
  const { tags } = useSelector((state: RootState) => state.tags);
  const dispatch = useAppDispatch();
  const { selectedFilters } = useSelector((state: RootState) => state.library);
  const { isFilterModalActive } = useSelector((state: RootState) => state.app);

  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animate the background opacity when the modal becomes visible
    if (isFilterModalActive) {
      Animated.timing(fadeAnim, {
        toValue: 1, // Animate to full opacity (1)
        duration: 500, // Animation duration in milliseconds
        useNativeDriver: true, // Use the native driver for performance
      }).start();
    } else {
      // Reset opacity when the modal is not visible
      fadeAnim.setValue(0);
    }
  }, [isFilterModalActive]);

  const handleFilterUpdate = async () => {
    console.log('selected filters ', selectedFilters)
    if (selectedFilters.type !== '') dispatch(filterLibrary(selectedFilters));
    onClose();
  };

  if (!isFilterModalActive) {
    return null;
  }

  return (
    <>
      <Animated.View
        style={[styles.modalOverlay, { opacity: fadeAnim }]}
        pointerEvents={isFilterModalActive ? 'auto' : 'none'} // Enable or disable touch events on the background
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalActive}
        onRequestClose={onClose}
        presentationStyle="overFullScreen"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Header.Icon uri={require('@assets/filter.gif')} />
              <Text style={styles.headerText}>Filter by:</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {/* <View style={styles.accordionContainer}>
                {tags.map((category, index) => (
                  <TagsAccordion
                    key={category.title}
                    category={category}
                    isLastItem={index === tags.length - 1}
                  />
                ))}
              </View> */}
              {tags.map((category, index) => (
                  <SelectionCard
                    key={category.title}
                    title={category.title}
                    icon={category.image}
                    data={category.labels}
                    active={selectedFilters.item}
                    select={(el: string) => {
                      dispatch(
                        setSelectedFilters({
                          ...selectedFilters,
                          type: (category.title).toLocaleLowerCase(),
                          item: el,
                        })
                      );
                    }}
                  />
                ))}
              {/* <SelectionCard
                title={"Genre:"}
                icon={genreIcon}
                data={picker.genre}
                active={selectedFilters.item}
                select={(el: string) => {
                  dispatch(
                    setSelectedFilters({
                      ...selectedFilters,
                      type: 'genre',
                      item: el,
                    })
                  );
                }}
              /> */}
              {/* <SelectionCard
                title={"Series:"}
                icon={seriesIcon}
                data={picker.series}
                active={selectedFilters.item}
                select={(el: string) => {
                  dispatch(
                    setSelectedFilters({
                      ...selectedFilters,
                      type: 'series',
                      item: el,
                    })
                  );
                }}
              />
              <SelectionCard
                title={"World:"}
                icon={worldIcon}
                data={picker.world}
                active={selectedFilters.item}
                select={(el: string) => {
                  dispatch(
                    setSelectedFilters({
                      ...selectedFilters,
                      type: 'world',
                      item: el,
                    })
                  );
                }}
              /> */}
              {/* <SelectionCard
                title={"Language:"}
                icon={'img7'}
                data={LANGUAGES}
                active={selectedFilters.item}
                select={(el: string) => {
                  dispatch(
                    setSelectedFilters({
                      ...selectedFilters,
                      type: 'language',
                      item: el,
                    })
                  );
                }}
              /> */}
            </ScrollView>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <PrimaryButton action={onClose} customStyle={buttonSml}>
                <Ionicons name="ios-close" size={20} color="white" />
                <PrimaryButton.StyledText customStyle={buttonText}>
                  Close
                </PrimaryButton.StyledText>
              </PrimaryButton>
              <PrimaryButton action={handleFilterUpdate}>
                <PrimaryButton.StyledText customStyle={buttonText}>
                  Apply Filter
                </PrimaryButton.StyledText>
              </PrimaryButton>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    width: windowWidth,
    height: windowHeight,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: modalWidth,
    height: modalHeight,
    backgroundColor: Colours.primary,
    borderRadius: 10,
    padding: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  headerText: {
    left: 8,
    fontSize: 25,
    fontFamily: 'Courier Prime Bold',
  },
  accordionContainer: {
    backgroundColor: Colours.quinary,
    padding: 10,
    borderRadius: 15
  },
});
