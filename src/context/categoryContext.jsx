import React, { Component } from "react";

export const CategoryContext = React.createContext();

export class CategoryProvider extends Component {
  state = {
    title: "all",
  };

  handleClick = (event) =>
    this.setState({ title: event.target.innerText.toLowerCase() });

  render() {
    const { state, handleClick } = this;
    return (
      <CategoryContext.Provider value={{ state, handleClick }}>
        {this.props.children}
      </CategoryContext.Provider>
    );
  }
}
