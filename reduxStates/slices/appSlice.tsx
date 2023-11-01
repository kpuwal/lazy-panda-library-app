import { createSlice } from "@reduxjs/toolkit";

export type appTypes = {
  cameraPermission: boolean,
  scanned: boolean,
  disabled: boolean,
  navigationSource: string,
  libraryListActiveButton: string,
  isAlphabetListActive: boolean,
  isFilterModalActive: boolean,
}

const initialState: appTypes = {
  cameraPermission: false,
  scanned: false,
  disabled: true,
  navigationSource: '',
  libraryListActiveButton: 'DEFAULT',
  isAlphabetListActive: false,
  isFilterModalActive: false
};

const appSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    isScanned: (state, action) => {
      state.scanned = action.payload; 
    },
    savingBookIsDisabled: (state, action) => {
      state.disabled = action.payload;
    },
    setCameraPermission: (state, action) => {
      state.cameraPermission = action.payload;
    },
    setLibraryActiveListButton: (state, action) => {
      return {
        ...state,
        libraryListActiveButton: action.payload
      };
    },
    toggleAlphabetList: (state, action) => {
      return {
        ...state,
        isAlphabetListActive: action.payload
      };
    },
    toggleFilterModal: (state, action) => {
      return {
        ...state,
        isFilterModalActive: action.payload
      };
    },
    setNavigationSource: (state, action) => {
      return {
        ...state,
        navigationSource: action.payload,
      };
    },
  },
})

export const { 
  isScanned, 
  savingBookIsDisabled,
  setCameraPermission,
  setNavigationSource,
  setLibraryActiveListButton,
  toggleAlphabetList,
  toggleFilterModal
} = appSlice.actions;

export default appSlice.reducer;
