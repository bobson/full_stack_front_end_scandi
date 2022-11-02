import { Component, Fragment } from "react";
import parse from "html-react-parser";

import { getProductById } from "../../apollo/queries";

import { client } from "../../apollo/client";

import "./styles.scss";
import AttributesForm from "../attributes-form/attributes-form";
import CustomButton from "../custom-button/custom-button";
import { CartContext } from "../../context/cartContext";
import Spinner from "../spinner/spinner";

export default class ProductDescription extends Component {
  static contextType = CartContext;
  state = {
    product: {},
    id: "",
    loading: true,
    imageIndex: 0,
    selectedAttributes: {},
  };

  updateProducts = async (id) => {
    const { data, loading } = await client.query({
      query: getProductById,
      variables: { id },
    });

    this.setState({ product: data.product, loading, id: data.product.id });
  };

  componentDidMount() {
    this.updateProducts(this.props.id);
  }

  shouldComponentUpdate(_prevProps, prevState) {
    if (
      this.state.product.id !== prevState.product.id ||
      this.state.imageIndex !== prevState.imageIndex
    )
      return true;
    else return false;
  }

  updateId = (newId) => {
    const product = this.state.product;

    this.setState({
      product: {
        ...product,
        id: `${this.state.id}-${newId}`,
      },
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    const selectedAttributes = this.state.selectedAttributes;

    this.setState(
      {
        selectedAttributes: { ...selectedAttributes, [name]: value },
      },
      () => {
        const newId = JSON.stringify(this.state.selectedAttributes);
        this.updateId(newId);
      }
    );
  };

  render() {
    const { handleChange } = this;
    const { addToCart } = this.context;
    const { product, selectedAttributes, imageIndex } = this.state;
    const { selectedCurrency } = this.context.state;

    const { name, attributes, description, gallery, prices, brand } = product;
    if (this.state.loading) return <Spinner />;
    return (
      <div className="product-page-container">
        <div className="images-container">
          {gallery?.map((img, idx) => (
            <div
              onClick={() => this.setState({ imageIndex: idx })}
              key={img}
              className="small-image"
            >
              <img src={img} alt={name} />
            </div>
          ))}
        </div>
        <div className="image-container">
          {gallery && <img src={gallery[imageIndex]} alt={name} />}
        </div>

        <div className="description-container">
          <h3>{brand}</h3>
          <h3 style={{ fontWeight: 400 }}>{name}</h3>

          {attributes?.map(({ id, items, name, type }) => (
            <Fragment key={id}>
              <p>{name.toUpperCase()}:</p>
              <div className="attributes-container" onChange={handleChange}>
                {items?.map((item) => (
                  <AttributesForm
                    key={item.id}
                    id={`${name}-${item.id}`}
                    name={name}
                    value={item.value}
                    attrType={type}
                    htmlFor={`${name}-${item.id}`}
                  />
                ))}
              </div>
            </Fragment>
          ))}

          {prices && (
            <div className="price">
              <p>PRICE:</p>
              {prices.map(
                ({ currency, amount }) =>
                  selectedCurrency.label === currency.label && (
                    <p key={amount} className="price">
                      {currency.symbol}
                      {amount}
                    </p>
                  )
              )}
            </div>
          )}

          <CustomButton
            onClick={() => {
              addToCart(product, selectedAttributes);
            }}
            disabled={
              Object.keys(selectedAttributes).length !== attributes?.length
            }
          >
            ADD TO CART
          </CustomButton>

          {description && (
            <div className="description">{parse(`${description}`)}</div>
          )}
        </div>
      </div>
    );
  }
}
