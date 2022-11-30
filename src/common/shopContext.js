import React, { createContext, useMemo, useState } from 'react';

export const ShopContext = createContext(null);

function Provider({ children }) {
	const [cart, addToCartData] = useState(null);
	const [toastInfo, setToastInfo] = useState(null);
	const contextValue = useMemo(() => ({
		cart,
		toastInfo,
		updateCartItem: (data) => addToCartData(data),
		updateToastInfo: (data) => setToastInfo(data),
	}), [cart, toastInfo]);

	return (
		<ShopContext.Provider value={contextValue}>
			{children}
		</ShopContext.Provider>
	);
}

export default Provider;
