import { Component, Fragment } from "react";

import "./styles.scss";

export default class CartItem extends Component {
  state = {
    imageIndex: 0,
  };

  nextImage = (images) => {
    this.state.imageIndex === images.length - 1
      ? this.setState({ imageIndex: 0 })
      : this.setState((prevState) => ({
          imageIndex: prevState.imageIndex + 1,
        }));
  };

  prevImage = (images) => {
    console.log(images.length);
    this.state.imageIndex === 0
      ? this.setState({ imageIndex: images.length - 1 })
      : this.setState((prevState) => ({
          imageIndex: prevState.imageIndex - 1,
        }));
  };

  shouldComponentUpdate(prevProps, prevState) {
    if (this.props.cartItem.quantity !== prevProps.cartItem.quantity)
      return true;
    else return false;
  }

  render() {
    const { cartItem, addToCart } = this.props;
    // console.log(this.props);
    const { imageIndex } = this.state;
    console.log(imageIndex);
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
                {items?.map((item, idx) => {
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
                    <Fragment key={idx}>
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
            <span
              onClick={() => {
                addToCart(cartItem, cartItem.selectedAttributes);
              }}
              className="quantity-button"
            >
              +
            </span>
            <span>{quantity}</span>
            <span className="quantity-button">-</span>
          </div>
          <div className="carousel">
            <div className="carousel-buttons">
              <button
                onClick={() => this.prevImage(gallery)}
                className="carousel-button prev"
              >
                &lt;
              </button>
              <button
                onClick={() => this.nextImage(gallery)}
                className="carousel-button next"
              >
                &gt;
              </button>
            </div>

            <div className="carousel-content">
              {gallery.map((img, idx) => (
                <img
                  key={img}
                  className={idx === imageIndex ? "fade" : "hide"}
                  src={img}
                  alt={name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
