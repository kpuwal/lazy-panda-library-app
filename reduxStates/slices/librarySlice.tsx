import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TOKEN } from '@env';
import { mainUrl } from '../../server-location';
import { BookType } from "./bookSlice";
import { handleSort, searchLibrary } from "./helper";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  libraryCopy: BookType[],
  librarySortedByAuthor: {
    data: librarySectionType[],
    alphabet: string[]
  },
  librarySortedByTitle: {
    data: librarySectionType[],
    alphabet: string[]
  },
  bookTitleForRowUpdate: string,
  libraryIsLoaded: boolean,
  libraryIsFiltered: boolean,
  alphabet: string[],
  selectedFilters: SelectedFiltersType,
  selectedFilterHeader: SelectedFiltersType,
  booksNumber: number,
  libraryMsg: string | null,
  libraryError: string | null,
  searchQuery: string
}

const initialState: libraryTypes = {
  library: [],
  libraryCopy: [],
  librarySortedByAuthor: {
    data: [],
    alphabet: []
  },
  librarySortedByTitle: {
    data: [],
    alphabet: []
  },
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
  libraryMsg: null,
  searchQuery: ''
}

const storeData = async (data: any) => {
  try {
    const serializedData = JSON.stringify(data);
    await AsyncStorage.setItem('library', serializedData);
    console.log('Data stored successfully');
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

const sortAndUpdateLibrarySections = (
  state: libraryTypes,
  library: BookType[],
  sortBy: 'title' | 'author'
) => {
  const sortedSections = handleSort(library, sortBy);
  const key = sortBy === 'title' ? 'librarySortedByTitle' : 'librarySortedByAuthor';
  state[key] = {
    data: sortedSections.sortedSections,
    alphabet: sortedSections.sectionLetters,
  };
};

export const readLibrary = createAsyncThunk(
  '/api/library',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${URL}/api/library`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      dispatch(sortLibraryByTitle(response.data));
      dispatch(sortLibraryByAuthor(response.data));

      storeData(response.data);
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

export const updateLibrary = createAsyncThunk(
  '/api/update-library',
  async ({ book, bookTitleForRowUpdate }: { book: BookType; bookTitleForRowUpdate: string }, { rejectWithValue }) => {
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
    setLibraryDatafromStorageToState: (state, action) => {
      const library = action.payload;
      // console.log('library ', library[0])
      state.library = library;
      state.libraryCopy = library;
      state.booksNumber = library.length;
      state.libraryIsFiltered = false;
      state.libraryIsLoaded = true;

      // Sort by title and update librarySortedByTitle
      sortAndUpdateLibrarySections(state, library, 'title');

      // Sort by author and update librarySortedByAuthor
      sortAndUpdateLibrarySections(state, library, 'author');
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      if (action.payload !=='') {
        state.library = searchLibrary(action.payload, state.libraryCopy);
        state.booksNumber = state.library.length;
      }

      return state;
    },
    setSelectedFilters: (state, action) => {
      // console.log('selected filters ', action.payload)
      return {
        ...state,
        selectedFilters: action.payload,
        selectedFilterHeader: action.payload
      }
    },
    sortLibraryByTitle: (state, action) => {
      console.log('here')
      const sortedByTitle = handleSort(action.payload, 'title');
      return {
        ...state,
        librarySortedByTitle: {
          data: sortedByTitle.sortedSections,
          alphabet: sortedByTitle.sectionLetters
        }
      }
    },
    sortLibraryByAuthor: (state, action) => {
      const sortedByAuthor = handleSort(action.payload, 'author');
      return {
        ...state,
        librarySortedByAuthor: {
          data: sortedByAuthor.sortedSections,
          alphabet: sortedByAuthor.sectionLetters
        }
      }
    },
    resetLibraryMessages: (state) => {
      return {
        ...state,
        libraryMsg: null,
        libraryError: null
      }
    },
    resetSelectedFilters: (state) => {
      return {
        ...state,
        selectedFilters: {
          type: '',
          item: ''
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(filterLibrary.fulfilled, (state, action) => {
      const library = action.payload;
      return {
        ...state,
        library,
        libraryIsLoaded: true,
        libraryIsFiltered: true,
        booksNumber: library.length
      }
      
    })
    .addCase(updateLibrary.fulfilled, (state, action) => {
      return {
        ...state,
        libraryMsg: action.payload
      }
    })
    .addCase(updateLibrary.rejected, (state) => {
      return {
        ...state,
        libraryError: "Error updating the book"
      }
    })
    .addCase(readLibrary.fulfilled, (state, action) => {
      const library = action.payload;
      return {
        ...state,
        library,
        libraryCopy: library,
        booksNumber: library.length,
        libraryIsFiltered: false,
        libraryIsLoaded: true
      }
      
    })
  },
})

export const {
  setSelectedFilters,
  sortLibraryByAuthor,
  sortLibraryByTitle,
  resetLibraryMessages,
  resetSelectedFilters,
  setSearchQuery,
  setLibraryDatafromStorageToState
} = librarySlice.actions;
export default librarySlice.reducer;
