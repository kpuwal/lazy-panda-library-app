import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  route: 'home',
  navigationSource: ''
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigate(state, action) {
      // state.route = action.payload;
      return {
        ...state,
        route: action.payload,
      }
    },
    setNavigationSource: (state, action) => {
      return {
        ...state,
        navigationSource: action.payload,
      };
    },
  }
});

export const { navigate, setNavigationSource } = navigationSlice.actions;
export default navigationSlice.reducer;