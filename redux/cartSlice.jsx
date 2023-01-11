import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += action.payload.quantity;
      state.total += action.payload.price;
    },
    reset: (state, action) => {
        state.products = [];
        state.quantity = 0;
        state.total = 0;
      },
  },
});

export const { addProduct,reset } = cartSlice.actions;
export default cartSlice.reducer;