import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TOKEN } from '@env';
import { mainUrl } from '../../server-location';
import axios from 'axios';
import { tagsTypes } from "./tagsSlice";

const URL = mainUrl();

type TagType = {
  title: string,
  image: string,
  labels: string[]
};

export type settingsTypes = {
  tags: TagType[];
  categories: string[];
  tagsError?: string;
  categoriesError: string;
  dataError: string;
  tagsMsg: string;
  categoriesMsg: string;
}

const initialState: settingsTypes = {
  tags: [],
  categories: [],
  tagsError: '',
  categoriesError: '',
  dataError: '',
  tagsMsg: '',
  categoriesMsg: '',
}

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const [tagsResponse, categoriesResponse] = await Promise.all([
        axios.get(`${URL}/api/tags`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }),
        axios.get(`${URL}/api/categories`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }),
      ]);

      const tags = tagsResponse.data.tags;
      const categories = categoriesResponse.data.categories;

      const tagTitles = tags.map((tag: TagType) => {
        const lowercasedTitle = tag.title.toLowerCase();
        return lowercasedTitle.charAt(0).toUpperCase() + lowercasedTitle.slice(1);
      });
      
      const remainingCategories = categories.filter((category: string) => !tagTitles.includes(category));

      return { tags, categories: remainingCategories };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

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

export const settingsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTitle: (state, action) => {
      const { newTitle, image } = action.payload;
      const updatedTags = [...state.tags, { title: newTitle, labels: [], image }];

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
    .addCase(fetchData.fulfilled, (state, action) => {
      const { tags, categories } = action.payload;
      return {
        ...state,
        tags,
        categories
      }
    })
    .addCase(fetchData.rejected, (state) => {
      return {
        ...state,
        dataError: 'Error fetching tags and categories'
      }
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
} = settingsSlice.actions;
export default settingsSlice.reducer;
