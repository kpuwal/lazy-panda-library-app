import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Alert } from 'react-native';
import { TOKEN } from '@env';
import { mainUrl } from '../../server-location';
import { BookType } from "./bookSlice";
import { handleSort } from "./helper";

const URL = mainUrl();

export type librarySectionType = {
  title: string;
  data:  BookType[]
}

export type sortedLibrarySectionType = {
  sectionLetters: string[],
  sortedSections: librarySectionType[]
}

type SelectedFiltersType = {
  type: string,
  item: string
}

export type libraryTypes = {
  library: BookType[],
  sortedLibrary: librarySectionType[],
  bookTitleForRowUpdate: string,
  libraryIsLoaded: boolean,
  libraryIsFiltered: boolean,
  libraryError: string,
  alphabet: string[],
  selectedFilters: SelectedFiltersType,
  booksNumber: number
}

const initialState: libraryTypes = {
  library: [],
  sortedLibrary: [],
  bookTitleForRowUpdate: '',
  libraryIsLoaded: false,
  libraryIsFiltered: false,
  libraryError: '',
  alphabet: [],
  selectedFilters: {
    type: '',
    item: '',
  },
  booksNumber: 0
}

export const readLibrary = createAsyncThunk(
  '/api/library',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/api/library`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      return response.data;
    } catch(err) {
      return rejectWithValue(err)
    }
  }
)

export const filterLibrary = createAsyncThunk(
  '/api/filter-library',
  async (filter: {type: string, item: string}, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/api/filter-library`,
      { filter }, 
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      return response.data;
    } catch(err) {
      return rejectWithValue(err)
    }
  }
)

export const updateLibrary = createAsyncThunk('/api/update-library', async ({ book, bookTitleForRowUpdate }: { book: BookType; bookTitleForRowUpdate: string }, { rejectWithValue }) => {
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
      "bookTitleForRowUpdate": bookTitleForRowUpdate
    }

  try {
    await axios.post(`${URL}/api/update-library`, config, {
      headers: { Authorization: `Bearer ${TOKEN}`}
    })
  } catch (err) {
    return rejectWithValue(err);
  }
}
)

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    setSelectedFilters: (state, action) => {
      state.selectedFilters = action.payload;
    },
    sortLibraryByTitle: (state, action) => {
      const sortedByTitle = handleSort(action.payload, 'title');
      state.sortedLibrary = sortedByTitle.sortedSections;
      state.alphabet = sortedByTitle.sectionLetters;
    },
    sortLibraryByAuthor: (state, action) => {
      // console.log('slice: ', action.payload)
      const sortedByAuthor = handleSort(action.payload, 'author');
      state.sortedLibrary = sortedByAuthor.sortedSections;
      state.alphabet = sortedByAuthor.sectionLetters;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(filterLibrary.fulfilled, (state, action) => {
      state.library = action.payload;
      state.libraryIsLoaded = true;
      state.libraryIsFiltered = true;
      state.booksNumber = state.library.length;
    })
    .addCase(updateLibrary.rejected, (state, action) => {
      state.libraryError = "Error updating the book";
    })
    .addCase(readLibrary.fulfilled, (state, action) => {
      state.library = action.payload;
      state.libraryIsFiltered = false;
      state.libraryIsLoaded = true;
      state.booksNumber = state.library.length;
    })
  },
})

export const {
  setSelectedFilters,
  sortLibraryByAuthor,
  sortLibraryByTitle,
} = librarySlice.actions;
export default librarySlice.reducer;
