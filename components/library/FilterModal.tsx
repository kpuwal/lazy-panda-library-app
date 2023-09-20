import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Animated } from 'react-native';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import { genreIcon, seriesIcon, worldIcon } from '../book/infoModules/Icons';
import SelectionCard from '../book/infoModules/SelectionCard';
import { filterLibrary, setSelectedFilters } from '../../redux/slices/bookSlice';
import  Header from '../header/Header';
import { headerInfoContainer } from '../../styles/styles';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colours } from '../../styles/constants';
import MainButton from '../button/MainButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const modalWidth = 300; // Adjust this to your desired fixed width
const modalHeight = 400; // Adjust this to your desired fixed height

const FilterModal = ({ visible, onClose }: any) => {
  const picker = useSelector((state: RootState) => state.pickers);
  const { book } = useSelector((state: RootState) => state.book);
  const dispatch = useAppDispatch();

  // Use local state for selected filters
  // const [selectedFilters, setSelectedFilters] = useState({
  //   type: '',
  //   item: ''
  // });

  const { selectedFilters } = useSelector((state: RootState) => state.book);

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
    onClose();
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
            <View style={styles.header}>
              <Header.Icon uri={require('../../assets/filter.gif')} />
              <Text style={styles.headerText}>Filter by:</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <SelectionCard
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
              />
              <SelectionCard
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
              />
            </ScrollView>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10}}>
              <MainButton>
                <Ionicons name="caret-back-circle" size={24} color="white" />
                <MainButton.Title>Go Back</MainButton.Title>
              </MainButton>
              <MainButton>
                <MainButton.Title>Save</MainButton.Title>
                <Ionicons name="cloud-upload" size={24} color="white" />
              </MainButton>
            </View>
            {/* <TouchableOpacity onPress={handleFilterUpdate}>
              <Text>Apply Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Text>Close Modal</Text>
            </TouchableOpacity> */}
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
    backgroundColor: Colours.primary,
    borderRadius: 20,
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
});

export default FilterModal;
