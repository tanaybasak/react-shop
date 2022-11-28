import React, { useState } from 'react';

function Rating({ rate }) {
	const [rating, setRating] = useState(rate);
	const [setHover] = useState(0);

	return (
		<div className="star-rating">
			{[...Array(5)].map((star, index) => {
				// eslint-disable-next-line no-param-reassign
				index += 1;
				return (
					<button
						type="button"
						// eslint-disable-next-line react/no-array-index-key
						key={index}
						className={index <= rating ? 'on' : 'off'}
						onClick={() => setRating(index)}
						onMouseEnter={() => setHover(index)}
						onMouseLeave={() => setHover(rating)}
						onDoubleClick={() => {
							setRating(0);
							setHover(0);
						}}
					>
						<span className="star">&#9733;</span>
					</button>
				);
			})}
		</div>
	);
}

export default Rating;
