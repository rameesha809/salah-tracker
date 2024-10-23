import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postPrayer = createAsyncThunk(
  'api/postPrayer',
  async (prayerData) => {
    try{const response = await axios.post('http://localhost:5000/api/postPrayer', prayerData);
    if(!response){
      console.log(error)
    }
    return response.data;}
    catch{
      console.log(error);
      return error;
    }
  }
);
const prayerSlice = createSlice({
  name: 'prayer',
  initialState: {
    prayers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postPrayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(postPrayer.fulfilled, (state, action) => {
        state.prayers.push(action.payload);
        state.loading = false;
      })
      .addCase(postPrayer.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default prayerSlice.reducer;
