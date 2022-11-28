import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes() {
	const token = sessionStorage.getItem('Auth Token');

	return token
		? <Outlet />
		: <Navigate to="/" />;
}

export default PrivateRoutes;
