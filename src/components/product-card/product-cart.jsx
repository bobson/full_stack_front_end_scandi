import { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

class ProductCard extends Component {
  render() {
    const { id, gallery, name, prices } = this.props.product;

    return (
      <Link to={`product/${id}`}>
        <div className="product-cart-container">
          {/* <div className="image-container"></div> */}
          <img src={gallery[0]} alt={name} />

          <div className="text-container">
            <span className="name">{name}</span>
            <span className="price">
              {prices[0].currency.symbol}
              {prices[0].amount}
            </span>
          </div>
        </div>
      </Link>
    );
  }
}

export default ProductCard;
