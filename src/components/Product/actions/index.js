import { useMutation } from "@apollo/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ADD_TO_CART from "../../../common/graphQlquery/addToCart";
// const [addCartItem, { loading, error, data }] = useLazyQuery(ADD_TO_CART);
// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async (_, { rejectWithValue }) =>
//     // try {
//     //   return await getProducts();
//     // } catch (err) {
//     //   console.log('here i am')
//     //   return rejectWithValue([], err);
//     // }
//     // console.log(getProducts());
//     getProducts(),

// );

export const addToCart = createAsyncThunk(
  "products/addToCart",
  async (id, { rejectWithValue }) => {
    console.log('called')
    const [addCartItem, { loading, error, data }] = useMutation(ADD_TO_CART);

    try {
      addCartItem({
        variables: {
          id: id,
        },
      })
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);
