import { gql } from "@apollo/client";
// import gql from "react-apollo";
// import gql from "graphql-tag";

export const getProductsByCategory = gql`
  query ($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const getProductById = gql`
  query ($id: String!) {
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
// export const testQuery = gql`
//   query {
//     category {
//       name
//       products {
//         id
//         name
//         gallery
//         prices {
//           currency {
//             label
//             symbol
//           }
//           amount
//         }
//       }
//     }
//   }
// `;
