import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from 'react-native';
import { TOKEN } from '@env';
import { mainUrl } from '../../server-location';
import axios from 'axios';
const URL = mainUrl();

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
  '/api/book',
  async (isbn: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/api/book`,
      { isbn },
      {
        headers: { Authorization: `Bearer ${TOKEN}`}
      })
      return response.data
    } catch(err: any) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(err.response.data);
        // console.log(err.response.status);
        // console.log(err.response.headers);
        return rejectWithValue(err.response.data);
      } else if (err.request) {
        // The request was made but no response was received
        // `err.request` is an instance of XMLHttpRequest in the browser
        // console.log(err.request);
        return rejectWithValue('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', err.message);
        return rejectWithValue('Error occurred while making the request');
      }
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
      await axios.post(`${URL}/api/add-book`, config, {
        headers: { Authorization: `Bearer ${TOKEN}`}
      })
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
