import { Component } from "react";
import { fetchGraphQLData } from "../apollo/client";
import { Product } from "../types/types";
import ProductDetails from "../components/ProductDetails";
import { GET_PRODUCT_BY_ID } from "../apollo/queries";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import Skeleton from "react-loading-skeleton";

interface MatchParams {
  id: string;
}

type ProductDetailPageProps = RouteComponentProps<MatchParams>;

class ProductDetailsPage extends Component<ProductDetailPageProps> {
  state = {
    product: {} as Product,
    loading: true,
    error: null as string | null,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    try {
      const data = await fetchGraphQLData(GET_PRODUCT_BY_ID, {
        id,
      });

      this.setState({
        product: data.product,
        loading: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: "Error getting the product", loading: false });
      } else {
        // Handle non-Error types

        this.setState({ error: "An unknown error occurred", loading: false });
      }
    }
  }

  render() {
    const { product, loading, error } = this.state;

    if (loading) return <Skeleton count={5} />;
    if (error) return <ErrorPage message={error} />;
    if (!product) return <div>No Product found</div>;

    return <ProductDetails product={product} />;
  }
}

const ProductDetailPageWithRouter = withRouter(ProductDetailsPage);
export default ProductDetailPageWithRouter;
