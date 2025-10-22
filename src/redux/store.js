import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import userReducer from "./userSlice";
import jobsReducer from './jobSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        jobs: jobsReducer,
    },
});

export default store;
