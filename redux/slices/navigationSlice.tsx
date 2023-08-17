import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  route: 'home'
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigate(state, action) {
      state.route = action.payload;
    }
  }
});

export const { navigate } = navigationSlice.actions;
export default navigationSlice.reducer;