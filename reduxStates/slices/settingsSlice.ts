import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TOKEN } from '@env';
import { mainUrl } from '../../server-location';
import axios from 'axios';
import { ADDITIONAL_BOOK_DATA, CONSTANT_BOOK_DATA } from "@helpers/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const URL = mainUrl();

type TagType = {
  title: string,
  image: string,
  labels: string[]
};

export type CategoryType = {
  bookScannerCategories: BookDataType[];
  userInputCategories: BookDataType[]
}

type BookDataType = {
  title: string,
  value: string,
  status: boolean,
  image?: string
}

export type settingsTypes = {
  tags: TagType[];
  categories: CategoryType;
  bookData: BookDataType[];
  tagsError?: string;
  categoriesError: string;
  dataError: string;
  tagsMsg: string;
  categoriesMsg: string;
}

const initialState: settingsTypes = {
  tags: [],
  categories: {
    bookScannerCategories: [],
    userInputCategories: []
  },
  bookData: ADDITIONAL_BOOK_DATA,

  tagsError: '',
  categoriesError: '',
  dataError: '',
  tagsMsg: '',
  categoriesMsg: '',
}
const storeData = async (data: any) => {
  try {
    const serializedData = JSON.stringify(data);
    await AsyncStorage.setItem('settings', serializedData);
    // console.log('Data stored successfully');
  } catch (error) {
    console.error('Error storing settings data:', error);
  }
};

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
      const constantDataTitles = CONSTANT_BOOK_DATA.map((data) => data.title);
      const additionalDataTitles = ADDITIONAL_BOOK_DATA.map((data) => data.title);

      const excludedTitles = [...tagTitles, ...constantDataTitles, ...additionalDataTitles];

      const remainingCategories = categories.filter((category: string) => !excludedTitles.includes(category));
      
      const userData: BookDataType[] = remainingCategories.map((title: string) => ({
        title,
        value: '',
        status: false
      }));

      // storeData({
      //   tags,
      //   categories: {
      //     userInputCategories: userData
      //   }
      // });

      return { tags, userInputCategories: userData };
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
    hydrateSettingsDataFromStorage: (state, action) => {
      const data = action.payload;
     console.log('data from async storage for settings ', action.payload)
     const bookCategories = data.bookData.filter((item: BookDataType) => item.status === true);
      return {
        ...state,
        tags: data.tags,
        categories: {
          ...data.categories,
          bookScannerCategories: bookCategories
        },
        bookData: data.bookData
      }
    },
    addTitle: (state, action) => {
      const { newTitle, image } = action.payload;
      const updatedTags = [...state.tags, { title: newTitle, labels: [], image }];

      return {
        ...state,
        tags: updatedTags,
      };
    },
    addImageToCategory: (state, action) => {
      const { title, image } = action.payload;
      
      const updatedBookData = state.categories.bookScannerCategories.map((category) =>
        category.title === title ? { ...category, image: image !== '' ? image : null } : category
      );

      return {
        ...state,
        categories: {
          ...state.categories,
          bookScannerCategories: updatedBookData,
        }
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
    updateBookDataStatus: (state, action) => {
      const { title, status } = action.payload;

      const updatedBookData = state.bookData.map((item) =>
        item.title === title ? { ...item, status } : item
      );

      const bookCategories = updatedBookData.filter((item: BookDataType) => item.status === true);

      storeData({
        tags: state.tags,
        categories: {
          ...state.categories,
          bookScannerCategories: bookCategories,
        },
        bookData: updatedBookData,
      });

      return {
        ...state,
        categories: {
          ...state.categories,
          bookScannerCategories: bookCategories,
        },
        bookData: updatedBookData,
      };
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchData.fulfilled, (state, action) => {
      const { tags, userInputCategories } = action.payload;
      storeData({
        tags,
        categories: {
          ...state.categories,
          userInputCategories
        },
        bookData: state.bookData,
      });

      return {
        ...state,
        tags,
        categories: {
          ...state.categories,
          userInputCategories
        },
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
  deleteTitle,
  updateBookDataStatus,
  hydrateSettingsDataFromStorage,
  addImageToCategory
} = settingsSlice.actions;
export default settingsSlice.reducer;
