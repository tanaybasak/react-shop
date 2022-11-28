import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts($limit: Int!, $afterCursor: String) {
    products(limit: $limit, afterCursor: $afterCursor) {
      totalCount
      edges {
      cursor
      node {
        id
        image
        description
        name
        overview {
          material
          finish
          features
          color
          brand
        }
        price {
          totalPrice
          initialPrice
        }
        reviews {
          rating
          comment
        }
      }
    }
      pageInfo {
        hasNextPage
        startCursor
      }
    }
  }
`;

export default GET_PRODUCTS;
