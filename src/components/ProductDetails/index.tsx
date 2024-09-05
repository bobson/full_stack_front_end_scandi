import { Component } from "react";
import Attributes from "../Attributes";
import { connect } from "react-redux";
import Gallery from "./Gallery";
import { CartItem, Product } from "../../types/types";
import parce from "html-react-parser";
import { addItemToCart } from "../../store/cartSlice";

interface ProductDetailProps {
  product: Product;
  addItemToCart: (item: CartItem) => void;
}

interface ProductDetailsState {
  selectedAttributes: { [key: string]: string };
}

class ProductDetails extends Component<
  ProductDetailProps,
  ProductDetailsState
> {
  state = {
    selectedAttributes: {} as Record<number, string>,
  };

  handleAttributeClick = (attributeId: number, value: string) => {
    this.setState((prevState) => ({
      selectedAttributes: {
        ...prevState.selectedAttributes,
        [attributeId]: value,
      },
    }));
  };

  areAllAttributesSelected = () => {
    const { product } = this.props;

    // If there are no attributes, return true
    if (product.attributes.length === 0) {
      return true;
    }

    // Check if every attribute has a selected value
    return product.attributes.every(
      (attribute) => this.state.selectedAttributes[attribute.id] !== undefined
    );
  };

  handleAddToCart = () => {
    const cartItem: CartItem = {
      item: this.props.product,
      quantity: 0,
      attributes: this.state.selectedAttributes,
    };

    this.props.addItemToCart(cartItem);
  };

  render() {
    const { product } = this.props;

    const { areAllAttributesSelected } = this;

    const isOutOfStock = !product.inStock;
    return (
      <div
        className={`flex flex-col md:flex-row md:space-x-4 max-w-screen-xl mx-auto p-4 relative`}
      >
        {/* Gallery Section */}
        <Gallery gallery={product.gallery} />
        {/* Product Description */}
        <div className="flex flex-col w-full md:w-5/12 mb-4 md:mb-0">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <Attributes
            attributes={product.attributes}
            selectedAttributes={this.state.selectedAttributes}
            onAttributeClick={this.handleAttributeClick}
            isInteractive={!isOutOfStock}
            dataTestId="product-attribute"
          />
          <div className="text-xl font-semibold mt-4 mb-4">
            {product.prices.currency_symbol} {product.prices.amount.toFixed(2)}
          </div>
          <button
            className="w-full bg-green-500 disabled:opacity-50
               disabled:scale-100 disabled:hover:shadow-none text-white 
               font-medium py-3 mb-4 hover:shadow-lg active:scale-95"
            data-testid="add-to-cart"
            onClick={this.handleAddToCart}
            disabled={!areAllAttributesSelected() || isOutOfStock}
          >
            {isOutOfStock ? "OUT OF STOCK" : "ADD TO CART"}
          </button>
          <div className="mt-4" data-testid="product-description">
            {parce(product.description)}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addItemToCart,
};

const ProductDetailsDispatchProps = connect(
  null,
  mapDispatchToProps
)(ProductDetails);
export default ProductDetailsDispatchProps;
