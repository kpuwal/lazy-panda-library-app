
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cleanPickerData } from '../../helpers/api';
import { GOOGLE_API_PICKER_URL } from '@env';
import axios from 'axios';

type pickerTypes = {label: string, value: string};

type pickerDataTypes = {
  genre: pickerTypes[],
  series: pickerTypes[],
  world: pickerTypes[],
  readBy: pickerTypes[],
  pickerError: string,
}

const pickerDefault = [{label: '', value: ''}];

const initialState: pickerDataTypes = {
  genre: pickerDefault,
  series: pickerDefault,
  world: pickerDefault,
  readBy: pickerDefault,
  pickerError: '',
}

export const fetchPicker = createAsyncThunk(
  '/api/picker',
  async (_, { rejectWithValue }) => {  
    try {
      const data = await axios.get(GOOGLE_API_PICKER_URL);
      return cleanPickerData(data.data);
    } catch(err) {
      return rejectWithValue(err)
    }
  }
)

export const pickerSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchPicker.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    })
    .addCase(fetchPicker.rejected, (state, action) => {
      state.pickerError = "Server is not connected";
    })
  },
})

export default pickerSlice.reducer;
