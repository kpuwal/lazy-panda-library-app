import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOKEN } from '@env';
import { mainUrl } from '../../server-location';
import axios from 'axios';
const URL = mainUrl();

type pickerType = {label: string, value: string};

export type pickerTypes = {
  genre: pickerType[],
  series: pickerType[],
  world: pickerType[],
  readBy: pickerType[],
  pickerError: string,
}

const pickerDefault = [{label: '', value: ''}];

const initialState: pickerTypes = {
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
      const response = await axios.get(`${URL}/api/picker`, {
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
