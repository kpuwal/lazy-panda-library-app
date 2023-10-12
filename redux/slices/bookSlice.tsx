import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from 'react-native';
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

// export const readLibrary = createAsyncThunk(
//   '/api/library',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${URL}/api/library`, {
//         headers: { Authorization: `Bearer ${TOKEN}` },
//       });
//       return response.data;
//     } catch(err) {
//       return rejectWithValue(err)
//     }
//   }
// )

// export const filterLibrary = createAsyncThunk(
//   '/api/filter-library',
//   async (filter: {type: string, item: string}, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${URL}/api/filter-library`,
//       { filter }, 
//       {
//         headers: { Authorization: `Bearer ${TOKEN}` },
//       });
//       return response.data;
//     } catch(err) {
//       return rejectWithValue(err)
//     }
//   }
// )

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

// export const updateLibrary = createAsyncThunk('/api/update-library', async ({ book, bookTitleForRowUpdate }: { book: BookType; bookTitleForRowUpdate: string }, { rejectWithValue }) => {
//   const config = {
//       "title": book.title,
//       "author": book.author,
//       "language": book.language,
//       "publishedDate": book.publishedDate,
//       "pageCount": book.pageCount,
//       "genre": book.genre,
//       "series": book.series,
//       "world": book.world,
//       "readBy": book.readBy,
//       "boughtGivenOn": book.boughtGivenOn,
//       "givenBy": book.givenBy,
//       "lastReadByJowie": book.lastReadByJowie,
//       "lastReadByKasia": book.lastReadByKasia,
//       "bookTitleForRowUpdate": bookTitleForRowUpdate
//     }

//   try {
//     await axios.post(`${URL}/api/update-library`, config, {
//       headers: { Authorization: `Bearer ${TOKEN}`}
//     })
//   } catch (err) {
//     return rejectWithValue(err);
//   }
// }
// )


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
    resetBookIsLoaded: (state) => {
      state.bookIsLoaded = false;
    },
    resetBookMessages: (state) => {
      state.bookMsg = null;
      state.bookError = null;
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
      } else {
        state.bookError = "Book has not been found in the database";
      }
    })    
    .addCase(fetchBook.rejected, (state, action) => {
      state.bookError = "Server is not connected";
    })
    // .addCase(filterLibrary.fulfilled, (state, action) => {
    //   state.library = action.payload;
    //   state.libraryIsLoaded = true;
    //   state.libraryIsFiltered = true;
    // })
    .addCase(saveBook.fulfilled, (state, action) => {
      state.bookMsg = action.payload;
    })
    .addCase(saveBook.rejected, (state, action) => {
      state.bookError = "Error saving the book";
    })
    // .addCase(updateLibrary.rejected, (state, action) => {
    //   state.bookError = "Error updating the book";
    // })
    // .addCase(readLibrary.fulfilled, (state, action) => {
    //   state.library = action.payload;
    //   state.libraryIsFiltered = false;
    //   state.libraryIsLoaded = true;
    // })
  },
})

export const { updateBook, cleanBook, displayBookData, copyAndStoreTitle, setBookIsLoaded, resetBookIsLoaded, resetBookMessages } = bookSlice.actions;
export default bookSlice.reducer;
