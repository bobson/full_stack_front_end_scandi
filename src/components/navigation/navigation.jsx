import { Component } from "react";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as EmptyCart } from "../../assets/Empty Cart.svg";

import { Link, Outlet } from "react-router-dom";

import "./styles.scss";

import CurrencySelector from "../currency-selector/currency-selector";
import { CartContext } from "../../context/cartContext";
import CartDropdown from "../cart-dropdown/cart-dropdown";

class Navigation extends Component {
  static contextType = CartContext;

  state = {
    showDropdownCart: false,
  };

  handleDropdownCart = () =>
    this.setState((prevState) => ({
      showDropdownCart: !prevState.showDropdownCart,
    }));

  render() {
    const { title, cartCount, cartItems, totalPrice, selectedCurrency } =
      this.context.state;
    const {
      updateTotalPrice,
      handleCategoryChange,
      addToCart,
      removeFromCart,
      handleCurrencyChange,
    } = this.context;

    return (
      <>
        <div className="navigation-container">
          <div className="navigation">
            <div className=" nav-links-container">
              <span
                onClick={handleCategoryChange}
                className={`${
                  title === "all" ? "nav-link active" : "nav-link"
                }`}
              >
                ALL
              </span>
              <span
                onClick={handleCategoryChange}
                className={`${
                  title === "tech" ? "nav-link active" : "nav-link"
                }`}
              >
                TECH
              </span>
              <span
                onClick={handleCategoryChange}
                className={`${
                  title === "clothes" ? "nav-link active" : "nav-link"
                }`}
              >
                CLOTHES
              </span>
            </div>
            {/* <div className="logo-container"> */}
            <Link to="/">
              <Logo />
            </Link>
            {/* </div> */}
            <div className="icons-container">
              <CurrencySelector
                updateTotalPrice={updateTotalPrice}
                handleCurrencyChange={handleCurrencyChange}
                selectedCurrency={selectedCurrency}
              />
              {/* <div onClick={this.handleDropdownCart}> */}
              <EmptyCart onClick={this.handleDropdownCart} />
              {/* </div> */}

              {cartCount ? (
                <span className="total-items">{cartCount}</span>
              ) : null}
            </div>
          </div>
          {this.state.showDropdownCart && (
            <>
              <div className="dropdown" />
              <CartDropdown
                cartItems={cartItems}
                cartCount={cartCount}
                totalPrice={totalPrice}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                selectedCurrency={selectedCurrency}
                handleDropdownCart={this.handleDropdownCart}
              />
            </>
          )}
        </div>
        <Outlet />
      </>
    );
  }
}

export default Navigation;
