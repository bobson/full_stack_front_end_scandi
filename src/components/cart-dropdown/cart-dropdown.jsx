import { Component } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../custom-button/custom-button";
import { ReactComponent as EmptyCart } from "../../assets/EmptyCart-dark.svg";

import CartDropdownItem from "../cart-dropdown-item/cart-dropdown-item";

import "./styles.scss";
import { Fragment } from "react";

export default class CartDropdown extends Component {
  state = {
    showDropdownCart: false,
  };

  handleDropdownCart = () => {
    this.setState((prevState) => ({
      showDropdownCart: !prevState.showDropdownCart,
    }));
  };

  collapse = () => {
    this.setState({ showDropdownCart: false });
  };

  render() {
    const {
      cartItems,
      cartCount,
      addToCart,
      removeFromCart,
      selectedCurrency,
      totalPrice,
    } = this.props;

    return (
      <div
        className="empty-cart"
        tabIndex={0}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            this.collapse();
          }
        }}
      >
        <EmptyCart onClick={this.handleDropdownCart} />

        {this.state.showDropdownCart && (
          <Fragment>
            <div className="dropdown" onClick={this.collapse} />
            <div className="cart-dropdown-container">
              <h4>
                <span>My Bag, </span>
                <span>{cartCount} items</span>
              </h4>
              {!cartItems.length && (
                <p className="empty-cart-page">
                  You card ise empty! Start shopping now!
                </p>
              )}

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
              <div
                className="dropdown-buttons"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Link to="cart">
                  <CustomButton
                    onClick={this.collapse}
                    inverted="true"
                    disabled={!cartItems.length}
                  >
                    VIEW BAG
                  </CustomButton>
                </Link>
                <CustomButton disabled={!cartItems.length}>
                  CHECKOUT
                </CustomButton>
              </div>
            </div>
          </Fragment>
        )}
        {cartCount ? (
          <span onClick={this.handleDropdownCart} className="total-items">
            {cartCount}
          </span>
        ) : null}
      </div>
    );
  }
}
