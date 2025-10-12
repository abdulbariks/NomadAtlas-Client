// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchUsers = createAsyncThunk("users/fetchUsers",
//     async (_, { rejectWithValue }) => {
//         try {
//             const res = await axios.get(`${import.meta.env.VITE_API}/users`);
//             return res.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Failed to fetch users");
//         }
//     }
// );

// const userSlice = createSlice({
//     name: "users",
//     initialState: {
//         users: [],
//         loading: false,
//         error: null
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase( fetchUsers.pending, (state)=>{
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase( fetchUsers.fulfilled, (state,action)=>{
//                 state.loading = false;
//                 state.users = action.payload;
//             })
//             .addCase( fetchUsers.rejected, (state,action)=>{
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// })

// export default userSlice.reducer