import { gql } from '@apollo/client';

const GET_CARTITEMS = gql`
  query cartItems {
    cartItems {
    items {
      image
      id
      description
      name
      overview {
        brand
        color
        features
        finish
        material
        seater
        sku
      }
      price {
        initialPrice
        totalPrice
      }
      quantity
      reviews {
        rating
        comment
      }
    }
  }
  }
`;

export default GET_CARTITEMS;
