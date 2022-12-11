import { gql } from "@apollo/client";

export const getAllCategories = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;

export const getProductsByCategory = gql`
  query GetProductsByCategory($input: CategoryInput) {
    category(input: $input) {
      name
      products {
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
            displayValue
            value
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
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
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;
export const getCurrencies = gql`
  query GetCurrencies {
    currencies {
      label
      symbol
    }
  }
`;
