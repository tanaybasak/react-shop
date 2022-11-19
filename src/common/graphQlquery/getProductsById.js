import { gql } from "@apollo/client";

const GET_PRODUCTSBYID = gql`
  query ProductsById($productsById: ID!) {
    productsById(id: $productsById) {
      description
      id
      image
      name
      price
      reviews {
        comment
        rating
      }
      overview {
        brand
        color
        features
        finish
        material
        seater
        sku
      }
    }
  }
`;

export default GET_PRODUCTSBYID;
