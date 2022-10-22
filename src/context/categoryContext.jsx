import React, { Component } from "react";
import { CartContext } from "./cartContext";

export const CategoryContext = React.createContext();

export class CategoryProvider extends Component {
  static contextType = CartContext;
  state = {
    title: "all",
  };

  handleClick = (event) =>
    this.setState({ title: event.target.innerText.toLowerCase() });

  render() {
    const { state, handleClick } = this;
    const { cartCount } = this.context.state;
    return (
      <CategoryContext.Provider value={{ state, handleClick, cartCount }}>
        {this.props.children}
      </CategoryContext.Provider>
    );
  }
}
