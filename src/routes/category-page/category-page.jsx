import React, { Component } from "react";

import ProductListing from "../../components/product-listing/product-listing";
import { CartContext } from "../../context/cartContext";

export default class CategoryPage extends Component {
  static contextType = CartContext;
  render() {
    const { title } = this.context.state;
    return (
      <div>
        <h1 style={{ textTransform: "capitalize", fontWeight: 400 }}>
          {title}
        </h1>

        <ProductListing category={{ title }} />
      </div>
    );
  }
}
