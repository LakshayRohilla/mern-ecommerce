import { createSlice } from "@reduxjs/toolkit";

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const initialCartState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce(
          (acc, item) => acc + (item.price * item.qty) / 100,
          0
        )
      );
      // Calculate shipping price
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      // Calculate tax price
      state.taxPrice = addDecimals(0.15 * state.itemsPrice);
      // Calculate total price
      state.totalPrice = addDecimals(
        state.itemsPrice + state.shippingPrice + state.taxPrice
      );
      // Save the cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

// export const cartActions = cartSlice.actions;
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;