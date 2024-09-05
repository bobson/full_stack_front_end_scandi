import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;

export const GET_PRODUCT_BY_CATEGORY = gql`
  query GetProductsByCategory($category: String!) {
    products(category: $category) {
      id
      name
      inStock
      category
      gallery
      prices {
        currency_label
        currency_symbol
        amount
      }
      attributes {
        id
        name
        type
        items {
          display_value
          value
          id
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          display_value
          value
          id
        }
      }
      prices {
        currency_label
        currency_symbol
        amount
      }
      brand
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $total_price: Float!
    $total_items: Int!
    $items: [OrderItemInput]!
  ) {
    createOrder(
      total_price: $total_price
      total_items: $total_items
      items_data: $items
    )
  }
`;
