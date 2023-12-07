import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch, resetLibraryMessages, updateLibrary, isScanned, savingBookIsDisabled, updateBook, saveBook, copyAndStoreTitle, setBookIsLoaded, resetBookMessages, setAlertModal } from "@reduxStates/index";
import { genreIcon, seriesIcon, worldIcon, readByIcon, boughtGivenOnIcon, givenByIcon, lastReadIcon, SelectionCard, DateCard, TextCard, Title, Author, Numbers } from '@book/index';

import Header from "../header/Header";
import { buttonMid, headerInfoContainer, headerText } from "@styles/styles";
import { Colours } from "@styles/constants";
import PrimaryButton from "@components/button/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { LibraryOverlay } from "@components/library";
import AlertModal from "@components/alert/AlertModal";
import { alertMessage, alertTitle } from "@styles/alert";
import { buttonText } from "@styles/button";


const Book = () => {
  const { book, bookTitleForRowUpdate, bookError, bookMsg } = useSelector((state: RootState) => state.book);
  const { libraryMsg, libraryError } = useSelector((state: RootState) => state.library);
  const { tags } = useSelector((state: RootState) => state.tags);
  const { genre, series, world, readBy } = useSelector((state: RootState) => state.pickers);
  const { navigationSource } = useSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();
  const [bookIsLoading, setBookIsLoading] = useState(false);
  const [modalContent, setModalContent] = useState({title: '', message: ''});

  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);

  const handleCloseAlertModal = () => {
    dispatch(resetLibraryMessages());
    dispatch(resetBookMessages());
    setIsAlertModalVisible(false);
  };

  useEffect(() => {
    dispatch(copyAndStoreTitle(book.title));
    // console.log('genre ', book.genre, tags[0].)
  }, []);

  useEffect(() => {
    if (libraryMsg !== null) {
      setIsAlertModalVisible(true);
      setModalContent({
        title: '🐼 Success!',
        message: libraryMsg
      });
      setBookIsLoading(false);
    }
    if (libraryError !== null) {
      setIsAlertModalVisible(true);
      setModalContent({
        title: '🐼 Error!',
        message: libraryError
      });
      setBookIsLoading(false);
    }
    if (bookMsg !== null) {
      setIsAlertModalVisible(true);
      setModalContent({
        title: '🐼 Success!',
        message: bookMsg
      });
      setBookIsLoading(false);

    }
    if (bookError !== null) {
      setIsAlertModalVisible(true);
      setModalContent({
        title: '🐼 Error!',
        message: bookError
      });
      setBookIsLoading(false);
    }
  }, [libraryMsg, libraryError, bookError, bookMsg]);

  const handleSaveBook = () => {
    if (navigationSource === 'Library') {
      dispatch(updateLibrary({book, bookTitleForRowUpdate}));
      setBookIsLoading(true);
    } else {
      dispatch(saveBook(book));
      setBookIsLoading(true);
    }
    dispatch(savingBookIsDisabled(true));
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
        <StatusBar style="dark" />
        <Header>
          <Header.GoBack />
          <View style={headerInfoContainer}>
            <Header.Icon uri={require('@assets/book-data.gif')} />
            <Header.StyledText customStyle={headerText}>
              Book Data
            </Header.StyledText>
          </View>
        </Header>
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <Title />
            <Author />
            <Numbers />
            {tags.map((category, index) => {
              const activeLabel = category.labels.find(label => label === book.genre || label === book.series || label === book.world || label === book.language )
              return (
              <SelectionCard
                key={category.title}
                title={category.title}
                icon={category.image}
                data={category.labels}
                active={activeLabel}
                // select={(el: string) => dispatch(updateBook({category: el}))}
              />)
              })}
            {/* <SelectionCard
              title={"Genre:"}
              icon={genreIcon}
              data={genre}
              active={book.genre}
              select={(el: string) => dispatch(updateBook({genre: el}))}
            />
            <SelectionCard
              title={"Series:"}
              icon={seriesIcon}
              data={series}
              active={book.series}
              select={(el: string) => dispatch(updateBook({series: el}))}
            />
            <SelectionCard
              title={"World:"}
              icon={worldIcon}
              data={world}
              active={book.world}
              select={(el: string) => dispatch(updateBook({world: el}))}
            />
            <SelectionCard
              title={"Read By:"}
              icon={readByIcon}
              data={readBy}
              active={book.readBy}
              select={(el: string) => dispatch(updateBook({readBy: el}))}
            /> */}

            <TitleHeader
              icon={boughtGivenOnIcon}
              title="Bought/Given On:" 
            />
            <DateCard 
              type={"boughtGivenOn"}
              dateData={book.boughtGivenOn}
            />

            <TitleHeader
              icon={givenByIcon}
              title="Given By:"
            />
            <TextCard
              item={book.givenBy}
              size={20}
              isNumeric={false}
              editItem={(el: string) => dispatch(updateBook({givenBy: el}))}
            />

            <TitleHeader
              icon={lastReadIcon} 
              title="Last Read By Jowie On:"
            />
            <DateCard
              type={"lastReadByJowie"}
              dateData={book.lastReadByJowie}
            />

            <TitleHeader 
              icon={lastReadIcon}
              title="Last Read By Kasia On:"
            />
            <DateCard 
              type={"lastReadByKasia"} 
              dateData={book.lastReadByKasia}
            />
            <View style={styles.dummy}/>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 5
      }}>
        <PrimaryButton action={handleSaveBook} customStyle={buttonMid}>
          <PrimaryButton.StyledText customStyle={buttonText}>
            Save To Spreadsheet
          </PrimaryButton.StyledText>
          <Ionicons name="cloud-upload" size={22} color={Colours.primary} />
        </PrimaryButton>
      </View>

      <LibraryOverlay
        message={navigationSource === 'Library' ? 'Updating' : 'Saving'} isVisible={bookIsLoading}
      />

      <AlertModal isVisible={isAlertModalVisible}>
        <AlertModal.StyledText customStyle={alertTitle}>
          {modalContent.title}
        </AlertModal.StyledText>
        <AlertModal.StyledText customStyle={alertMessage}>
          {modalContent.message}
        </AlertModal.StyledText>
        <PrimaryButton action={handleCloseAlertModal}>
          <PrimaryButton.StyledText customStyle={buttonText}>
            Gotcha!
          </PrimaryButton.StyledText>
        </PrimaryButton>
      </AlertModal>
    </View>
  )
}

export default Book;

type TitleHeaderTypes = {
  icon: any,
  title: string,
}

const TitleHeader = ({icon, title}: TitleHeaderTypes) => {
  return(
    <View style={styles.titleContainer}>
        <View>{icon}</View>
        <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.primary,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    borderTopColor: '#d0d0d0',
  },
  title: {
    color: '#000000',
    padding: 5,
    fontFamily: 'Courier Prime',
    fontSize: 18,
  },
  dummy: {
    width: '100%',
    height: '20%',
    padding: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
})
