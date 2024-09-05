import { Component } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ProductListingPage from "./pages/ProductListingPage";
import Layout from "./components/Layout";
import ProductDetailPage from "./pages/ProducDetailPage";
import PageNotFound from "./components/PageNotFound";
import { fetchGraphQLData } from "./apollo/client";
import { GET_CATEGORIES } from "./apollo/queries";
import { Category } from "./types/types";
import Skeleton from "react-loading-skeleton";
import ErrorPage from "./components/ErrorPage";

export default class App extends Component {
  state = {
    categories: [] as Category[],
    loading: true,
    error: "",
  };

  async componentDidMount() {
    try {
      const data = await fetchGraphQLData(GET_CATEGORIES);

      this.setState({
        categories: data.categories,
        loading: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: "Error getting categories", loading: false });
      } else {
        // Handle non-Error types
        this.setState({ error: "An unknown error occurred", loading: false });
      }
    }
  }

  validateCategory = (category: string | undefined) => {
    const { categories } = this.state;
    return categories.some((cat) => cat.name === category);
  };

  render() {
    const { categories, loading, error } = this.state;

    if (loading) {
      return <Skeleton count={5} />;
    }

    if (error) {
      return <ErrorPage message={error} />;
    }

    return (
      <Router>
        <Switch>
          <Layout categories={categories}>
            <Switch>
              <Route exact path="/">
                <Redirect to={`/${categories[0]?.name}`} />
              </Route>
              <Route
                exact
                path="/:category"
                children={({ match }) =>
                  this.validateCategory(match?.params.category) ? (
                    <ProductListingPage />
                  ) : (
                    <PageNotFound message="" />
                  )
                }
              />
              <Route path="/:category/:id" component={ProductDetailPage} />
            </Switch>
          </Layout>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}
