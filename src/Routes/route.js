import React from 'react';
import { useRoutes } from 'react-router-dom';
import PrivateRoutes from '../components/Auth/PrivateRoute';
import SignUp from '../components/Auth/SignUp';

const NotFoundPage = React.lazy(() => import('../components/NotFoundPage'));
const Cart = React.lazy(() => import('../components/Cart'));
const Account = React.lazy(() => import('../components/Account'));
const Home = React.lazy(() => import('../components/Home'));
const ProductList = React.lazy(() => import('../components/Product/ProductList'));
const ProductDetails = React.lazy(() => import('../components/ProductDetails'));
const AppRoutes = () => {
	const routes = useRoutes([
		{
			path: '/signUp',
			element: <SignUp />,
		},
		{
			path: '*',
			element: <NotFoundPage />,
		},
		{
			path: '/',
			element: <Home />,
		},
		{
			path: '/',
			element: <PrivateRoutes />,
			children: [
				{
					path: '/account',
					index: true,
					element: <Account />,
				},
				{
					path: '/cart',
					element: <Cart />,
				},
				{
					path: '/products',
					children: [
						{ element: <ProductList />, index: true },
						{ path: ':id', element: <ProductDetails />, index: true },
					],
				},
			],
		},
	]);

	return routes;
};

export default AppRoutes;
