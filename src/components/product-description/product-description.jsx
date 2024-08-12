import { Component, Fragment } from "react";

import { Markup } from "interweave";

import { getProductById } from "../../apollo/queries";

import { Query } from "@apollo/client/react/components";

import "./styles.scss";
import AttributesForm from "../attributes-form/attributes-form";
import CustomButton from "../custom-button/custom-button";
import { CartContext } from "../../context/cartContext";
import { toKebabCase } from "../../assets/functions";
import Skeleton from "react-loading-skeleton";

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
    const newId = JSON.stringify(this.state.selectedAttributes);

    return (
      <Query query={getProductById} variables={{ id: this.props.id }}>
        {({ data, loading, error }) => {
          if (loading) return <Skeleton count={10} />;
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

              <div className="images-container" data-testid="product-gallery">
                {gallery?.map((img, idx) => (
                  <img
                    onClick={() => this.setState({ imageIndex: idx })}
                    key={img}
                    src={img}
                    alt={name}
                  />
                ))}
              </div>
              <div className="image-container" data-testid="product-gallery">
                {gallery && <img src={gallery[imageIndex]} alt={name} />}
              </div>

              <div className="description-container">
                <div className="description-title">
                  <h3>{brand}</h3>
                  <h3 style={{ fontWeight: 400 }}>{name}</h3>
                </div>

                {attributes?.map(({ items, name, type }) => (
                  <Fragment key={name}>
                    <span className="attributes-title">
                      {name.toUpperCase()}:
                    </span>
                    <div
                      className="attributes-container"
                      onChange={handleChange}
                      data-testid={`product-attribute-${toKebabCase(name)}`}
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

                    <p key={prices.amount} className="price">
                      {prices.currency_symbol}
                      {prices.amount}
                    </p>
                  </div>
                )}

                {!inStock ? (
                  <CustomButton data-testid="add-to-cart" disabled>
                    OUT OF STOCK
                  </CustomButton>
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
                    data-testid="add-to-cart"
                  >
                    ADD TO CART
                  </CustomButton>
                )}

                {description && (
                  <div
                    className="description"
                    data-testid="product-description"
                  >
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
