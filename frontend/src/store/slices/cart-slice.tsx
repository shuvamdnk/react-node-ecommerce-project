import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalCart: null,
    cartItems: [],
    productIdArr: [],
    // user: (localStorage.getItem('access_token') && localStorage.getItem('user'))
    //     ? JSON.parse(localStorage.getItem('user')) : null
}

const cartSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addToCart(state, action) {
            if (state.productIdArr.includes(action.payload.id)) {

            } else {
                state.totalCart = state.totalCart + 1;
                state.cartItems.push(action.payload);
                state.productIdArr.push(action.payload.id);
            }

            // console.log(action.payload);
        },
        updateCart(state) {

        },
        removeCart(state) {

        }
    }
})

export const cartSliceActions = cartSlice.actions;
export default cartSlice.reducer;