import React, { Component } from "react";
import CartItem from "../../components/cart-item/cart-item";
import { CartContext } from "../../context/cartContext";

export default class CartPage extends Component {
  static contextType = CartContext;
  render() {
    // console.log(this.context.state);
    const { cartItems } = this.context.state;
    const { addToCart } = this.context;

    return (
      <div>
        <h1>CART</h1>
        {cartItems?.map((cartItem) => (
          <>
            <hr />
            <CartItem
              key={cartItem.id}
              cartItem={cartItem}
              addToCart={addToCart}
            />
          </>
        ))}
      </div>
    );
  }
}
