import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postPrayer = createAsyncThunk(
  'api/postPrayer',
  async (prayerData) => {
    try{const response = await axios.post('http://localhost:5000/api/postPrayer', prayerData);
    if(!response){
      console.log(error)
    }
    console.log(response.data);
    return response.data;}
    catch{
      console.log(error);
      return error;
    }
  }
);

export const fetchPrayers = createAsyncThunk(
  'api/fetchPrayers',
  async (userId) => {
      try {
          const response = await axios.get(`http://localhost:5000/api/prayers/getPrayers/${userId}`);
          return response.data;
      } catch (error) {
          console.log(error);
          throw error;
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
        console.log("Incoming prayer data:", action.payload);
        state.prayers.push(action.payload);
        state.loading = false;
      })
      .addCase(postPrayer.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchPrayers.pending, (state) => {
        state.loading = true;
    })
    .addCase(fetchPrayers.fulfilled, (state, action) => {
        state.prayers = action.payload; 
        state.loading = false;
    })
    .addCase(fetchPrayers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
    });
  },
});

export default prayerSlice.reducer;
