import { createSlice } from "@reduxjs/toolkit";

type appTypes = {
  cameraPermission: boolean,
  scanned: boolean,
  disabled: boolean,
  flashMode: string,
}

const initialState: appTypes = {
  cameraPermission: false,
  scanned: false,
  disabled: true,
  flashMode: 'off',
};

const appSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    isScanned: (state, action) => {
      state.scanned = action.payload; 
    },
    isDisabled: (state, action) => {
      state.disabled = action.payload;
    },
    setFlashMode: (state, action) => {
      state.flashMode = action.payload;
    },
    setCameraPermission: (state, action) => {
      state.cameraPermission = action.payload;
    },
  },
})

export const { isScanned, isDisabled, setFlashMode, setCameraPermission } = appSlice.actions;
export default appSlice.reducer;
