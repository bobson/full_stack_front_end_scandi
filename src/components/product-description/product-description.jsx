import { Component, Fragment } from "react";
import parse from "html-react-parser";

import { getProductById } from "../../apollo/queries";

import { client } from "../../apollo/client";

// import "./product-page.styles.scss";
import "./styles.scss";

export default class ProductDescription extends Component {
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
        console.log(newId);
        this.updateId(newId);
      }
    );
  };

  render() {
    const { handleChange } = this;
    const { addToCart } = this.props.context;
    const { product, selectedAttributes } = this.state;
    // console.log(this.props.context);
    console.log(this.state.product);
    // console.log(this.state.selectedAttributes);
    const { name, attributes, description, gallery, prices, brand } = product;
    if (this.state.loading) return <p>Loading...</p>;
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
          {gallery && <img src={gallery[this.state.imageIndex]} alt={name} />}
        </div>
        <div className="description-container">
          <h3>{brand}</h3>
          <h3 style={{ fontWeight: 400 }}>{name}</h3>

          {attributes?.map(({ id, items, name, type }) => (
            <Fragment key={id}>
              <p>{name.toUpperCase()}:</p>
              <div className="attributes-container" onChange={handleChange}>
                {items?.map((item) => {
                  return type === "swatch" ? (
                    // <span
                    //   key={item.id}
                    //   style={{ backgroundColor: item.value }}
                    //   className="swatch"
                    //   onClick={() => console.log(name)}
                    // />
                    <Fragment key={item.id}>
                      <input
                        type="radio"
                        id={`${name}-${item.id}`}
                        name={name}
                        value={item.value}
                        className="hidden swatch-input"
                      />
                      <label
                        style={{ backgroundColor: item.value }}
                        className="swatch"
                        htmlFor={`${name}-${item.id}`}
                      />
                    </Fragment>
                  ) : (
                    // <span onClick={() => console.log(name)} key={item.id}>
                    //   {item.value}
                    // </span>
                    <Fragment key={item.id}>
                      <input
                        type="radio"
                        id={`${name}-${item.id}`}
                        value={item.value}
                        name={name}
                        className="hidden radio-input"

                        // checked={true}
                      />
                      <label
                        className="button-label"
                        htmlFor={`${name}-${item.id}`}
                      >
                        {item.value}
                      </label>
                    </Fragment>
                  );
                })}
              </div>
            </Fragment>
          ))}
          {prices && (
            <div className="price">
              <p>PRICE:</p>
              <p>
                {prices[0].currency.symbol}
                {prices[0].amount}
              </p>
            </div>
          )}
          <button
            onClick={async () => {
              // this.updateId();
              addToCart(product, selectedAttributes);
            }}
            className="add-to-cart-button"
            disabled={
              Object.keys(selectedAttributes).length !== attributes?.length
            }
          >
            ADD TO CART
          </button>
          {description && (
            <div className="description">{parse(`${description}`)}</div>
          )}
        </div>
      </div>
    );
  }
}
