import { Component, Fragment } from "react";

import { ReactComponent as Logo } from "../../assets/logo.svg";

import { Link, Outlet } from "react-router-dom";

import CartDropdown from "../cart-dropdown/cart-dropdown";
import { CartContext } from "../../context/cartContext";

import "./styles.scss";
import { getAllCategories } from "../../apollo/queries";

import { useQuery } from "@apollo/client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

class Navigation extends Component {
  static contextType = CartContext;

  render() {
    const { title, cartCount, cartItems, totalPrice } = this.context.state;

    const { handleCategoryChange, addToCart, removeFromCart } = this.context;

    const RenderNavLinks = () => {
      const { data, loading, error } = useQuery(getAllCategories);
      if (loading) return <Skeleton />;
      if (error) return `Error! ${error}`;
      return (
        <div className=" nav-links-container">
          {data.categories?.map(({ name }) => (
            <span
              key={name}
              data-testid={
                title === name ? "active-category-link" : "category-link"
              }
              onClick={handleCategoryChange}
              className={`${title === name ? "nav-link active" : "nav-link"}`}
            >
              <Link to="/">{name.toUpperCase()}</Link>
            </span>
          ))}
        </div>
      );
    };

    return (
      <Fragment>
        <div className="navigation-container">
          <div className="navigation-wrapper">
            <div className="navigation">
              <RenderNavLinks
                title={title}
                handleCategoryChange={handleCategoryChange}
              />

              <Link className="logo" to="/">
                <Logo />
              </Link>

              <div className="icons-container">
                <CartDropdown
                  cartItems={cartItems}
                  cartCount={cartCount}
                  totalPrice={totalPrice}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
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
