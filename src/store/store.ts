import { configureStore } from '@reduxjs/toolkit';
import genreReducer from './slices/genre';

export const store = configureStore({
  reducer: {
    genre: genreReducer,
  },
});

export type RootState=ReturnType<typeof store.getState>;
export type MovieDispatch=typeof store.dispatch;
