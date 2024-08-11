import React, { Component } from "react";

import { getProductsByCategory } from "../../apollo/queries";

import { CartContext } from "../../context/cartContext";

import ProductCard from "../../components/product-card/product-cart";

import "./styles.scss";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@apollo/client";

export default class CategoryPage extends Component {
  static contextType = CartContext;

  render() {
    const { title } = this.context.state;

    const RenderProducts = () => {
      const { data, loading, error } = useQuery(getProductsByCategory, {
        variables: { category: title },
      });
      if (loading) return <Skeleton count={10} />;
      if (error) return `Error! ${error}`;
      return (
        <div className="products-container">
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      );
    };

    return (
      <div className="cart-page-container">
        <h1>{title}</h1>
        <RenderProducts />
      </div>
    );
  }
}
