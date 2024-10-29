import { createSlice } from "@reduxjs/toolkit";

const initialCartState = localStorage.getItem('cart')
? JSON.parse(localStorage.getItem('cart'))
: { cartItems: []}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
    },
  });
  
  export const cartActions = cartSlice.actions;
//   export const {login, logout} = authSlice.actions;
  
  export default cartSlice.reducer;