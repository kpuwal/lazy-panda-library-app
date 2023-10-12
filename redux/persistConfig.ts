import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, PersistConfig } from 'redux-persist';
import { CombinedState, Reducer, combineReducers } from '@reduxjs/toolkit';

import bookReducer, { BookType } from './slices/bookSlice';
import pickerReducer, { pickerDataTypes } from './slices/pickerSlice';
import appReducer, { appTypes } from './slices/appSlice';
import navigationSlice, { navType } from './slices/navigationSlice';
import libraryReducer, { LibraryTypes } from './slices/librarySlice';
// import { RootState } from './store';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

export type RootStateType = {
  book: {
    book: BookType;
    bookTitleForRowUpdate: string;
    bookError: string;
    bookIsLoaded: boolean;
  };
  library: LibraryTypes;
  pickers: pickerDataTypes;
  app: appTypes;
  navigate: navType;
};

const rootReducer: Reducer<CombinedState<RootStateType>, any> = combineReducers({
  book: bookReducer,
  library: libraryReducer,
  pickers: pickerReducer,
  app: appReducer,
  navigate: navigationSlice
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['library', 'pickers', 'app', 'book'],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer<RootStateType>(persistConfig, rootReducer);

// const persistedReducer = () =>
//   persistReducer(persistConfig, rootReducer);

export { persistedReducer, rootReducer };
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default persistedReducer;
