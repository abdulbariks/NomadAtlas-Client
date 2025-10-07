import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../../firebase/firebase.init'
// import axios from "axios";



const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
// const url = "http://localhost:5000/users"





export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, name, photoURL }, { rejectWithValue }) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // update Firebase profile
      await updateProfile(user, { displayName: name, photoURL });

      // save user in DB
      // const userInfo = {
      //   name,
      //   email,
      //   photoURL,
      //   role: "user",
      //   created_at: new Date().toISOString(),
      //   last_log_in: new Date().toISOString(),
      // };
      // await axios.post("http://localhost:5000/users", userInfo);

      return serializeUser(user);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
)

export const logInUser = createAsyncThunk(
  "auth/logInUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      return serializeUser(res.user)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const googleLogIn = createAsyncThunk(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // const userInfo = {
      //   name: user.displayName,
      //   email: user.email,
      //   photoURL: user.photoURL,
      //   role: "user",
      //   created_at: new Date().toISOString(),
      //   last_log_in: new Date().toISOString(),
      // };
      // await axios.post(url, userInfo);


      return serializeUser(user)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
);


export const githubLogIn = createAsyncThunk(
  "auth/githubLogin",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      // const userInfo = {
      //   name: user.displayName,
      //   email: user.email,
      //   photoURL: user.photoURL,
      //   role: "user",
      //   created_at: new Date().toISOString(),
      //   last_log_in: new Date().toISOString(),
      // };
      // await axios.post(url, userInfo);

      return serializeUser(user);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);






export const logOutUser = createAsyncThunk("auth/logOutUser", async () => {
  await signOut(auth)
  return null
})

export const resetPass = createAsyncThunk("auth/resetPass",
  async (email, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email)
      return "Password reset email sent"
    } catch (err) {
      return rejectWithValue(err.message);
    }
  })


export const observeAuthState = () => (dispatch) => {
  dispatch(setLoading(true));
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    dispatch(setUser(serializeUser(currentUser)))
    dispatch(setLoading(false));
  })
  return unsubscribe
}


const serializeUser = (user) => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
    successMessage: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = serializeUser(action.payload);
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(googleLogIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null
      })
      .addCase(googleLogIn.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(githubLogIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(githubLogIn.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      })
      .addCase(resetPass.fulfilled, (state, action) => {
        state.error = null;
        state.successMessage = action.payload
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.error = action.payload;
      })
  }
})

export const { setUser, setLoading } = authSlice.actions
export default authSlice.reducer