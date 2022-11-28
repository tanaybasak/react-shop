import React, { createContext, useState } from 'react';

export const ShopContext = createContext(null);

function Provider({ children }) {
	const [cart, addToCartData] = useState(null);

	return (
		<ShopContext.Provider
			value={{
				cart,
				updateCartItem: data => addToCartData(data),
			}}
		>
			{children}
		</ShopContext.Provider>
	);
};


export default Provider;
