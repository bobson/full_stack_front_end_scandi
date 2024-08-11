import { Component } from "react";

import { Routes, Route } from "react-router-dom";

import Navigation from "./components/navigation/navigation";
import CategoryPage from "./routes/category-page/category-page";
import ProductPage from "./routes/product-page/product-page";
import CartPage from "./routes/cart-page/cart-page";
import PageNotFound from "./routes/page-not-found/page-not-found";

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<CategoryPage />} />
          <Route path="product/:id/" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  }
}

export default App;
