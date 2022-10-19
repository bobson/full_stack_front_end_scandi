import React, { Component } from "react";

export const CartContext = React.createContext();

export class CartProvider extends Component {
  state = {
    cartItems: [],
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

  addToCart = (product, selectedAttributes) => {
    const { cartItems } = this.state;

    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
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
      return this.setState({
        cartItems: newArr,
      });
    }

    this.setState({
      cartItems: [
        ...cartItems,
        {
          ...product,
          selectedAttributes,
          quantity: 1,
        },
      ],
    });
  };

  removeFromCart = () => {};

  render() {
    console.log(this.state.cartItems);
    const { state, addToCart } = this;
    return (
      <CartContext.Provider value={{ state, addToCart }}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
