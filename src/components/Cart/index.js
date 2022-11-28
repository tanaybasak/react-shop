import { useQuery } from '@apollo/client';
import React, { useEffect, useMemo, useState } from 'react';
import GET_CARTITEMS from '../../common/graphQlquery/getCartItems';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import './cart.scss';

function Cart() {
	const [totalPrice, setTotalPrice] = useState();
	// const [defaultSelectedValue, setSelectedValue] = useState(0);
	const [cartDataDetails, setCartData] = useState([]);
	const shippingEstimate = 5.40;
	const taxEstimate = 15.40;
	const { data: cartData } = useQuery(GET_CARTITEMS, {
		fetchPolicy: 'cache-and-network',
	});

	const options = [
		{ value: '1', label: '1' },
		{ value: '2', label: '2' },
		{ value: '3', label: '3' },
		{ value: '4', label: '4' },
	];

	const handleOnChange = (e, item) => {
		const index = cartDataDetails.indexOf(item);
		const deepClone = JSON.parse(JSON.stringify(cartDataDetails));
		deepClone[index].quantity = e.target.value;
		deepClone[index].price.totalPrice = deepClone[index].price.initialPrice
		* parseInt(deepClone[index].quantity, 10);
		const tot = deepClone.reduce((accumulator, object) => accumulator + object.price.totalPrice, 0);
		setCartData(deepClone);
		setTotalPrice(tot);
	};

	useEffect(() => {
		if (cartData) {
			const { cartItems: { items } } = cartData;
			setCartData(items);
			const tot = items.reduce((accumulator, object) => accumulator + object.price.totalPrice, 0);
			setTotalPrice(tot);
		}
	}, [cartData]);

	function listItems(item) {
		return (
			<li key={item.id} className="list-group-item cartItems">
				<div className="cartItemImage">
					<img
						src={item.image}
						alt="cartItem"
						role="presentation"
						height="100%"
						width="100%"
					/>
				</div>
				<div className="cartItemDetails d-flex">
					<div className="cartItemInfo">
						<div className="cartItemTitle mb-2">{item.name}</div>
						<div className="cartItemDesc mb-2">{item.description}</div>
						<div className="cartItemPrice mb-2">{item.price.initialPrice.toLocaleString()}</div>
					</div>
					<div className="cartItemQuantity">
						<select
							onChange={(e) => handleOnChange(e, item)}
							className="form-select mb-3"
							value={item.quantity}
							aria-label=".form-select-lg example"
						>
							{options.map((optionItems) => (
								<option
									value={optionItems.value}
									key={optionItems.value}
								>
									{optionItems.label}
								</option>
							))}
						</select>
					</div>
				</div>
			</li>
		);
	}

	const cartDetails =	useMemo(() => cartDataDetails.map(
		(item) => listItems(item),
	), [cartDataDetails]);

	return (
		<div className="cartDetails container-fluid p-5 d-flex">
			{cartDataDetails.length ? (
				<>
					<div className="cartDetails-leftContainer">
						<p className="shop-cart">Shopping Cart</p>
						<ul className="list-group cartItemDetails">
							{cartDetails}
						</ul>
					</div>
					<div className="cartDetails-rightContainer">
						<div className="cartDetails-background">
							<div className="cartDetails-heading mb-2">
								<b> Order Summary </b>
							</div>
							<table className="table">
								<tbody>
									<tr>
										<td>SubTotal</td>
										<td>{totalPrice.toLocaleString()}</td>
									</tr>
									<tr>
										<td>Shipping Estimate</td>
										<td>5.40</td>
									</tr>
									<tr>
										<td>Tax Estimate</td>
										<td>15.40</td>
									</tr>
									<tr>
										<td>Order Total</td>
										<td>
											{Math.floor(totalPrice + shippingEstimate + taxEstimate).toLocaleString()}
										</td>
									</tr>
								</tbody>
							</table>
							<div className="orderNowButton text-center">
								<button className="btn btn-dark btn-block" type="button">Order Now</button>
							</div>
						</div>
					</div>
				</>
			) : <ErrorComponent details="cartDataDetails" />}
		</div>
	);
}

export default Cart;
