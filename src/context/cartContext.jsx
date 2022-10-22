import React, { Component } from "react";

export const CartContext = React.createContext();

export class CartProvider extends Component {
  state = {
    cartItems: [],
    cartCount: 0,
    totalPrice: 0,
  };

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

  updateCartCount = () => {
    this.setState({
      cartCount: this.state.cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
      ),
    });
  };

  updateTotalPrice = () => {
    this.setState({
      totalPrice: this.state.cartItems.reduce(
        (total, cartItem) =>
          total + cartItem.quantity * cartItem.prices[0].amount,
        0
      ),
    });
  };

  addToCart = (productToAdd, selectedAttributes) => {
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
        () => {
          this.updateCartCount();
          this.updateTotalPrice();
        }
      );
    }

    this.setState(
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
        this.updateCartCount();
        this.updateTotalPrice();
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
          this.updateCartCount();
          this.updateTotalPrice();
        }
      );
    }
    //If quantity in not equal to 1
    // return back cartitems with matching cart item with reduced quantity
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
        this.updateCartCount();
        this.updateTotalPrice();
      }
    );
  };

  render() {
    // console.log(this.state.cartCount);
    // console.log(this.state.cartItems);
    const { state, addToCart, removeFromCart } = this;
    return (
      <CartContext.Provider value={{ state, addToCart, removeFromCart }}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
