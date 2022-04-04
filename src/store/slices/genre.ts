import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as urls from '../../constants/constants';

const initialState:MoviesList = {
  entities: [],
};
export const getGenres = createAsyncThunk('genres/getGenres', async () => {
  const response = await fetch(urls.movieGenreListUrl);
  const data = await response.json();
  return data.genres;
});
const genreSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, { payload }) => {
      state.entities = payload;
      return state;
    });
  },
});
export default genreSlice.reducer;
