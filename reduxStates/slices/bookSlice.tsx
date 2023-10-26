import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TOKEN } from '@env';
import { mainUrl } from '../../server-location';
import axios from 'axios';
const URL = mainUrl();

export type LibrarySectionType = {
  title: string;
  data:  BookType[]
}

export type BookType = {
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
  subtitle?: string,
  isFound?: boolean,
  key?: string
}

export type bookTypes = {
  book: BookType,
  bookTitleForRowUpdate: string,
  bookError: string | null,
  bookMsg: string | null,
  bookIsLoaded: boolean
}

const initialState: bookTypes = {
  book: {
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
    isFound: false,
    key: ''
  },
  bookTitleForRowUpdate: '',
  bookError: null,
  bookMsg: null,
  bookIsLoaded: false
};

export const fetchBook = createAsyncThunk(
  '/api/book',
  async (isbn: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}/api/book`,
        { isbn },
        { headers: { 
          Authorization: `Bearer ${TOKEN}`
        }}
      )
      return response.data
    } catch(err: any) {
      if (err.response) {
        return rejectWithValue(err.response.data);
      } else if (err.request) {
        return rejectWithValue('No response received from the server');
      } else {
        return rejectWithValue('Error occurred while making the request');
      }
    } 
  }
)

export const saveBook = createAsyncThunk('/api/add-book', async (book: BookType, { rejectWithValue }) => {
    const config = {
        "title": book.title,
        "author": book.author,
        "language": book.language,
        "publishedDate": book.publishedDate,
        "pageCount": book.pageCount,
        "genre": book.genre,
        "series": book.series,
        "world": book.world,
        "readBy": book.readBy,
        "boughtGivenOn": book.boughtGivenOn,
        "givenBy": book.givenBy,
        "lastReadByJowie": book.lastReadByJowie,
        "lastReadByKasia": book.lastReadByKasia,
      }

    try {
      const response = await axios.post(`${URL}/api/add-book`, config, {
        headers: { Authorization: `Bearer ${TOKEN}`}
      })
      return response.data.msg;
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
      return {
        ...state,
        book: {
          ...state.book,
          ...action.payload,
        },
      };
    },
    displayBookData: (state, action) => {
      state.bookIsLoaded = true;
      const bookData = action.payload;
      state.book = {
        ...state.book,
        ...bookData,
      };
    },
    cleanBook: () => {
      return initialState;
    },
    copyAndStoreTitle: (state, action) => {
      state.bookTitleForRowUpdate = action.payload;
    },
    setBookIsLoaded: (state, action) => {
      state.bookIsLoaded = action.payload;
    },
    resetBookMessages: (state) => {
      state.bookMsg = null;
      state.bookError = null;
      state.bookIsLoaded = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchBook.fulfilled, (state, action) => {
      const { isFound, title, author, pageCount, publishedDate, language } = action.payload;
    
      if (isFound) {
        state.book.title = title || '';
        state.book.author = author || '';
        state.book.pageCount = pageCount || '';
        state.book.publishedDate = publishedDate || '';
        state.book.language = (language || '').toUpperCase();
        state.bookIsLoaded = true;
      }
    })    
    .addCase(fetchBook.rejected, (state, action) => {
      state.bookError = "Server is not connected";
    })
    .addCase(saveBook.fulfilled, (state, action) => {
      state.bookMsg = action.payload;
      // state.bookIsLoaded = true;
    })
    .addCase(saveBook.rejected, (state, action) => {
      state.bookError = "Error saving the book";
      // state.bookIsLoaded = true;
    })
  },
})

export const {
  updateBook,
  cleanBook,
  displayBookData,
  copyAndStoreTitle,
  setBookIsLoaded,
  resetBookMessages
} = bookSlice.actions;

export default bookSlice.reducer;
