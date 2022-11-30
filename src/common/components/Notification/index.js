import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../../shopContext';
import './Notification.scss';

function Notification({
	title,
	message,
	className,
}) {
	const [classNameInfo, setClassName] = useState(null);
	const { toastInfo, updateToastInfo } = useContext(ShopContext);
	const location = useLocation();

	useEffect(() => {
		if (className) {
			setClassName(className);
		}
	}, [className]);

	const handleRemove = () => {
		setClassName('d-none');
		updateToastInfo({ ...toastInfo, showToast: false });
	};

	useEffect(() => {
		handleRemove();
	}, [location]);

	useEffect(() => {
		const timeId = setTimeout(() => {
			// After 3 seconds set the show value to false
			handleRemove();
		}, 3000);

		return () => {
			clearTimeout(timeId);
		};
	}, [className]);

	return (
		<div className={`alert expo-notification alert-warning alert-dismissible fade ${classNameInfo}`} role="alert">
			<strong>{title}</strong>
			{message}
			<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleRemove} />
		</div>
	);
}

export default Notification;
