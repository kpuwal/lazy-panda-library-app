import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TOKEN } from '@env';
import { mainUrl } from '../../server-location';

const URL = mainUrl();

export type CategoriesTypes = {
  categories: string[];
}

const initialState: CategoriesTypes = {
  categories: []
}

export const readCategories = createAsyncThunk(
  'categories/read',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/api/categories`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      return response.data.categories;
    } catch (err: any) {
      console.error('Categories error:', err);

      return rejectWithValue(err.response?.data || err.message || 'Unknown error');
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(readCategories.fulfilled, (state, action) => {
        const categories = action.payload;
        return {
          ...state,
          categories
        };
      })
      .addCase(readCategories.rejected, (state, action) => {
        // Handle the rejected case if needed
        console.error('Categories rejected:', action.error);
      });
  }
});

export default categoriesSlice.reducer;
