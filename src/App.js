import { Component } from "react";

import { Routes, Route } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";
import { getAllCategories } from "./apollo/queries";

import { Query } from "@apollo/client/react/components";

import { CartProvider } from "./context/cartContext";

import Navigation from "./components/navigation/navigation";
import CategoryPage from "./routes/category-page/category-page";
import ProductPage from "./routes/product-page/product-page";
import CartPage from "./routes/cart-page/cart-page";
import PageNotFound from "./routes/page-not-found/page-not-found";
import Spinner from "./components/spinner/spinner";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={getAllCategories}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;

            if (error)
              return (
                <div className="page-not-found">
                  <h2>{error.message}</h2>
                </div>
              );

            return (
              <CartProvider>
                <Routes>
                  <Route
                    path="/"
                    element={<Navigation categories={data.categories} />}
                  >
                    <Route index element={<CategoryPage />} />
                    <Route path="product/:id/" element={<ProductPage />} />
                    <Route path="cart" element={<CartPage />} />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </CartProvider>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
