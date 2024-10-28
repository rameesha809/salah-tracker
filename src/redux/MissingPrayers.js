import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMissedPrayers = createAsyncThunk(
  'prayers/fetchMissedPrayers',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/prayers/getMissedPrayers/${userId}`);
      console.log("logging from slice",response.data);
      return response.data.missedPrayers;
    } catch (error) {
      console.error("Error fetching missed prayers:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOfferedPrayers = createAsyncThunk(
  'prayers/fetchOfferedPrayers',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/prayers/getMissedPrayers/${userId}`);
      console.log("Respone for offered:",response.data)
      return response.data.offeredPrayers;
    } catch (error) {
      console.error("Error fetching offered prayers:", error);
      return rejectWithValue(error.message);
    }
  }
);

const missingPrayersSlice = createSlice({
  name: 'prayers',
  initialState: {
    missedPrayers: {}, 
    offeredPrayers: {}, 
    loading: false,
    error: null,
  },
  
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissedPrayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMissedPrayers.fulfilled, (state, action) => {
        state.missedPrayers = action.payload;
        state.loading = false;
      })
      .addCase(fetchMissedPrayers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchOfferedPrayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOfferedPrayers.fulfilled, (state, action) => {
        state.offeredPrayers = action.payload;
        state.loading = false;
      })
      .addCase(fetchOfferedPrayers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default missingPrayersSlice.reducer;
