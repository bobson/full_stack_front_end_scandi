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
          id={id}
          value={value}
          name={name}
          className={
            attrType !== "swatch" ? "hidden radio-input" : "hidden swatch-input"
          }
          defaultChecked={defaultChecked}
          disabled={disabled}
        />
        <label
          style={{
            backgroundColor: attrType === "swatch" && value,
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
