import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistedReducer, rootReducer } from './persistConfig';

// import bookReducer from './slices/bookSlice';
// import pickerReducer from './slices/pickerSlice';
// import appReducer from './slices/appSlice';
// import navigationSlice from './slices/navigationSlice';
// import libraryReducer from './slices/librarySlice';

// export const rootReducer = combineReducers({
//   book: bookReducer,
//   library: libraryReducer,
//   pickers: pickerReducer,
//   app: appReducer,
//   navigate: navigationSlice
// })

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
})

export type RootState = ReturnType<typeof store.getState>;
// export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;