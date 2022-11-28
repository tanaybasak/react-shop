import React from 'react';

function ErrorComponent({ details }) {
	return (
		<div className="error">
			{details}
			{' '}
			data not available
		</div>
	);
}

export default ErrorComponent;
