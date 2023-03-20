import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    wishList: [],
    numberOfReviews: 0,
    allProducts: [],
    toggleCart: false,
    toggleWishList: false,
}

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setAllProducts: (state, action) => {
            state.allProducts = action.payload;
        },
        addToCart: (state, action) => {
            if(state.cart.findIndex((item) => item.id === action.payload.id) === -1) state.cart.push(action.payload);
        },
        addToWishList: (state, action) => {
            if(state.wishList.findIndex((item) => item.id === action.payload.id) === -1) state.wishList.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },
        removeFromWishList: (state, action) => {
            state.wishList = state.wishList.filter((item) => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.cart = [];
        },
        updateCart: (state, action) => {
            state.cart = state.cart.map((item) => {
                if(item.id === action.payload.id){
                    return action.payload;
                }
                return item;
            });
        },
        toggleCart: (state, action) => {
            state.toggleCart = action.payload
        },
        toggleWishList: (state, action) => {
            state.toggleWishList = action.payload
        },
    },
});

export const { addToCart, removeFromCart, addToWishList, removeFromWishList, setAllProducts, clearCart, updateCart, toggleCart, toggleWishList } = CartSlice.actions;

export default CartSlice.reducer;