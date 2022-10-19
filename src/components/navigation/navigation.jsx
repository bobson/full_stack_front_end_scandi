import { Component } from "react";
import { CategoryContext } from "../../context/categoryContext";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as ShoppingIcon } from "../../assets/shoppingIcon.svg";

import { Link, Outlet } from "react-router-dom";

import "./styles.scss";

class Navigation extends Component {
  static contextType = CategoryContext;

  render() {
    const { title } = this.context.state;

    const { handleClick } = this.context;
    return (
      <>
        <div className="navigation-container">
          <div className="navigation">
            <div className=" nav-links-container">
              <span
                onClick={handleClick}
                className={`${
                  title === "all" ? "nav-link active" : "nav-link"
                }`}
              >
                ALL
              </span>
              <span
                onClick={handleClick}
                className={`${
                  title === "tech" ? "nav-link active" : "nav-link"
                }`}
              >
                TECH
              </span>
              <span
                onClick={handleClick}
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
              <Link to="cart">
                <ShoppingIcon />
              </Link>
            </div>
          </div>
        </div>
        <Outlet />
      </>
    );
  }
}

export default Navigation;
