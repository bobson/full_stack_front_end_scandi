import { gql } from "@apollo/client";

export const getAllCategories = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;

export const getProductsByCategory = gql`
  query GetProductsByCategory($category: String!) {
    products(category: $category) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        type
        name
        items {
          id
          display_value
          value
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

export const getProductById = gql`
  query GetProductById($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
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
