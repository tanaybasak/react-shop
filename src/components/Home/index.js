import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../common/Layout/Layout';
import Login from '../Auth/Login';
import './home.scss';

function Home() {
	const navigate = useNavigate();

	const header = (
		<>
			New Customer?
		</>
	);

	const subSection = (
		<>
			<div className="subContent">
				<p>
					Create an account with us and you'll be able to:
				</p>
				<ul className="list-unstyled">
					<li> Check out faster</li>
					<li>Save multiple shipping addresses</li>
					<li>Access your order history</li>
					<li>Track new orders</li>
					<li>Save items to your Wish List</li>
				</ul>
			</div>
			<div className="buttonContent">
				<button
					className="btn btn-dark btn-block mt-4"
					onClick={() => navigate('/signUp')}
					type="button"
				>
					Create User
				</button>
			</div>
		</>
	);

	return (

		<div className="d-flex flex-container p-5 container">
			<div className="flex-left">
				<Login />

			</div>
			<div className="flex-right">
				<Layout heading={header} midSection={subSection} />
			</div>
		</div>

	);
}

export default Home;
