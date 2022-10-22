import { Component, Fragment } from "react";
import AttributesForm from "../attributes-form/attributes-form";
import Carousel from "./carousel/carousel";

import "./styles.scss";

export default class CartItem extends Component {
  // state = {
  //   imageIndex: 0,
  // };

  // nextImage = (images) => {
  //   this.state.imageIndex === images.length - 1
  //     ? this.setState({ imageIndex: 0 })
  //     : this.setState((prevState) => ({
  //         imageIndex: prevState.imageIndex + 1,
  //       }));
  // };

  // prevImage = (images) => {
  //   console.log(images.length);
  //   this.state.imageIndex === 0
  //     ? this.setState({ imageIndex: images.length - 1 })
  //     : this.setState((prevState) => ({
  //         imageIndex: prevState.imageIndex - 1,
  //       }));
  // };

  shouldComponentUpdate(prevProps, _prevState) {
    if (this.props.cartItem.quantity !== prevProps.cartItem.quantity)
      return true;
    else return false;
  }

  render() {
    const { cartItem, addToCart, removeFromCart } = this.props;
    // console.log(this.props);
    // const { imageIndex } = this.state;
    // console.log(imageIndex);
    console.log("render cartpage");
    const {
      name,
      attributes,
      gallery,
      prices,
      brand,
      selectedAttributes,
      quantity,
    } = cartItem;
    // console.log(this.props);
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
          <Carousel images={gallery} name={name} />
        </div>
      </div>
    );
  }
}
