import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../../firebase/firebase.init'

const provider = new GoogleAuthProvider();

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
      return serializeUser(result.user)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const logOutUser = createAsyncThunk("auth/logOutUser", async () => {
  await signOut(auth)
  return null
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
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      });
  }
})

export const { setUser, setLoading } = authSlice.actions
export default authSlice.reducer