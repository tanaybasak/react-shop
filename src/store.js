import { configureStore } from '@reduxjs/toolkit';
import productReducer from './components/Product/reducers/productReducer';
import cartReducer from './components/Product/reducers/addToCartReducer';

const store = configureStore({
	reducer: {
		product: productReducer,
		cart: cartReducer,
	},
});
export default store;
