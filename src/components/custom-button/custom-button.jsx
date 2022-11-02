import { Component } from "react";

import "./styles.scss";

export default class CustomButton extends Component {
  render() {
    const { onClick, disabled, children, style, inverted } = this.props;
    return (
      <button
        onClick={onClick}
        className={
          inverted ? "add-to-cart-button inverted" : "add-to-cart-button"
        }
        disabled={disabled}
        style={style}
        inverted={inverted}
      >
        {children}
      </button>
    );
  }
}
