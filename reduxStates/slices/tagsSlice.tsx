import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TOKEN } from '@env';
import { mainUrl } from '../../server-location';
import axios from 'axios';
const URL = mainUrl();

type TagType = {title: string, labels: string[]};

export type tagsTypes = {
  tags: TagType[];
  tagsError?: string;
}

const initialState: tagsTypes = {
  tags: [],
  tagsError: '',
}

export const fetchTags = createAsyncThunk(
  '/api/tags',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/api/tags`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      
      return response.data.tags;
    } catch(err) {
      return rejectWithValue(err)
    }
  }
)

export const tagsSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchTags.fulfilled, (state, action) => {
      return {
        ...state,
        tags: action.payload
      };
    })
    .addCase(fetchTags.rejected, (state) => {
      return {
        ...state,
        tagsError: "Error fetching tags from the picker sheet",
      };
    })
  },
})

export default tagsSlice.reducer;
