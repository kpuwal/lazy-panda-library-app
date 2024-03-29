import { createSlice } from "@reduxjs/toolkit";

export type appTypes = {
  cameraPermission: boolean,
  scanned: boolean,
  disabled: boolean,
  navigationSource: string,
  libraryListActiveButton: string,
  isAlphabetListActive: boolean,
  isFilterModalActive: boolean,
  isAlertModalActive: boolean,
  activeAlphabetLetter: string | null
}

const initialState: appTypes = {
  cameraPermission: false,
  scanned: false,
  disabled: true,
  navigationSource: '',
  libraryListActiveButton: 'DEFAULT',
  isAlphabetListActive: false,
  isFilterModalActive: false,
  isAlertModalActive: false,
  activeAlphabetLetter: null
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAlertModal: (state, action) => {
      return {
        ...state,
        isAlertModalActive: action.payload
      }
    },
    isScanned: (state, action) => {
      return {
        ...state,
        scanned: action.payload
      }
    },
    savingBookIsDisabled: (state, action) => {
      return {
        ...state,
        disabled: action.payload
      }
    },
    setCameraPermission: (state, action) => {
      return {
        ...state,
        cameraPermission: action.payload
      }
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
    setActiveAlphabetLetter: (state, action) => {
      return {
        ...state,
        activeAlphabetLetter: action.payload
      }
    }
  },
})

export const { 
  isScanned, 
  savingBookIsDisabled,
  setCameraPermission,
  setNavigationSource,
  setLibraryActiveListButton,
  toggleAlphabetList,
  toggleFilterModal,
  setActiveAlphabetLetter,
  setAlertModal
} = appSlice.actions;

export default appSlice.reducer;
