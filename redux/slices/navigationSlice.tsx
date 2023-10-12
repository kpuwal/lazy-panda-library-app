import { createSlice } from "@reduxjs/toolkit";

export type navType = {
  route: string,
  navigationSource: string
}

const initialState: navType = {
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