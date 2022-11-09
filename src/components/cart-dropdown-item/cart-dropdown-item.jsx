import { Component } from "react";

import AttributesForm from "../attributes-form/attributes-form";

import "./styles.scss";

export default class CartDropdownItem extends Component {
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
      <div className="cart-dropdown-item-container">
        <div className="item-left-container">
          <div className="item-description">
            <div className="title">
              <p>{brand}</p>
              <p>{name}</p>
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
              <div className="dropdown-attributes" key={id}>
                <p>{name}:</p>
                <div className="dropdown-attributes-container">
                  {items?.map((item, idx) => (
                    <AttributesForm
                      key={item.id}
                      attrType={type}
                      id={`${cartItem.id}-${item.id}`}
                      value={item.value}
                      name={`dropdown-${cartItem.id}-${name}`}
                      htmlFor={`${cartItem.id}-${item.id}`}
                      defaultChecked={selectedAttributes[name] === item.value}
                      disabled
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
            >
              +
            </span>
            <span className="quantity">{quantity}</span>
            <span
              onClick={() => {
                removeFromCart(cartItem);
              }}
              className="quantity-button"
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
