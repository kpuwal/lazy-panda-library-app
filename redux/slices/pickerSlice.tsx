
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, TOKEN } from '@env';
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
      const response = await axios.get(`${API_URL}/api/picker`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      return response.data;
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
      state.pickerError = '';
    })
    .addCase(fetchPicker.rejected, (state, action) => {
      state.pickerError = "Error fetching tags from the picker sheet";
    })
  },
})

export default pickerSlice.reducer;
