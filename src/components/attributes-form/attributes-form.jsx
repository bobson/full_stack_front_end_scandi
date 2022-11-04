import { Component, Fragment } from "react";

import "./styles.scss";

export default class AttributesForm extends Component {
  render() {
    const { id, name, value, attrType, defaultChecked, disabled, htmlFor } =
      this.props;

    return (
      <Fragment>
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
      </Fragment>
    );
  }
}
