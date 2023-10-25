import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import { useEffect, useState } from "react";
import TextCard from "./infoModules/TextCard";
import { updateBook, saveBook, copyAndStoreTitle, setBookIsLoaded, resetBookMessages } from '../../redux/slices/bookSlice';
import { resetLibraryMessages, updateLibrary } from "../../redux/slices/librarySlice";
import { isScanned, savingBookIsDisabled } from '../../redux/slices/appSlice';
import {genreIcon, seriesIcon, worldIcon, readByIcon, boughtGivenOnIcon, givenByIcon, lastReadIcon} from './infoModules/Icons';

import SelectionCard from './infoModules/SelectionCard';
import DateCard from './infoModules/DateCard';
import Header from "../header/Header";
import { buttonMid, headerInfoContainer } from "../../styles/styles";
import { Colours } from "../../styles/constants";
import MainButton from "../button/MainButton";
import { Ionicons } from "@expo/vector-icons";

import Title from './bookModules/Title';
import Author from "./bookModules/Author";
import Numbers from "./bookModules/Numbers";
import React from "react";
import LoadingDots from "../scanner/scannerModules/LoadingDots";


const Book = ({ navigation }: any) => {
  const { book, bookTitleForRowUpdate, bookError, bookMsg } = useSelector((state: RootState) => state.book);
  const { libraryMsg, libraryError } = useSelector((state: RootState) => state.library);
  const { genre, series, world, readBy } = useSelector((state: RootState) => state.pickers);
  const { navigationSource, scanned } = useSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();
  const [bookIsLoading, setBookIsLoading] = useState(false);

  useEffect(() => {
    dispatch(copyAndStoreTitle(book.title));
  }, []);

  const resetStates = () => {
    dispatch(isScanned(false));
    dispatch(setBookIsLoaded(false));
    dispatch(resetBookMessages());
  }

  // useEffect(() => console.log('book is scanned ', scanned, ' loaded ', bookIsLoaded, ' book msg ', bookMsg, ' error ', bookError), [])

  useEffect(() => {
    // resetStates();
    if (libraryMsg !== null) {
      Alert.alert('Success', libraryMsg);
      setBookIsLoading(false);

    }
    if (libraryError !== null) {
      setBookIsLoading(false);
      Alert.alert('Error', libraryError);
    }
    if (bookMsg !== null) {
      Alert.alert('Success', bookMsg);
      setBookIsLoading(false);

    }
    if (bookError !== null) {
      setBookIsLoading(false);
      Alert.alert('Error', bookError);
    }
  }, [libraryMsg, libraryError, bookError, bookMsg]);


  const handleSaveBook = () => {
    if (navigationSource === 'Library') {
      dispatch(updateLibrary({book, bookTitleForRowUpdate}));
      setBookIsLoading(true);
      resetStates();
    } else {
      dispatch(saveBook(book));
      setBookIsLoading(true);
      resetStates();
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
            <Header.Icon uri={require('../../assets/book-data.gif')} />
            <Header.Title>Book Data</Header.Title>
          </View>
        </Header>
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <Title />
            <Author />
            <Numbers />
            <SelectionCard
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
            />

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
        <MainButton action={handleSaveBook} style={buttonMid}>
          <MainButton.Title>Save To Spreadsheet</MainButton.Title>
          <Ionicons name="cloud-upload" size={22} color={Colours.primary} />
        </MainButton>
      </View>
      {bookIsLoading && (
        <View style={styles.overlay}>
          <Text style={{paddingVertical: 20, fontFamily: 'Courier Prime Bold', fontSize: 22}}>{navigationSource === 'Library' ? 'Updating' : 'Saving'}</Text>
          <LoadingDots colour={'black'} />
        </View>)}
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
    fontWeight: 'bold',
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
