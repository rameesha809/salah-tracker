import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchIslamicDateTime = createAsyncThunk(
  'islamicDateTime/fetchIslamicDateTime',
  async () => {
    const response = await axios.get('http://localhost:5000/api/islamicDateTime');
    if(!response){
      console.log(error)
    }
    return response.data;
  }
);

const islamicDateTimeSlice = createSlice({
  name: 'islamicDateTime',
  initialState: {
    date: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIslamicDateTime.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIslamicDateTime.fulfilled, (state, action) => {
        state.date = action.payload;
        state.loading = false;
      })
      .addCase(fetchIslamicDateTime.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default islamicDateTimeSlice.reducer;
