import { Component } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/cartContext";
import { ReactComponent as EmptyCart } from "../../../assets/Empty Cart.svg";
import CustomButton from "../../custom-button/custom-button";

import "./styles.scss";

class ProductCard extends Component {
  static contextType = CartContext;
  render() {
    const { product } = this.props;
    const { id, gallery, name, prices, attributes, inStock } = product;
    const { selectedCurrency, selectedAttributes } = this.context.state;
    const { addToCart } = this.context;

    return (
      <div className={inStock ? "container" : "container out-of-stock_hover"}>
        {!inStock && (
          <div className="out-of-stock">
            <h3>OUT OF STOCK</h3>
          </div>
        )}
        <Link to={`product/${id}`} className="product-cart-container">
          <img src={gallery[0]} alt={name} />

          <div className="text-container">
            <span className="name">{name}</span>
            {prices.map(
              ({ currency, amount }) =>
                selectedCurrency.label === currency.label && (
                  <span key={amount} className="price">
                    {currency.symbol}
                    {amount}
                  </span>
                )
            )}
          </div>
        </Link>
        <div className="add-to-cart">
          <CustomButton
            onClick={() => addToCart(product, selectedAttributes)}
            disabled={attributes.length}
          >
            <EmptyCart />
          </CustomButton>
        </div>
      </div>
    );
  }
}

export default ProductCard;
