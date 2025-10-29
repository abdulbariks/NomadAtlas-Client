import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = `${import.meta.env.VITE_API}/favoritesjobs`;

// ✅ Fetch favorites for a user
export const fetchFavorites = createAsyncThunk("favoritesjobs/fetch", async (email) => {
  const res = await axios.get(`${API}/${email}`);
  return res.data; // returns array of populated favorites
});

// ✅ Add job to favorites
export const addFavorite = createAsyncThunk(
  "favoritesjobs/add",
  async ({ userEmail, jobId, title, company, category, location }) => {
    const res = await axios.post(API, { userEmail, jobId, title, company, category, location });
    return res.data; 
  }
);



// ✅ Remove from favorites by favorite ID
export const removeFavorite = createAsyncThunk("favoritesjobs/remove", async (favoriteId) => {
  await axios.delete(`${API}/${favoriteId}`);
  return favoriteId;
});

const favoriteSlice = createSlice({
  name: "favoritesjobs",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

     
      .addCase(addFavorite.fulfilled, (state, action) => {
  const exists = state.items.some(f => f.jobId === action.payload.jobId);
  if (!exists) {
    state.items.push(action.payload);
  }
})


      // Remove
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.items = state.items.filter((fav) => fav._id !== action.payload);
      });
  },
});

export default favoriteSlice.reducer;
