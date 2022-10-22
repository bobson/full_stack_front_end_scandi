import React, { Component } from "react";
import ProductListing from "../../components/product-listing/product-listing";

import { CategoryContext } from "../../context/categoryContext";

export default class CategoryPage extends Component {
  static contextType = CategoryContext;
  render() {
    return (
      <div>
        <h1 style={{ textTransform: "capitalize", fontWeight: 400 }}>
          {this.context.state.title}
        </h1>
        <ProductListing category={this.context.state} />
      </div>
    );
  }
}
