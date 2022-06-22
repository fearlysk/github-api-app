import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  searchValue: '',
  items: [],
  isFetching: true,
  error: '',
  currentPage: 1,
  perPage: 10,
  totalCount: 0
}

export const fetchRepos = createAsyncThunk('repo/fetchRepos', async ([query, currentPage, perPage]) => {
  if(!query) {
    query = "stars:%3E1";
  }
  const data = await axios.get(`https://api.github.com/search/repositories?q=${query}&sort=stars&page=${currentPage}&per_page=${perPage}`)
  .then(response => response.data)
  return data;
})

export const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRepos.pending, (state, action) => {
      state.isFetching = true;
    })
    builder.addCase(fetchRepos.fulfilled, (state, action) => {
      state.isFetching = false;
      state.items = action.payload;
      state.totalCount = action.payload.total_count;
      state.error = '';
    })
    builder.addCase(fetchRepos.rejected, (state, action) => {
      state.isFetching = false;
      state.items = [];
      state.error = action.error.message;
    })
  },
})

export const { setCurrentPage, setSearchValue } = reposSlice.actions;

export default reposSlice.reducer;
