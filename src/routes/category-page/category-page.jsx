import React, { Component } from "react";

import { Query } from "@apollo/client/react/components";

import { getProductsByCategory } from "../../apollo/queries";

import { CartContext } from "../../context/cartContext";
import Spinner from "../../components/spinner/spinner";
import ProductCard from "../../components/product-card/product-cart";

import "./styles.scss";

export default class CategoryPage extends Component {
  static contextType = CartContext;
  render() {
    const { title } = this.context.state;
    return (
      <Query
        query={getProductsByCategory}
        fetchPolicy="network-only"
        nextFetchPolicy="cache-first"
        variables={{ input: { title } }}
      >
        {({ data, loading, error }) => {
          if (loading) return <Spinner />;
          if (error) return alert(error.message);

          return (
            <div className="cart-page-container">
              <h1>{data.category.name}</h1>
              <div className="products-container">
                {data.category.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
