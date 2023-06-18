import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cleanData } from '../../helpers/api';
import { Alert } from 'react-native';
import { GOOGLE_BOOKS_URL, APP_SHEETBEST_URL } from '@env';
import axios from 'axios';

type bookType = {
  title: string,
  author: string,
  language: string,
  publishedDate: string,
  pageCount: string | number,
  genre: string,
  series: string,
  world: string,
  readBy: string,
  boughtGivenOn: string,
  givenBy: string,
  lastReadByJowie: string,
  lastReadByKasia: string,
}

const initialState = {
  title: '',
  subtitle: '',
  author: '',
  language: '',
  publishedDate: '',
  pageCount: 0,
  genre: '',
  series: '',
  world: '',
  readBy: '',
  boughtGivenOn: '',
  givenBy: '',
  lastReadByJowie: '',
  lastReadByKasia: '',
  isFound: true,
  isLoaded: false,
  bookError: '',
};

export const fetchBook = createAsyncThunk(
  'fetchBook',
  async (isbn: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(GOOGLE_BOOKS_URL + isbn)
      const cleanedData = cleanData(response.data);
      return cleanedData;
    } catch(err) {
      Alert.alert('api is not working properly')
      return rejectWithValue(err)
    }   
  }
)

export const saveBook = createAsyncThunk('/api/add-book', async (book: bookType, { rejectWithValue }) => {
    const config = {
        "Title": book.title,
        "Author": book.author,
        "Language": book.language,
        "Published Date": book.publishedDate,
        "Page Count": book.pageCount,
        "Genre": book.genre,
        "Series": book.series,
        "World": book.world,
        "Read by": book.readBy,
        "Bought/Given on": book.boughtGivenOn,
        "Given by": book.givenBy,
        "Last Read by Jowie": book.lastReadByJowie,
        "Last Read by Kasia": book.lastReadByKasia,
      }

    try {
      await axios.post(APP_SHEETBEST_URL, config)
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    updateBook: (state, action) => {
    Object.assign(state, action.payload);
    },
    cleanBook: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.isFound) {
        const data = action.payload;
        state.title = data.title === undefined ? '' : data.title;
        state.author = data.author === undefined ? '' : data.author;
        state.pageCount = data.pageCount === undefined ? '' : data.pageCount;
        state.publishedDate = data.publishedDate === undefined ? '' : data.publishedDate;
        state.language = data.language === undefined ? '' : data.language.toUpperCase();
        state.isLoaded = true;
      } else {
        state.bookError = "Book has not been found in the database";
      }
    })
    .addCase(fetchBook.rejected, (state, action) => {
      state.bookError = "Server is not connected";
    })
    .addCase(saveBook.rejected, (state, action) => {
      state.bookError = "Error saving the book";
    })
  },
})

export const { updateBook, cleanBook } = bookSlice.actions;
export default bookSlice.reducer;
