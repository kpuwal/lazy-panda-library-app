import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Animated } from 'react-native';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import { genreIcon, seriesIcon, worldIcon } from '../book/infoModules/Icons';
import SelectionCard from '../book/infoModules/SelectionCard';
import { filterLibrary } from '../../redux/slices/bookSlice'; // Import your Redux action

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const modalWidth = 300; // Adjust this to your desired fixed width
const modalHeight = 400; // Adjust this to your desired fixed height

const FilterModal = ({ visible, onClose }: any) => {
  const picker = useSelector((state: RootState) => state.pickers);
  const { book } = useSelector((state: RootState) => state.book);
  const dispatch = useAppDispatch();

  // Use local state for selected filters
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    item: ''
  });

  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity value for the background overlay

  useEffect(() => {
    // Animate the background opacity when the modal becomes visible
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1, // Animate to full opacity (1)
        duration: 500, // Animation duration in milliseconds
        useNativeDriver: true, // Use the native driver for performance
      }).start();
    } else {
      // Reset opacity when the modal is not visible
      fadeAnim.setValue(0);
    }
  }, [visible]);

  const handleFilterUpdate = async () => {
    // Dispatch the action to update the Redux state with selected filters
    if (selectedFilters.type !== '') dispatch(filterLibrary(selectedFilters));
    onClose(); // Close the modal
  };

  const logSelectedValue = (filterName: string, value: string) => {
    console.log(`Selected ${filterName}: ${value}`);
  };

  if (!visible) {
    return null;
  }

  return (
    <>
      <Animated.View
        style={[styles.modalOverlay, { opacity: fadeAnim }]}
        pointerEvents={visible ? 'auto' : 'none'} // Enable or disable touch events on the background
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
        presentationStyle="overFullScreen"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Filter Library by:</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <SelectionCard
                title={"Genre:"}
                icon={genreIcon}
                data={picker.genre}
                active={selectedFilters.item} // Use the selected value from local state
                select={(el: string) => {
                  setSelectedFilters({
                    ...selectedFilters,
                    type: 'genre',
                    item: el,
                  });
                  logSelectedValue('Genre', el); // Log the selected genre
                }}
              />
              <SelectionCard
                title={"Series:"}
                icon={seriesIcon}
                data={picker.series}
                active={selectedFilters.item} // Use the selected value from local state
                select={(el: string) => {
                  setSelectedFilters({
                    ...selectedFilters,
                    type: 'series',
                    item: el,
                  });
                  logSelectedValue('Series', el); // Log the selected series
                }}
              />
              <SelectionCard
                title={"World:"}
                icon={worldIcon}
                data={picker.world}
                active={selectedFilters.item} // Use the selected value from local state
                select={(el: string) => {
                  setSelectedFilters({
                    ...selectedFilters,
                    type: 'world',
                    item: el,
                  });
                  logSelectedValue('World', el); // Log the selected world
                }}
              />
            </ScrollView>
            <TouchableOpacity onPress={handleFilterUpdate}>
              <Text>Apply Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Text>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default FilterModal;
