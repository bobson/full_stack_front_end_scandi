import { Component } from "react";

import AttributesForm from "../attributes-form/attributes-form";
import Carousel from "../carousel/carousel";

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
    const { cartItem, addToCart, removeFromCart } = this.props;

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
              <p>
                {prices.currency_label}
                {prices.amount}
              </p>
            </div>
          )}

          {attributes?.map(({ id, items, name, type }) => (
            <div className="attributes-container" key={id}>
              <p>{name.toUpperCase()}:</p>
              <div className="attributes">
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
          <div className="cart-item-quantity-container">
            <span
              onClick={() => {
                addToCart(cartItem, cartItem.selectedAttributes);
              }}
              className="cart-item-quantity-button"
            >
              +
            </span>
            <span className="cart-item-quantity">{quantity}</span>
            <span
              onClick={() => {
                removeFromCart(cartItem);
              }}
              className="cart-item-quantity-button"
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
