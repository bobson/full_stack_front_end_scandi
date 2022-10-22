import { Component } from "react";

import { Routes, Route } from "react-router-dom";

import { ApolloProvider } from "react-apollo";
import { client } from "./apollo/client";

import { CategoryProvider } from "./context/categoryContext";
import { CartProvider } from "./context/cartContext";

import Navigation from "./components/navigation/navigation";
import CategoryPage from "./routes/category-page/category-page";
import ProductPage from "./routes/product-page/product-page";
import CartPage from "./routes/cart-page/cart-page";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <CartProvider>
          <CategoryProvider>
            <Routes>
              <Route path="/" element={<Navigation />}>
                <Route index element={<CategoryPage />} />
                <Route path="product/:id" element={<ProductPage />} />
                <Route path="cart" element={<CartPage />} />
              </Route>
            </Routes>
          </CategoryProvider>
        </CartProvider>
        {/* <Test /> */}
      </ApolloProvider>
    );
  }
}

export default App;
