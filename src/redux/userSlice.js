import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../api/axiosSecure";

// Existing functionality - fetch all users
export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosSecure.get(`/users`);
            return res.data; // array of users
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Get user by email
export const fetchUserByEmail = createAsyncThunk(
    "users/fetchUserByEmail",
    async (email, { rejectWithValue }) => {
        try {
            const res = await axiosSecure.get(`/users/email/${email}`);
            return res.data; // single user object
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
    "users/updateUserProfile",
    async ({ email, userData }, { rejectWithValue }) => {
        try {
            const res = await axiosSecure.patch(`/users/email/${email}`, userData);
            return res.data; // updated user object
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        currentUser: null, // for storing single user data
        loading: false,
        error: null,
        updateLoading: false, // separate loading state for update
        updateError: null // separate error state for update
    },
    reducers: {
        // Clear current user data
        clearCurrentUser: (state) => {
            state.currentUser = null;
        },
        // Clear update errors
        clearUpdateError: (state) => {
            state.updateError = null;
        },
        // Clear all errors
        clearErrors: (state) => {
            state.error = null;
            state.updateError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Existing fetchUsers cases
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // fetchUserByEmail cases
            .addCase(fetchUserByEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserByEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchUserByEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //  updateUserProfile cases
            .addCase(updateUserProfile.pending, (state) => {
                state.updateLoading = true;
                state.updateError = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.currentUser = action.payload;
                // Also update in users array if user exists there
                const index = state.users.findIndex(user => user.email === action.payload.email);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.updateLoading = false;
                state.updateError = action.payload;
            });
    },
});

// Export the new actions
export const { clearCurrentUser, clearUpdateError, clearErrors } = userSlice.actions;

export default userSlice.reducer;