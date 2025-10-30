import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import userReducer from "./userSlice";
import jobsReducer from './jobSlice';
import favoriteReducer from "./favoritejobSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        jobs: jobsReducer,
        favorites: favoriteReducer,
    },
});

export default store;
