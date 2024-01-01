import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";

const store = configureStore({
    reducer:{
        auth:authSlice,
    },
    devTools:true
})

export default store;