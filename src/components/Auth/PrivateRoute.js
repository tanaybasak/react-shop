import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navigation from '../Navigation';

function PrivateRoutes() {
	const token = sessionStorage.getItem('Auth Token');

	return token
		? (
			<>
				<Navigation />
				<Outlet />
			</>
		)
		: <Navigate to="/" />;
}

export default PrivateRoutes;
