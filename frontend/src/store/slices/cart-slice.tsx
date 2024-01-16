import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalCart: 0,
    totalAmount:0,
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
                state.totalAmount = state.totalAmount - Math.round(action.payload.price * 83)
                state.totalCart = state.totalCart - 1;
                state.cartItems = state.cartItems.filter(cart => cart.id !== action.payload.id);
                state.productIdArr = state.productIdArr.filter(pid => pid !== action.payload.id);
            } else {
                state.totalAmount = state.totalAmount + Math.round(action.payload.price * 83)
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