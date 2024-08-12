import { Component, createContext } from "react";

export const CartContext = createContext();

export class CartProvider extends Component {
  getLocalData = (name) => {
    const localData = window.localStorage.getItem(name);
    return JSON.parse(localData);
  };

  state = {
    title: "all",
    cartItems: this.getLocalData("CART_ITEMS") || [],
    cartCount: this.getLocalData("CART_COUNT") || 0,
    totalPrice: this.getLocalData("TOTAL_PRICE") || 0,
  };

  setLocalData = (name, data) =>
    window.localStorage.setItem(name, JSON.stringify(data));

  handleCategoryChange = (event) =>
    this.setState({ title: event.target.innerText.toLowerCase() });

  updateCartCount = () => {
    const cartCount = this.state.cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    this.setState(
      {
        cartCount,
      },
      () => this.setLocalData("CART_COUNT", cartCount)
    );
  };

  updateTotalPrice = () => {
    const { cartItems } = this.state;

    const totalPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.prices.amount,
      0
    );

    this.setState(
      {
        totalPrice,
      },
      () => this.setLocalData("TOTAL_PRICE", totalPrice)
    );
  };

  // Update total price and cart count when cart items change
  componentDidUpdate(_prevProps, prevState) {
    if (this.state.cartItems !== prevState.cartItems) {
      this.updateCartCount();
      this.updateTotalPrice();
    }
  }

  haveSameAttributes = (obj1, obj2) => {
    const obj1Length = Object.keys(obj1).length;
    const obj2Length = Object.keys(obj2).length;

    if (obj1Length === obj2Length) {
      return Object.keys(obj1).every(
        (key) => obj2.hasOwnProperty(key) && obj2[key] === obj1[key]
      );
    }
    return false;
  };

  addToCart = (productToAdd, selectedAttributes = {}) => {
    const { cartItems } = this.state;

    const existingCartItem = cartItems.find(
      (item) => item.id === productToAdd.id
    );

    if (existingCartItem) {
      // check if the productToAdd  have same attributes as some of the cart items
      const newArr = cartItems.map((item) => {
        return this.haveSameAttributes(
          item.selectedAttributes,
          selectedAttributes
        )
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item;
      });
      return this.setState(
        {
          cartItems: newArr,
        },
        // Update local storage with new cart items
        () => {
          this.setLocalData("CART_ITEMS", newArr);
        }
      );
    }
    // Not existing item
    return this.setState(
      {
        cartItems: [
          ...cartItems,
          {
            ...productToAdd,
            selectedAttributes,
            quantity: 1,
          },
        ],
      },
      () => {
        this.setLocalData("CART_ITEMS", [
          ...cartItems,
          {
            ...productToAdd,
            selectedAttributes,
            quantity: 1,
          },
        ]);
      }
    );
  };

  removeFromCart = (productToRemove) => {
    const { cartItems } = this.state;
    const existingCartItem = cartItems.find(
      (item) => item.id === productToRemove.id
    );

    // check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItem.quantity === 1) {
      const newArr = cartItems.filter(
        (cartItem) => cartItem.id !== productToRemove.id
      );
      return this.setState(
        {
          cartItems: newArr,
        },
        () => {
          this.setLocalData("CART_ITEMS", newArr);
        }
      );
    }
    //If quantity in not equal to 1
    // return back cartItems with matching cart item with reduced quantity
    const newArr = cartItems.map((cartItem) =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    return this.setState(
      {
        cartItems: newArr,
      },
      () => {
        this.setLocalData("CART_ITEMS", newArr);
      }
    );
  };

  render() {
    const {
      state,
      addToCart,
      removeFromCart,
      updateTotalPrice,
      handleCategoryChange,
      handleCurrencyChange,
    } = this;

    return (
      <CartContext.Provider
        value={{
          state,
          addToCart,
          removeFromCart,
          updateTotalPrice,
          handleCategoryChange,
          handleCurrencyChange,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
