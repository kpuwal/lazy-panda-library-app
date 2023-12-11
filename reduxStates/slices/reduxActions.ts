import {
  fetchBook,
  saveBook,
  updateBook,
  cleanBook,
  displayBookData,
  copyAndStoreTitle,
  setBookIsLoaded,
  resetBookMessages,
  BookType
} from './bookSlice';

import {
  isScanned, 
  savingBookIsDisabled,
  setCameraPermission,
  setNavigationSource,
  setLibraryActiveListButton,
  toggleAlphabetList,
  toggleFilterModal,
  setActiveAlphabetLetter,
  setAlertModal
} from './appSlice';

import {
  readLibrary,
  updateLibrary,
  filterLibrary,
  setSelectedFilters,
  sortLibraryByAuthor,
  sortLibraryByTitle,
  resetLibraryMessages,
  resetSelectedFilters,
  librarySectionType,
  setSearchQuery,
  setLibraryDatafromStorageToState
} from './librarySlice';

import { fetchPicker } from './pickerSlice';
import { 
  fetchTags,
  addTagUnderTitle,
  deleteLabelItem,
  addTitle,
  deleteTitle,
  updateTags
} from './tagsSlice';

import {
  readCategories
} from './categoriesSlice';

export {
  fetchBook,
  saveBook,
  updateBook,
  cleanBook,
  displayBookData,
  copyAndStoreTitle,
  setBookIsLoaded,
  resetBookMessages,
  isScanned, 
  savingBookIsDisabled,
  setCameraPermission,
  setNavigationSource,
  setLibraryActiveListButton,
  toggleAlphabetList,
  toggleFilterModal,
  setActiveAlphabetLetter,
  setAlertModal,
  readLibrary,
  updateLibrary,
  filterLibrary,
  setSelectedFilters,
  sortLibraryByAuthor,
  sortLibraryByTitle,
  resetLibraryMessages,
  resetSelectedFilters,
  fetchPicker,
  fetchTags,
  addTagUnderTitle,
  deleteLabelItem,
  addTitle,
  deleteTitle,
  updateTags,
  librarySectionType,
  setSearchQuery,
  setLibraryDatafromStorageToState,
  BookType,
  readCategories
};