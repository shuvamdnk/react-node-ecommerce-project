import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: localStorage.getItem('access_token') ? true : false,
    access_token: localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null,
    // user: (localStorage.getItem('access_token') && localStorage.getItem('user'))
    //     ? JSON.parse(localStorage.getItem('user')) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogin(state, action) {
            state.isAuthenticated = true;
            state.access_token = action.payload;
        },
        userLogout(state) {
            state.isAuthenticated = false;
            state.access_token = null;
        }
    }
})

export const authSliceActions = authSlice.actions;
export default authSlice.reducer;