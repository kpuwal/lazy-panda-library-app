import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import bookReducer from './slices/bookSlice';
import pickerReducer from './slices/pickerSlice';
import appReducer from './slices/appSlice';
import navigationSlice from './slices/navigationSlice';
import librarySlice from './slices/librarySlice';

const customSerializableCheck = {
  isSerializable: (value: any) => {
    // Customize the isSerializable function as needed
    // Return true for values that you consider serializable
    return true;
  },
};

export const store = configureStore({
  reducer: {
    book: bookReducer,
    library: librarySlice,
    pickers: pickerReducer,
    app: appReducer,
    navigate: navigationSlice
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: customSerializableCheck,
    });
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;