import { Component, Fragment } from "react";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as EmptyCart } from "../../assets/EmptyCart-dark.svg";

import { Link, Outlet } from "react-router-dom";

import CurrencySelector from "../currency-selector/currency-selector";
import CartDropdown from "../cart-dropdown/cart-dropdown";
import { CartContext } from "../../context/cartContext";

import "./styles.scss";

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

  collapse = () => {
    this.setState({ showDropdownCart: false });
  };

  render() {
    const { categories } = this.props;
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
                {categories?.map(({ name }) => (
                  <span
                    key={name}
                    onClick={handleCategoryChange}
                    className={`${
                      title === name ? "nav-link active" : "nav-link"
                    }`}
                  >
                    <Link to="/">{name.toUpperCase()}</Link>
                  </span>
                ))}
              </div>

              <Link className="logo" to="/">
                <Logo />
              </Link>

              <div className="icons-container">
                <CurrencySelector
                  updateTotalPrice={updateTotalPrice}
                  handleCurrencyChange={handleCurrencyChange}
                  selectedCurrency={selectedCurrency}
                />
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
                    <CartDropdown
                      cartItems={cartItems}
                      cartCount={cartCount}
                      totalPrice={totalPrice}
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                      selectedCurrency={selectedCurrency}
                      handleDropdownCart={this.handleDropdownCart}
                      collapse={this.collapse}
                    />
                  )}
                </div>

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
        <Outlet />
      </Fragment>
    );
  }
}

export default Navigation;
