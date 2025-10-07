import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/feature/authSlice"
const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
