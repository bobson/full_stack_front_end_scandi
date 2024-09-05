import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types/types";

export interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
  totalItems: number;
}

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) =>
          cartItem.item.id === newItem.item.id &&
          JSON.stringify(cartItem.attributes) ===
            JSON.stringify(newItem.attributes)
      );

      if (existingItem) {
        // If item with same attributes exists, increase the quantity
        existingItem.quantity += 1;
      } else {
        //  If item with same attributes doesn't exist, add new item
        state.cartItems.push({ ...newItem, quantity: 1 });
      }

      // Update the total price
      state.totalPrice = state.cartItems.reduce(
        (total, cartItem) =>
          total + cartItem.item.prices.amount * cartItem.quantity,
        0
      );

      // Update the total items
      state.totalItems = state.cartItems.reduce((total, cartItem) => {
        return total + cartItem.quantity;
      }, 0);
    },

    removeItemFromCart(state, action: PayloadAction<CartItem>) {
      const itemToRemove = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (cartItem) =>
          cartItem.item.id === itemToRemove.item.id &&
          JSON.stringify(cartItem.attributes) ===
            JSON.stringify(itemToRemove.attributes)
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.cartItems[existingItemIndex];

        if (existingItem.quantity > 1) {
          // If quantity is greater than 1, decrease the quantity
          existingItem.quantity -= 1;
        } else {
          // If quantity is 1, remove the item by its index
          state.cartItems.splice(existingItemIndex, 1);
        }
      }

      // Update the total price
      state.totalPrice = state.cartItems.reduce(
        (total, cartItem) =>
          total + cartItem.item.prices.amount * cartItem.quantity,
        0
      );

      // Update the total items
      state.totalItems = state.cartItems.reduce((total, cartItem) => {
        return total + cartItem.quantity;
      }, 0);
    },

    clearCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalItems = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
