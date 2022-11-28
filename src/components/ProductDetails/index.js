import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ADD_TO_CART from '../../common/graphQlquery/addToCart';
import GET_PRODUCTSBYID from '../../common/graphQlquery/getProductsById';
import { ShopContext } from '../../common/shopContext';
import './productDetails.scss';
import Rating from './Rating';

function ProductDetails() {
	const { id } = useParams();
	const headingOneRef = useRef(null);
	const headingThreeRef = useRef(null);
	const [productDetails, setProductDetails] = useState({});
	const { updateCartItem } = useContext(ShopContext);
	const [addToCartData, { data }] = useMutation(ADD_TO_CART);
	const {
		loading: productsLoading,
		error: productsError,
		data: productsData,
	} = useQuery(GET_PRODUCTSBYID, {
		variables: {
			productsById: id,
		},
		fetchPolicy: 'network-only',

		// notifyOnNetworkStatusChange: true,
	});

	const toggleAccordion = (itemRef) => {
		// Getting node element
		// Adding class to node element
		if (itemRef.contains('show')) {
			itemRef.add('hide');
			itemRef.remove('show');
		} else {
			itemRef.add('show');
			itemRef.remove('hide');
		}
	};

	const addToCart = () => {
		addToCartData({
			variables: {
				id: id.toString(),
			},
		});
	};

	useEffect(() => {
		if (data) {
			updateCartItem(data);
		}
	}, [data]);

	const keyDown = () => {
	};

	useEffect(() => {
		if (productsData) {
			setProductDetails(productsData.productsById);
		}
	}, [productsData]);

	if (productsLoading) return 'Loading...';
	if (productsError) return new Error('ProductDetails error');

	return (
		<div className="pd container-xxl">
			<div className="pd-leftcontainer">
				<div className="pd-image">
					<img
						role="presentation"
						height="100%"
						width="100%"
						src={productDetails.image}
						alt={productDetails.description}
					/>
				</div>
			</div>
			<div className="pd-rightcontainer">
				<div className="pd-title display-3">{productDetails.name}</div>
				<div className="pd-price pb-1">
					Rs.
					{productDetails.price?.initialPrice.toLocaleString()}
				</div>
				<div className="pd-description lead">{productDetails.description}</div>
				<button type="button" className="btn btn-dark mb-4 mt-4 addCartButton" onClick={addToCart}> Add To Cart </button>
				<div className="horizontal-line" />
				<div className="pd-overview"> Product Overview </div>
				<div className="pd-overview-details">
					<div className="accordion" id="accordionExample">
						<div className="card">
							<div className="card-header" id="headingOne">
								<h2 className="mb-0">
									<button
										className="btn btn-link btn-block text-left accordionButton"
										id="buttonOne"
										onClick={() => toggleAccordion(headingOneRef.current.classList)}
										onKeyDown={keyDown}
										tabIndex="-1"
										type="button"
										data-toggle="collapse"
										data-target="#collapseOne"
										aria-expanded="true"
										aria-controls="collapseOne"
									>
										Features
									</button>
								</h2>
							</div>

							<div
								id="collapseOne"
								className="collapse show"
								ref={headingOneRef}
								aria-labelledby="headingOne"
								data-parent="#accordionExample"
							>
								<div className="card-body">
									{productDetails.overview && (
										<table className="table table-hover table-responsive table-borderless">
											<tbody>
												<tr>
													<td>Brand</td>
													<td>{productDetails.overview[0].brand}</td>
												</tr>
												<tr>
													<td>Color</td>
													<td>{productDetails.overview[0].color}</td>
												</tr>
												<tr>
													<td>Features</td>
													<td>{productDetails.overview[0].features}</td>
												</tr>
												<tr>
													<td>Finish</td>
													<td>{productDetails.overview[0].finish}</td>
												</tr>
												<tr>
													<td>Material</td>
													<td>{productDetails.overview[0].material}</td>
												</tr>
												<tr>
													<td>Seater</td>
													<td>{productDetails.overview[0].seater}</td>
												</tr>
												<tr>
													<td>SKU</td>
													<td>{productDetails.overview[0].sku}</td>
												</tr>
											</tbody>
										</table>
									)}
								</div>
							</div>
						</div>
						<div className="card">
							<div className="card-header" id="headingThree">
								<h2 className="mb-0">
									<button
										className="btn btn-link btn-block text-left accordionButton"
										type="button"
										id="buttonThree"
										onClick={() => toggleAccordion(headingThreeRef.current.classList)}
										onKeyDown={keyDown}
										tabIndex="-1"
										data-toggle="collapse"
										data-target="#collapseThree"
										aria-expanded="true"
										aria-controls="collapseThree"
									>
										Reviews
									</button>
								</h2>
							</div>

							<div
								id="collapseThree"
								className="collapse"
								ref={headingThreeRef}
								role="button"
								aria-labelledby="headingThree"
								data-parent="#accordionExample"
							>
								<div className="card-body">
									{productDetails.reviews && (
										<table className="table table-hover table-responsive table-borderless">
											<tbody>
												<tr>
													<td>Comment</td>
													<td>{productDetails.reviews[0].comment}</td>
												</tr>
												<tr>
													<td>Rating</td>
													<td><Rating rate={productDetails.reviews[0].rating} /></td>
												</tr>

											</tbody>
										</table>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductDetails;
