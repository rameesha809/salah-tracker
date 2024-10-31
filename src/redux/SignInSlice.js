import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPrayers } from './PrayerSlice';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ provider, username, email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) throw new Error('Authentication failed');

      const { token,user } = await response.json();
      localStorage.setItem('token', token);
      console.log("userhere: ", user);
      return {token, user};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null,user: null,  error: null },
  reducers: {
    logout: (state) => {
        state.token = null;
        state.user = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload;
        state.user = action.payload.user; 
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const {logout } = authSlice.actions;

export default authSlice.reducer;
