import { gql } from '@apollo/client';

const ADD_TO_CART = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      items {
        id
        description
        image
        name
        price {
          initialPrice
          totalPrice
        }
        quantity
      }
    }
  }
`;

export default ADD_TO_CART;
