import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import { useEffect } from "react";
import TextCard from "./infoModules/TextCard";
import { updateBook, saveBook, copyAndStoreTitle } from '../../redux/slices/bookSlice';
import { updateLibrary } from "../../redux/slices/librarySlice";
import { isScanned, savingBookIsDisabled } from '../../redux/slices/appSlice';
import {genreIcon, seriesIcon, worldIcon, readByIcon, boughtGivenOnIcon, givenByIcon, lastReadIcon} from './infoModules/Icons';
import { navigate } from '../../redux/slices/navigationSlice';

// import Header from "./infoModules/Header";
import NumbersCard from './infoModules/NumbersCard';
import SelectionCard from './infoModules/SelectionCard';
import DateCard from './infoModules/DateCard';
import Header from "../header/Header";
import { buttonMid, headerContainer, headerInfoContainer } from "../../styles/styles";
import { Colours } from "../../styles/constants";
import MainButton from "../button/MainButton";
import { Ionicons } from "@expo/vector-icons";


const Book = () => {
  const { book, bookTitleForRowUpdate } = useSelector((state: RootState) => state.book);
  const app = useSelector((state: RootState) => state.app);
  const picker = useSelector((state: RootState) => state.pickers);
  const { navigationSource } = useSelector((state: RootState) => state.navigate)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(copyAndStoreTitle(book.title));
  }, []);


  const handleDismiss = () => {
    if (navigationSource === 'Library') {
      dispatch(navigate('library'))
    } else {
      dispatch(navigate('scanBook'))
    }
    dispatch(isScanned(false));
    dispatch(updateBook({isLoaded: false}));
  }

  const handleSaveBook = () => {
    console.log("navigationSource: ", navigationSource)
    if (navigationSource === 'Library') {
      dispatch(updateLibrary({book, bookTitleForRowUpdate}));
    } else {
      dispatch(saveBook(book));
    }
    dispatch(savingBookIsDisabled(true));
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
        <StatusBar style="dark" />
        {/* <Header 
          handleClose={() => handleDismiss()}
          isDisabled={app.disabled} /> */}
        <Header>
          <Header.GoBack goBackUrl="library" />
          <View style={headerInfoContainer}>
            <Header.Icon uri={require('../../assets/book-data.gif')} />
            <Header.Title>Book Data</Header.Title>
          </View>
        </Header>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <TextCard
              item={book.title}
              size={22}
              isNumeric={false}
              editItem={(el: string) => dispatch(updateBook({title: el}))}
            />
            <TextCard
              item={book.author}
              size={20}
              isNumeric={false}
              editItem={(el: string) => dispatch(updateBook({author: el}))}
            />
            <NumbersCard
              language={book.language}
              editLanguage={(el: string) => dispatch(updateBook({language: el}))}
              pageCount={book.pageCount}
              editPageCount={(el: string) => dispatch(updateBook({pageCount: el}))}
              publishedDate={book.publishedDate}
              editPublishedDate={(el: string) => dispatch(updateBook({publishedDate: el}))}
            />
            <SelectionCard
              title={"Genre:"}
              icon={genreIcon}
              data={picker.genre}
              active={book.genre}
              select={(el: string) => dispatch(updateBook({genre: el}))}
            />
            <SelectionCard
              title={"Series:"}
              icon={seriesIcon}
              data={picker.series}
              active={book.series}
              select={(el: string) => dispatch(updateBook({series: el}))}
            />
            <SelectionCard
              title={"World:"}
              icon={worldIcon}
              data={picker.world}
              active={book.world}
              select={(el: string) => dispatch(updateBook({world: el}))}
            />
            <SelectionCard
              title={"Read By:"}
              icon={readByIcon}
              data={picker.readBy}
              active={book.readBy}
              select={(el: string) => dispatch(updateBook({readBy: el}))}
            />

            <TitleHeader icon={boughtGivenOnIcon} title="Bought/Given On:" />
            <DateCard type={"boughtGivenOn"} dateData={book.boughtGivenOn} />

            <TitleHeader icon={givenByIcon} title="Given By:" />
            <TextCard
              item={book.givenBy}
              size={20}
              isNumeric={false}
              editItem={(el: string) => dispatch(updateBook({givenBy: el}))}
            />

            <TitleHeader icon={lastReadIcon} title="Last Read By Jowie On:" />
            <DateCard type={"lastReadByJowie"} dateData={book.lastReadByJowie} />

            <TitleHeader icon={lastReadIcon} title="Last Read By Kasia On:" />
            <DateCard type={"lastReadByKasia"} dateData={book.lastReadByKasia} />

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
    // topPadding: 100
    // justifyContent: 'center',
    // alignItems: 'center'
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
})
