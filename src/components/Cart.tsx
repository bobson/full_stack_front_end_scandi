import { Component } from "react";

import Attributes from "./Attributes";
// import { CartProps } from ".";
import { CartItem } from "../types/types";
import { RootState } from "../store";
import { connect } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../store/cartSlice";
import { fetchGraphQLMutation } from "../apollo/client";
import { CREATE_ORDER } from "../apollo/queries";
import Skeleton from "react-loading-skeleton";
import ErrorPage from "./ErrorPage";

export interface CartProps {
  cartItems: CartItem[];
  totalPrice: number;
  totalItems: number;
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (item: CartItem) => void;
  clearCart: () => void;
}

class Cart extends Component<CartProps> {
  state = {
    success: "",
    loading: false,
    error: "",
  };

  placeOrder = async () => {
    const { cartItems, totalItems, totalPrice, clearCart } = this.props;

    if (cartItems.length === 0) return;

    const mappedItems = cartItems.map((item) => ({
      product_id: item.item.id,
      product_price: item.item.prices.amount,
      quantity: item.quantity,
      selected_attributes: JSON.stringify(item.attributes),
    }));

    try {
      this.setState({ loading: true });
      const results = await fetchGraphQLMutation(CREATE_ORDER, {
        total_price: totalPrice,
        total_items: totalItems,
        items: mappedItems,
      });

      this.setState({
        success: `Oreder No ${results.createOrder} created successfuly`,
        loading: false,
      });
      clearCart();
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: "Error creating order", loading: false });
      } else {
        this.setState({ error: "An unknown error occurred", loading: false });
      }
    }
  };

  render() {
    const {
      cartItems,
      totalPrice,
      totalItems,
      addItemToCart,
      removeItemFromCart,
    } = this.props;

    const { success, loading, error } = this.state;

    if (loading) return <Skeleton count={5} />;
    if (error) return <ErrorPage message={error} />;

    return (
      <div className="w-full max-h-[40rem] overflow-auto max-w-sm bg-white p-4">
        {totalItems > 0 ? (
          <div className="text-lg mb-4">
            <span className="font-bold">My Bag, </span>
            <span>{totalItems} </span>
            <span>{totalItems > 1 ? "items" : "item"}</span>
          </div>
        ) : (
          <p className="font-bold">
            {success ? success : "Your bag is empty!"}
          </p>
        )}

        {cartItems?.map((cartItem) => (
          <div
            key={`${cartItem.item.id}-${JSON.stringify(cartItem.attributes)}`}
            className="flex justify-between mb-4 border-b pb-4"
          >
            {/* Product Details */}
            <div className="w-1/2 flex flex-col justify-between gap-2">
              <p>{cartItem.item.name}</p>
              <p className="font-semibold">
                {cartItem.item.prices.currency_symbol}
                {cartItem.item.prices.amount}
              </p>

              {/* Attributes */}
              <Attributes
                attributes={cartItem.item.attributes}
                selectedAttributes={cartItem.attributes}
                isInteractive={false}
                dataTestId="cart-item-attribute"
              />
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col justify-between items-center ">
              <button
                onClick={() => addItemToCart(cartItem)}
                className="w-6 h-6 border border-gray-300 flex items-center justify-center"
                data-testid="cart-item-amount-increase"
              >
                +
              </button>
              <span className="my-2">{cartItem.quantity}</span>
              <button
                onClick={() => removeItemFromCart(cartItem)}
                className="w-6 h-6 border border-gray-300 flex items-center justify-center"
                data-testid="cart-item-amount-decrease"
              >
                -
              </button>
            </div>

            {/* Product Image */}
            <div className="w-1/4 flex items-center">
              <img
                src={cartItem.item.gallery[0]}
                alt={cartItem.item.name}
                className="object-cover"
              />
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="flex justify-between mt-4" data-testid="cart-total">
          <span className="font-semibold">Total:</span>
          <span data-testid="cart-item-amount">{totalPrice.toFixed(2)}</span>
        </div>

        {/* Place Order Button */}
        <button
          className="w-full bg-green-500 disabled:opacity-50
          disabled:scale-100 disabled:hover:shadow-none text-white 
          font-medium py-2 my-4 hover:shadow-lg active:scale-95"
          disabled={cartItems.length === 0}
          onClick={this.placeOrder}
        >
          Place Order
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  cartItems: state.cart.cartItems,
  totalPrice: state.cart.totalPrice,
  totalItems: state.cart.totalItems,
});

const CartStateToProp = connect(mapStateToProps, {
  addItemToCart,
  removeItemFromCart,
  clearCart,
})(Cart);
export default CartStateToProp;
