import { Component } from "react";

import { Routes, Route } from "react-router-dom";

import { ApolloProvider } from "react-apollo";
import { client } from "./apollo/client";
import { getAllCategories } from "./apollo/queries";

import { CartProvider } from "./context/cartContext";

import Navigation from "./components/navigation/navigation";
import CategoryPage from "./routes/category-page/category-page";
import ProductPage from "./routes/product-page/product-page";
import CartPage from "./routes/cart-page/cart-page";
import PageNotFound from "./routes/page-not-found/page-not-found";
import Spinner from "./components/spinner/spinner";

class App extends Component {
  state = {
    categories: [],
    loading: true,
    error: "",
  };

  updateCategories = async () => {
    try {
      const { data, loading } = await client.query({
        query: getAllCategories,
      });

      this.setState({
        categories: data.categories,
        loading,
      });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  };

  componentDidMount() {
    this.updateCategories();
  }
  render() {
    const { loading, error, categories } = this.state;
    if (loading) return <Spinner />;
    if (error)
      return (
        <div className="page-not-found">
          <h2>{error}</h2>
        </div>
      );
    return (
      <ApolloProvider client={client}>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Navigation categories={categories} />}>
              <Route index element={<CategoryPage />} />
              <Route path="product/:id" element={<ProductPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </CartProvider>
      </ApolloProvider>
    );
  }
}

export default App;
