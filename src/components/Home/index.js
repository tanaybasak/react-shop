import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../common/components/Layout';
import Login from '../Auth/Login';
import logo from '../../../public/assets/icons/logo';
import './home.scss';
import { ShopContext } from '../../common/shopContext';
import Notification from '../../common/components/Notification';

function Home() {
	const [toastData, setToastData] = useState({});
	const { toastInfo } = useContext(ShopContext);

	useEffect(() => {
		if (toastInfo) {
			setToastData(toastInfo);
		}
	}, [toastInfo]);

	const subSection = (
		<>
			<div className="subContent">
				<div className="header_logo mb-5">{logo(50)}</div>
				<div className="heading"><p>Welcome back to Expo!</p></div>
			</div>
			<div className="heading-account">
				<p>
					Don't have an account ?
					<Link
						to="/signUp"
						type="button"
						style={{ paddingLeft: '0.5rem' }}
					>
						Create User
					</Link>
				</p>
			</div>
		</>
	);

	return (

		<div className="d-flex flex-container h-100 home_login">
			<Notification title={toastData.title} message={toastData.message} className={toastData.showToast ? 'd-block show' : 'd-none'} />
			<div className="flex-left left_background">
				<Layout midSection={subSection} className="layout-card" />
			</div>
			<div className="flex-right justify-content-center align-items-center d-flex">
				<Login />
			</div>
		</div>

	);
}

export default Home;
