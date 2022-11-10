import { Component, Fragment } from "react";

import { Markup } from "interweave";

import { getProductById } from "../../apollo/queries";

import { Query } from "@apollo/client/react/components";

import "./styles.scss";
import AttributesForm from "../attributes-form/attributes-form";
import CustomButton from "../custom-button/custom-button";
import { CartContext } from "../../context/cartContext";
import Spinner from "../spinner/spinner";

export default class ProductDescription extends Component {
  static contextType = CartContext;
  state = {
    imageIndex: 0,
    selectedAttributes: {},
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    const selectedAttributes = this.state.selectedAttributes;

    this.setState({
      selectedAttributes: { ...selectedAttributes, [name]: value },
    });
  };

  render() {
    const { handleChange } = this;
    const { addToCart } = this.context;
    const { selectedAttributes, imageIndex } = this.state;
    const { selectedCurrency } = this.context.state;
    const newId = JSON.stringify(this.state.selectedAttributes);

    return (
      <Query
        query={getProductById}
        fetchPolicy="network-only"
        nextFetchPolicy="network-only"
        variables={{ id: this.props.id }}
      >
        {({ data, loading, error }) => {
          if (loading) return <Spinner />;
          if (error) return alert(error.message);
          const {
            name,
            attributes,
            description,
            gallery,
            prices,
            brand,
            inStock,
          } = data.product;
          return (
            <div
              className={
                inStock
                  ? "product-page-container"
                  : "product-page-container out-of-stock"
              }
            >
              {!inStock && <h2>OUT OF STOCK</h2>}
              <div className="images-container">
                {gallery?.map((img, idx) => (
                  <img
                    onClick={() => this.setState({ imageIndex: idx })}
                    key={img}
                    src={img}
                    alt={name}
                  />
                ))}
              </div>
              <div className="image-container">
                {gallery && <img src={gallery[imageIndex]} alt={name} />}
              </div>

              <div className="description-container">
                <div className="description-title">
                  <h3>{brand}</h3>
                  <h3 style={{ fontWeight: 400 }}>{name}</h3>
                </div>

                {attributes?.map(({ id, items, name, type }) => (
                  <Fragment key={id}>
                    <span className="attributes-title">
                      {name.toUpperCase()}:
                    </span>
                    <div
                      className="attributes-container"
                      onChange={handleChange}
                    >
                      {items?.map((item) => (
                        <AttributesForm
                          key={item.id}
                          id={`${name}-${item.id}`}
                          name={name}
                          value={item.value}
                          attrType={type}
                          htmlFor={`${name}-${item.id}`}
                          disabled={!inStock}
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

                {!inStock ? (
                  <CustomButton disabled>OUT OF STOCK</CustomButton>
                ) : (
                  <CustomButton
                    onClick={() => {
                      addToCart(
                        {
                          ...data.product,
                          id: `${data.product.id}-${newId}`,
                        },
                        selectedAttributes
                      );
                    }}
                    disabled={
                      Object.keys(selectedAttributes).length !==
                      attributes?.length
                    }
                  >
                    ADD TO CART
                  </CustomButton>
                )}

                {description && (
                  <div className="description">
                    <Markup content={description} />
                  </div>
                )}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
