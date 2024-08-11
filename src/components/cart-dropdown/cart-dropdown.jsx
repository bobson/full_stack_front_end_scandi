import { Component } from "react";

import CustomButton from "../custom-button/custom-button";
import { ReactComponent as EmptyCart } from "../../assets/EmptyCart-dark.svg";

import CartDropdownItem from "./cart-dropdown-item/cart-dropdown-item";

import "./styles.scss";
import { Fragment } from "react";

export default class CartDropdown extends Component {
  state = {
    showDropdownCart: false,
  };

  // Open cart dropdown when an item is added to the cart
  componentDidUpdate(prevProps) {
    if (prevProps.cartCount !== this.props.cartCount) {
      this.setState({ showDropdownCart: true });
    }
  }

  handleDropdownCart = () => {
    this.setState((prevState) => ({
      showDropdownCart: !prevState.showDropdownCart,
    }));
  };

  collapse = () => {
    this.setState({ showDropdownCart: false });
  };

  render() {
    const { cartItems, cartCount, addToCart, removeFromCart, totalPrice } =
      this.props;

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
        <div onClick={this.handleDropdownCart}>
          <EmptyCart data-testid="cart-btn" />
          {cartCount ? <span className="total-items">{cartCount}</span> : null}
        </div>

        <div
          className={`dropdown-content ${
            this.state.showDropdownCart ? "show" : "hide"
          }`}
        >
          {this.state.showDropdownCart && (
            <Fragment>
              <div className="dropdown" onClick={this.collapse} />

              <div className="cart-dropdown-container">
                <h4>
                  <span>My Bag, </span>
                  <span>
                    {cartCount}
                    {cartCount > 1 ? " items" : " item"}
                  </span>
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
                  />
                ))}

                <div className="total" data-testid="cart-total">
                  <span>Total</span>
                  <span data-testid="cart-item-amount">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <CustomButton
                  disabled={!cartItems.length}
                  onClick={(e) => {
                    e.stopPropagation();
                    // this.collapse();
                  }}
                >
                  PLACE ORDER
                </CustomButton>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}
