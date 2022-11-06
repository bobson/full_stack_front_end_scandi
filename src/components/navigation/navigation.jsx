import { Component, Fragment } from "react";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as EmptyCart } from "../../assets/Empty Cart.svg";

import { Link, Outlet } from "react-router-dom";

import CurrencySelector from "../currency-selector/currency-selector";
import { CartContext } from "../../context/cartContext";
import CartDropdown from "../cart-dropdown/cart-dropdown";

import "./styles.scss";

const categories = ["all", "tech", "clothes"];

class Navigation extends Component {
  static contextType = CartContext;

  state = {
    showDropdownCart: false,
  };

  handleDropdownCart = () => {
    this.setState((prevState) => ({
      showDropdownCart: !prevState.showDropdownCart,
    }));
  };

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
      <Fragment>
        <div className="navigation-container">
          <div className="navigation-wrapper">
            <div className="navigation">
              <div className=" nav-links-container">
                {categories.map((category) => (
                  <span
                    key={category}
                    onClick={handleCategoryChange}
                    className={`${
                      title === category ? "nav-link active" : "nav-link"
                    }`}
                  >
                    {category.toUpperCase()}
                  </span>
                ))}
              </div>

              <Link to="/">
                <Logo />
              </Link>

              <div className="icons-container">
                <CurrencySelector
                  updateTotalPrice={updateTotalPrice}
                  handleCurrencyChange={handleCurrencyChange}
                  selectedCurrency={selectedCurrency}
                />

                <EmptyCart onClick={this.handleDropdownCart} />

                {cartCount ? (
                  <span
                    onClick={this.handleDropdownCart}
                    className="total-items"
                  >
                    {cartCount}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {this.state.showDropdownCart && (
          <CartDropdown
            cartItems={cartItems}
            cartCount={cartCount}
            totalPrice={totalPrice}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            selectedCurrency={selectedCurrency}
            handleDropdownCart={this.handleDropdownCart}
          />
        )}
        <Outlet />
      </Fragment>
    );
  }
}

export default Navigation;
