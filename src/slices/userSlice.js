import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    bestTime: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.bestTime = action.payload.bestTime;
    },
    setBestTime: (state, action) => {
      state.bestTime = action.payload;
    },
  },
});

export const { setUser, setBestTime } = userSlice.actions;
export default userSlice.reducer;
