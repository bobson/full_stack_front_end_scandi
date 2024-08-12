import { Component } from "react";

import "./styles.scss";

import { toKebabCase } from "../../assets/functions";

export default class AttributesForm extends Component {
  render() {
    const {
      id,
      name,
      value,
      attrType,
      defaultChecked,
      disabled,
      htmlFor,
      dataTestId,
    } = this.props;

    const dataTesting = dataTestId
      ? defaultChecked
        ? `cart-item-attribute-${toKebabCase(dataTestId)}-${toKebabCase(
            dataTestId
          )}-selected`
        : `cart-item-attribute-${toKebabCase(dataTestId)}-${toKebabCase(
            dataTestId
          )}`
      : null;

    return (
      <div data-testid={dataTesting}>
        <input
          type="radio"
          className={
            attrType !== "swatch" ? "hidden radio-input" : "hidden swatch-input"
          }
          id={id}
          value={value}
          name={name}
          defaultChecked={defaultChecked}
          disabled={disabled}
        />
        <label
          style={{
            backgroundColor: attrType === "swatch" && value,
            border: value === "#FFFFFF" && "1px solid black",
          }}
          className={attrType === "swatch" ? "swatch" : "button-label"}
          htmlFor={htmlFor}
        >
          {attrType !== "swatch" && value}
        </label>
      </div>
    );
  }
}
