import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { NavLink, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import auth from '../../authentication/firebase';
// import { useQuery } from '@apollo/client';
import logo from '../../../public/assets/icons/logo';
import cartImg from '../../../public/assets/icons/cart.avif';
import person from '../../../public/assets/icons/person.avif';
import logout from '../../../public/assets/icons/logout.avif';
import create from '../../../public/assets/icons/create.avif';
import { ShopContext } from '../../common/shopContext';
import './Navigation.scss';
import GET_CARTITEMS from '../../common/graphQlquery/getCartItems';

function Navigation() {
	const { cart } = useContext(ShopContext);
	const location = useLocation();
	const [token, setToken] = useState(null);
	const { data: cartData } = useQuery(GET_CARTITEMS, {
		fetchPolicy: 'cache-and-network',
	});
	const [cartItems, setCartItems] = useState(null);

	useEffect(() => {
		setToken(sessionStorage.getItem('Auth Token'));
	}, [location]);

	useEffect(() => {
		if (cartData) {
			setCartItems(cartData.cartItems.items.length);
		}
	}, [cartData]);

	useEffect(() => {
		if (cart) {
			setCartItems(cart.addToCart.items.length);
		}
	}, [cart]);

	const logoutFromCart = () => {
		signOut(auth).then(() => {
			sessionStorage.removeItem('Auth Token');
			setToken(null);
			// navigate('/home');
		}).catch((error) => new Error(error));
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-height">
			<NavLink
				className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
				exact="true"
				to="/products"
			>
				{logo(15)}
			</NavLink>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarScroll"
				aria-controls="navbarScroll"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon" />
			</button>
			<div className="collapse navbar-collapse" id="navbarScroll">
				<ul
					className="navbar-nav ml-auto my-2 my-lg-0 navbar-nav-scroll"
					style={{ maxHeight: 100 }}
				>
					<li className="nav-item">
						<NavLink
							exact="true"
							className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
							to="/cart"
						>
							{cartItems > 0 && (
								<div className="notify_count">{cartItems}</div>
							)}
							<img
								alt=""
								src={cartImg}
								className="nav-link-icons"
								loading="lazy"
							/>
							Cart
							<span className="sr-only">(current)</span>
						</NavLink>

					</li>
					<li className="nav-item">
						<NavLink
							exact="true"
							className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
							to="/create"
						>
							<img
								alt=""
								src={create}
								className="nav-link-icons"
								loading="lazy"
							/>
							Create
						</NavLink>
					</li>
					{token && (
						<>
							<li className="nav-item">
								<NavLink
									exact="true"
									className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
									to="/account"
								>
									<img
										alt=""
										src={person}
										className="nav-link-icons"
										loading="lazy"
									/>
									Account
								</NavLink>
								{/* </Link> */}
							</li>
							<li className="nav-item">
								<NavLink
									className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
									onClick={logoutFromCart}
									to="/"
								>
									<img
										alt=""
										src={logout}
										className="nav-link-icons"
										loading="lazy"
									/>
									Logout
								</NavLink>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
}

export default Navigation;
