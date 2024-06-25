// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    userId: '',
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.username = '';
      state.email = '';
      state.userId = '';
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;