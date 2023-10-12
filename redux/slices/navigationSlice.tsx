import { createSlice } from "@reduxjs/toolkit";

export type navTypes = {
  route: string,
  navigationSource: string
}

const initialState: navTypes = {
  route: 'home',
  navigationSource: ''
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigate(state, action) {
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