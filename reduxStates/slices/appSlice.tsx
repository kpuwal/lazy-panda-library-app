import { createSlice } from "@reduxjs/toolkit";

export type appTypes = {
  cameraPermission: boolean,
  scanned: boolean,
  disabled: boolean,
  navigationSource: string,
  libraryListActiveButton: string
}

const initialState: appTypes = {
  cameraPermission: false,
  scanned: false,
  disabled: true,
  navigationSource: '',
  libraryListActiveButton: 'DEFAULT'
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
  setLibraryActiveListButton
} = appSlice.actions;

export default appSlice.reducer;
