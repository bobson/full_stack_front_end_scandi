import { Component } from "react";

import "./styles.scss";

export default class CustomButton extends Component {
  render() {
    const { onClick, disabled, children, style } = this.props;
    return (
      <button
        onClick={onClick}
        className="add-to-cart-button"
        disabled={disabled}
        style={style}
      >
        {children}
      </button>
    );
  }
}
