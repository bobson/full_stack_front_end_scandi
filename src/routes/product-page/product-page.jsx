import { Component } from "react";
import ProductDescription from "../../components/product-description/product-description";

import withRouter from "./withRouter";

class ProductPage extends Component {
  render() {
    const id = this.props.params.id;

    return <ProductDescription id={id} />;
  }
}

export default withRouter(ProductPage);
