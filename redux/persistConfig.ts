import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import { CombinedState, Reducer, combineReducers } from '@reduxjs/toolkit';

import bookReducer, { bookTypes } from './slices/bookSlice';
import pickerReducer, { pickerTypes } from './slices/pickerSlice';
import appReducer, { appTypes } from './slices/appSlice';
import navigationSlice, { navTypes } from './slices/navigationSlice';
import libraryReducer, { libraryTypes } from './slices/librarySlice';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

export type RootStateType = {
  book: bookTypes,
  library: libraryTypes;
  pickers: pickerTypes;
  app: appTypes;
  navigate: navTypes;
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

export { persistedReducer, rootReducer };
