import { Component } from "react";

import { GET_PRODUCT_BY_CATEGORY } from "../apollo/queries.ts";

import { Product } from "../types/types.ts";

import { fetchGraphQLData } from "../apollo/client.ts";
import { withRouter, RouteComponentProps } from "react-router-dom";

import ProductCard from "../components/ProductCard.tsx";
import ErrorPage from "../components/ErrorPage.tsx";
import Skeleton from "react-loading-skeleton";

interface MatchParams {
  category: string;
}

type ProductListingPageProps = RouteComponentProps<MatchParams>;

class ProductListingPage extends Component<ProductListingPageProps> {
  state = {
    products: [] as Product[],
    loading: true,
    error: null as string | null,
  };

  fetchData = async (category: string) => {
    try {
      const data = await fetchGraphQLData(GET_PRODUCT_BY_CATEGORY, {
        category: category,
      });
      this.setState({ products: data.products, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.setState({ error: "Error getting the products", loading: false });
      } else {
        this.setState({
          error: "An unexpected error occurred",
          loading: false,
        });
      }
    }
  };

  async componentDidMount() {
    const { match } = this.props;
    const category = match.params.category;
    await this.fetchData(category);
  }

  async componentDidUpdate(prevProps: ProductListingPageProps) {
    const { match } = this.props;
    const category = match.params.category;
    const prevCategory = prevProps.match.params.category;
    if (prevCategory !== category) {
      await this.fetchData(category);
    }
  }

  render() {
    const { products, loading, error } = this.state;

    if (loading) {
      return <Skeleton count={5} />;
    }
    if (error) {
      return <ErrorPage message={error} />;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            // navigate={this.props.history.push}
          />
        ))}
      </div>
    );
  }
}

const ProductListingPageWithRouter = withRouter(ProductListingPage);
export default ProductListingPageWithRouter;
