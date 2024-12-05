import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const toggleSaveHadithAsync = createAsyncThunk(
    'savedHadith/toggleSaveHadithAsync',
    async ({ userId, hadithId, hadithData }, { getState, rejectWithValue }) => {
        const { savedHadith } = getState();
        const isSaved = savedHadith.items.some(item => item.hadith_id === hadithId);

        try {
            const response = await fetch(`http://localhost:5000/api/saved-hadith`, {
                method: isSaved ? 'DELETE' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, hadithId, hadithData })
            });
            const data = await response.json();
            console.log("data", data)
            return { hadithId, hadithData, isSaved };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchSavedHadithAsync = createAsyncThunk(
    'savedHadith/fetchSavedHadithAsync',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/api/saved-hadith/${userId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const savedHadithSlice = createSlice({
    name: 'savedHadith',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(toggleSaveHadithAsync.fulfilled, (state, action) => {
                const { hadithId, hadithData, isSaved } = action.payload;
                if (isSaved) {
                    state.items = state.items.filter(item => item.hadith_id !== hadithId);
                } else {
                    state.items.push({ hadith_id: hadithId, ...hadithData });
                }
            })
            .addCase(fetchSavedHadithAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSavedHadithAsync.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchSavedHadithAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default savedHadithSlice.reducer;
