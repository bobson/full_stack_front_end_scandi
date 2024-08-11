import { Component } from "react";

import AttributesForm from "../../attributes-form/attributes-form";

import "./styles.scss";
import { toKebabCase } from "../../../assets/functions";

export default class CartDropdownItem extends Component {
  shouldComponentUpdate(prevProps, _prevState) {
    if (this.props.cartItem.quantity !== prevProps.cartItem.quantity)
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
      <div className="cart-dropdown-item-container">
        <div className="item-left-container">
          <div className="item-description">
            <div className="title">
              <p>{brand}</p>
              <p>{name}</p>
            </div>
            {prices && (
              <div className="price">
                <p className="price">
                  {prices.currency_symbol}
                  {prices.amount}
                </p>
              </div>
            )}

            {attributes?.map(({ items, name, type }) => (
              <div className="dropdown-attributes" key={name}>
                <p>{name}:</p>
                <div
                  className="dropdown-attributes-container"
                  data-testid={`cart-item-attribute-${toKebabCase(name)}`}
                >
                  {items?.map((item) => (
                    <AttributesForm
                      key={item.id}
                      attrType={type}
                      id={`${cartItem.id}-${item.id}`}
                      value={item.value}
                      name={`dropdown-${cartItem.id}-${name}`}
                      htmlFor={`${cartItem.id}-${item.id}`}
                      defaultChecked={selectedAttributes[name] === item.value}
                      disabled
                      dataTestId={name}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="quantity-container">
            <span
              onClick={() => {
                addToCart(cartItem, selectedAttributes);
              }}
              className="quantity-button"
              data-testid="cart-item-amount-increase"
            >
              +
            </span>
            <span className="quantity">{quantity}</span>
            <span
              onClick={() => {
                removeFromCart(cartItem);
              }}
              className="quantity-button"
              data-testid="cart-item-amount-decrease"
            >
              -
            </span>
          </div>
        </div>

        <img src={gallery[0]} alt={name} />
      </div>
    );
  }
}
