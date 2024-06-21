import { configureStore } from '@reduxjs/toolkit';
import puzzleReducer from '../slices/puzzleSlice';
import userReducer from '../slices/userSlice';

export const store = configureStore({
  reducer: {
    puzzle: puzzleReducer,
    user: userReducer,
  },
});