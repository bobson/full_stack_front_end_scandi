import { Component } from "react";

import { Routes, Route } from "react-router-dom";

// import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import CategoryPage from "./pages/category-page.jsx/category-page";

import { client } from "./apollo/client";
import ProductPage from "./pages/product-page/product-page";

import { CategoryProvider } from "./context/categoryContext";
import { CartProvider } from "./context/cartContext";
import Navigation from "./components/navigation/navigation";
import CartPage from "./pages/cart-page/cart-page";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <CategoryProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Navigation />}>
                <Route index element={<CategoryPage />} />
                <Route path="product/:id" element={<ProductPage />} />
                <Route path="cart" element={<CartPage />} />
              </Route>
            </Routes>
          </CartProvider>
        </CategoryProvider>
        {/* <Test /> */}
      </ApolloProvider>
    );
  }
}

export default App;
