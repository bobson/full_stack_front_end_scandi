import { Component } from "react";
import ProductDescription from "../../components/product-description/product-description";

import withRouter from "../../components/withRouter";
import { CartContext } from "../../context/cartContext";

class ProductPage extends Component {
  static contextType = CartContext;
  render() {
    const id = this.props.params.id;
    const context = this.context;
    return <ProductDescription id={id} context={context} />;
  }
}

export default withRouter(ProductPage);
