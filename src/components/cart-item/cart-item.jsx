import { Component, Fragment } from "react";

import "./styles.scss";

export default class CartItem extends Component {
  render() {
    const { cartItem } = this.props;
    const {
      id,
      name,
      attributes,
      gallery,
      prices,
      brand,
      selectedAttributes,
      quantity,
    } = cartItem;
    console.log(this.props);
    return (
      <div className="cart-item-container">
        <div className="cart-item-options-container">
          <div className="title">
            <h3>{brand}</h3>
            <h3 style={{ fontWeight: 400 }}>{name}</h3>
          </div>
          {prices && (
            <div className="price">
              <p>
                {prices[0].currency.symbol}
                {prices[0].amount}
              </p>
            </div>
          )}

          {attributes?.map(({ id, items, name, type }) => (
            <div className="attributes" key={id}>
              <p>{name.toUpperCase()}:</p>
              <div className="attributes-container">
                {items?.map((item) => {
                  return type === "swatch" ? (
                    <Fragment key={item.id}>
                      <input
                        type="radio"
                        id={item.id}
                        value={item.value}
                        name={`${cartItem.id}-${name}`}
                        className="hidden swatch-input"
                        defaultChecked={selectedAttributes[name] === item.value}
                        disabled
                      />
                      <label
                        style={{ backgroundColor: item.value }}
                        className="swatch"
                        htmlFor={item.id}
                      />
                    </Fragment>
                  ) : (
                    <Fragment key={item.id}>
                      <input
                        type="radio"
                        id={`${cartItem.id}-${item.id}`}
                        value={item.value}
                        name={`${cartItem.id}-${name}`}
                        className="hidden radio-input"
                        defaultChecked={selectedAttributes[name] === item.value}
                        disabled
                      />
                      <label
                        className="button-label"
                        htmlFor={`${cartItem.id}-${item.id}`}
                      >
                        {item.value}
                      </label>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-container">
          <div className="quantity">
            <span className="quantity-button">+</span>
            <span>{quantity}</span>
            <span className="quantity-button">-</span>
          </div>
          <div className="carousel">
            <img src={gallery[0]} alt={name} />
          </div>
        </div>
      </div>
    );
  }
}
