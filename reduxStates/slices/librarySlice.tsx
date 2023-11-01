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
  librarySortedByAuthor: librarySectionType[],
  librarySortedByTitle: librarySectionType[],
  // sortedLibrary: librarySectionType[],
  bookTitleForRowUpdate: string,
  libraryIsLoaded: boolean,
  libraryIsFiltered: boolean,
  libraryError: string | null,
  alphabet: string[],
  selectedFilters: SelectedFiltersType,
  selectedFilterHeader: SelectedFiltersType,
  booksNumber: number,
  libraryMsg: string | null,
}

const initialState: libraryTypes = {
  library: [],
  librarySortedByAuthor: [],
  librarySortedByTitle: [],
  // sortedLibrary: [],
  bookTitleForRowUpdate: '',
  libraryIsLoaded: false,
  libraryIsFiltered: false,
  libraryError: null,
  alphabet: [],
  selectedFilters: {
    type: '',
    item: '',
  },
  selectedFilterHeader: {
    type: '',
    item: ''
  },
  booksNumber: 0,
  libraryMsg: null
}

export const readLibrary = createAsyncThunk(
  '/api/library',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${URL}/api/library`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      dispatch(sortLibraryByTitle(response.data));
      dispatch(sortLibraryByAuthor(response.data));
      return response.data;
    } catch(err) {
      return rejectWithValue(err)
    }
  }
)

export const filterLibrary = createAsyncThunk(
  '/api/filter-library',
  async (filter: {type: string, item: string}, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${URL}/api/filter-library`,
      { filter }, 
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      dispatch(sortLibraryByTitle(response.data));
      dispatch(sortLibraryByAuthor(response.data));
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
    const response = await axios.post(`${URL}/api/update-library`, config, {
      headers: { Authorization: `Bearer ${TOKEN}`}
    })
    return response.data.msg;
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
      state.selectedFilterHeader = action.payload;
    },
    sortLibraryByTitle: (state, action) => {
      const sortedByTitle = handleSort(action.payload, 'title');
      state.librarySortedByTitle = sortedByTitle.sortedSections;
      state.alphabet = sortedByTitle.sectionLetters;
    },
    sortLibraryByAuthor: (state, action) => {
      const sortedByAuthor = handleSort(action.payload, 'author');
      state.librarySortedByAuthor = sortedByAuthor.sortedSections;
      state.alphabet = sortedByAuthor.sectionLetters;
    },
    resetLibraryMessages: (state) => {
      state.libraryMsg = null;
      state.libraryError = null;
    },
    resetSelectedFilters: (state) => {
      state.selectedFilters.type = '';
      state.selectedFilters.item = ''; 
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
    .addCase(updateLibrary.fulfilled, (state, action) => {
      state.libraryMsg = action.payload;
    })
    .addCase(updateLibrary.rejected, (state, action) => {
      state.libraryError = "Error updating the book";
    })
    .addCase(readLibrary.fulfilled, (state, action) => {
      state.library = action.payload;
      state.booksNumber = state.library.length;
      state.libraryIsFiltered = false;
      state.libraryIsLoaded = true;
    })
  },
})

export const {
  setSelectedFilters,
  sortLibraryByAuthor,
  sortLibraryByTitle,
  resetLibraryMessages,
  resetSelectedFilters
} = librarySlice.actions;
export default librarySlice.reducer;
