import { gql } from '@apollo/client';

const ADD_TO_CART = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      items {
        description
        image
        name
        price
        reviews {
          comment
          rating
        }
      }
      quantity
    }
  }
`;

export default ADD_TO_CART;
