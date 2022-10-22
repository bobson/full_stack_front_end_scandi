import React, { Component, Fragment } from "react";
import CartItem from "../../components/cart-item/cart-item";
import CustomButton from "../../components/custom-button/custom-button";
import { CartContext } from "../../context/cartContext";

import "./styles.scss";

export default class CartPage extends Component {
  static contextType = CartContext;
  render() {
    console.log(this.context.state.cartItems);
    const { cartItems, cartCount, totalPrice } = this.context.state;
    const { addToCart, removeFromCart } = this.context;
    const tax = totalPrice * 0.21;

    return (
      <div>
        <h1>CART</h1>
        {!cartItems.length && (
          <h3 className="empty-cart">You card ise empty! Start shoping now!</h3>
        )}
        {cartItems?.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
        <div className="order-container">
          <div className="order-row">
            <span>Tax 21%</span>
            <span>{tax.toFixed(2)}</span>
          </div>
          <div className="order-row">
            <span>Quantity:</span>
            <span>{cartCount}</span>
          </div>
          <div className="order-row">
            <span>Total:</span>
            <span>{(totalPrice + tax).toFixed(2)}</span>
          </div>
          <CustomButton disabled={!cartItems.length} style={{ height: "43px" }}>
            ORDER
          </CustomButton>
        </div>
      </div>
    );
  }
}
