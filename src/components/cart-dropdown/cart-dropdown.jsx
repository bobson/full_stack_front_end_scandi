import React, { Component } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../custom-button/custom-button";

import CartDropdownItem from "./cart-dropdown-item/cart-dropdown-item";

import "./styles.scss";

export default class CartDropdown extends Component {
  render() {
    const {
      cartItems,
      cartCount,
      addToCart,
      removeFromCart,
      selectedCurrency,
      totalPrice,
      handleDropdownCart,
    } = this.props;
    console.log(cartItems);
    return (
      <div className="cart-dropdown-container">
        <p>
          <span>My Bag, </span>
          <span>{cartCount} items</span>
        </p>
        {cartItems?.map((cartItem) => (
          <CartDropdownItem
            key={cartItem.id}
            cartItem={cartItem}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            selectedCurrency={selectedCurrency}
          />
        ))}
        <div className="total">
          <span>Total</span>
          <span>
            {selectedCurrency.symbol}
            {totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="dropdown-buttons">
          <Link to="cart" onClick={handleDropdownCart}>
            <CustomButton>VIEW BAG</CustomButton>
          </Link>
          <CustomButton>CHECKOUT</CustomButton>
        </div>
      </div>
    );
  }
}
