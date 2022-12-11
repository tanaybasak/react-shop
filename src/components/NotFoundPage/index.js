import React from 'react';
import errorImg from '../../assets/icons/404.png';
import './NotFound.scss';

function NotFoundPage() {
	return (
		<div className="errorpage">
			<img className="errorpage-image" src={errorImg} alt="errorimg" />
			<div className="errorpage-title">
				404
			</div>
			<div className="errorpage-title-text">Oh! Page not found</div>
		</div>
	);
}

export default NotFoundPage;
