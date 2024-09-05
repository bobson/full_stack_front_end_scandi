import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CartState } from "./cartSlice";
import modalReducer, { openModal } from "./modalSlice";

export type LocalState = {
  cart: CartState;
};

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cartState");
    if (!serializedState) {
      return { cart: { cartItems: [], totalPrice: 0, totalItems: 0 } };
    }

    const loadedState = JSON.parse(serializedState) as Partial<LocalState>;
    return {
      cart: {
        cartItems: loadedState.cart?.cartItems || [],
        totalPrice: loadedState.cart?.totalPrice || 0,
        totalItems: loadedState.cart?.totalItems || 0,
      },
    };
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
  }
};

// Store state to localStorage
const saveState = (state: LocalState) => {
  try {
    const stateToSave = {
      cart: state.cart,
    };
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem("cartState", serializedState);
  } catch (error) {
    console.error("Failed to save state to localStorage:", error);
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore paths in the state where non-serializable data might be stored
        ignoredPaths: ["modal"],
        // Ignore specific action types that might carry non-serializable data
        ignoredActions: ["modal/closeModal", "modal/toggleModal"],
      },
    }),
});

let previousTotalItems = store.getState().cart.totalItems;

const handleStateChange = () => {
  const { totalItems } = store.getState().cart;

  if (totalItems !== previousTotalItems) {
    // Update previousTotalItems before dispatching action
    previousTotalItems = totalItems;

    // Dispatch toggleModal action
    store.dispatch(openModal());

    // Save state to localStorage
    saveState(store.getState());
  }
};

store.subscribe(() => {
  handleStateChange();
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
