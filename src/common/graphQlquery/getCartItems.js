import { gql } from "@apollo/client";

const GET_CARTITEMS = gql`
  query cartItems {
    cartItems {
      items {
        description
        image
        name
        price
      }
    }
  }
`;

export default GET_CARTITEMS;
