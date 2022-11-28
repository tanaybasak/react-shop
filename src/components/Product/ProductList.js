import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Outlet, useNavigate } from 'react-router-dom';
import GET_PRODUCTS from '../../common/graphQlquery/getProducts';

import './product.scss';

function ProductList() {
	// const dispatch = useDispatch();
	const navigate = useNavigate();
	const [listItems, setListItems] = useState([]);

	const {
		loading: productsLoading,
		error: productsError,
		data: productsData,
		fetchMore,
	} = useQuery(GET_PRODUCTS, {
		variables: {
			limit: 8,
			afterCursor: '0',
		},
		// fetchPolicy: 'network-only',		// notifyOnNetworkStatusChange: true,
	});

	const handleScroll = (event) => {
		const { scrollTop } = event.target.documentElement;
		const { innerHeight } = window;
		const { scrollHeight } = event.target.documentElement;
		if (scrollTop + innerHeight + 1 >= scrollHeight) {
			fetchMore({
				variables: {
					limit: 8,
					afterCursor: productsData.products.edges.length.toString(),
				},
				updateQuery: (prev, { variables, fetchMoreResult }) => {
					if (
						!fetchMoreResult
						|| prev.products.edges.length > parseInt(variables.afterCursor, 10)
					) {
						return prev;
					}
					return {
						products: {
							...prev.products,
							edges: [
								...prev.products.edges,
								...fetchMoreResult.products.edges,
							],
						},
					};
				},
			});
		}
	};

	const navigateToProductDetails = (id) => {
		navigate(`${id}`); //
	};

	// useEffect(() => {
	// 	setValue({
	// 		itemsAddedToCart: cartItem.length,
	// 	});
	// }, [cartItem]);

	const keydown = () => { };

	useEffect(() => {
		if (productsData) {
			setListItems(productsData.products.edges);
			window.addEventListener('scroll', handleScroll);
		}
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [productsData]);

	if (productsLoading) return 'Loading...';
	if (productsError) return new Error('Test error boundary');

	function list(product) {
		return (
			<div
				className="col-md-3"
				onClick={() => navigateToProductDetails(product.node.id)}
				role="button"
				onKeyDown={keydown}
				tabIndex={0}
				key={product.node.id}
			>
				<div className="mb-4">
					<img
						className="card-img-top"
						src={product.node.image}
						height="250px"
						width="100%"
						loading="lazy"
						alt={`Card_imagecap-${product.node.id}`}
					/>
					<div className="card-body d-flex alignCardDetails">
						<p className="card-title"><b>{product.node.name}</b></p>
						<p className="card-text">
							Rs.
							{(product.node.price.initialPrice).toLocaleString()}
						</p>
					</div>
				</div>
			</div>
		);
	}

	// const productList = useMemo(() => listItems.map(
	// 	(product) => list(product),
	// ), [listItems]);

	return (
		<div className="container-xxl p-5">
			<div className="card-deck">
				{listItems.map((product) => list(product))}
			</div>
			<Outlet />
		</div>
	);
}

export default ProductList;
