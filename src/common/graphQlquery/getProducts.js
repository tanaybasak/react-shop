import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GetProducts($limit: Int!, $afterCursor: String) {
    products(limit: $limit, afterCursor: $afterCursor) {
      totalCount
      edges {
        cursor
        node {
          id
          image
          name
          price
          reviews {
            comment
            rating
          }
          description
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
