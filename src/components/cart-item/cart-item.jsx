import { Component } from "react";

import AttributesForm from "../attributes-form/attributes-form";
import Carousel from "./carousel/carousel";

import "./styles.scss";

export default class CartItem extends Component {
  shouldComponentUpdate(prevProps, _prevState) {
    if (
      this.props.cartItem.quantity !== prevProps.cartItem.quantity ||
      this.props.selectedCurrency !== prevProps.selectedCurrency
    )
      return true;
    else return false;
  }

  render() {
    const { cartItem, addToCart, removeFromCart, selectedCurrency } =
      this.props;

    const {
      name,
      attributes,
      gallery,
      prices,
      brand,
      selectedAttributes,
      quantity,
    } = cartItem;

    return (
      <div className="cart-item-container">
        <div className="cart-item-options-container">
          <div className="title">
            <h3>{brand}</h3>
            <h3 style={{ fontWeight: 400 }}>{name}</h3>
          </div>
          {prices && (
            <div className="price">
              {prices.map(
                ({ currency, amount }) =>
                  selectedCurrency?.label === currency.label && (
                    <p key={amount} className="price">
                      {currency.symbol}
                      {amount}
                    </p>
                  )
              )}
            </div>
          )}

          {attributes?.map(({ id, items, name, type }) => (
            <div className="attributes" key={id}>
              <p>{name.toUpperCase()}:</p>
              <div className="attributes-container">
                {items?.map((item, idx) => (
                  <AttributesForm
                    key={item.id}
                    attrType={type}
                    id={`${cartItem.id}-${item.id}`}
                    value={item.value}
                    name={`${cartItem.id}-${name}`}
                    htmlFor={`${cartItem.id}-${item.id}`}
                    defaultChecked={selectedAttributes[name] === item.value}
                    disabled
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-container">
          <div className="quantity">
            <span
              onClick={() => {
                addToCart(cartItem, cartItem.selectedAttributes);
              }}
              className="quantity-button"
            >
              +
            </span>
            <span>{quantity}</span>
            <span
              onClick={() => {
                removeFromCart(cartItem);
              }}
              className="quantity-button"
            >
              -
            </span>
          </div>
          <Carousel name={name} images={gallery} />
        </div>
      </div>
    );
  }
}
