import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TOKEN } from '@env';
import { mainUrl } from '../../server-location';
import axios from 'axios';
const URL = mainUrl();

type TagType = {
  title: string,
  labels: string[]
};

export type tagsTypes = {
  tags: TagType[];
  tagsError?: string;
  tagsMsg: string;
}

const initialState: tagsTypes = {
  tags: [],
  tagsError: '',
  tagsMsg: ''
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

export const updateTags = createAsyncThunk(
  '/api/update-tags',
  async (tags: TagType[], { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/api/update-tags`, {
        tags,
      }, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      return response.data.msg;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);


export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTitle: (state, action) => {
      const { newTitle } = action.payload;
      const updatedTags = [...state.tags, { title: newTitle, labels: [] }];

      return {
        ...state,
        tags: updatedTags,
      };
    },
    deleteTitle: (state, action) => {
      const { titleToDelete } = action.payload;
      const updatedTags = state.tags.filter((category) => category.title !== titleToDelete);
    
      return {
        ...state,
        tags: updatedTags,
      };
    },
    addTagUnderTitle: (state, action) => {
      const { title, newTag } = action.payload;
      const updatedTags = state.tags.map((category) => {
        if (category.title === title) {
          return {
            ...category,
            labels: [...category.labels, newTag],
          };
        }
        return category;
      });

      return {
        ...state,
        tags: updatedTags,
      };
    },
    deleteLabelItem: (state, action) => {
      const { title, labelToDelete } = action.payload;
      const updatedTags = state.tags.map((category) => {
        if (category.title === title) {
          return {
            ...category,
            labels: category.labels.filter((label) => label !== labelToDelete),
          };
        }
        return category;
      });

      return {
        ...state,
        tags: updatedTags,
      };
    },
  },
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
    .addCase(updateTags.fulfilled, (state, action) => {
      return {
        ...state,
        tagsMsg: action.payload
      };
    })
    .addCase(updateTags.rejected, (state) => {
      return {
        ...state,
        tagsError: "Error updating tags from the picker sheet",
      };
    })
  },
})
export const {
  addTagUnderTitle,
  deleteLabelItem,
  addTitle,
  deleteTitle
} = tagsSlice.actions;
export default tagsSlice.reducer;
