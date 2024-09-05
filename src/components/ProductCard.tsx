import React, { Component } from "react";

import emptyCard from "../assets/EmptyCart-white.svg";
import { CartItem, Product } from "../types/types";
import { addItemToCart } from "../store/cartSlice";

import { toKebabCase } from "../assets/functions";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface MatchParams {
  category: string;
}

// Extend RouteComponentProps with the match params
interface ProductCardProps extends RouteComponentProps<MatchParams> {
  product: Product;
  addItemToCart: (item: CartItem) => void;
}

class ProductCard extends Component<ProductCardProps> {
  state = {
    isHovered: false,
  };

  handleQuickBuy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const { product, addItemToCart } = this.props;

    // Construct selectedAttributes with the first item of each attribute
    const selectedAttributes: { [key: number]: string } = {};

    product.attributes.forEach((attribute) => {
      if (attribute.items.length > 0) {
        selectedAttributes[attribute.id] = attribute.items[0].value;
      }
    });

    const cartItem: CartItem = {
      item: this.props.product,
      quantity: 0,
      attributes: selectedAttributes,
    };

    addItemToCart(cartItem);
  };

  handleCardClick = () => {
    const { product, history, match } = this.props;
    const category = match.params.category || ""; // Get the category from the current route

    // Navigate to the product detail page
    history.push(`/${category}/${product.id}`);
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };
  render() {
    const { product } = this.props;
    const { isHovered } = this.state;
    // console.log(this.props);

    return (
      <div
        className="relative p-3 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={this.handleCardClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        data-testid={`product-${toKebabCase(product.name)}`}
      >
        <img
          src={product.gallery[0]}
          alt={product.name}
          className="w-full h-64 object-contain"
        />
        <div className="mt-4">
          <h3 className="text-lg text-gray-600">{product.name}</h3>
          <p className="font-semibold">
            {product.prices.currency_symbol}
            {product.prices.amount.toFixed(2)}
          </p>
        </div>

        {/* Quck buy button */}
        {product.inStock ? (
          <button
            className={`absolute bottom-16 right-6 p-2 bg-green-500 text-white rounded-full transition-opacity duration-300 ${
              isHovered ? "opacity-100 active:scale-90 shadow-lg" : "opacity-0"
            }`}
            onClick={this.handleQuickBuy}
          >
            <img src={emptyCard} alt="Quick Buy" />
          </button>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 text-gray-400 text-xl font-semibold">
            OUT OF STOCK
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  addItemToCart,
};

const ProductCardDispatchProps = connect(
  null,
  mapDispatchToProps
)(withRouter(ProductCard));
export default ProductCardDispatchProps;
