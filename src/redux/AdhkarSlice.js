import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAdhkar = createAsyncThunk(
  'adhkar/fetchData',
  async ({ page, book }) => {
    console.log(page, book)
    const response = await axios.get(`http://localhost:5000/api/adhkar?book=${book}&page=${page}`);
    console.log(response.data.data)
    return response.data?.data || [];
  }
);

const AdhkarApiSlice = createSlice({
  name: 'adhkar',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    selectedBook: 'sahih-bukhari',
    page: 1,
  },
  reducers: {
    setSelectedBook(state, action) {
      state.selectedBook = action.payload.book;
      state.page = action.payload.page;
      state.data = [];
    },
    resetData(state) {
      state.data = [];
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload; 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdhkar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdhkar.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = [...state.data, ...action.payload];
      })
      .addCase(fetchAdhkar.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedBook, resetData, setPage } = AdhkarApiSlice.actions;
export default AdhkarApiSlice.reducer;
