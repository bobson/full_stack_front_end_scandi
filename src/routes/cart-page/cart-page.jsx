import { Component } from "react";

import CartItem from "../../components/cart-item/cart-item";
import CustomButton from "../../components/custom-button/custom-button";
import { CartContext } from "../../context/cartContext";

import "./styles.scss";

export default class CartPage extends Component {
  static contextType = CartContext;
  render() {
    const { cartItems, cartCount, totalPrice, selectedCurrency } =
      this.context.state;
    const { addToCart, removeFromCart } = this.context;
    const tax = totalPrice * 0.21;

    return (
      <div className="cart-page-container">
        <h1>CART</h1>
        {!cartItems.length && (
          <h3 className="empty-cart-page">
            You card ise empty! Start shopping now!
          </h3>
        )}
        {cartItems?.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            addToCart={addToCart}
            selectedCurrency={selectedCurrency}
            removeFromCart={removeFromCart}
          />
        ))}
        <div className="order-container">
          <div className="order-row">
            <span>Tax 21%</span>
            <span>
              {selectedCurrency.symbol}
              {tax.toFixed(2)}
            </span>
          </div>
          <div className="order-row">
            <span>Quantity:</span>
            <span>{cartCount}</span>
          </div>
          <div className="order-row">
            <span>Total:</span>
            <span>
              {selectedCurrency.symbol}
              {totalPrice.toFixed(2)}
            </span>
          </div>
          <CustomButton disabled={!cartItems.length} style={{ height: "43px" }}>
            ORDER
          </CustomButton>
        </div>
      </div>
    );
  }
}
