import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Notification from '../../common/components/Notification';
import { ShopContext } from '../../common/shopContext';
import Navigation from '../Navigation';

function PrivateRoutes() {
	const token = sessionStorage.getItem('Auth Token');
	const [toastData, setToastData] = useState({});
	const { toastInfo } = useContext(ShopContext);

	useEffect(() => {
		if (toastInfo) {
			setToastData(toastInfo);
		}
	}, [toastInfo]);
	return token
		? (
			<>
				<Navigation />
				<Notification title={toastData.title} message={toastData.message} className={toastData.showToast ? 'd-block show' : 'd-none'} />
				<Outlet />
			</>
		)
		: <Navigate to="/" />;
}

export default PrivateRoutes;
