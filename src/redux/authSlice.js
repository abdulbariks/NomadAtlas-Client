import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  firebaseGoogleSignIn,
  firebaseLogin,
  firebaseLogout,
  firebaseOnAuthStateChanged,
  firebaseRegister,
  firebaseSendPasswordReset,
} from "../firebase/firebase.init";
import { updateProfile } from "firebase/auth";

// Thunks

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, name, photoURL }, { rejectWithValue }) => {
    try {
      const userCredential = await firebaseRegister(email, password);
      const user = userCredential.user;

      // Update profile with displayName + photoURL
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL || null,
      });

      return {
        uid: user.uid,
        email: user.email,
        displayName: name,
        photoURL: photoURL || null,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await firebaseLogin(email, password);
      return userCredential.user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async (_, { rejectWithValue }) => {
    try {
      const result = await firebaseGoogleSignIn();
      return result.user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const sendResetEmail = createAsyncThunk(
  "auth/sendResetEmail",
  async ({ email }, { rejectWithValue }) => {
    try {
      await firebaseSendPasswordReset(email);
      return { email };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await firebaseLogout();
      return true;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Listen for auth changes (non-standard thunk — dispatch from App start)
export const listenToAuthChanges = () => (dispatch) => {
  firebaseOnAuthStateChanged((user) => {
    if (user) {
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
    } else {
      dispatch(clearUser());
    }
  });
};

const initialState = {
  user: null,
  status: "idle",
  error: null,
  resetEmailSent: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.status = "idle";
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = {
          uid: action.payload.uid,
          email: action.payload.email,
          displayName: action.payload.displayName || null,
        };
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = {
          uid: action.payload.uid,
          email: action.payload.email,
          displayName: action.payload.displayName || null,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // google
      .addCase(googleSignIn.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = {
          uid: action.payload.uid,
          email: action.payload.email,
          displayName: action.payload.displayName || null,
          photoURL: action.payload.photoURL || null,
        };
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // reset email
      .addCase(sendResetEmail.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.resetEmailSent = false;
      })
      .addCase(sendResetEmail.fulfilled, (state) => {
        state.status = "succeeded";
        state.resetEmailSent = true;
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // logout
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setUser, clearUser, clearError } = authSlice.actions;
export default authSlice.reducer;
